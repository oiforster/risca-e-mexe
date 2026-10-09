/* nucleo.js — Risca & Mexe
   =========================
   O que faz:
     Motor do catálogo de estilos de animação. Separa os dois eixos:
       - o VISUAL (visuais.js) diz como a peça é desenhada: cores, fontes, textura, efeito final;
       - o MOVIMENTO (movimentos.js) diz como ela se mexe: uma linha do tempo do GSAP sobre o estado.
     A peça é neutra (um ícone, um número e uma palavra) e vive num estado (S). O movimento anima o estado;
     o visual desenha o estado num canvas. Por isso qualquer visual combina com qualquer movimento.
     Expõe window.cena (irPara, duracao, fps, pronto, eventos, estado), então o ferramentas/gravar.mjs
     grava qualquer combinação quadro a quadro.

   Uso (numa página ao lado de visuais.js e movimentos.js, depois do GSAP do cdnjs):
     Catalogo.montar({ visual: 9, movimento: 2 });                 // V9 pontilhismo com M2 partículas
     Catalogo.montar({ visual: 5, movimento: 8, palavra: 'OFERTA DA SEMANA', valor: 49.9, duracao: 5.2 });
     Catalogo.novaForma('gota', pontos); Catalogo.montar({ ..., formas: ['gota', 'circulo'] });   // ícone do assunto
   Sem visual/movimento no objeto, lê ?v=9&m=2 do endereço (é o que o combinar.html faz).

   Dependências externas:
     - GSAP 3.13 (gratuito desde 2025) pelo cdnjs
     - fontes do Google Fonts que cada visual pede (carregadas aqui antes do primeiro quadro)

   Última atualização: 2026-10-08 */
(function () {
  const L = 1080, A = 1920, N = 180, R_ICONE = 230;

  // ---------------------------------------------------------------- utilidades
  function rng(seed) {
    let a = seed >>> 0;
    return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  function ruido(i, s) { const x = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453; return (x - Math.floor(x)) * 2 - 1; }
  function suave(i, s, n) {   // ruído suave e fechado ao longo do contorno (n pontos)
    const a = 2 * Math.PI * i / n;
    return Math.sin(a * 3 + s * 1.7) * 0.5 + Math.sin(a * 5 + s * 3.1) * 0.3 + Math.sin(a * 9 + s * 5.3) * 0.2;
  }
  const lerp = (a, b, p) => a + (b - a) * p;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  function reamostrar(pts, n) {
    const P = pts.concat([pts[0]]), d = [0];
    for (let i = 1; i < P.length; i++) d.push(d[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
    const tot = d[d.length - 1], out = [];
    let j = 1;
    for (let k = 0; k < n; k++) {
      const alvo = tot * k / n;
      while (d[j] < alvo) j++;
      const f = (alvo - d[j - 1]) / ((d[j] - d[j - 1]) || 1);
      out.push([lerp(P[j - 1][0], P[j][0], f), lerp(P[j - 1][1], P[j][1], f)]);
    }
    return out;
  }
  function normalizar(pts) {
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, e = 2 / Math.max(x1 - x0, y1 - y0);
    return pts.map(([x, y]) => [(x - cx) * e, (y - cy) * e]);
  }
  // as formas da peça: N pontos cada, começando no alto e em sentido horário, para o morph casar ponto a ponto
  const FORMAS = {
    estrela: normalizar(reamostrar(Array.from({ length: 10 }, (_, i) => {
      const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 0.46 : 1; return [Math.cos(a) * r, Math.sin(a) * r];
    }), N)),
    coracao: normalizar(reamostrar(Array.from({ length: 720 }, (_, i) => {
      const t = 2 * Math.PI * i / 720;
      return [16 * Math.pow(Math.sin(t), 3), -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))];
    }), N)),
    circulo: Array.from({ length: N }, (_, i) => { const a = -Math.PI / 2 + 2 * Math.PI * i / N; return [Math.cos(a) * 0.92, Math.sin(a) * 0.92]; }),
  };

  // desenho de caminhos (os visuais usam)
  function caminho(ctx, pts) {
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath();
  }
  function caminhoSuave(ctx, pts) {   // curva pelos pontos médios (massinha, recorte macio)
    const n = pts.length, m = i => [(pts[i % n][0] + pts[(i + 1) % n][0]) / 2, (pts[i % n][1] + pts[(i + 1) % n][1]) / 2];
    ctx.beginPath(); const p0 = m(0); ctx.moveTo(p0[0], p0[1]);
    for (let i = 1; i <= n; i++) { const c = pts[i % n], p = m(i); ctx.quadraticCurveTo(c[0], c[1], p[0], p[1]); }
    ctx.closePath();
  }
  function parcial(ctx, pts, p) {      // o contorno desenhado até a fração p; devolve a ponta da caneta
    const n = pts.length, ate = p * n;
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    let ponta = pts[0];
    for (let i = 1; i <= Math.floor(ate); i++) { ponta = pts[i % n]; ctx.lineTo(ponta[0], ponta[1]); }
    const f = ate - Math.floor(ate), a = pts[Math.floor(ate) % n], b = pts[(Math.floor(ate) + 1) % n];
    if (f > 0) { ponta = [lerp(a[0], b[0], f), lerp(a[1], b[1], f)]; ctx.lineTo(ponta[0], ponta[1]); }
    return ponta;
  }
  // forma nova a partir de um contorno qualquer (pontos [x, y] em sentido horário, começando no alto)
  function novaForma(nome, pontos) { FORMAS[nome] = normalizar(reamostrar(pontos, N)); return FORMAS[nome]; }
  function escalar(pts, cx, cy, fator) { return pts.map(([x, y]) => [cx + (x - cx) * fator, cy + (y - cy) * fator]); }
  function centro(pts) { let x = 0, y = 0; for (const p of pts) { x += p[0]; y += p[1]; } return [x / pts.length, y / pts.length]; }
  // forma com o desenho em traço já resolvido: o visual só diz preenchimento e traço
  function formaPadrao(ctx, pts, o, estilo) {
    if (o.cheio > 0.001) {
      ctx.save(); ctx.globalAlpha *= o.cheio;
      (estilo.suave ? caminhoSuave : caminho)(ctx, pts);
      if (estilo.sombra) Object.assign(ctx, estilo.sombra);
      ctx.fillStyle = typeof estilo.fill === 'function' ? estilo.fill(ctx, o) : estilo.fill; ctx.fill();
      ctx.restore();
      if (estilo.depois) estilo.depois(ctx, pts, o);
    }
    const contorno = o.contorno ?? (estilo.stroke ? 1 : 1 - o.cheio);
    if (o.traco > 0.001 && contorno > 0.001) {
      ctx.save(); ctx.globalAlpha *= contorno;
      ctx.lineWidth = estilo.lw || 6; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      ctx.strokeStyle = estilo.stroke || estilo.traco || '#111';
      if (o.traco >= 0.999) { (estilo.suave ? caminhoSuave : caminho)(ctx, pts); ctx.stroke(); } else { parcial(ctx, pts, o.traco); ctx.stroke(); }
      ctx.restore();
    }
  }

  // ---------------------------------------------------------------- estado da peça
  function letrasDe(n) { return Array.from({ length: n }, () => ({ x: 0, y: 0, s: 1, rot: 0, a: 1 })); }
  function estadoInicial(cfg) {
    const r = rng(7);
    return {
      cam: { x: 0, y: 0, z: 0, rx: 0, ry: 0 },               // câmera 3D sobre o plano da peça (M7)
      par: { x: 0, y: 0, z: 0 },                            // câmera das camadas em profundidade (M6)
      grupo: { x: 0, y: 0, s: 1, rot: 0, a: 1 },
      trem: { x: 0, y: 0, rot: 0 },                         // tremor quadro a quadro (stop motion), não é animado pelo GSAP
      icone: { x: 0, y: -250, s: 1, rot: 0, a: 1, seq: cfg.formas || ['estrela', 'coracao', 'circulo', 'estrela'], m: 0, traco: 1, cheio: 1, prof: 1 },
      numero: { x: 0, y: 200, s: 1, a: 1, valor: cfg.valor, alvo: cfg.valor, prof: 0.6, letras: letrasDe(formatar(cfg.valor).length + 2) },
      palavra: { x: 0, y: 410, s: 1, a: 1, texto: cfg.palavra, prof: 0.35, letras: letrasDe(cfg.palavra.length) },
      decor: [[-400, -760, -0.5], [380, -620, -0.3], [-430, -150, 0.2], [440, 60, 1.4], [-360, 640, 1.8],
              [420, 760, -0.4], [-120, -880, 0.5], [300, -900, 1.6], [-460, 330, -0.2], [180, 880, 2.1]].map(([x, y, p], i) => ({
        x, y, s: lerp(0.12, 0.34, r()), rot: lerp(-40, 40, r()), a: 0, prof: p, forma: ['estrela', 'circulo', 'coracao'][i % 3],
      })),
      mascara: { p: 1 },                                    // círculo que revela o ícone (1 = sem máscara)
      cortina: { n: 2, w: 2 },                              // barra que cobre e revela cada linha de texto (2 = já passou)
      escrita: { n: 1, w: 1 },                              // texto escrito da esquerda para a direita (1 = inteiro)
      part: { p: 0 },                                       // 0 = peça formada; 1 = grãos espalhados
      glitch: { f: 0 },
      ferver: 0, semente: 0,                                // contorno que "ferve" no stop motion
      // interface (M12 a M14): o cartão da ferramenta, o cursor, o arquivo arrastado, o pedido digitado e a lista de passos
      cartao: Object.assign({ x: 0, y: -50, w: 780, h: 1140, r: 64, alvo: 0, recorte: 0 }, (V && V.cartao) || {}),
      cursor: { x: 700, y: 1100, a: 0, s: 1 },
      arquivo: { x: 0, y: 0, s: 1, rot: 0, a: 0, nome: cfg.arquivo },
      pedido: { texto: cfg.pedido, n: 0, a: 0, crescer: 0 },
      lista: { a: 0, rolar: 0, pecaY: 0, itens: cfg.passos.map(t => ({ texto: t, a: 0, feito: 0 })) },
      // esfera de pontos (M15): pontos numa esfera que gira; junta 1 = espalhados, varre = faixa de luz (0 a 1; -1 desligada)
      orbe: { a: 0, x: 0, y: -250, r: 250, rx: -18, ry: 0, junta: 0, varre: -1, respira: 0, anel: 0, prof: 1 },
      // visão do paciente (M16): a máscara redonda (abre: 0 fechada, 1 a tela inteira) mostra a imagem do jeito que o
      // paciente enxerga; forca = quanto do sintoma, raios = estrelas nas luzes (clarão); marcas = tempos da fala (cfg.visao)
      visao: { abre: 0, x: (cfg.visao && cfg.visao.x) || L / 2, y: (cfg.visao && cfg.visao.y) || A / 2, forca: 0, raios: 0, zoom: 1, efeito: (cfg.visao && cfg.visao.efeito) || 'catarata', marcas: (cfg.visao && cfg.visao.marcas) || null },
      t: 0,
    };
  }
  // o número com as mesmas casas decimais do pedido (4,9 · 120 · 1.200 · 98,5), com prefixo e sufixo opcionais ("+", "%")
  function formatar(v) {
    const casas = CFG ? CFG.casas : 1;
    const txt = new Intl.NumberFormat(CFG ? CFG.local : 'pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas }).format(v);
    return (CFG && CFG.prefixo || '') + txt + (CFG && CFG.sufixo || '');
  }

  // textos de exemplo da peça neutra em cada língua
  const TEXTOS = {
    pt: { palavra: 'NOTA DOS CLIENTES', local: 'pt-BR', arquivo: 'estrela.png', pedido: 'Uma estrela com a nota 4,9 dos clientes, em tom quente',
          passos: ['Lendo o pedido', 'Escolhendo as cores', 'Desenhando a estrela', 'Contando as avaliações', 'Pronto'] },
    en: { palavra: 'CUSTOMER RATING', local: 'en-US', arquivo: 'star.png', pedido: 'A star with a 4.9 customer rating, in warm tones',
          passos: ['Reading the request', 'Picking the colors', 'Drawing the star', 'Counting the reviews', 'Done'] },
    es: { palavra: 'NOTA DE LOS CLIENTES', local: 'es-ES', arquivo: 'estrella.png', pedido: 'Una estrella con la nota 4,9 de los clientes, en tono cálido',
          passos: ['Leyendo el pedido', 'Eligiendo los colores', 'Dibujando la estrella', 'Contando las reseñas', 'Listo'] },
  };

  // ---------------------------------------------------------------- desenho
  let V, M, S, CFG, cvF, cvP, ctxF, ctxP, DPR, particulas = null, quadro = 0;

  function prof(item) {          // deslocamento e escala pela profundidade (M6)
    return { dx: -S.par.x * item.prof, dy: -S.par.y * item.prof, k: 1 + S.par.z * item.prof };
  }
  function ptsIcone() {
    const ic = S.icone, seq = ic.seq, m = clamp(ic.m, 0, seq.length - 1);
    const i0 = Math.floor(m), i1 = Math.min(seq.length - 1, i0 + 1), f = m - i0;
    const a = FORMAS[seq[i0]], b = FORMAS[seq[i1]];
    const { dx, dy, k } = prof(ic);
    const r = R_ICONE * ic.s * k, rot = ic.rot * Math.PI / 180, c = Math.cos(rot), s = Math.sin(rot);
    return a.map((p, i) => {
      let x = lerp(p[0], b[i][0], f), y = lerp(p[1], b[i][1], f);
      if (S.ferver) { x += ruido(i, S.semente) * S.ferver / R_ICONE; y += ruido(i + 999, S.semente) * S.ferver / R_ICONE; }
      return [ic.x + dx + (x * c - y * s) * r, ic.y + dy + (x * s + y * c) * r];
    });
  }

  function texto(ctx, item, str, papel, revela, cortina) {
    if (item.a <= 0.001) return;
    ctx.save();
    ctx.font = V.fonte(papel); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const esp = V.espaco ? V.espaco(papel) : 0, chars = [...str];
    const ws = chars.map(c => ctx.measureText(c).width), tot = ws.reduce((a, b) => a + b, 0) + esp * (chars.length - 1);
    const { dx, dy, k } = prof(item), cabe = Math.min(1, 960 / Math.max(1, tot));   // palavra longa diminui para caber
    ctx.translate(item.x + dx, item.y + dy); ctx.scale(item.s * k * cabe, item.s * k * cabe); ctx.globalAlpha *= item.a;
    const alto = parseFloat(ctx.font.match(/(\d+)px/)[1]);
    if (revela < 0.999) { ctx.beginPath(); ctx.rect(-tot / 2 - 400, -alto * 2, tot * revela + 400, alto * 4); ctx.clip(); }
    const mostrar = cortina >= 1;
    if (mostrar) {
      let x = -tot / 2;
      chars.forEach((c, i) => {
        const Lt = item.letras[i] || { x: 0, y: 0, s: 1, rot: 0, a: 1 }, cx = x + ws[i] / 2;
        if (c !== ' ' && Lt.a > 0.001) {
          ctx.save(); ctx.translate(cx + Lt.x, Lt.y); ctx.rotate(Lt.rot * Math.PI / 180); ctx.scale(Lt.s, Lt.s); ctx.globalAlpha *= Lt.a;
          V.texto(ctx, c, { papel, i, alto, largura: ws[i] });
          ctx.restore();
        }
        x += ws[i] + esp;
      });
    }
    if (cortina < 2) {     // a barra: cresce da esquerda até cobrir (0→1) e sai pela direita (1→2)
      const a0 = cortina < 1 ? 0 : cortina - 1, a1 = cortina < 1 ? cortina : 1, pad = 30;
      ctx.fillStyle = V.cores.destaque;
      ctx.fillRect(-tot / 2 - pad + (tot + 2 * pad) * a0, -alto * 0.62, (tot + 2 * pad) * (a1 - a0), alto * 1.24);
    }
    if (revela > 0.001 && revela < 0.999) {   // a ponta da caneta na escrita
      ctx.fillStyle = V.cores.traco; ctx.beginPath(); ctx.arc(-tot / 2 + tot * revela, 0, Math.max(6, alto * 0.04), 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }

  // ---------------------------------------------------------------- interface (cartão, pedido, lista, arquivo, cursor)
  const PAD = 64, TP = 58;   // margem do cartão e tamanho da letra do pedido e da lista
  function fontePedido() { return V.fonte('pedido').replace(/\d+px/, TP + 'px'); }
  function quebrar(ctx, str, largura) {      // linhas do texto na largura do cartão
    const linhas = []; let atual = '';
    for (const pal of str.split(' ')) {
      const prova = atual ? atual + ' ' + pal : pal;
      if (ctx.measureText(prova).width > largura && atual) { linhas.push(atual + ' '); atual = pal; } else atual = prova;
    }
    linhas.push(atual); return linhas;
  }
  function linhasPedido(ctx) {
    ctx.save(); ctx.font = fontePedido();
    const l = quebrar(ctx, S.pedido.texto, S.cartao.w - 2 * PAD - 90); ctx.restore(); return l;
  }
  function retCartao(ctx, cheio) {           // o cartão; enquanto o pedido é digitado, ele cresce com as linhas
    const c = S.cartao; let h = c.h;
    if (S.pedido.crescer > 0.001) {
      const linhas = linhasPedido(ctx), lh = TP * 1.4;
      let n = cheio ? S.pedido.texto.length : Math.floor(S.pedido.n), vistas = 1;
      for (let k = 0; k < linhas.length; k++) {
        if (n <= linhas[k].length || k === linhas.length - 1) { vistas = k === 0 ? 1 : k + Math.min(1, n / 4); break; }
        n -= linhas[k].length;
      }
      h = lerp(c.h, 2 * PAD + 88 + vistas * lh + 40, S.pedido.crescer);
    }
    return { x: c.x - c.w / 2, y: c.y - h / 2, w: c.w, h, r: c.r };
  }
  function letrasSoltas(ctx, str, x, y, papel, n) {   // texto alinhado à esquerda, letra por letra no estilo do visual
    const alto = parseFloat(ctx.font.match(/(\d+)px/)[1]); let cx = x;
    for (let i = 0; i < Math.min(n, str.length); i++) {
      const c = str[i], w = ctx.measureText(c).width;
      if (c !== ' ') { ctx.save(); ctx.translate(cx + w / 2, y); V.texto(ctx, c, { papel, i, alto, largura: w }); ctx.restore(); }
      cx += w;
    }
    return cx;
  }
  function desenharPedido(ctx, ret) {
    const P = S.pedido; if (P.a <= 0.001) return;
    ctx.save(); ctx.globalAlpha *= P.a; ctx.font = fontePedido(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const linhas = linhasPedido(ctx), lh = TP * 1.4; let resta = Math.floor(P.n), fimX = ret.x + PAD, fimY = ret.y + PAD + 88 + lh / 2;
    linhas.forEach((l, i) => {
      if (resta <= 0) return;
      const y = ret.y + PAD + 88 + lh / 2 + i * lh;
      fimX = letrasSoltas(ctx, l, ret.x + PAD, y, 'pedido', resta); fimY = y; resta -= l.length;
    });
    if (Math.floor(S.t * 2.2) % 2 === 0 || P.n < P.texto.length) { ctx.fillStyle = V.cores.traco; ctx.fillRect(fimX + 3, fimY - TP * 0.6, 5, TP * 1.2); }   // o cursor de texto
    const bx = ret.x + ret.w - PAD - 30, by = ret.y + ret.h - PAD - 10;          // o botão de enviar
    ctx.fillStyle = V.cores.destaque; ctx.beginPath(); ctx.arc(bx, by, 34, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(bx, by + 14); ctx.lineTo(bx, by - 14); ctx.moveTo(bx - 12, by - 2); ctx.lineTo(bx, by - 14); ctx.lineTo(bx + 12, by - 2); ctx.stroke();
    ctx.restore();
  }
  function desenharLista(ctx, ret) {
    const Lp = S.lista; if (Lp.a <= 0.001) return;
    ctx.save(); ctx.globalAlpha *= Lp.a; ctx.font = fontePedido(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    Lp.itens.forEach((it, i) => {
      if (it.a <= 0.001) return;
      const y = ret.y + PAD + 88 + 60 + i * 150 - Lp.rolar + (1 - it.a) * 24, x = ret.x + PAD + 28;
      ctx.save(); ctx.globalAlpha *= it.a;
      if (it.feito < 0.999) {      // girando enquanto trabalha
        ctx.save(); ctx.strokeStyle = V.cores.traco; ctx.globalAlpha *= 0.35 * (1 - it.feito); ctx.lineWidth = 5;
        ctx.beginPath(); ctx.arc(x, y, 24, S.t * 7 + i, S.t * 7 + i + 4.2); ctx.stroke(); ctx.restore();
      }
      if (it.feito > 0.001) {      // o sinal de feito
        ctx.save(); ctx.translate(x, y); ctx.scale(it.feito, it.feito);
        ctx.fillStyle = V.cores.destaque; ctx.beginPath(); ctx.arc(0, 0, 26, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.beginPath(); ctx.moveTo(-11, 1); ctx.lineTo(-3, 9); ctx.lineTo(12, -8); ctx.stroke(); ctx.restore();
      }
      letrasSoltas(ctx, it.texto, x + 54, y, 'pedido', it.texto.length);
      ctx.restore();
    });
    ctx.restore();
  }
  function desenharArquivo(ctx) {
    const Ar = S.arquivo; if (Ar.a <= 0.001) return;
    ctx.save(); ctx.translate(Ar.x, Ar.y); ctx.rotate(Ar.rot * Math.PI / 180); ctx.scale(Ar.s, Ar.s); ctx.globalAlpha *= Ar.a;
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.28)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18;
    ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.roundRect(-150, -170, 300, 340, 28); ctx.fill(); ctx.restore();
    ctx.fillStyle = '#30343F'; ctx.beginPath(); ctx.roundRect(-126, -146, 252, 230, 18); ctx.fill();
    const r = 92, pts = FORMAS[S.icone.seq[0]].map(([x, y]) => [x * r, y * r - 31]);
    V.forma(ctx, pts, { traco: 1, cheio: 1, papel: 'icone', cx: 0, cy: -31, r, i: 1 });
    ctx.fillStyle = '#4A505C'; ctx.font = '600 26px ' + (V.fonte('palavra').match(/(".*"|[A-Za-z]+)\s*$/) || ['', 'sans-serif'])[1];
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(Ar.nome, 0, 128);
    ctx.restore();
  }
  function desenharCursor(ctx) {
    const Cu = S.cursor; if (Cu.a <= 0.001) return;
    ctx.save(); ctx.translate(Cu.x, Cu.y); ctx.scale(2.3 * Cu.s, 2.3 * Cu.s); ctx.globalAlpha *= Cu.a;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 18); ctx.lineTo(4.5, 13.5); ctx.lineTo(7.5, 21); ctx.lineTo(10.5, 19.7); ctx.lineTo(7.5, 12.5); ctx.lineTo(14, 12.5); ctx.closePath();
    ctx.fillStyle = '#111111'; ctx.fill(); ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 1.4; ctx.lineJoin = 'round'; ctx.stroke();
    ctx.restore();
  }

  // ---------------------------------------------------------------- esfera de pontos (M15)
  const ESFERA = (() => {
    const n = 640, r = rng(31), ouro = Math.PI * (3 - Math.sqrt(5)), pts = [];
    for (let i = 0; i < n; i++) {
      const y = 1 - (i + 0.5) * 2 / n, raio = Math.sqrt(1 - y * y), a = i * ouro;
      const ang = r() * Math.PI * 2, dist = 2.2 + r() * 2.5;   // de onde o ponto chega quando a esfera se forma
      pts.push({ x: Math.cos(a) * raio, y, z: Math.sin(a) * raio, sx: Math.cos(ang) * dist, sy: Math.sin(ang) * dist, d: r() * 0.4 });
    }
    return pts;
  })();
  function desenharOrbe(ctx) {
    const O = S.orbe; if (O.a <= 0.001) return;
    const { dx, dy, k } = prof(O), R = O.r * k * (1 + 0.12 * O.respira), F = 3.2;
    const cy = Math.cos(O.ry * Math.PI / 180), sy = Math.sin(O.ry * Math.PI / 180), cx = Math.cos(O.rx * Math.PI / 180), sx = Math.sin(O.rx * Math.PI / 180);
    const cor = V.cores.ponto || V.cores.traco, luz = V.cores.destaque, e = q => 1 - Math.pow(1 - q, 3);
    const lista = ESFERA.map(p => {
      let x = p.x * cy + p.z * sy, z = -p.x * sy + p.z * cy, y = p.y;   // gira em volta do eixo vertical
      const y2 = y * cx - z * sx; z = y * sx + z * cx; y = y2;          // e inclina
      const solto = e(clamp((O.junta * 1.4 - p.d)));
      const lon = Math.atan2(x, z) / (Math.PI * 2) + 0.5;
      return { x: lerp(x, p.sx, solto), y: lerp(y, p.sy, solto), z, lon };
    }).sort((a, b) => a.z - b.z);
    ctx.save(); ctx.globalAlpha *= O.a; ctx.translate(O.x + dx, O.y + dy);
    for (const q of lista) {
      const p = F / (F - q.z), fundo = (q.z + 1) / 2;
      let tam = (2.6 + 2.6 * fundo) * p * (R / 250), alfa = 0.22 + 0.78 * fundo, c = cor;
      if (O.varre >= 0) { const dl = Math.abs(((q.lon - O.varre + 1.5) % 1) - 0.5); if (dl < 0.06) { tam *= 1.8; alfa = Math.max(alfa, 0.95); c = luz; } }
      ctx.globalAlpha = O.a * alfa; ctx.fillStyle = c;
      ctx.beginPath(); ctx.arc(q.x * R * p, q.y * R * p, tam, 0, Math.PI * 2); ctx.fill();
    }
    if (O.anel > 0.001) {   // um anel inclinado de pontos em órbita, como quem "trabalha"
      ctx.fillStyle = luz;
      for (let i = 0; i < 72; i++) {
        const a = i / 72 * Math.PI * 2 + S.t * 2.2, x = Math.cos(a) * 1.45, z = Math.sin(a) * 1.45, y = z * 0.32;
        const p = F / (F - z * 0.6); ctx.globalAlpha = O.a * O.anel * (0.35 + 0.65 * (z / 1.45 + 1) / 2);
        ctx.beginPath(); ctx.arc(x * R * p, y * R * p, 3.4 * p * (R / 250), 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.restore();
  }

  function desenharPeca(ctx, opts = {}) {
    const g = S.grupo, alfaPeca = opts.semParticulas ? 1 : 1 - clamp(S.part.p * 8);
    ctx.save();
    ctx.translate(L / 2 + g.x + S.trem.x, A / 2 + g.y + S.trem.y);
    ctx.rotate((g.rot + S.trem.rot) * Math.PI / 180); ctx.scale(g.s, g.s);
    ctx.globalAlpha = g.a;
    if (V.grupo) V.grupo(ctx, S);
    const ret = retCartao(ctx);
    if (V.placa && alfaPeca > 0.001) { ctx.save(); ctx.globalAlpha *= alfaPeca; V.placa(ctx, S, cvF, ret); ctx.restore(); }
    // enfeites em profundidade (só aparecem no M6)
    for (const d of S.decor) {
      if (d.a <= 0.001) continue;
      const { dx, dy, k } = prof(d), r = R_ICONE * d.s * k, rot = d.rot * Math.PI / 180;
      const pts = FORMAS[d.forma].map(([x, y]) => [d.x + dx + (x * Math.cos(rot) - y * Math.sin(rot)) * r, d.y + dy + (x * Math.sin(rot) + y * Math.cos(rot)) * r]);
      ctx.save(); ctx.globalAlpha *= d.a;
      if (d.prof > 1.3) ctx.filter = `blur(${((d.prof - 1.3) * 9).toFixed(1)}px)`;
      V.forma(ctx, pts, { traco: 1, cheio: 1, papel: 'decor', cx: d.x + dx, cy: d.y + dy, r, i: S.decor.indexOf(d) + 10 });
      ctx.restore();
    }
    if (alfaPeca > 0.001) {
      ctx.save(); ctx.globalAlpha *= alfaPeca;
      if (S.cartao.recorte > 0.5) { ctx.beginPath(); ctx.roundRect(ret.x, ret.y + 88, ret.w, ret.h - 88, [0, 0, ret.r, ret.r]); ctx.clip(); }
      desenharPedido(ctx, ret);
      desenharLista(ctx, ret);
      ctx.translate(0, S.lista.pecaY);
      const ic = S.icone;
      if (ic.a > 0.001 && ic.s > 0.001 && S.mascara.p > 0.001) {
        ctx.save(); ctx.globalAlpha *= ic.a;
        if (S.mascara.p < 0.999) { ctx.beginPath(); ctx.arc(ic.x, ic.y, S.mascara.p * R_ICONE * 1.5 * ic.s, 0, Math.PI * 2); ctx.clip(); }
        const pts = ptsIcone(), [cx, cy] = [ic.x + prof(ic).dx, ic.y + prof(ic).dy];
        V.forma(ctx, pts, { traco: ic.traco, cheio: ic.cheio, papel: 'icone', cx, cy, r: R_ICONE * ic.s * prof(ic).k, i: 1 });
        if (ic.traco > 0.001 && ic.traco < 0.999) {
          const n = pts.length, j = Math.floor(ic.traco * n) % n;
          ctx.fillStyle = V.cores.traco; ctx.beginPath(); ctx.arc(pts[j][0], pts[j][1], 9, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
      }
      desenharOrbe(ctx);
      texto(ctx, S.numero, formatar(S.numero.valor), 'numero', S.escrita.n, S.cortina.n);
      texto(ctx, S.palavra, S.palavra.texto, 'palavra', S.escrita.w, S.cortina.w);
      ctx.restore();
    }
    if (S.cartao.alvo > 0.001) {     // a área de soltar acende quando o arquivo chega
      ctx.save(); ctx.globalAlpha *= S.cartao.alvo; ctx.setLineDash([22, 16]); ctx.lineWidth = 5; ctx.strokeStyle = V.cores.destaque;
      ctx.beginPath(); ctx.roundRect(ret.x + 28, ret.y + 116, ret.w - 56, ret.h - 144, Math.max(8, ret.r - 20)); ctx.stroke(); ctx.restore();
    }
    desenharArquivo(ctx);
    desenharCursor(ctx);
    ctx.restore();
  }

  // grãos: a peça formada vira pontos (cor tirada do próprio desenho do visual)
  function prepararParticulas() {
    const off = document.createElement('canvas'); off.width = L; off.height = A;
    const c = off.getContext('2d', { willReadFrequently: true });
    const guardado = JSON.stringify(S); const S0 = estadoInicial(CFG);
    S0.grupo = { x: 0, y: 0, s: 1, rot: 0, a: 1 }; S = S0;
    desenharPeca(c, { semParticulas: true });
    S = JSON.parse(guardado);
    const dados = c.getImageData(0, 0, L, A).data, r = rng(11), lista = [], passo = 6;
    for (let y = 0; y < A; y += passo) for (let x = 0; x < L; x += passo) {
      const px = Math.min(L - 1, Math.round(x + r() * passo)), py = Math.min(A - 1, Math.round(y + r() * passo)), o = (py * L + px) * 4;
      if (dados[o + 3] < 140) continue;
      const ang = Math.atan2(py - A / 2, px - L / 2) + (r() - 0.5) * 2.6, dist = lerp(260, 950, r());
      lista.push({ hx: px - L / 2, hy: py - A / 2, sx: Math.cos(ang) * dist, sy: Math.sin(ang) * dist - 200 * r(),
                   d: r() * 0.45, raio: lerp(2.6, 4.6, r()), cor: `rgb(${dados[o]},${dados[o + 1]},${dados[o + 2]})` });
    }
    lista.sort((a, b) => a.cor < b.cor ? -1 : 1);
    particulas = lista;
  }
  function desenharParticulas(ctx) {
    const p = S.part.p; if (p <= 0.001 || !particulas) return;
    const g = S.grupo, e = q => q < 0.5 ? 4 * q * q * q : 1 - Math.pow(-2 * q + 2, 3) / 2;
    ctx.save();
    ctx.translate(L / 2 + g.x + S.trem.x, A / 2 + g.y + S.trem.y); ctx.rotate(g.rot * Math.PI / 180); ctx.scale(g.s, g.s);
    ctx.globalAlpha = g.a * clamp(p * 8);
    if (V.grupo) V.grupo(ctx, S);
    let cor = null;
    for (const q of particulas) {
      const loc = e(clamp((p * 1.45 - q.d) / 1));
      const x = lerp(q.hx, q.sx, loc), y = lerp(q.hy, q.sy, loc);
      if (q.cor !== cor) { if (cor) ctx.fill(); cor = q.cor; ctx.fillStyle = cor; ctx.beginPath(); }
      ctx.moveTo(x + q.raio, y); ctx.arc(x, y, q.raio * (1 - 0.35 * loc), 0, Math.PI * 2);
    }
    if (cor) ctx.fill();
    ctx.restore();
  }

  // falha digital (M9): fatias deslocadas e canais de cor separados, no canvas inteiro da peça
  function glitch(f) {
    const w = cvP.width, h = cvP.height, src = ctxP.getImageData(0, 0, w, h), s = src.data;
    const dst = ctxP.createImageData(w, h), d = dst.data, r = rng(1000 + quadro);
    const desloc = new Int32Array(h), fatias = 3 + Math.floor(r() * 6);
    for (let k = 0; k < fatias; k++) {
      const y0 = Math.floor(r() * h), alt = Math.floor((10 + r() * 140) * DPR), dx = Math.round((r() - 0.5) * 2 * f * 160 * DPR);
      for (let y = y0; y < Math.min(h, y0 + alt); y++) desloc[y] = dx;
    }
    const sep = Math.round(f * 16 * DPR);
    for (let y = 0; y < h; y++) {
      const base = y * w, sx = desloc[y];
      for (let x = 0; x < w; x++) {
        const xr = Math.min(w - 1, Math.max(0, x - sx - sep)), xg = Math.min(w - 1, Math.max(0, x - sx)), xb = Math.min(w - 1, Math.max(0, x - sx + sep));
        const o = (base + x) * 4, oR = (base + xr) * 4, oG = (base + xg) * 4, oB = (base + xb) * 4;
        d[o] = s[oR]; d[o + 1] = s[oG + 1]; d[o + 2] = s[oB + 2]; d[o + 3] = Math.max(s[oR + 3], s[oG + 3], s[oB + 3]);
      }
    }
    ctxP.putImageData(dst, 0, 0);
  }

  // ---------------------------------------------------------------- visão do paciente (M16)
  // A imagem (cfg.imagem) ou os quadros de um vídeo (cfg.quadros) cobrem o fundo; dentro da máscara redonda ela é
  // redesenhada com o sintoma: 'catarata' (amarelada, apagada e embaçada), 'clarao' (as luzes estouram em halo e raios)
  // ou 'tunel' (a visão se fecha pelas beiradas). Tudo com filtros do próprio canvas, sem ler pixel a pixel.
  let IMGS = null, cvV = null, cvH = null, cvR = null;
  async function carregarImagens(cfg) {
    const urls = cfg.quadros
      ? Array.from({ length: cfg.quadros.n }, (_, i) => `${cfg.quadros.pasta}/q_${String(i + 1).padStart(4, '0')}.jpg`)
      : [cfg.imagem];
    IMGS = await Promise.all(urls.map(u => new Promise(ok => {
      const im = new Image(); im.onload = () => im.decode().then(() => ok(im), () => ok(im)); im.onerror = () => { console.warn('imagem não carregou: ' + u); ok(null); }; im.src = u;
    })));
    const novo = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
    cvV = novo(Math.round(L * DPR), Math.round(A * DPR));
    cvH = novo(L / 4, A / 4); cvR = novo(L / 4, A / 4);      // luzes e raios em um quarto da resolução (o borrão esconde)
  }
  function imagemEm(t) {
    if (!IMGS) return null;
    const fps = (CFG.quadros && CFG.quadros.fps) || 24;
    return IMGS[Math.min(IMGS.length - 1, Math.max(0, Math.floor(t * fps + 1e-6)))];
  }
  function cobrir(ctx, im, zoom, w, h) {      // a imagem cobre o quadro (como object-fit: cover), com o zoom lento
    const e = Math.max(w / im.width, h / im.height) * zoom, iw = im.width * e, ih = im.height * e;
    ctx.drawImage(im, (w - iw) / 2, (h - ih) / 2, iw, ih);
  }
  function visaoDoPaciente(im) {
    const v = S.visao, f = clamp(v.forca), c = cvV.getContext('2d');
    c.setTransform(DPR, 0, 0, DPR, 0, 0); c.globalCompositeOperation = 'source-over'; c.globalAlpha = 1; c.filter = 'none';
    if (v.efeito === 'catarata') {
      c.filter = `blur(${(1 + 6.5 * f).toFixed(2)}px) sepia(${(0.7 * f).toFixed(3)}) saturate(${(1 - 0.3 * f).toFixed(3)}) contrast(${(1 - 0.3 * f).toFixed(3)})`;
      cobrir(c, im, v.zoom, L, A); c.filter = 'none';
      c.globalCompositeOperation = 'multiply'; c.fillStyle = `rgba(255,222,150,${(0.85 * f).toFixed(3)})`; c.fillRect(0, 0, L, A);   // o branco vira bege
      c.globalCompositeOperation = 'screen'; c.fillStyle = `rgba(110,98,72,${(0.3 * f).toFixed(3)})`; c.fillRect(0, 0, L, A);       // véu leitoso
      c.globalCompositeOperation = 'source-over';
      return;
    }
    c.filter = v.efeito === 'clarao' ? `blur(${(0.5 + 3 * f).toFixed(2)}px) contrast(${(1 - 0.12 * f).toFixed(3)})` : 'none';
    cobrir(c, im, v.zoom, L, A); c.filter = 'none';
    if (v.efeito === 'clarao') {
      const h = cvH.getContext('2d'), r = cvR.getContext('2d'), w = cvH.width, hh = cvH.height;
      h.globalCompositeOperation = 'source-over'; h.filter = 'brightness(0.72) contrast(9) saturate(1.3)';   // só as luzes fortes ficam
      h.clearRect(0, 0, w, hh); cobrir(h, im, v.zoom, w, hh); h.filter = 'none';
      r.clearRect(0, 0, w, hh); r.globalCompositeOperation = 'lighter';
      r.globalAlpha = 0.95 * f; r.filter = 'blur(4px)'; r.drawImage(cvH, 0, 0);       // halo perto da luz
      r.globalAlpha = 0.8 * f; r.filter = 'blur(14px)'; r.drawImage(cvH, 0, 0);       // halo largo
      r.globalAlpha = 0.55 * f; r.filter = 'blur(30px)'; r.drawImage(cvH, 0, 0);       // clarão espalhado
      if (v.raios > 0.001) {                                                            // raios em estrela: a luz arrastada em seis direções
        r.filter = 'blur(0.6px)';
        for (const ang of [12, 72, 132]) {
          const dx = Math.cos(ang * Math.PI / 180), dy = Math.sin(ang * Math.PI / 180);
          for (let k = 1; k <= 16; k++) {
            r.globalAlpha = 0.16 * v.raios * (1 - k / 17);
            const d = k * 3.2 * v.raios;
            r.drawImage(cvH, dx * d, dy * d); r.drawImage(cvH, -dx * d, -dy * d);
          }
        }
      }
      r.filter = 'none'; r.globalAlpha = 1; r.globalCompositeOperation = 'source-over';
      c.globalCompositeOperation = 'lighter'; c.drawImage(cvR, 0, 0, L, A); c.globalCompositeOperation = 'source-over';
    } else if (v.efeito === 'tunel') {
      const g = c.createRadialGradient(L / 2, A * 0.45, lerp(A, 170, f) * 0.35, L / 2, A * 0.45, lerp(A, 170, f));
      g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(8,8,10,${(0.97 * f).toFixed(3)})`);
      c.fillStyle = g; c.fillRect(0, 0, L, A);
    }
  }
  function desenharVisao(ctx, t) {
    const im = imagemEm(t); if (!im) return;
    const v = S.visao;
    cobrir(ctx, im, v.zoom, L, A);
    if (v.abre <= 0.001) return;
    visaoDoPaciente(im);
    const R = v.abre * Math.hypot(Math.max(v.x, L - v.x), Math.max(v.y, A - v.y)) * 1.04;
    ctx.save(); ctx.beginPath(); ctx.arc(v.x, v.y, R, 0, Math.PI * 2); ctx.clip();
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(cvV, 0, 0); ctx.restore();
    if (v.abre < 0.999) {      // a borda da máscara no traço do visual (a "pupila" do paciente)
      ctx.save(); ctx.strokeStyle = V.cores.destaque; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(v.x, v.y, R, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = V.cores.traco; ctx.globalAlpha = 0.5; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(v.x, v.y, R + 14, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    }
  }

  function desenhar(t) {
    ctxF.setTransform(DPR, 0, 0, DPR, 0, 0); ctxF.clearRect(0, 0, L, A);
    V.fundo(ctxF, t, S);
    if (IMGS) desenharVisao(ctxF, t);
    ctxP.setTransform(DPR, 0, 0, DPR, 0, 0); ctxP.clearRect(0, 0, L, A);
    desenharPeca(ctxP);
    desenharParticulas(ctxP);
    if (V.pos) V.pos(ctxP, cvP, t, S, DPR, quadro);
    if (S.glitch.f > 0.01) glitch(S.glitch.f);
    const c = S.cam;
    cvP.style.transform = `translate3d(${c.x}px, ${c.y}px, ${c.z}px) rotateX(${c.rx}deg) rotateY(${c.ry}deg)`;
  }

  // ---------------------------------------------------------------- montagem
  async function carregarFontes(vis) {
    if (!vis.fontes || !vis.fontes.length) return;
    const link = document.createElement('link'); link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?' + vis.fontes.map(f => 'family=' + f).join('&') + '&display=block';
    document.head.appendChild(link);
    await new Promise(ok => { link.onload = ok; link.onerror = ok; setTimeout(ok, 8000); });
    await Promise.all((vis.carregar || []).map(f => document.fonts.load(f).catch(() => null)));
  }

  async function montar(cfg = {}) {
    const q = new URLSearchParams(location.search);
    // a língua da página (?lang=en ou es) troca os textos de exemplo e o jeito de escrever o número
    const lingua = cfg.lingua || q.get('lang') || 'pt', T = TEXTOS[lingua] || TEXTOS.pt;
    CFG = Object.assign({ palavra: T.palavra, valor: 4.9, prefixo: '', sufixo: '', pedido: T.pedido, passos: T.passos, arquivo: T.arquivo, local: T.local }, cfg);
    CFG.valor = Number(CFG.valor) || 0;
    CFG.casas = Math.min(2, (String(cfg.valor ?? '4.9').split(/[.,]/)[1] || '').length);
    let nv = +(cfg.visual ?? q.get('v') ?? 1), nm = +(cfg.movimento ?? q.get('m') ?? 0);
    if (!window.VISUAIS[nv]) { console.warn(`visual ${nv} não existe; usando o 1`); nv = 1; }      // endereço errado não quebra a página
    if (!window.MOVIMENTOS[nm]) { console.warn(`movimento ${nm} não existe; usando o 0`); nm = 0; }
    V = window.VISUAIS[nv]; M = window.MOVIMENTOS[nm];
    const render = /[?&]render=1/.test(location.search);
    document.title = `V${nv} ${V.nome} · M${nm} ${M.nome}`;

    const palco = document.getElementById('palco');
    palco.innerHTML = '<canvas id="fundo"></canvas><div id="plano"><canvas id="peca"></canvas></div>';
    cvF = document.getElementById('fundo'); cvP = document.getElementById('peca');
    // no render, a resolução cheia (e o --escala do gravar.mjs); no navegador, só os pixels que aparecem na tela
    const exibe = Math.min(innerWidth / L, innerHeight / A);
    DPR = render ? (window.devicePixelRatio || 1) : Math.min(1, Math.max(0.3, exibe * (window.devicePixelRatio || 1)));
    for (const c of [cvF, cvP]) { c.width = Math.round(L * DPR); c.height = Math.round(A * DPR); }
    ctxF = cvF.getContext('2d'); ctxP = cvP.getContext('2d', { willReadFrequently: true });
    if (!render) {   // no navegador: cabe na janela; no render a janela já tem 1080 × 1920
      const caber = () => { const e = Math.min(innerWidth / L, innerHeight / A); palco.style.transform = `translate(${(innerWidth - L * e) / 2}px, ${(innerHeight - A * e) / 2}px) scale(${e})`; };
      caber(); addEventListener('resize', caber);
    }

    await carregarFontes(V);
    if (V.preparar) await V.preparar(DPR, CFG);
    if (CFG.quadros || CFG.imagem) await carregarImagens(CFG);
    S = estadoInicial(CFG);
    prepararParticulas();

    const tl = gsap.timeline({ paused: true });
    const info = M.montar(tl, S, { rng, L, A, cartaoDoPedido: () => retCartao(ctxP, true) }) || {};
    const duracao = CFG.duracao || info.duracao || M.duracao || 4;   // duração maior que a do movimento segura o fim
    tl.set({}, {}, duracao);
    const passo = M.passo || 0;

    function irPara(t) {
      quadro = Math.round(t * 24);
      if (passo) {     // stop motion: o tempo anda aos saltos e cada salto treme um pouco
        const n = Math.floor(t * passo), r = rng(500 + n);
        tl.seek(n / passo, false);
        S.trem.x = (r() - 0.5) * 10; S.trem.y = (r() - 0.5) * 10; S.trem.rot = (r() - 0.5) * 2.4; S.semente = n; S.ferver = M.ferver || 3;
      } else tl.seek(t, false);
      S.t = t;
      desenhar(t);
    }
    window.cena = { irPara, duracao, fps: 24, pronto: true, eventos: M.eventos || [], estado: t => ({ t, visual: nv, movimento: nm }) };
    irPara(0);
    if (!render) {
      // "reduzir movimento" ligado no sistema: um quadro parado, já com a peça montada
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) { irPara(duracao * 0.8); return; }
      // a página de fora pode pausar a cena quando ela sai da tela: postMessage({ pausar: true }) / ({ pausar: false })
      let pausada = false, inicio = performance.now(), parouEm = 0;
      addEventListener('message', e => {
        if (!e.data || typeof e.data.pausar !== 'boolean' || e.data.pausar === pausada) return;
        pausada = e.data.pausar;
        if (pausada) parouEm = performance.now(); else inicio += performance.now() - parouEm;
      });
      (function laco() { if (!pausada && !document.hidden) irPara(((performance.now() - inicio) / 1000) % duracao); requestAnimationFrame(laco); })();
    }
  }

  window.Catalogo = { montar, novaForma, FORMAS, rng, ruido, suave, lerp, clamp, caminho, caminhoSuave, parcial, escalar, centro, formaPadrao, L, A };
})();
