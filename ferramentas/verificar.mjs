#!/usr/bin/env node
/* verificar.mjs — Risca & Mexe
   Confere o que um pull request pode quebrar sem ninguém ver: arquivo JavaScript com erro de sintaxe, item sem
   receita ou sem tradução, item sem vídeo ou sem miniatura. Roda no GitHub a cada pull request e também aqui:
     node ferramentas/verificar.mjs */

import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import vm from 'node:vm';

const RAIZ = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const erros = [];

const js = [...(await readdir(RAIZ)).filter(f => f.endsWith('.js')), ...(await readdir(path.join(RAIZ, 'cena'))).filter(f => f.endsWith('.js')).map(f => `cena/${f}`)];
for (const f of js) {
  try { execFileSync(process.execPath, ['--check', path.join(RAIZ, f)], { stdio: 'pipe' }); }
  catch (e) { erros.push(`${f}: erro de sintaxe\n${e.stderr}`); }
}

const ctx = { window: {} };
for (const f of ['itens.js', 'referencias.js', 'receitas.js', 'traducoes.js']) vm.runInNewContext(await readFile(path.join(RAIZ, f), 'utf8'), ctx);
const { MI, RECEITAS, TRADUCOES } = ctx.window;

const itens = [...MI.visuais.map(i => ({ ...i, id: `V${i.n}` })), ...MI.movimentos.map(i => ({ ...i, id: `M${i.n}` }))];
for (const it of itens) {
  if (!RECEITAS[it.id]) erros.push(`${it.id} ${it.nome}: falta a receita em receitas.js`);
  for (const l of ['en', 'es']) {
    if (!TRADUCOES[l].itens[it.id]) erros.push(`${it.id} ${it.nome}: falta a tradução (${l}) em traducoes.js, em itens`);
    if (!TRADUCOES[l].receitas[it.id]) erros.push(`${it.id} ${it.nome}: falta a tradução (${l}) em traducoes.js, em receitas`);
  }
}
for (const arq of [...itens.map(i => i.arq), ...MI.combinacoes.map(x => x.arq)].filter(Boolean)) {
  for (const l of ['', 'en/', 'es/']) {
    if (!existsSync(path.join(RAIZ, 'v', `${l}${arq}.mp4`))) erros.push(`falta o vídeo v/${l}${arq}.mp4`);
    if (!existsSync(path.join(RAIZ, 'capas', `${l}${arq}.jpg`))) erros.push(`falta a miniatura capas/${l}${arq}.jpg`);
  }
}

if (erros.length) { console.error(erros.join('\n')); process.exit(1); }
console.log(`tudo certo: ${js.length} arquivos JavaScript, ${itens.length} itens, ${MI.combinacoes.length} combinações`);
