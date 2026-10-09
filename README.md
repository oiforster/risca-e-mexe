# Risca & Mexe

Um índice aberto de estilos de animação. **[riscaemexe.com.br](https://riscaemexe.com.br)**

[English](#english) · [Español](#español)

Toda animação são duas escolhas separadas: **como ela é desenhada** (o visual) e **como ela se mexe** (o movimento). O Risca & Mexe põe cada escolha numa lista própria, com um número. Qualquer visual combina com qualquer movimento, e a combinação roda ao vivo no navegador.

- **Visuais (V1 a V11):** flat, traço, isométrico, massinha, recorte e colagem, risografia, vidro fosco, ASCII, pontilhismo e dois cartões de interface.
- **Movimentos (M0 a M15):** tipografia cinética, partículas, morph, desenho em traço, revelação por máscara, camadas em profundidade, câmera 3D, stop motion, glitch, digitação, arrastar e soltar, lista de progresso e esfera de pontos.

Cada item tem uma receita: as regras do estilo escritas em português claro, para uma pessoa ou uma IA (Claude, ChatGPT ou outra) refazer a mesma ideia com outro assunto. Na Mesa de combinação, o botão "Levar esta cena para a IA" monta o pedido pronto para colar.

## Abrir no seu computador

O site é feito só de arquivos HTML, CSS e JavaScript, sem etapa de montagem. Ele precisa ser aberto por um servidor local: aberta direto do disco, a página não consegue ler os pixels das imagens que carrega, e alguns visuais e movimentos dependem disso.

```bash
python3 -m http.server 8000
```

Depois abra http://localhost:8000 no navegador. A língua troca com `?lang=en` ou `?lang=es` no endereço.

## Gravar uma combinação em vídeo

```bash
node ferramentas/gravar.mjs --v 9 --m 2 --saida pontilhismo-particulas.mp4
```

O gravador abre a cena no Chrome sem janela e tira uma foto de cada quadro, então o vídeo sai liso mesmo num computador lento. Precisa de Node 22 ou mais novo, Google Chrome e ffmpeg, e de internet (a cena carrega o GSAP e as fontes do Google Fonts). Outras opções:

- `--lang en` ou `--lang es`: os textos de exemplo na outra língua.
- `--escala 2`: grava em 2160 × 3840 (o normal é 1080 × 1920, em pé).
- Saída `.mov`: ProRes 4444, para levar a um editor de vídeo. Saída `.mp4`: H.264, para a web.
- `--itens`: grava de novo todos os vídeos do site, na pasta `v/` (ou `v/en/`, `v/es/` com `--lang`).

## Como os arquivos se dividem

| Arquivo | O que tem |
|---|---|
| `index.html`, `Item.html`, `Mesa.html`, `Referencias.html` | as quatro páginas: índice, página de cada item, mesa de combinação e filmes de referência |
| `estilo.css`, `textos.js` | a aparência e os textos fixos das páginas, nas três línguas |
| `itens.js`, `referencias.js`, `receitas.js` | os dados em português: itens, filmes de referência e receitas |
| `traducoes.js` | os mesmos dados em inglês e espanhol |
| `cena/nucleo.js` | o motor: guarda a peça (ícone, número e palavra) num estado e desenha num canvas |
| `cena/visuais.js` | um objeto por visual: cores, fontes e como desenhar cada parte |
| `cena/movimentos.js` | um objeto por movimento: uma linha do tempo do GSAP sobre o estado |
| `cena/combinar.html` | a cena sozinha: `cena/combinar.html?v=9&m=2` |
| `v/`, `capas/` | os vídeos e as miniaturas de cada item |
| `ferramentas/gravar.mjs` | o gravador de vídeo |

O movimento nunca sabe de cor ou de fonte, e o visual nunca sabe de tempo. É essa separação que deixa qualquer um combinar com qualquer outro.

## Contribuir

Um visual novo ou um movimento novo é bem-vindo. O passo a passo está em [CONTRIBUTING.md](CONTRIBUTING.md).

## Licença e créditos

Código aberto, licença MIT ([LICENSE](LICENSE)). Feito pela [FORSTER](https://somosforster.com.br), em Igrejinha, Rio Grande do Sul, Brasil.

- A receita do pontilhismo usa ideias da skill de pontilhismo de Fernando Araújo (BRABO, licença MIT).
- Os filmes da página de referências são de quem os fez. Eles tocam pelo player oficial do YouTube; nada deles fica guardado neste repositório.
- O motor usa o [GSAP](https://gsap.com), gratuito desde 2025, carregado pelo cdnjs.

---

## English

An open index of animation styles. **[riscaemexe.com.br](https://riscaemexe.com.br/?lang=en)**

"Risca & Mexe" is Brazilian Portuguese for "draw & move". Every animation is two separate choices: **how it is drawn** (the visual) and **how it moves** (the motion). Risca & Mexe puts each choice on its own numbered list. Any visual works with any motion, and the combination runs live in the browser.

- **Visuals (V1 to V11):** flat, line art, isometric, clay, cut-out collage, risograph, frosted glass, ASCII, pointillism and two interface cards.
- **Motions (M0 to M15):** kinetic typography, particles, morph, line draw-on, mask reveal, layers in depth, 3D camera, stop motion, glitch, typing, drag and drop, progress list and dotted sphere.

Each item has a recipe: the rules of the style written in plain language, so a person or an AI (Claude, ChatGPT or another) can make the same idea with a different subject. On the Combination table, the "Take this scene to an AI" button builds a ready-to-paste request.

### Run it on your computer

The site is plain HTML, CSS and JavaScript, with no build step. It has to be served by a local server: opened straight from disk, the page cannot read the pixels of the images it loads, and some visuals and motions depend on that.

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser. Add `?lang=en` or `?lang=es` to the address to switch language.

### Record a combination as video

```bash
node ferramentas/gravar.mjs --v 9 --m 2 --saida pointillism-particles.mp4
```

The recorder opens the scene in a windowless Chrome and takes a picture of each frame, so the video comes out smooth even on a slow computer. It needs Node 22 or newer, Google Chrome and ffmpeg, plus an internet connection (the scene loads GSAP and Google Fonts). Other options:

- `--lang en` or `--lang es`: the sample text in that language.
- `--escala 2`: records at 2160 × 3840 (the default is 1080 × 1920, portrait).
- `.mov` output: ProRes 4444, for a video editor. `.mp4` output: H.264, for the web.
- `--itens`: records every video on the site again, into `v/` (or `v/en/`, `v/es/` with `--lang`).

### How the files are split

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

### Contributing

A new visual or a new motion is welcome. The step by step is in [CONTRIBUTING.md](CONTRIBUTING.md).

### License and credits

Open source, MIT license ([LICENSE](LICENSE)). Made by [FORSTER](https://somosforster.com.br) in Igrejinha, Rio Grande do Sul, Brazil.

- The pointillism recipe uses ideas from Fernando Araújo's pointillism skill (BRABO, MIT license).
- The films on the references page belong to their authors. They play through YouTube's official player; none of them is stored in this repository.
- The engine uses [GSAP](https://gsap.com), free since 2025, loaded from cdnjs.

---

## Español

Un índice abierto de estilos de animación. **[riscaemexe.com.br](https://riscaemexe.com.br/?lang=es)**

"Risca & Mexe" quiere decir "dibuja y mueve" en portugués de Brasil. Toda animación son dos decisiones separadas: **cómo se dibuja** (el visual) y **cómo se mueve** (el movimiento). Risca & Mexe pone cada decisión en su propia lista, con un número. Cualquier visual combina con cualquier movimiento, y la combinación funciona en vivo en el navegador.

- **Visuales (V1 a V11):** flat, trazo, isométrico, plastilina, recorte y collage, risografía, vidrio esmerilado, ASCII, puntillismo y dos tarjetas de interfaz.
- **Movimientos (M0 a M15):** tipografía cinética, partículas, morph, dibujo en trazo, revelado con máscara, capas en profundidad, cámara 3D, stop motion, glitch, escritura, arrastrar y soltar, lista de progreso y esfera de puntos.

Cada ítem tiene una receta: las reglas del estilo escritas en lenguaje claro, para que una persona o una IA (Claude, ChatGPT u otra) haga la misma idea con otro tema. En la Mesa de combinación, el botón "Llevar esta escena a la IA" arma el pedido listo para pegar.

### Abrirlo en tu computadora

El sitio es solo HTML, CSS y JavaScript, sin paso de compilación. Hay que abrirlo con un servidor local: abierta directo desde el disco, la página no puede leer los píxeles de las imágenes que carga, y algunos visuales y movimientos dependen de eso.

```bash
python3 -m http.server 8000
```

Luego abre http://localhost:8000 en el navegador. El idioma cambia con `?lang=en` o `?lang=es` en la dirección.

### Grabar una combinación en video

```bash
node ferramentas/gravar.mjs --v 9 --m 2 --saida puntillismo-particulas.mp4
```

El grabador abre la escena en un Chrome sin ventana y saca una foto de cada cuadro, así el video sale fluido incluso en una computadora lenta. Necesita Node 22 o más nuevo, Google Chrome y ffmpeg, y conexión a internet (la escena carga GSAP y las fuentes de Google Fonts). Otras opciones:

- `--lang en` o `--lang es`: los textos de ejemplo en ese idioma.
- `--escala 2`: graba en 2160 × 3840 (lo normal es 1080 × 1920, vertical).
- Salida `.mov`: ProRes 4444, para un editor de video. Salida `.mp4`: H.264, para la web.
- `--itens`: graba de nuevo todos los videos del sitio, en `v/` (o `v/en/`, `v/es/` con `--lang`).

### Cómo se dividen los archivos

| Archivo | Qué tiene |
|---|---|
| `index.html`, `Item.html`, `Mesa.html`, `Referencias.html` | las cuatro páginas: índice, página de cada ítem, mesa de combinación y películas de referencia |
| `estilo.css`, `textos.js` | la apariencia y los textos fijos de las páginas, en tres idiomas |
| `itens.js`, `referencias.js`, `receitas.js` | los datos en portugués: ítems, películas de referencia y recetas |
| `traducoes.js` | los mismos datos en inglés y español |
| `cena/nucleo.js` | el motor: guarda la pieza (ícono, número y palabra) en un estado y la dibuja en un canvas |
| `cena/visuais.js` | un objeto por visual: colores, fuentes y cómo dibujar cada parte |
| `cena/movimentos.js` | un objeto por movimiento: una línea de tiempo de GSAP sobre el estado |
| `cena/combinar.html` | la escena sola: `cena/combinar.html?v=9&m=2` |
| `v/`, `capas/` | el video y la miniatura de cada ítem |
| `ferramentas/gravar.mjs` | el grabador de video |

El movimiento nunca sabe de color ni de fuente, y el visual nunca sabe de tiempo. Esa separación es la que permite combinar cualquiera con cualquier otro.

El código y sus comentarios están en portugués. Los textos de las páginas y las recetas están traducidos.

### Contribuir

Un visual nuevo o un movimiento nuevo es bienvenido. El paso a paso está en [CONTRIBUTING.md](CONTRIBUTING.md).

### Licencia y créditos

Código abierto, licencia MIT ([LICENSE](LICENSE)). Hecho por [FORSTER](https://somosforster.com.br) en Igrejinha, Rio Grande do Sul, Brasil.

- La receta del puntillismo usa ideas de la skill de puntillismo de Fernando Araújo (BRABO, licencia MIT).
- Las películas de la página de referencias son de quienes las hicieron. Se reproducen con el reproductor oficial de YouTube; nada de ellas queda guardado en este repositorio.
- El motor usa [GSAP](https://gsap.com), gratuito desde 2025, cargado desde cdnjs.
