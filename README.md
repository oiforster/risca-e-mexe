# Risca & Mexe

Um índice aberto de estilos de animação. **[riscaemexe.com.br](https://riscaemexe.com.br)**

[English](README.en.md) · [Español](README.es.md)

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
