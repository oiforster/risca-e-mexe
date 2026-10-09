# Risca & Mexe

An open index of animation styles. **[riscaemexe.com.br](https://riscaemexe.com.br/?lang=en)**

[Português](README.md) · [Español](README.es.md)

"Risca & Mexe" is Brazilian Portuguese for "draw & move". Every animation is two separate choices: **how it is drawn** (the visual) and **how it moves** (the motion). Risca & Mexe puts each choice on its own numbered list. Any visual works with any motion, and the combination runs live in the browser.

- **Visuals (V1 to V11):** flat, line art, isometric, clay, cut-out collage, risograph, frosted glass, ASCII, pointillism and two interface cards.
- **Motions (M0 to M15):** kinetic typography, particles, morph, line draw-on, mask reveal, layers in depth, 3D camera, stop motion, glitch, typing, drag and drop, progress list and dotted sphere.

Each item has a recipe: the rules of the style written in plain language, so a person or an AI (Claude, ChatGPT or another) can make the same idea with a different subject. On the Combination table, the "Take this scene to an AI" button builds a ready-to-paste request.

## Run it on your computer

The site is plain HTML, CSS and JavaScript, with no build step. It has to be served by a local server: opened straight from disk, the page cannot read the pixels of the images it loads, and some visuals and motions depend on that.

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser. Add `?lang=en` or `?lang=es` to the address to switch language.

## Record a combination as video

```bash
node ferramentas/gravar.mjs --v 9 --m 2 --saida pointillism-particles.mp4
```

The recorder opens the scene in a windowless Chrome and takes a picture of each frame, so the video comes out smooth even on a slow computer. It needs Node 22 or newer, Google Chrome and ffmpeg, plus an internet connection (the scene loads GSAP and Google Fonts). Other options:

- `--lang en` or `--lang es`: the sample text in that language.
- `--escala 2`: records at 2160 × 3840 (the default is 1080 × 1920, portrait).
- `.mov` output: ProRes 4444, for a video editor. `.mp4` output: H.264, for the web.
- `--itens`: records every video on the site again, into `v/` (or `v/en/`, `v/es/` with `--lang`).

## How the files are split

| File | What it holds |
|---|---|
| `index.html`, `Item.html`, `Mesa.html`, `Referencias.html` | the four pages: index, one page per item, combination table and reference films |
| `estilo.css`, `textos.js` | the look and the fixed page text, in three languages |
| `itens.js`, `referencias.js`, `receitas.js` | the data in Portuguese: items, reference films and recipes |
| `traducoes.js` | the same data in English and Spanish |
| `cena/nucleo.js` | the engine: keeps the piece (icon, number and word) in a state and draws it on a canvas |
| `cena/visuais.js` | one object per visual: colors, fonts and how to draw each part |
| `cena/movimentos.js` | one object per motion: a GSAP timeline over the state |
| `cena/combinar.html` | the scene on its own: `cena/combinar.html?v=9&m=2` |
| `v/`, `capas/` | the video and thumbnail of each item |
| `ferramentas/gravar.mjs` | the video recorder |

The motion never knows about color or font, and the visual never knows about time. That split is what lets any one combine with any other.

The code and its comments are in Portuguese. The page text and the recipes are translated.

## Contributing

A new visual or a new motion is welcome. The step by step is in [CONTRIBUTING.md](CONTRIBUTING.md).

## License and credits

Open source, MIT license ([LICENSE](LICENSE)). Made by [FORSTER](https://somosforster.com.br) in Igrejinha, Rio Grande do Sul, Brazil.

- The pointillism recipe uses ideas from Fernando Araújo's pointillism skill (BRABO, MIT license).
- The films on the references page belong to their authors. They play through YouTube's official player; none of them is stored in this repository.
- The engine uses [GSAP](https://gsap.com), free since 2025, loaded from cdnjs.
