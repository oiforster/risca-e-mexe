/* visuais.js — Risca & Mexe
   ==========================
   O que faz:
     Os VISUAIS do catálogo (eixo 1: como a imagem é desenhada). Cada visual desenha a mesma peça neutra
     do nucleo.js (ícone, número e palavra) do seu jeito, e por isso combina com qualquer movimento.
     Um visual é um objeto com:
       nome, fontes (Google Fonts), carregar (fontes a esperar), cores {destaque, traco},
       fonte(papel) → fonte CSS do 'numero' ou da 'palavra'; espaco(papel) → px entre letras,
       fundo(ctx, t) → o fundo (canvas de trás, não entra na câmera 3D),
       forma(ctx, pts, o) → ícone e enfeites; o = {traco, cheio, papel, cx, cy, r, i},
       texto(ctx, letra, o) → uma letra centrada em (0, 0); o = {papel, i, alto, largura},
       opcionais: preparar(dpr), grupo(ctx, S), placa(ctx, S, canvasDoFundo), pos(ctx, canvas, t, S, dpr, quadro).
     Para um visual novo, copiar o mais parecido, trocar cores e fontes e testar com os movimentos M2, M4 e M7.

   Última atualização: 2026-10-08 */
(function () {
  const W = 1080, H = 1920;
  const alvo = () => window.Catalogo;   // o núcleo carrega antes; as funções abaixo leem na hora

  function ruidoCanvas(lado, densidade, cor, seed) {   // textura de grão (papel, tinta)
    const c = document.createElement('canvas'); c.width = c.height = lado;
    const x = c.getContext('2d'), r = alvo().rng(seed), img = x.createImageData(lado, lado);
    for (let i = 0; i < lado * lado; i++) {
      if (r() < densidade) { img.data[i * 4] = cor[0]; img.data[i * 4 + 1] = cor[1]; img.data[i * 4 + 2] = cor[2]; img.data[i * 4 + 3] = 90 + r() * 165; }
    }
    x.putImageData(img, 0, 0); return c;
  }

  const V = {};

  // ---------------------------------------------------------------- V1 Flat (chapado)
  V[1] = {
    nome: 'Flat', fontes: ['Bricolage+Grotesque:wght@600;800'], carregar: ['800 100px "Bricolage Grotesque"', '600 100px "Bricolage Grotesque"'],
    cores: { destaque: '#2E86AB', traco: '#1D2A44', ponto: '#E4572E' },
    fonte: p => p === 'numero' ? '800 300px "Bricolage Grotesque"' : '600 56px "Bricolage Grotesque"',
    espaco: p => p === 'numero' ? -6 : 5,
    fundo(ctx, t) {
      ctx.fillStyle = '#F4EDE1'; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#2E86AB'; ctx.beginPath(); ctx.arc(W / 2 + 330, 400 + 10 * Math.sin(t * 1.6), 46, 0, Math.PI * 2); ctx.fill();
    },
    placa(ctx, S) {   // o círculo atrás do ícone anda com a peça (câmera 3D e profundidade incluídas)
      const ic = S.icone, k = 1 + S.par.z * 0.8;
      ctx.fillStyle = '#F6CFAE'; ctx.beginPath(); ctx.arc(ic.x - S.par.x * 0.8, ic.y - S.par.y * 0.8, 380 * k, 0, Math.PI * 2); ctx.fill();
    },
    forma(ctx, pts, o) { alvo().formaPadrao(ctx, pts, o, { fill: o.papel === 'decor' ? '#2E86AB' : '#E4572E', traco: '#1D2A44', lw: 8 }); },
    texto(ctx, c, o) { ctx.fillStyle = '#1D2A44'; ctx.fillText(c, 0, 0); },
  };

  // ---------------------------------------------------------------- V2 Traço (line art)
  V[2] = {
    nome: 'Traço', fontes: ['Fraunces:ital,wght@0,600;1,400'], carregar: ['600 100px Fraunces', 'italic 400 100px Fraunces'],
    cores: { destaque: '#C8553D', traco: '#1F2A44', ponto: '#1F2A44' },
    fonte: p => p === 'numero' ? '600 310px Fraunces' : 'italic 400 60px Fraunces',
    espaco: p => p === 'numero' ? 0 : 2,
    fundo(ctx, t) {
      ctx.fillStyle = '#FAF6EF'; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(31,42,68,.08)'; ctx.lineWidth = 2;
      for (let y = 120; y < H; y += 64) { ctx.beginPath(); ctx.moveTo(60, y); ctx.lineTo(W - 60, y); ctx.stroke(); }
      ctx.strokeStyle = '#C8553D'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(W / 2 + 300, 330, 34 + 3 * Math.sin(t * 2), 0, Math.PI * 2); ctx.stroke();
    },
    forma(ctx, pts, o) {
      const K = alvo();
      // por dentro: uma segunda linha e hachura leve, que aparecem com o "cheio"
      if (o.cheio > 0.001) {
        ctx.save(); ctx.globalAlpha *= o.cheio;
        K.caminho(ctx, K.escalar(pts, o.cx, o.cy, 0.84)); ctx.strokeStyle = o.papel === 'decor' ? '#C8553D' : '#1F2A44'; ctx.lineWidth = 2.5; ctx.stroke();
        K.caminho(ctx, pts); ctx.clip();
        ctx.strokeStyle = 'rgba(200,85,61,.55)'; ctx.lineWidth = 2;
        for (let d = -o.r * 2; d < o.r * 2; d += 20) { ctx.beginPath(); ctx.moveTo(o.cx + d - o.r, o.cy + o.r); ctx.lineTo(o.cx + d + o.r, o.cy - o.r); ctx.stroke(); }
        ctx.restore();
      }
      K.formaPadrao(ctx, pts, { ...o, cheio: 0 }, { fill: 'transparent', stroke: o.papel === 'decor' ? '#C8553D' : '#1F2A44', lw: 6 });
    },
    texto(ctx, c, o) {
      if (o.papel === 'numero') { ctx.lineWidth = 3.5; ctx.strokeStyle = '#1F2A44'; ctx.strokeText(c, 0, 0); }
      else { ctx.fillStyle = '#1F2A44'; ctx.fillText(c, 0, 0); }
    },
  };

  // ---------------------------------------------------------------- V3 Isométrico
  const ISO_PROF = 34;
  V[3] = {
    nome: 'Isométrico', fontes: ['Space+Grotesk:wght@700'], carregar: ['700 100px "Space Grotesk"'],
    cores: { destaque: '#FFB547', traco: '#1C2B4A', ponto: '#4C7DF0' },
    fonte: p => p === 'numero' ? '700 280px "Space Grotesk"' : '700 52px "Space Grotesk"',
    espaco: p => p === 'numero' ? 4 : 6,
    fundo(ctx, t) {
      ctx.fillStyle = '#EDF1F7'; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = '#D6DEEA'; ctx.lineWidth = 1.5; const tg = Math.tan(Math.PI / 6), passo = 70, desl = (t * 12) % passo;
      for (let k = -H; k < W + H; k += passo) {
        ctx.beginPath(); ctx.moveTo(k + desl, 0); ctx.lineTo(k + desl - H / tg, H); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(k - desl, 0); ctx.lineTo(k - desl + H / tg, H); ctx.stroke();
      }
    },
    grupo(ctx) { ctx.transform(0.866, 0.5, 0, 1, 0, 0); },   // a peça numa parede isométrica
    forma(ctx, pts, o) {
      const K = alvo(), decor = o.papel === 'decor';
      const face = decor ? '#FFB547' : '#4C7DF0', lado = decor ? '#C98419' : '#2A4BA6';
      if (o.cheio > 0.001) {
        ctx.save(); ctx.globalAlpha *= o.cheio; ctx.fillStyle = lado;
        for (let k = ISO_PROF; k > 0; k -= 2) { ctx.save(); ctx.translate(k, -k); K.caminho(ctx, pts); ctx.fill(); ctx.restore(); }
        K.caminho(ctx, pts); ctx.fillStyle = face; ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 3; ctx.stroke();
        ctx.restore();
      }
      K.formaPadrao(ctx, pts, { ...o, cheio: 0, contorno: 1 - o.cheio }, { fill: face, traco: '#1C2B4A', lw: 6 });
    },
    texto(ctx, c, o) {
      const prof = o.papel === 'numero' ? 26 : 8;
      ctx.fillStyle = '#0E1626';
      for (let k = prof; k > 0; k -= 1.5) ctx.fillText(c, k, -k);
      ctx.fillStyle = o.papel === 'numero' ? '#FFB547' : '#2A4BA6'; ctx.fillText(c, 0, 0);
    },
  };

  // ---------------------------------------------------------------- V4 Massinha (clay)
  V[4] = {
    nome: 'Massinha', fontes: ['Fredoka:wght@600;700'], carregar: ['700 100px Fredoka', '600 100px Fredoka'],
    cores: { destaque: '#5B8DEF', traco: '#7A3E2E', ponto: '#EC6248' },
    fonte: p => p === 'numero' ? '700 310px Fredoka' : '600 62px Fredoka',
    espaco: p => p === 'numero' ? 0 : 3,
    fundo(ctx, t) {
      const g = ctx.createRadialGradient(W / 2, 760, 100, W / 2, 900, 1300);
      g.addColorStop(0, '#FBE6D8'); g.addColorStop(1, '#E9BFA6'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    },
    forma(ctx, pts, o) {
      const K = alvo(), decor = o.papel === 'decor';
      const mole = pts.map((p, i) => [p[0] + K.suave(i, o.i * 3.7, pts.length) * o.r * 0.035, p[1] + K.suave(i + 40, o.i * 2.3, pts.length) * o.r * 0.035]);
      const cores = decor ? ['#A9C8FF', '#5B8DEF', '#3459B8'] : ['#FFB09C', '#EC6248', '#B13E2C'];
      K.formaPadrao(ctx, mole, o, {
        suave: true, traco: '#7A3E2E', lw: 9,
        sombra: { shadowColor: 'rgba(120,55,35,.35)', shadowBlur: 40, shadowOffsetY: 26 },
        fill: (c) => { const g = c.createRadialGradient(o.cx - o.r * .35, o.cy - o.r * .45, o.r * .05, o.cx, o.cy, o.r * 1.35); g.addColorStop(0, cores[0]); g.addColorStop(.55, cores[1]); g.addColorStop(1, cores[2]); return g; },
        depois(c) {   // brilho de massinha e marquinhas de dedo
          c.save(); c.globalAlpha *= o.cheio; K.caminhoSuave(c, mole); c.clip();
          c.filter = 'blur(10px)'; c.fillStyle = 'rgba(255,255,255,.5)';
          c.beginPath(); c.ellipse(o.cx - o.r * .32, o.cy - o.r * .45, o.r * .34, o.r * .17, -0.5, 0, Math.PI * 2); c.fill();
          c.filter = 'none'; c.strokeStyle = 'rgba(90,30,20,.07)'; c.lineWidth = 3;
          for (let k = 0; k < 4; k++) { c.beginPath(); c.arc(o.cx + o.r * (0.25 + 0.05 * k), o.cy + o.r * .25, o.r * (0.12 + 0.05 * k), 3.6, 5.2); c.stroke(); }
          c.restore();
        },
      });
    },
    texto(ctx, c, o) {
      const g = ctx.createLinearGradient(0, -o.alto / 2, 0, o.alto / 2);
      if (o.papel === 'numero') { g.addColorStop(0, '#8DB6FF'); g.addColorStop(1, '#3459B8'); } else { g.addColorStop(0, '#9A5A45'); g.addColorStop(1, '#6B3426'); }
      ctx.save(); ctx.shadowColor = 'rgba(120,55,35,.35)'; ctx.shadowBlur = o.papel === 'numero' ? 30 : 10; ctx.shadowOffsetY = o.papel === 'numero' ? 18 : 6;
      ctx.fillStyle = g; ctx.fillText(c, 0, 0); ctx.restore();
      if (o.papel === 'numero') { ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.font = ctx.font.replace('310px', '296px'); ctx.fillText(c, -6, -12); }
    },
  };

  // ---------------------------------------------------------------- V5 Recorte e colagem
  const PAPEIS = ['#F4EFE6', '#151515', '#E8C547', '#D8432A', '#2F5DA8', '#F4EFE6'];
  const FONTES_RECORTE = ['Anton', '"Archivo Black"', 'Fraunces', '"Courier Prime"', '"Bricolage Grotesque"'];
  V[5] = {
    nome: 'Recorte e colagem', fontes: ['Anton', 'Archivo+Black', 'Fraunces:wght@900', 'Courier+Prime:wght@700', 'Bricolage+Grotesque:wght@800'],
    carregar: ['100px Anton', '100px "Archivo Black"', '900 100px Fraunces', '700 100px "Courier Prime"', '800 100px "Bricolage Grotesque"'],
    cores: { destaque: '#D8432A', traco: '#151515', ponto: '#151515' },
    fonte: p => p === 'numero' ? '260px Anton' : '60px Anton',
    espaco: p => p === 'numero' ? 34 : 14,
    preparar() { this.textura = ruidoCanvas(256, 0.35, [90, 60, 30], 3); this.fibra = ruidoCanvas(256, 0.25, [255, 255, 255], 9); },
    fundo(ctx, t) {
      ctx.fillStyle = '#C9A37C'; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = ctx.createPattern(this.textura, 'repeat'); ctx.globalAlpha = .35; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1;
      // retalhos de jornal parados nos cantos
      ctx.save(); ctx.translate(120, 210); ctx.rotate(-0.18); ctx.fillStyle = '#EDE6D6'; ctx.fillRect(-140, -70, 300, 150);
      ctx.fillStyle = 'rgba(0,0,0,.25)'; for (let y = -50; y < 70; y += 14) ctx.fillRect(-120, y, 250 - (y % 3) * 20, 5); ctx.restore();
      ctx.save(); ctx.translate(W - 110, H - 330); ctx.rotate(0.22); ctx.fillStyle = '#2F5DA8'; ctx.fillRect(-120, -90, 240, 180); ctx.restore();
    },
    forma(ctx, pts, o) {
      const K = alvo(), decor = o.papel === 'decor';
      const rasgo = (lista, s, amp) => lista.map((p, i) => { const dx = p[0] - o.cx, dy = p[1] - o.cy, d = Math.hypot(dx, dy) || 1, n = K.ruido(i, s) * amp; return [p[0] + dx / d * n, p[1] + dy / d * n]; });
      const ang = K.ruido(o.i, 5) * 0.06, gira = lista => lista.map(([x, y]) => [o.cx + (x - o.cx) * Math.cos(ang) - (y - o.cy) * Math.sin(ang), o.cy + (x - o.cx) * Math.sin(ang) + (y - o.cy) * Math.cos(ang)]);
      const borda = gira(rasgo(K.escalar(pts, o.cx, o.cy, 1 + 16 / Math.max(o.r, 1)), o.i + 1, 4));
      const miolo = gira(rasgo(pts, o.i + 2, 2.5));
      if (o.cheio > 0.001) {
        ctx.save(); ctx.globalAlpha *= o.cheio;
        ctx.shadowColor = 'rgba(40,20,5,.4)'; ctx.shadowBlur = 16; ctx.shadowOffsetX = 7; ctx.shadowOffsetY = 12;
        K.caminho(ctx, borda); ctx.fillStyle = '#F7F2E8'; ctx.fill(); ctx.shadowColor = 'transparent';
        K.caminho(ctx, miolo); ctx.fillStyle = decor ? '#2F5DA8' : '#D8432A'; ctx.fill();
        ctx.save(); ctx.clip(); ctx.globalAlpha *= .5; ctx.fillStyle = ctx.createPattern(this.fibra, 'repeat'); ctx.fillRect(o.cx - o.r * 1.3, o.cy - o.r * 1.3, o.r * 2.6, o.r * 2.6); ctx.restore();
        if (!decor) {   // fita adesiva no alto
          ctx.save(); ctx.translate(o.cx + o.r * .1, o.cy - o.r * .95); ctx.rotate(-0.14); ctx.fillStyle = 'rgba(242,232,200,.78)'; ctx.fillRect(-o.r * .38, -o.r * .09, o.r * .76, o.r * .18); ctx.restore();
        }
        ctx.restore();
      }
      K.formaPadrao(ctx, miolo, { ...o, cheio: 0, contorno: 1 - o.cheio }, { fill: '#D8432A', traco: '#151515', lw: 6 });
    },
    texto(ctx, c, o) {   // cada letra recortada de um papel diferente, como bilhete de revista
      const r = alvo().rng((o.papel === 'numero' ? 100 : 300) + o.i * 7);
      const papel = PAPEIS[Math.floor(r() * PAPEIS.length)], fonte = FONTES_RECORTE[Math.floor(r() * FONTES_RECORTE.length)];
      const tam = o.papel === 'numero' ? 250 : 58, rot = (r() - 0.5) * 0.22;
      ctx.rotate(rot);
      ctx.font = `${fonte.includes('Fraunces') ? '900 ' : fonte.includes('Courier') ? '700 ' : fonte.includes('Bricolage') ? '800 ' : ''}${tam}px ${fonte}`;
      const w = ctx.measureText(c).width;
      ctx.save(); ctx.shadowColor = 'rgba(40,20,5,.35)'; ctx.shadowBlur = 10; ctx.shadowOffsetX = 4; ctx.shadowOffsetY = 7;
      ctx.fillStyle = papel; ctx.fillRect(-w / 2 - tam * .12, -tam * .55, w + tam * .24, tam * 1.1); ctx.restore();
      ctx.fillStyle = (papel === '#151515' || papel === '#2F5DA8' || papel === '#D8432A') ? '#F4EFE6' : '#151515';
      ctx.fillText(c, 0, tam * .04);
    },
  };

  // ---------------------------------------------------------------- V6 Risografia (duas tintas)
  const ROSA = '#FF48B0', AZUL = '#0078BF';
  V[6] = {
    nome: 'Risografia', fontes: ['Archivo+Black'], carregar: ['100px "Archivo Black"'],
    cores: { destaque: ROSA, traco: AZUL, ponto: AZUL },
    fonte: p => p === 'numero' ? '290px "Archivo Black"' : '56px "Archivo Black"',
    espaco: p => p === 'numero' ? -4 : 6,
    preparar(dpr) { this.manchas = ruidoCanvas(512, 0.18, [0, 0, 0], 21); this.papel = ruidoCanvas(256, 0.08, [180, 160, 130], 4); },
    fundo(ctx) {
      ctx.fillStyle = '#F4EEE3'; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = ctx.createPattern(this.papel, 'repeat'); ctx.globalAlpha = .5; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1;
    },
    forma(ctx, pts, o) {
      const K = alvo();
      if (o.cheio > 0.001) {
        ctx.save(); ctx.globalAlpha *= o.cheio; ctx.globalCompositeOperation = 'multiply';
        // tinta azul em retícula, fora de registro
        ctx.save(); ctx.translate(12, 8); K.caminho(ctx, pts); ctx.clip(); ctx.fillStyle = AZUL;
        for (let y = o.cy - o.r * 1.2; y < o.cy + o.r * 1.2; y += 13) for (let x = o.cx - o.r * 1.2 + ((y / 13) % 2) * 6.5; x < o.cx + o.r * 1.2; x += 13) { ctx.beginPath(); ctx.arc(x, y, 4.6, 0, Math.PI * 2); ctx.fill(); }
        ctx.restore();
        K.caminho(ctx, pts); ctx.fillStyle = o.papel === 'decor' ? AZUL : ROSA; ctx.fill();
        ctx.restore();
      }
      K.formaPadrao(ctx, pts, { ...o, cheio: 0, contorno: 1 - o.cheio }, { fill: ROSA, traco: AZUL, lw: 7 });
    },
    texto(ctx, c, o) {
      ctx.globalCompositeOperation = 'multiply';
      if (o.papel === 'numero') { ctx.fillStyle = ROSA; ctx.fillText(c, -9, 6); }
      ctx.fillStyle = AZUL; ctx.fillText(c, 0, 0);
    },
    pos(ctx, cv, t, S, dpr, quadro) {   // falhas de tinta que mudam de lugar (a impressão "vive")
      ctx.save(); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.globalCompositeOperation = 'destination-out'; ctx.globalAlpha = .55;
      const n = Math.floor(quadro / 3), r = alvo().rng(n + 77);
      ctx.translate(-r() * 512, -r() * 512); ctx.fillStyle = ctx.createPattern(this.manchas, 'repeat'); ctx.fillRect(0, 0, W + 512, H + 512);
      ctx.restore();
    },
  };

  // ---------------------------------------------------------------- V7 Vidro fosco
  V[7] = {
    nome: 'Vidro fosco', fontes: ['Manrope:wght@600;800'], carregar: ['800 100px Manrope', '600 100px Manrope'],
    cores: { destaque: '#7B5CFF', traco: '#FFFFFF', ponto: '#FFFFFF' },
    fonte: p => p === 'numero' ? '800 290px Manrope' : '600 52px Manrope',
    espaco: p => p === 'numero' ? -8 : 9,
    fundo(ctx, t) {
      ctx.fillStyle = '#12162E'; ctx.fillRect(0, 0, W, H);
      const bolhas = [['#7B5CFF', 300, 620, 420, 0], ['#00C2FF', 820, 1080, 460, 2], ['#FF5FA2', 420, 1420, 380, 4]];
      for (const [cor, x, y, r, f] of bolhas) {
        const bx = x + Math.cos(t * 0.9 + f) * 90, by = y + Math.sin(t * 0.7 + f) * 110;
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, r); g.addColorStop(0, cor); g.addColorStop(1, 'rgba(18,22,46,0)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      }
    },
    placa(ctx, S, fundo, ret) {   // o vidro: o fundo desfocado por trás, borda clara e brilho no alto
      const { x, y, w, h, r } = ret;
      ctx.save();
      ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.clip();
      const m = ctx.getTransform(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'blur(38px)'; ctx.drawImage(fundo, 0, 0); ctx.filter = 'none'; ctx.setTransform(m);
      ctx.fillStyle = 'rgba(255,255,255,.10)'; ctx.fillRect(x, y, w, h);
      const g = ctx.createLinearGradient(0, y, 0, y + h * .5); g.addColorStop(0, 'rgba(255,255,255,.20)'); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
      ctx.restore();
      ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.strokeStyle = 'rgba(255,255,255,.38)'; ctx.lineWidth = 2; ctx.stroke();
    },
    forma(ctx, pts, o) {
      alvo().formaPadrao(ctx, pts, o, {
        traco: '#FFFFFF', lw: 6, sombra: { shadowColor: 'rgba(255,255,255,.45)', shadowBlur: 40 },
        fill: c => { const g = c.createLinearGradient(o.cx, o.cy - o.r, o.cx, o.cy + o.r); g.addColorStop(0, o.papel === 'decor' ? 'rgba(255,255,255,.55)' : '#FFFFFF'); g.addColorStop(1, o.papel === 'decor' ? 'rgba(255,255,255,.15)' : 'rgba(255,255,255,.62)'); return g; },
      });
    },
    texto(ctx, c, o) { ctx.fillStyle = o.papel === 'numero' ? '#FFFFFF' : 'rgba(255,255,255,.8)'; ctx.fillText(c, 0, 0); },
  };

  // ---------------------------------------------------------------- V8 ASCII (feito de letras)
  const RAMPA = ' .:-=+*%#@';
  V[8] = {
    nome: 'ASCII', fontes: ['Bricolage+Grotesque:wght@800', 'JetBrains+Mono:wght@700'], carregar: ['800 100px "Bricolage Grotesque"', '700 20px "JetBrains Mono"'],
    cores: { destaque: '#3BFF8A', traco: '#FFB000', ponto: '#FFB000' },
    fonte: p => p === 'numero' ? '800 330px "Bricolage Grotesque"' : '800 96px "Bricolage Grotesque"',
    espaco: p => p === 'numero' ? -6 : 0,
    fundo(ctx, t) {
      ctx.fillStyle = '#060906'; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(59,255,138,.035)'; for (let y = 0; y < H; y += 4) ctx.fillRect(0, y, W, 1.5);
      const g = ctx.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1200); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.6)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    },
    forma(ctx, pts, o) { alvo().formaPadrao(ctx, pts, o, { fill: o.papel === 'decor' ? '#3BFF8A' : '#FFB000', traco: '#FFB000', lw: 14 }); },
    texto(ctx, c) { ctx.fillStyle = '#3BFF8A'; ctx.fillText(c, 0, 0); },
    pos(ctx, cv, t, S, dpr, quadro) {   // o desenho vira uma grade de caracteres, pela claridade de cada célula
      const cw = 10, ch = 16, w = cv.width, h = cv.height, dados = ctx.getImageData(0, 0, w, h).data, r = alvo().rng(quadro + 3);
      ctx.save(); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      ctx.font = '700 15px "JetBrains Mono"'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      let cor = null;
      for (let y = 0; y < H; y += ch) for (let x = 0; x < W; x += cw) {
        let a = 0, rr = 0, gg = 0;
        for (const [ox, oy] of [[.5, .5], [.2, .25], [.8, .25], [.2, .75], [.8, .75]]) {
          const px = Math.min(w - 1, Math.floor((x + cw * ox) * dpr)), py = Math.min(h - 1, Math.floor((y + ch * oy) * dpr)), o = (py * w + px) * 4;
          a += dados[o + 3]; rr += dados[o] * dados[o + 3]; gg += dados[o + 1] * dados[o + 3];
        }
        if (a < 60) continue;
        const v = a / (255 * 5); let idx = Math.max(1, Math.round(v * (RAMPA.length - 1)));
        if (r() < 0.03) idx = 1 + Math.floor(r() * (RAMPA.length - 1));
        const ambar = rr / a > 200 && gg / a < 200;
        const novo = ambar ? '#FFB000' : '#3BFF8A';
        if (novo !== cor) { cor = novo; ctx.fillStyle = cor; }
        ctx.globalAlpha = 0.45 + 0.55 * v;
        ctx.fillText(RAMPA[idx], x + cw / 2, y + ch / 2);
      }
      ctx.restore();
    },
  };

  // ---------------------------------------------------------------- V9 Pontilhismo
  const MARINHO = '#0F1B2D', PAPEL = '#F3EDE2', DOURADO = '#C9A24C';
  V[9] = {
    nome: 'Pontilhismo', fontes: ['Fraunces:wght@600', 'Manrope:wght@700'], carregar: ['600 100px Fraunces', '700 100px Manrope'],
    cores: { destaque: DOURADO, traco: DOURADO, ponto: PAPEL },
    fonte: p => p === 'numero' ? '600 330px Fraunces' : '700 56px Manrope',
    espaco: p => p === 'numero' ? 0 : 8,
    preparar() {   // os pontos possíveis: uma grade com sorteio, fixa (os grãos não pulam de lugar)
      const r = alvo().rng(42), g = 5.2; this.pontos = [];
      for (let y = 0; y < H; y += g) for (let x = 0; x < W; x += g) this.pontos.push([x + r() * g, y + r() * g, r()]);
      this.poeira = Array.from({ length: 140 }, () => [r() * W, r() * H, 0.6 + r() * 1.6, r() * 6.28]);
    },
    fundo(ctx, t) {
      ctx.fillStyle = MARINHO; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(243,237,226,.22)';
      for (const [x, y, r, f] of this.poeira) { ctx.beginPath(); ctx.arc((x + t * 14 + Math.sin(t + f) * 20) % W, (y - t * 22 + H) % H, r, 0, Math.PI * 2); ctx.fill(); }
    },
    forma(ctx, pts, o) {   // tom no desenho de origem: o tamanho dos grãos segue a luz
      alvo().formaPadrao(ctx, pts, o, {
        traco: DOURADO, lw: 12,
        fill: c => { const g = c.createRadialGradient(o.cx - o.r * .3, o.cy - o.r * .35, o.r * .1, o.cx, o.cy, o.r * 1.2); g.addColorStop(0, '#F3DCA0'); g.addColorStop(.6, DOURADO); g.addColorStop(1, 'rgba(201,162,76,.45)'); return g; },
      });
    },
    texto(ctx, c, o) { ctx.fillStyle = o.papel === 'numero' ? PAPEL : 'rgba(243,237,226,.85)'; ctx.fillText(c, 0, 0); },
    pos(ctx, cv, t) {
      const w = cv.width, h = cv.height, dpr = w / W, dados = ctx.getImageData(0, 0, w, h).data;
      ctx.save(); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      const ouro = new Path2D(), papel = new Path2D();
      for (let i = 0; i < this.pontos.length; i++) {
        const [x, y, s] = this.pontos[i], o = (Math.floor(y * dpr) * w + Math.floor(x * dpr)) * 4, a = dados[o + 3];
        if (a < 18) continue;
        const lum = (dados[o] + dados[o + 1] + dados[o + 2]) / 765, raio = (0.5 + 2.1 * (a / 255) * (0.35 + 0.65 * lum)) * (0.7 + 0.5 * s);
        const jx = Math.sin(t * 2.1 + i) * 0.7, jy = Math.cos(t * 1.7 + i * 1.3) * 0.7;
        const alvoP = dados[o + 2] > 170 ? papel : ouro;
        alvoP.moveTo(x + jx + raio, y + jy); alvoP.arc(x + jx, y + jy, raio, 0, Math.PI * 2);
      }
      ctx.fillStyle = DOURADO; ctx.fill(ouro); ctx.fillStyle = PAPEL; ctx.fill(papel);
      ctx.restore();
    },
  };

  // ---------------------------------------------------------------- V10 e V11 Cartão de interface (a caixa da ferramenta, grande e centrada)
  function cartaoUI(cor, borda, ponto, sombra) {
    return function (ctx, S, fundo, ret) {
      const { x, y, w, h, r } = ret;
      ctx.save(); ctx.shadowColor = sombra; ctx.shadowBlur = 90; ctx.shadowOffsetY = 40;
      ctx.fillStyle = cor; ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill(); ctx.restore();
      ctx.strokeStyle = borda; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.stroke();
      ctx.fillStyle = ponto; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(x + 52 + k * 34, y + 46, 10, 0, Math.PI * 2); ctx.fill(); }
      ctx.fillStyle = borda; ctx.fillRect(x, y + 88, w, 2);
    };
  }
  const UI = {
    fontes: ['DM+Sans:opsz,wght@9..40,500;9..40,700'], carregar: ['700 100px "DM Sans"', '500 100px "DM Sans"'],
    fonte: p => p === 'numero' ? '700 280px "DM Sans"' : p === 'pedido' ? '500 58px "DM Sans"' : '700 48px "DM Sans"',
    espaco: p => p === 'numero' ? -8 : p === 'palavra' ? 6 : 0,
    cartao: { y: -40, w: 900, h: 1240, r: 48 },
  };
  V[10] = Object.assign({}, UI, {
    nome: 'Cartão de interface', cores: { destaque: '#3D6BFF', traco: '#1B1F2A', ponto: '#1B1F2A' },
    fundo(ctx, t) {
      const g = ctx.createRadialGradient(W / 2, 820, 80, W / 2, 960, 1250); g.addColorStop(0, '#F4F6FA'); g.addColorStop(1, '#DCE1EA');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    },
    placa: cartaoUI('#FFFFFF', '#E1E5EC', '#E1E5EC', 'rgba(25,35,70,.20)'),
    forma(ctx, pts, o) { alvo().formaPadrao(ctx, pts, o, { fill: o.papel === 'decor' ? '#C9D4FF' : '#3D6BFF', traco: '#1B1F2A', lw: 7 }); },
    texto(ctx, c, o) { ctx.fillStyle = o.papel === 'palavra' ? '#6A7182' : '#1B1F2A'; ctx.fillText(c, 0, 0); },
  });
  V[11] = Object.assign({}, UI, {
    nome: 'Cartão sobre o resultado', cores: { destaque: '#7AA2FF', traco: '#FFFFFF', ponto: '#FFFFFF' },
    preparar(dpr, cfg) {   // o fundo é o próprio resultado, borrado e escuro (cfg.resultado = a imagem que a ferramenta gerou)
      return new Promise(ok => { const im = new Image(); im.onload = () => { this.imagem = im; ok(); }; im.onerror = () => ok(); im.src = (cfg && cfg.resultado) || 'resultado.jpg'; });
    },
    fundo(ctx, t) {
      ctx.fillStyle = '#0B0C10'; ctx.fillRect(0, 0, W, H);
      if (this.imagem) {
        const im = this.imagem, e = Math.max(W / im.width, H / im.height) * (1.08 + t * 0.012);
        ctx.save(); ctx.filter = 'blur(26px) brightness(0.42) saturate(1.2)';
        ctx.drawImage(im, W / 2 - im.width * e / 2, H / 2 - im.height * e / 2, im.width * e, im.height * e); ctx.restore();
      }
      const g = ctx.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1250); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.55)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    },
    placa: cartaoUI('rgba(22,23,28,.92)', 'rgba(255,255,255,.10)', 'rgba(255,255,255,.18)', 'rgba(0,0,0,.5)'),
    forma(ctx, pts, o) { alvo().formaPadrao(ctx, pts, o, { fill: o.papel === 'decor' ? '#5A6478' : '#F4F4F6', traco: '#FFFFFF', lw: 7 }); },
    texto(ctx, c, o) { ctx.fillStyle = o.papel === 'palavra' ? 'rgba(255,255,255,.62)' : '#FFFFFF'; ctx.fillText(c, 0, 0); },
  });

  window.VISUAIS = V;
})();
