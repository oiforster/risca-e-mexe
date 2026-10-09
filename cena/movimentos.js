/* movimentos.js — Risca & Mexe
   =============================
   O que faz:
     Os MOVIMENTOS do catálogo (eixo 2: como a imagem se mexe). Cada movimento monta uma linha do tempo
     do GSAP sobre o estado S da peça (nucleo.js) e não sabe nada de cor, fonte ou textura: por isso
     combina com qualquer visual.
     Um movimento é um objeto com: nome, duracao (s), eventos (os gestos da cena, para quem quiser
     pôr som depois), montar(tl, S, util) e, opcionais, passo (quadros por segundo do stop
     motion) e ferver (px de tremor do contorno).
     O que o estado oferece: S.grupo, S.icone (s, rot, m = forma da sequência estrela → coração → círculo
     → estrela, traco, cheio), S.numero (valor, letras), S.palavra (letras), S.decor, S.mascara.p,
     S.cortina.n/w, S.escrita.n/w, S.part.p, S.glitch.f, S.cam (câmera 3D) e S.par (profundidade).
     Valores de partida: Object.assign no estado antes dos tl.to (o GSAP grava o início na primeira passada).
     Ritmo do catálogo: movimentos de 0,4 a 0,6 s, nada parado mais de 1,5 s.

   Última atualização: 2026-10-08 */
(function () {
  const ini = (o, v) => Object.assign(o, v);
  const M = {};

  // a entrada simples: é o movimento "neutro" dos vídeos de cada visual
  function entrada(tl, S, t0 = 0.1) {
    ini(S.icone, { s: 0, rot: -25 });
    tl.to(S.icone, { s: 1, rot: 0, duration: 0.55, ease: 'back.out(1.8)' }, t0);
    const alvo = S.numero.valor;   // o número pedido no montar
    ini(S.numero, { a: 0, valor: 0 });
    tl.to(S.numero, { a: 1, duration: 0.2 }, t0 + 0.25).to(S.numero, { valor: alvo, duration: 1.1, ease: 'power2.out' }, t0 + 0.25);
    S.palavra.letras.forEach(l => ini(l, { a: 0, y: 40 }));
    tl.to(S.palavra.letras, { a: 1, y: 0, duration: 0.35, ease: 'power3.out', stagger: 0.025 }, t0 + 0.7);
  }

  M[0] = {
    nome: 'Entrada simples', duracao: 4,
    eventos: [['salta', 0.1], ['texto', 0.8], ['cartao', 2.5]],
    montar(tl, S) {
      entrada(tl, S);
      ini(S.grupo, { s: 0.94 }); tl.to(S.grupo, { s: 1.03, duration: 4, ease: 'none' }, 0);
      tl.to(S.icone, { s: 1.1, duration: 0.18, ease: 'power2.out' }, 2.5).to(S.icone, { s: 1, duration: 0.4, ease: 'back.out(3)' }, 2.68);
      tl.to(S.icone, { rot: 8, duration: 1.3, ease: 'sine.inOut' }, 2.7);
    },
  };

  M[1] = {
    nome: 'Tipografia cinética', duracao: 4,
    eventos: [['texto', 0.05], ['texto', 0.25], ['texto', 0.45], ['varredura', 1.45, 1.95], ['texto', 1.6], ['salta', 2.15], ['passo', 3.0]],
    montar(tl, S, { rng }) {
      const r = rng(5);
      ini(S.icone, { s: 0 });
      ini(S.numero, { s: 2.0, y: -120 });
      S.numero.letras.forEach((l, i) => ini(l, { y: -1100, rot: (i % 2 ? 1 : -1) * 50, a: 1 }));
      tl.to(S.numero.letras, { y: 0, rot: 0, duration: 0.5, ease: 'back.out(1.6)', stagger: 0.2 }, 0.05);
      tl.to(S.numero, { s: 2.25, duration: 0.12, ease: 'power2.out' }, 0.95).to(S.numero, { s: 2.0, duration: 0.3, ease: 'back.out(3)' }, 1.07);
      tl.to(S.numero, { s: 1, y: 200, duration: 0.5, ease: 'power4.inOut' }, 1.45);
      S.palavra.letras.forEach(l => ini(l, { x: (r() - 0.5) * 1300, y: (r() - 0.5) * 1500, rot: (r() - 0.5) * 360, s: 0.3 + r() * 1.8, a: 0 }));
      tl.to(S.palavra.letras, { x: 0, y: 0, rot: 0, s: 1, a: 1, duration: 0.55, ease: 'back.out(1.3)', stagger: { each: 0.025, from: 'random' } }, 1.6);
      ini(S.icone, { rot: -90 });
      tl.to(S.icone, { s: 1, rot: 0, duration: 0.5, ease: 'back.out(2)' }, 2.15);
      tl.to(S.palavra.letras, { y: -34, duration: 0.18, ease: 'sine.out', yoyo: true, repeat: 1, stagger: 0.03 }, 3.0);
      tl.to(S.numero.letras, { s: 1.15, duration: 0.15, yoyo: true, repeat: 1, stagger: 0.08 }, 3.35);
      ini(S.grupo, { s: 0.97 }); tl.to(S.grupo, { s: 1.02, duration: 4, ease: 'none' }, 0);
    },
  };

  M[2] = {
    nome: 'Partículas', duracao: 4,
    eventos: [['brilho', 0.1, 1.8], ['cartao', 2.2], ['varredura', 2.9, 3.9]],
    montar(tl, S) {
      ini(S.part, { p: 1 });
      tl.to(S.part, { p: 0, duration: 1.7, ease: 'power3.inOut' }, 0.1);
      tl.to(S.icone, { s: 1.08, duration: 0.18, ease: 'power2.out' }, 2.2).to(S.icone, { s: 1, duration: 0.4, ease: 'back.out(3)' }, 2.38);
      tl.to(S.part, { p: 1, duration: 1.1, ease: 'power2.in' }, 2.9);
      ini(S.grupo, { s: 0.96 }); tl.to(S.grupo, { s: 1.03, duration: 4, ease: 'none' }, 0);
    },
  };

  M[3] = {
    nome: 'Morph', duracao: 4,
    eventos: [['salta', 0.1], ['cartao', 0.9], ['cartao', 1.9], ['cartao', 2.9]],
    montar(tl, S) {
      entrada(tl, S);
      [0.9, 1.9, 2.9].forEach((t, k) => {
        tl.to(S.icone, { m: k + 1, duration: 0.6, ease: 'back.inOut(1.4)' }, t);
        tl.to(S.icone, { rot: (k % 2 ? -1 : 1) * 14, duration: 0.3, ease: 'power2.out', yoyo: true, repeat: 1 }, t);
      });
      ini(S.grupo, { s: 0.96 }); tl.to(S.grupo, { s: 1.03, duration: 4, ease: 'none' }, 0);
    },
  };

  M[4] = {
    nome: 'Desenho em traço', duracao: 4,
    eventos: [['colchete', 0.1], ['cartao', 1.3], ['texto', 1.35], ['texto', 1.9]],
    montar(tl, S) {
      ini(S.icone, { traco: 0, cheio: 0 });
      tl.to(S.icone, { traco: 1, duration: 1.2, ease: 'power1.inOut' }, 0.1);
      tl.to(S.icone, { cheio: 1, duration: 0.4, ease: 'power2.out' }, 1.25);
      ini(S.escrita, { n: 0, w: 0 });
      tl.to(S.escrita, { n: 1, duration: 0.6, ease: 'power1.inOut' }, 1.35);
      tl.to(S.escrita, { w: 1, duration: 0.8, ease: 'power1.inOut' }, 1.9);
      tl.to(S.icone, { s: 1.07, duration: 0.2, ease: 'power2.out' }, 3.0).to(S.icone, { s: 1, duration: 0.4, ease: 'back.out(3)' }, 3.2);
      ini(S.grupo, { s: 0.97 }); tl.to(S.grupo, { s: 1.02, duration: 4, ease: 'none' }, 0);
    },
  };

  M[5] = {
    nome: 'Revelação por máscara', duracao: 4,
    eventos: [['mergulho', 0.1, 0.8], ['varredura', 0.6, 1.35], ['varredura', 0.85, 1.6], ['recuo', 2.7, 3.05], ['cartao', 3.1]],
    montar(tl, S) {
      ini(S.mascara, { p: 0 });
      tl.to(S.mascara, { p: 1, duration: 0.7, ease: 'power3.inOut' }, 0.1);
      ini(S.cortina, { n: 0, w: 0 });
      tl.to(S.cortina, { n: 1, duration: 0.35, ease: 'power2.inOut' }, 0.6).to(S.cortina, { n: 2, duration: 0.4, ease: 'power2.inOut' }, 0.95);
      tl.to(S.cortina, { w: 1, duration: 0.35, ease: 'power2.inOut' }, 0.85).to(S.cortina, { w: 2, duration: 0.4, ease: 'power2.inOut' }, 1.2);
      tl.to(S.mascara, { p: 0, duration: 0.35, ease: 'power3.in' }, 2.7);
      tl.set(S.icone, { m: 1 }, 3.06);
      tl.to(S.mascara, { p: 1, duration: 0.55, ease: 'power3.out' }, 3.1);
      ini(S.grupo, { s: 0.97 }); tl.to(S.grupo, { s: 1.02, duration: 4, ease: 'none' }, 0);
    },
  };

  M[6] = {
    nome: 'Camadas em profundidade', duracao: 4,
    eventos: [['entrada', 0, 0.6], ['salta', 0.3], ['texto', 0.6]],
    montar(tl, S) {
      S.decor.forEach(d => ini(d, { a: 0 }));
      tl.to(S.decor, { a: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out' }, 0);
      ini(S.icone, { s: 0.6, a: 0 }); tl.to(S.icone, { s: 1, a: 1, duration: 0.55, ease: 'back.out(1.6)' }, 0.3);
      ini(S.numero, { a: 0 }); tl.to(S.numero, { a: 1, duration: 0.4 }, 0.6);
      ini(S.palavra, { a: 0 }); tl.to(S.palavra, { a: 1, duration: 0.4 }, 0.75);
      ini(S.par, { x: -170, y: 90, z: -0.05 });
      tl.to(S.par, { x: 170, y: -90, z: 0.2, duration: 4, ease: 'sine.inOut' }, 0);
      ini(S.grupo, { rot: -2 }); tl.to(S.grupo, { rot: 2, duration: 4, ease: 'sine.inOut' }, 0);
    },
  };

  M[7] = {
    nome: 'Câmera 3D', duracao: 4,
    eventos: [['entrada', 0, 0.65], ['pouso', 0.65], ['mergulho', 0.9, 1.5], ['varredura', 2.0, 2.5], ['recuo', 3.0, 3.6]],
    montar(tl, S) {
      entrada(tl, S, 0.25);
      ini(S.cam, { x: 420, y: 700, z: -900, rx: 22, ry: -50 });
      tl.to(S.cam, { x: 0, y: 0, z: -260, rx: 9, ry: -22, duration: 0.65, ease: 'power3.out' }, 0);
      tl.to(S.cam, { y: -170, z: 230, rx: 3, ry: -8, duration: 0.6, ease: 'power4.inOut' }, 0.9);
      tl.to(S.cam, { y: 330, x: 30, rx: -4, ry: 7, duration: 0.5, ease: 'power4.inOut' }, 2.0);
      tl.to(S.cam, { x: 0, y: 0, z: -320, rx: 7, ry: 18, duration: 0.6, ease: 'power3.inOut' }, 3.0);
      tl.to(S.cam, { ry: 21, duration: 0.4, ease: 'none' }, 3.6);
    },
  };

  M[8] = {
    nome: 'Stop motion', duracao: 4, passo: 8, ferver: 3.5,
    eventos: [['pouso', 0.9], ['passo', 1.0], ['passo', 1.25], ['passo', 1.5], ['passo', 1.9], ['passo', 2.15], ['passo', 2.4], ['salta', 3.0]],
    montar(tl, S) {
      ini(S.icone, { y: -1500 });
      tl.to(S.icone, { y: -250, duration: 0.9, ease: 'bounce.out' }, 0);
      S.numero.letras.forEach(l => ini(l, { s: 0 }));
      S.numero.letras.forEach((l, i) => tl.to(l, { s: 1, duration: 0.25, ease: 'back.out(3)' }, 1.0 + i * 0.25));
      const palavras = S.palavra.texto.split(' '); let k = 0;
      palavras.forEach((p, j) => { for (let i = 0; i < p.length; i++) { const l = S.palavra.letras[k + i]; ini(l, { s: 0 }); tl.to(l, { s: 1, duration: 0.2, ease: 'back.out(3)' }, 1.9 + j * 0.25); } k += p.length + 1; });
      tl.to(S.icone, { y: -350, duration: 0.25, ease: 'power2.out' }, 3.0).to(S.icone, { y: -250, duration: 0.3, ease: 'bounce.out' }, 3.25);
    },
  };

  M[9] = {
    nome: 'Glitch', duracao: 4,
    eventos: [['varredura', 0, 0.5], ['brilho', 1.55, 1.75], ['varredura', 2.6, 2.85]],
    montar(tl, S) {
      entrada(tl, S, 0.05);
      ini(S.glitch, { f: 1 });
      tl.to(S.glitch, { f: 0, duration: 0.55, ease: 'steps(5)' }, 0);
      tl.to(S.glitch, { f: 0.8, duration: 0.05 }, 1.55).to(S.glitch, { f: 0, duration: 0.15, ease: 'steps(3)' }, 1.6);
      tl.to(S.glitch, { f: 1, duration: 0.05 }, 2.6).to(S.glitch, { f: 0, duration: 0.25, ease: 'steps(4)' }, 2.65);
      const certo = S.numero.alvo;   // na falha, o número aparece trocado por um instante
      tl.set(S.numero, { valor: certo * 1.9 + 1 }, 2.6).set(S.numero, { valor: certo }, 2.75);
      ini(S.grupo, { s: 0.97 }); tl.to(S.grupo, { s: 1.02, duration: 4, ease: 'none' }, 0);
    },
  };

  // ---------------------------------------------------------------- de interface: pedem um visual com cartão (V10, V11, V7)
  function pecaEscondida(S) { ini(S.icone, { s: 0 }); ini(S.numero, { a: 0, valor: 0 }); ini(S.palavra, { a: 0 }); }   // o número volta ao S.numero.alvo
  function pecaAparece(tl, S, t0) {
    tl.to(S.icone, { s: 1, duration: 0.5, ease: 'back.out(1.8)' }, t0);
    tl.to(S.numero, { a: 1, duration: 0.2 }, t0 + 0.25).to(S.numero, { valor: S.numero.alvo, duration: 0.9, ease: 'power2.out' }, t0 + 0.25);
    tl.to(S.palavra, { a: 1, duration: 0.3 }, t0 + 0.55);
  }
  function clique(tl, S, t) { tl.to(S.cursor, { s: 0.82, duration: 0.06 }, t).to(S.cursor, { s: 1, duration: 0.08 }, t + 0.06); }

  M[12] = {
    nome: 'Digitação',
    montar(tl, S, { cartaoDoPedido }) {
      pecaEscondida(S);
      ini(S.pedido, { a: 0, n: 0, crescer: 1 });
      const N = S.pedido.texto.length, t1 = 0.35 + N * 0.045, ret = cartaoDoPedido();
      tl.to(S.pedido, { a: 1, duration: 0.3 }, 0.05);
      tl.to(S.pedido, { n: N, duration: t1 - 0.35, ease: 'none' }, 0.35);
      ini(S.cursor, { a: 0, x: 330, y: 760 });
      tl.to(S.cursor, { a: 1, duration: 0.2 }, t1 - 0.55);
      tl.to(S.cursor, { x: ret.x + ret.w - 64 - 30, y: ret.y + ret.h - 64 - 10, duration: 0.45, ease: 'power2.inOut' }, t1 - 0.5);
      clique(tl, S, t1);
      tl.to(S.pedido, { a: 0, duration: 0.25 }, t1 + 0.12);
      tl.to(S.pedido, { crescer: 0, duration: 0.6, ease: 'power3.inOut' }, t1 + 0.1);
      tl.to(S.cursor, { a: 0, y: '+=60', duration: 0.3 }, t1 + 0.2);
      pecaAparece(tl, S, t1 + 0.55);
      tl.to(S.icone, { s: 1.07, duration: 0.18, ease: 'power2.out' }, t1 + 2.0).to(S.icone, { s: 1, duration: 0.4, ease: 'back.out(3)' }, t1 + 2.18);
      this.eventos = [['texto', 0.35], ['clique', t1], ['mergulho', t1 + 0.1, t1 + 0.7], ['salta', t1 + 0.55], ['texto', t1 + 1.1], ['cartao', t1 + 2.0]];
      return { duracao: t1 + 2.6 };
    },
  };

  M[13] = {
    nome: 'Arrastar e soltar', duracao: 4.2,
    eventos: [['varredura', 0.1, 0.95], ['clique', 0.95], ['salta', 1.0], ['texto', 1.3], ['cartao', 3.0]],
    montar(tl, S) {
      pecaEscondida(S);
      ini(S.arquivo, { a: 1, x: 760, y: 1150, rot: 12, s: 0.9 });
      ini(S.cursor, { a: 1, x: 850, y: 1240 });
      tl.to(S.arquivo, { x: 0, y: -250, rot: -3, s: 1, duration: 0.85, ease: 'power2.inOut' }, 0.1);
      tl.to(S.cursor, { x: 90, y: -160, duration: 0.85, ease: 'power2.inOut' }, 0.1);
      tl.to(S.cartao, { alvo: 1, duration: 0.25 }, 0.55);
      clique(tl, S, 0.95);
      tl.to(S.arquivo, { s: 1.5, a: 0, rot: 0, duration: 0.3, ease: 'power2.out' }, 1.0);
      tl.to(S.cartao, { alvo: 0, duration: 0.3 }, 1.0);
      tl.to(S.cursor, { x: 330, y: 520, a: 0, duration: 0.5, ease: 'power2.in' }, 1.15);
      pecaAparece(tl, S, 1.0);
      tl.to(S.icone, { s: 1.07, duration: 0.18, ease: 'power2.out' }, 3.0).to(S.icone, { s: 1, duration: 0.4, ease: 'back.out(3)' }, 3.18);
    },
  };

  M[14] = {
    nome: 'Lista de progresso', duracao: 5.2,
    montar(tl, S) {
      ini(S.cartao, { recorte: 1 }); ini(S.lista, { a: 1, rolar: 0, pecaY: 1150 });
      const it = S.lista.itens, ev = [];
      it.forEach((item, i) => {
        const t = 0.3 + i * 0.55;
        tl.to(item, { a: 1, duration: 0.25, ease: 'power2.out' }, t);
        tl.to(item, { feito: 1, duration: 0.25, ease: 'back.out(2.2)' }, t + 0.42);
        if (i >= 3) tl.to(S.lista, { rolar: '+=150', duration: 0.4, ease: 'power2.inOut' }, t - 0.1);   // o conteúdo rola; a câmera fica parada
        ev.push(['texto', t], ['passo', t + 0.42]);
      });
      const fim = 0.3 + it.length * 0.55 + 0.3;
      tl.to(S.lista, { rolar: '+=1150', pecaY: 0, duration: 0.7, ease: 'power3.inOut' }, fim);
      ini(S.numero, { valor: 0 }); tl.to(S.numero, { valor: S.numero.alvo, duration: 0.8, ease: 'power2.out' }, fim + 0.4);
      tl.to(S.icone, { s: 1.07, duration: 0.18, ease: 'power2.out' }, fim + 1.3).to(S.icone, { s: 1, duration: 0.4, ease: 'back.out(3)' }, fim + 1.48);
      this.eventos = ev.concat([['varredura', fim, fim + 0.7], ['cartao', fim + 1.3]]);
      return { duracao: fim + 2.0 };
    },
  };

  // ---------------------------------------------------------------- M15 esfera de pontos (o "orbe" dos apps de IA)
  M[15] = {
    nome: 'Esfera de pontos', duracao: 4.6,
    eventos: [['brilho', 0.05, 0.8], ['texto', 0.7], ['varredura', 1.3, 2.2], ['cartao', 2.5], ['passo', 3.4]],
    montar(tl, S) {
      ini(S.icone, { s: 0 });
      ini(S.orbe, { a: 1, junta: 1, ry: -40, varre: -1, respira: 0, anel: 0 });
      tl.to(S.orbe, { junta: 0, duration: 0.8, ease: 'power3.out' }, 0.05);            // os pontos chegam e formam a esfera
      tl.to(S.orbe, { ry: 300, duration: 4.6, ease: 'none' }, 0);                       // gira o tempo todo
      tl.set(S.orbe, { varre: 0 }, 1.3).to(S.orbe, { varre: 1, duration: 0.9, ease: 'power1.inOut' }, 1.3).set(S.orbe, { varre: -1 }, 2.25);   // uma faixa de luz varre o globo ("buscando")
      tl.to(S.orbe, { respira: 1, duration: 0.45, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 2.4);                                       // respira
      tl.to(S.orbe, { anel: 1, duration: 0.4, ease: 'power2.out' }, 3.3);               // um anel de pontos entra em órbita ("trabalhando")
      const alvo = S.numero.valor;
      ini(S.numero, { a: 0, valor: 0 });
      tl.to(S.numero, { a: 1, duration: 0.2 }, 0.7).to(S.numero, { valor: alvo, duration: 1.0, ease: 'power2.out' }, 0.7);
      S.palavra.letras.forEach(l => ini(l, { a: 0, y: 40 }));
      tl.to(S.palavra.letras, { a: 1, y: 0, duration: 0.35, ease: 'power3.out', stagger: 0.025 }, 1.0);
    },
  };

  window.MOVIMENTOS = M;
})();
