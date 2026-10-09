# Risca & Mexe

Un índice abierto de estilos de animación. **[riscaemexe.com.br](https://riscaemexe.com.br/?lang=es)**

[Português](README.md) · [English](README.en.md)

"Risca & Mexe" quiere decir "dibuja y mueve" en portugués de Brasil. Toda animación son dos decisiones separadas: **cómo se dibuja** (el visual) y **cómo se mueve** (el movimiento). Risca & Mexe pone cada decisión en su propia lista, con un número. Cualquier visual combina con cualquier movimiento, y la combinación funciona en vivo en el navegador.

- **Visuales (V1 a V11):** flat, trazo, isométrico, plastilina, recorte y collage, risografía, vidrio esmerilado, ASCII, puntillismo y dos tarjetas de interfaz.
- **Movimientos (M0 a M15):** tipografía cinética, partículas, morph, dibujo en trazo, revelado con máscara, capas en profundidad, cámara 3D, stop motion, glitch, escritura, arrastrar y soltar, lista de progreso y esfera de puntos.

Cada ítem tiene una receta: las reglas del estilo escritas en lenguaje claro, para que una persona o una IA (Claude, ChatGPT u otra) haga la misma idea con otro tema. En la Mesa de combinación, el botón "Llevar esta escena a la IA" arma el pedido listo para pegar.

## Abrirlo en tu computadora

El sitio es solo HTML, CSS y JavaScript, sin paso de compilación. Hay que abrirlo con un servidor local: abierta directo desde el disco, la página no puede leer los píxeles de las imágenes que carga, y algunos visuales y movimientos dependen de eso.

```bash
python3 -m http.server 8000
```

Luego abre http://localhost:8000 en el navegador. El idioma cambia con `?lang=en` o `?lang=es` en la dirección.

## Grabar una combinación en video

```bash
node ferramentas/gravar.mjs --v 9 --m 2 --saida puntillismo-particulas.mp4
```

El grabador abre la escena en un Chrome sin ventana y saca una foto de cada cuadro, así el video sale fluido incluso en una computadora lenta. Necesita Node 22 o más nuevo, Google Chrome y ffmpeg, y conexión a internet (la escena carga GSAP y las fuentes de Google Fonts). Otras opciones:

- `--lang en` o `--lang es`: los textos de ejemplo en ese idioma.
- `--escala 2`: graba en 2160 × 3840 (lo normal es 1080 × 1920, vertical).
- Salida `.mov`: ProRes 4444, para un editor de video. Salida `.mp4`: H.264, para la web.
- `--itens`: graba de nuevo todos los videos del sitio, en `v/` (o `v/en/`, `v/es/` con `--lang`).

## Cómo se dividen los archivos

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

## Contribuir

Un visual nuevo o un movimiento nuevo es bienvenido. El paso a paso está en [CONTRIBUTING.md](CONTRIBUTING.md).

## Licencia y créditos

Código abierto, licencia MIT ([LICENSE](LICENSE)). Hecho por [FORSTER](https://somosforster.com.br) en Igrejinha, Rio Grande do Sul, Brasil.

- La receta del puntillismo usa ideas de la skill de puntillismo de Fernando Araújo (BRABO, licencia MIT).
- Las películas de la página de referencias son de quienes las hicieron. Se reproducen con el reproductor oficial de YouTube; nada de ellas queda guardado en este repositorio.
- El motor usa [GSAP](https://gsap.com), gratuito desde 2025, cargado desde cdnjs.
