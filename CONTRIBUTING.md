# Como contribuir

[English below](#how-to-contribute)

O que mais ajuda o Risca & Mexe é um **visual novo** ou um **movimento novo**. A página de referências do site lista movimentos que aparecem em filmes de verdade e ainda não estão no catálogo (montagem por peças, encaixar em grade, ondulação, fita que desliza). Qualquer um deles é um bom começo.

## A regra dos dois eixos

- Um **visual** só desenha: cores, fontes, textura. Ele não sabe de tempo.
- Um **movimento** só anima: uma linha do tempo do GSAP sobre o estado da peça. Ele não sabe de cor nem de fonte.

Se o seu item precisa quebrar essa regra para funcionar, abra uma issue antes, para a gente conversar.

## Passo a passo

1. **Rode o site no seu computador** (`python3 -m http.server 8000`, veja o README).
2. **Escreva o item no motor.**
   - Visual: um objeto novo `V[12] = { ... }` em `cena/visuais.js`. O comentário no início do arquivo lista o que cada visual precisa ter (`nome`, `fontes`, `cores`, `fundo`, `forma`, `texto`) e o que é opcional.
   - Movimento: um objeto novo `M[16] = { ... }` em `cena/movimentos.js`, com `nome`, `duracao`, `eventos` e `montar(tl, S, util)`. O comentário no início do arquivo lista o que o estado `S` oferece.
3. **Confira com outros itens.** Abra `cena/combinar.html?v=12&m=2` (ou `?v=9&m=16`) e teste o seu item com pelo menos três itens do outro eixo. Ele precisa funcionar com todos, com exceção dos movimentos de interface (M12 a M14), que pedem um visual com cartão.
4. **Ponha o item no catálogo.**
   - `itens.js`: `n`, `nome`, `arq` (o nome do arquivo de vídeo), `oque` (o que é, numa frase) e `cabe` (para que assunto serve).
   - `receitas.js`: as regras do estilo em frases curtas, uma por linha, para uma pessoa ou uma IA refazer sem ver o seu código. Use números concretos: cores em hexadecimal, tamanhos em px, tempos em segundos.
   - `traducoes.js`: os mesmos textos em inglês e espanhol (`itens` e `receitas`). Se você não escreve uma das línguas, deixe em português e avise no pull request.
5. **Grave o vídeo e a miniatura.**
   ```bash
   node ferramentas/gravar.mjs --itens --so V12_seu-nome
   node ferramentas/gravar.mjs --itens --so V12_seu-nome --lang en
   node ferramentas/gravar.mjs --itens --so V12_seu-nome --lang es
   ```
   A miniatura é um quadro do vídeo, em 360 × 640, salvo em `capas/` (e `capas/en/`, `capas/es/`):
   ```bash
   ffmpeg -ss 2.8 -i v/V12_seu-nome.mp4 -frames:v 1 -vf scale=360:640 -q:v 3 capas/V12_seu-nome.jpg
   ```
6. **Abra o pull request** com uma frase sobre o item e um print ou vídeo curto. A verificação automática confere se os arquivos JavaScript abrem sem erro.

## Escrita

Os textos do site são para quem não é da área. Uma frase precisa se explicar sozinha: nada de gíria, apelido interno ou termo técnico sem explicação.

## Licença

Ao contribuir, você concorda que a sua contribuição sai pela mesma licença MIT do projeto.

---

# How to contribute

What helps Risca & Mexe most is a **new visual** or a **new motion**. The site's references page lists motions seen in real films that the catalog does not have yet (assembly from parts, snap to grid, ripple, sliding ribbon). Any of them is a good start.

## The two-axis rule

- A **visual** only draws: colors, fonts, texture. It knows nothing about time.
- A **motion** only animates: a GSAP timeline over the piece's state. It knows nothing about color or font.

If your item needs to break this rule, open an issue first so we can talk.

## Step by step

1. **Run the site locally** (`python3 -m http.server 8000`, see the README).
2. **Write the item in the engine.** A new `V[12] = { ... }` in `cena/visuais.js`, or a new `M[16] = { ... }` in `cena/movimentos.js`. The comment at the top of each file lists the required and optional fields. The code is in Portuguese; comments in English are fine.
3. **Check it against other items.** Open `cena/combinar.html?v=12&m=2` (or `?v=9&m=16`) and try your item with at least three items from the other axis. It has to work with all of them, except the interface motions (M12 to M14), which need a visual with a card.
4. **Add it to the catalog:** `itens.js` (name, file, what it is, what it fits), `receitas.js` (the style rules in short lines, with concrete numbers, so a person or an AI can redo it without your code) and `traducoes.js` (English and Spanish; if you do not write one of them, say so in the pull request).
5. **Record the video and thumbnail** with the commands above (`--lang en` and `--lang es` too). The thumbnail is one frame at 360 × 640 in `capas/`.
6. **Open the pull request** with one sentence about the item and a screenshot or short video. The automatic check makes sure the JavaScript files load without errors.

By contributing, you agree that your contribution is released under the project's MIT license.
