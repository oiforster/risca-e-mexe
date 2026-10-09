#!/usr/bin/env node
/* gravar.mjs — Risca & Mexe
   =========================
   Grava uma cena do catálogo como vídeo, quadro a quadro. Nada é gravado em tempo real: para cada quadro a
   cena pula para o instante certo (window.cena.irPara) e o Chrome tira a foto, então o vídeo sai liso
   mesmo num computador lento.

   Precisa de: Node 22 ou mais novo, Google Chrome (ou Chromium) e ffmpeg. Nenhum pacote do npm.
   Precisa de internet: a cena carrega o GSAP e as fontes do Google Fonts.

   Uso (de dentro da pasta do site):
     node ferramentas/gravar.mjs --v 9 --m 2 --saida pontilhismo.mp4            # V9 com M2, 1080 × 1920
     node ferramentas/gravar.mjs --v 9 --m 2 --lang en --escala 0.5 --saida x.mp4  # textos em inglês, 540 × 960
     node ferramentas/gravar.mjs --itens --lang es                               # todos os vídeos do site em v/es/ (540 × 960, leves)
   Saída .mov sai em ProRes 4444 (para editar); .mp4 sai em H.264 (para a web).
   Se o Chrome não estiver no lugar de sempre: CHROME=/caminho/do/chrome node ferramentas/gravar.mjs ... */

import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile, mkdtemp, rm, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import vm from 'node:vm';

const RAIZ = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const L = 1080, A = 1920;

const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const k = process.argv[i].replace(/^--/, ''), prox = process.argv[i + 1];
  if (prox === undefined || prox.startsWith('--')) args[k] = true; else { args[k] = prox; i++; }
}

function chrome() {
  const lista = [process.env.CHROME,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'];
  const achado = lista.find(c => c && existsSync(c));
  if (!achado) throw new Error('Chrome não encontrado. Diga onde ele está: CHROME=/caminho/do/chrome');
  return achado;
}

// um servidor local mínimo: a cena precisa de http (o Chrome bloqueia leitura de pixels em file://)
const TIPOS = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml' };
function servir() {
  const srv = createServer(async (req, res) => {
    const p = path.join(RAIZ, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!p.startsWith(RAIZ)) { res.writeHead(403).end(); return; }
    let corpo;
    try { corpo = await readFile(p); } catch { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(p)] || 'application/octet-stream' }).end(corpo);
  });
  return new Promise(ok => srv.listen(0, '127.0.0.1', () => ok(srv)));
}

// conversa com o Chrome pelo protocolo de depuração (o WebSocket já vem no Node)
async function abrirChrome(escala) {
  const perfil = await mkdtemp(path.join(tmpdir(), 'risca-'));
  const proc = spawn(chrome(), ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${perfil}`,
    '--hide-scrollbars', '--mute-audio', '--no-first-run', '--no-default-browser-check', `--window-size=${L},${A}`]);
  const endereco = await new Promise((ok, erro) => {
    let txt = '';
    proc.stderr.on('data', d => { txt += d; const m = txt.match(/ws:\/\/\S+/); if (m) ok(m[0]); });
    proc.on('exit', () => erro(new Error('o Chrome fechou antes de abrir:\n' + txt)));
  });
  const ws = new WebSocket(endereco);
  await new Promise(ok => ws.addEventListener('open', ok, { once: true }));
  let id = 0; const espera = new Map();
  ws.addEventListener('message', e => {
    const msg = JSON.parse(e.data);
    if (msg.id && espera.has(msg.id)) {
      const { ok, erro } = espera.get(msg.id); espera.delete(msg.id);
      msg.error ? erro(new Error(msg.error.message)) : ok(msg.result);
    }
  });
  const chamar = (method, params = {}, sessionId) => new Promise((ok, erro) => {
    espera.set(++id, { ok, erro }); ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const { targetId } = await chamar('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await chamar('Target.attachToTarget', { targetId, flatten: true });
  const aba = (m, p) => chamar(m, p, sessionId);
  await aba('Emulation.setDeviceMetricsOverride', { width: L, height: A, deviceScaleFactor: escala, mobile: false });
  const js = async expr => {
    const r = await aba('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
    return r.result.value;
  };
  const fechar = async () => {
    ws.close(); const saiu = new Promise(r => proc.once('exit', r)); proc.kill(); await saiu;
    await rm(perfil, { recursive: true, force: true, maxRetries: 5 }).catch(() => {});
  };
  return { aba, js, fechar };
}

function codec(destino, crf) {
  // os quadros do Chrome são sRGB; sem dizer a matriz, o ffmpeg converte em BT.601 e os editores leem como BT.709 (a cor desvia)
  const cor = ['-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709'];
  const params = 'setparams=color_primaries=bt709:color_trc=bt709:colorspace=bt709';
  return destino.toLowerCase().endsWith('.mov')
    ? ['-vf', `scale=out_color_matrix=bt709,${params}`, '-c:v', 'prores_ks', '-profile:v', '4444', '-pix_fmt', 'yuva444p10le', '-vendor', 'apl0', ...cor]
    : ['-vf', `scale=out_color_matrix=bt709:out_range=tv,${params}`, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', String(crf), '-preset', 'slow', '-movflags', '+faststart', ...cor];
}

async function gravar({ v, m, lang, escala, crf = 18, saida, porta }) {
  const nav = await abrirChrome(escala);
  try {
    const q = new URLSearchParams({ v, m, render: '1', ...(lang ? { lang } : {}) });
    await nav.aba('Page.navigate', { url: `http://127.0.0.1:${porta}/cena/combinar.html?${q}` });
    const limite = Date.now() + 60000;
    while (!(await nav.js('!!(window.cena && window.cena.pronto)').catch(() => false))) {
      if (Date.now() > limite) throw new Error('a cena não ficou pronta em 60 s (sem internet para o GSAP e as fontes?)');
      await new Promise(r => setTimeout(r, 250));
    }
    const duracao = await nav.js('window.cena.duracao'), fps = await nav.js('window.cena.fps || 24');
    const total = Math.round(duracao * fps);
    await mkdir(path.dirname(path.resolve(saida)), { recursive: true });
    const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-', ...codec(saida, crf), saida], { stdio: ['pipe', 'inherit', 'inherit'] });
    const fim = new Promise((ok, erro) => ff.on('exit', c => c === 0 ? ok() : erro(new Error('o ffmpeg falhou'))));
    for (let i = 0; i < total; i++) {
      await nav.js(`window.cena.irPara(${(i / fps).toFixed(6)})`);
      const foto = await nav.aba('Page.captureScreenshot', { format: 'png', fromSurface: true, clip: { x: 0, y: 0, width: L, height: A, scale: 1 } });
      if (!ff.stdin.write(Buffer.from(foto.data, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    }
    ff.stdin.end(); await fim;
    console.log(`${saida}: V${v} × M${m}${lang ? ` (${lang})` : ''}, ${total} quadros, ${duracao} s`);
  } finally { await nav.fechar(); }
}

// os vídeos do site: cada visual sozinho (M0), cada movimento sobre o V1 (os de interface sobre o cartão V10) e as combinações
async function itens() {
  const ctx = { window: {} }; vm.runInNewContext(await readFile(path.join(RAIZ, 'itens.js'), 'utf8'), ctx);
  const { visuais, movimentos, combinacoes } = ctx.window.MI;
  return [
    ...visuais.filter(i => i.arq).map(i => ({ arq: i.arq, v: i.n, m: 0 })),
    ...movimentos.filter(i => i.arq).map(i => ({ arq: i.arq, v: i.n >= 12 && i.n <= 14 ? 10 : 1, m: i.n })),
    ...combinacoes.map(x => ({ arq: x.arq, v: x.v, m: x.m })),
  ];
}

const srv = await servir(), porta = srv.address().port;
try {
  if (args.itens) {
    const lang = args.lang && args.lang !== 'pt' ? args.lang : '';
    const pasta = path.join(RAIZ, 'v', lang);
    const so = args.so ? String(args.so).split(',') : null;   // --so V9_pontilhismo,M2_particulas grava só esses
    for (const it of await itens()) {
      if (so && !so.includes(it.arq)) continue;
      await gravar({ ...it, lang, escala: +(args.escala || 0.5), crf: 24, saida: path.join(pasta, `${it.arq}.mp4`), porta });
    }
  } else {
    if (args.v === undefined || args.m === undefined || !args.saida) throw new Error('use --v <número> --m <número> --saida <arquivo.mp4>, ou --itens');
    await gravar({ v: args.v, m: args.m, lang: args.lang, escala: +(args.escala || 1), saida: args.saida, porta });
  }
} catch (e) { console.error(e.message); process.exitCode = 1; }
finally { srv.close(); }
