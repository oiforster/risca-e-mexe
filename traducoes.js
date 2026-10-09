/* traducoes.js — Risca & Mexe
   Inglês e espanhol dos dados do catálogo (itens, combinações, referências, receitas e o pedido para a IA).
   Português é a língua de origem e fica nos próprios arquivos (itens.js, referencias.js, receitas.js).
   Uso: carregar depois desses arquivos e chamar window.aplicarLingua('en' ou 'es') antes de montar a página;
   ele troca os textos no lugar, sem mudar o formato que as páginas já leem. */
window.TRADUCOES = {
 "en": {
  "itens": {
   "V1": {
    "nome": "Flat",
    "oque": "Solid colors, no shadow or texture. Reads fast on any screen.",
    "cabe": "Retail (offers, sale dates) and tech (an icon for each feature)."
   },
   "V2": {
    "nome": "Line art",
    "oque": "Only thin lines, like a pen drawing. Calm and elegant.",
    "cabe": "Health: explaining an organ, a test, a procedure."
   },
   "V3": {
    "nome": "Isometric",
    "oque": "Block pieces seen from a corner, like a scale model.",
    "cabe": "Tech: servers, workflows, structure."
   },
   "V4": {
    "nome": "Clay",
    "oque": "Soft, shiny shapes, as if modeled in clay.",
    "cabe": "Friendly brands, holidays, health explained without scaring anyone."
   },
   "V5": {
    "nome": "Cut-out collage",
    "oque": "Cut paper, tape and letters clipped from magazines.",
    "cabe": "Retail, fashion, store news."
   },
   "V6": {
    "nome": "Risograph",
    "oque": "Two bold inks, slightly out of register, with printing flaws.",
    "cabe": "Seasonal campaigns, events, poster-style headlines."
   },
   "V7": {
    "nome": "Frosted glass",
    "oque": "A translucent card over blurred colored lights. Looks like an app.",
    "cabe": "Product screens, dashboards, a result number."
   },
   "V8": {
    "nome": "ASCII",
    "oque": "The image made of letters and symbols, like an old computer screen.",
    "cabe": "Tech, the opening of a technical video, a hook."
   },
   "V9": {
    "nome": "Pointillism",
    "oque": "The image made of thousands of dots, with light and shadow set by dot size.",
    "cabe": "Health, science, brands that call for elegance."
   },
   "V10": {
    "nome": "Interface card",
    "oque": "Only the tool’s box, redrawn, large and centered on screen.",
    "cabe": "Demonstrating a digital tool."
   },
   "V11": {
    "nome": "Card over the result",
    "oque": "The same card, with the result itself blurred and dark behind it.",
    "cabe": "A tool that makes something: the result shows behind it."
   },
   "M0": {
    "nome": "Simple entrance",
    "oque": "The piece just comes in. Use it to see the visual on its own.",
    "cabe": ""
   },
   "M1": {
    "nome": "Kinetic typography",
    "oque": "The letters and numbers are the motion: they fall, spin and lock into place.",
    "cabe": "Headlines, prices, a key number."
   },
   "M2": {
    "nome": "Particles",
    "oque": "The piece assembles from loose grains and then comes apart.",
    "cabe": "Science, health, something taking shape."
   },
   "M3": {
    "nome": "Morph",
    "oque": "One shape turns into another without a cut.",
    "cabe": "Explaining a transformation."
   },
   "M4": {
    "nome": "Line draw-on",
    "oque": "The outline draws itself in front of the viewer, then fills in.",
    "cabe": "Step-by-step explanations."
   },
   "M5": {
    "nome": "Mask reveal",
    "oque": "The piece appears through a window that opens or a band that sweeps past.",
    "cabe": "Revealing a product, before and after."
   },
   "M6": {
    "nome": "Layers in depth",
    "oque": "Flat layers move at different speeds and create a sense of depth (2.5D).",
    "cabe": "Product photos, settings."
   },
   "M7": {
    "nome": "3D camera",
    "oque": "The piece is a plane in space; the camera arrives tilted, dives in and pulls back.",
    "cabe": "Product screens."
   },
   "M8": {
    "nome": "Stop motion",
    "oque": "Moves in jumps, eight frames per second, with a slight jitter.",
    "cabe": "Products, a handmade feel."
   },
   "M9": {
    "nome": "Glitch",
    "oque": "A digital failure: the image breaks, shifts and splits its colors.",
    "cabe": "Tech, the problem before the solution."
   },
   "M10": {
    "nome": "Frame by frame and rotoscoping",
    "oque": "Each frame drawn by hand; in rotoscoping, over filmed video.",
    "cabe": "Needs an illustrator. Special openings, campaigns."
   },
   "M11": {
    "nome": "Tracking",
    "oque": "Text or an arrow pinned to something moving in filmed video.",
    "cabe": "Depends on the footage; video editors already do it."
   },
   "M12": {
    "nome": "Typing",
    "oque": "The prompt appears letter by letter and the card grows with the text.",
    "cabe": "AI tools, a written request."
   },
   "M13": {
    "nome": "Drag and drop",
    "oque": "The cursor brings a file into the box and it becomes the result.",
    "cabe": "Uploading a file, the product photo."
   },
   "M14": {
    "nome": "Progress list",
    "oque": "Steps appear one by one and get a checkmark.",
    "cabe": "Multi-step processes."
   },
   "M15": {
    "nome": "Dotted sphere",
    "oque": "Dots form a spinning sphere that gets a band of light, breathes and gains an orbiting ring.",
    "cabe": "AI products, waiting screens, something thinking or working."
   }
  },
  "combinacoes": [
   {
    "nome": "Grains taking shape",
    "para": "Health and science"
   },
   {
    "nome": "Glass in space",
    "para": "Product screens"
   },
   {
    "nome": "Collage in jumps",
    "para": "Retail"
   },
   {
    "nome": "Photo in the box",
    "para": "Tool demos"
   },
   {
    "nome": "Dotted orb",
    "para": "AI products"
   }
  ],
  "refs": {
   "filmes": [
    {
     "titulo": "Microsoft Designer",
     "autor": "NotReal for Microsoft",
     "diz": "A soft clay world, with the prompt typed into a bar over the scene. The result appears on spinning cards.",
     "momentos": [
      "a brushstroke turns into a ribbon (morph)",
      "the prompt is typed over the 3D scene",
      "the prompt bar over the cake, letter by letter",
      "the result appears on spinning cards",
      "the finished piece assembles on screen"
     ]
    },
    {
     "titulo": "Windows 365",
     "autor": "Tendril for Microsoft",
     "diz": "The camera goes into the monitor all the way to the browser, and the windows become glass panels floating in space. Same principle as our 3D camera.",
     "momentos": [
      "the camera dives into the monitor (3D camera)",
      "glass windows jump off the screen",
      "the cursor drags a file (drag and drop)",
      "servers as glass cubes, seen from a corner",
      "a field of small cubes (particles)"
     ]
    },
    {
     "titulo": "Icon Celebration",
     "autor": "Tendril for Microsoft",
     "diz": "The icons are born as technical drawings, in grids and outlines, and become 3D blocks. The pieces come together like a puzzle.",
     "momentos": [
      "sheets and a technical-drawing grid",
      "the icon outline draws itself on the grid (line draw-on)",
      "a ribbon becomes the icon (morph)",
      "the pieces come together (assembly, not in the catalog yet)",
      "icons as blocks, seen from a corner"
     ]
    },
    {
     "titulo": "New design for Microsoft 365 Copilot",
     "autor": "Microsoft Design",
     "diz": "A clean white interface, sentences that appear word by word and prompts typed into the assistant’s bar. Almost exactly our interface card.",
     "momentos": [
      "the sentence appears word by word (kinetic typography)",
      "an icon turns into the menu",
      "prompts typed into the \"Ask Copilot\" bar",
      "\"To offer you\": type that changes size",
      "the document writes itself"
     ]
    },
    {
     "titulo": "Meet Copilot",
     "autor": "Microsoft",
     "diz": "Glass cards over the colorful result, and each prompt is typed in large letters, tilted in space.",
     "momentos": [
      "the question typed in large letters, in perspective",
      "\"Generating output...\": the sign that it is working",
      "the prompt inside the document",
      "\"Create a 10 slide presentation\"",
      "a series of prompts, one after another"
     ]
    },
    {
     "titulo": "Microsoft Planner",
     "autor": "Microsoft",
     "diz": "Tilted glass panels and task lists that fill in. A clicked button bursts into bubbles.",
     "momentos": [
      "the clicked button bursts into bubbles (particles)",
      "the task list fills in (progress list)",
      "cards in perspective (3D camera)",
      "pieces running on rails",
      "the list gets its checkmarks"
     ]
    },
    {
     "titulo": "Themes by Copilot in Outlook",
     "autor": "Microsoft",
     "diz": "The prompt is built with tags, the generated image slides in behind the window and becomes the theme. It ends on a mosaic of screens in depth.",
     "momentos": [
      "colored bubbles become the theme choice",
      "the prompt built with tags",
      "the generated image slides in behind the window (card over the result)",
      "the page turns and changes the theme",
      "a mosaic of screens in depth"
     ]
    },
    {
     "titulo": "The next generation of OneDrive",
     "autor": "Microsoft",
     "diz": "\"Help me get organized\" is typed into search, a glass cloud icon appears and the folders fly until they settle into a grid.",
     "momentos": [
      "\"Help me get organized\" typed into search",
      "the glass cloud",
      "a ripple becomes the card (not in the catalog yet)",
      "panels in perspective",
      "the folders fly and snap into a grid (not in the catalog yet)"
     ]
    }
   ],
   "faltam": [
    {
     "nome": "Assembly from parts",
     "oque": "The parts arrive from different sides and fit together until they form the object. The reverse, the exploded view, pulls the pieces apart to show what is inside.",
     "visto": "Icon Celebration, at 15 s"
    },
    {
     "nome": "Snap to grid",
     "oque": "Loose items fly in and arrange themselves into a tidy grid. Good for \"organize\", \"gather\", \"catalog\".",
     "visto": "OneDrive, at 48 s"
    },
    {
     "nome": "Ripple",
     "oque": "A wave spreads across the surface, like a drop in water, and reveals the next screen.",
     "visto": "OneDrive, at 10 s"
    },
    {
     "nome": "Sliding ribbon",
     "oque": "A wide ribbon crosses the screen, folds and becomes another shape. It links one scene to the next without a cut.",
     "visto": "Microsoft Designer, at 3 s; Icon Celebration, at 11 s"
    }
   ]
  },
  "receitas": {
   "V1": "- Solid colors, no shadow, no gradient, no texture. Simple, large shapes with slightly rounded corners.\n- Four-color palette: cream background #F4EDE1; main object orange #E4572E; support blue #2E86AB; text and details dark blue #1D2A44. A large light circle (#F6CFAE) behind the main object, moving with it.\n- Text in Bricolage Grotesque: very bold headline (800), semibold supporting text (600) with letter spacing.\n- No outlines; when shapes need separating, use another solid color.",
   "V2": "- Lines only: 6 px stroke, rounded ends and corners, dark blue #1F2A44, on a paper background #FAF6EF with very light ruled lines.\n- Inside each shape, a second thinner line (2.5 px) at 84% of the size and a light diagonal hatch in terracotta #C8553D. No solid fills.\n- Numbers as outlines (hollow serif, Fraunces 600); words in Fraunces italic.\n- One small terracotta detail (a circle, a mark) as a touch of color.",
   "V3": "- The piece sits on an isometric wall: tilted 30 degrees (horizontal lines rise to the right), like a scale model seen from a corner.\n- Every shape has thickness: the front face in blue #4C7DF0 and the side, darker (#2A4BA6), offset back and up about 34 px. A thin light line on the face edge.\n- Numbers and letters also have thickness (yellow face #FFB547, near-black side #0E1626), in bold Space Grotesk.\n- Light gray background #EDF1F7 with a very faint isometric grid that slides slowly.",
   "V4": "- Soft shapes with a wavy, gentle outline (no sharp corners), as if modeled in clay.\n- Every shape has volume: a radial gradient from light (top left) to dark, a blurred white highlight on top and a large soft shadow below. Very faint fingerprint marks.\n- Palette: object in coral (#FFB09C → #EC6248 → #B13E2C), support in blue (#A9C8FF → #3459B8), light peach gradient background.\n- Text in Fredoka (round and bold), with a vertical gradient and shadow.",
   "V5": "- Everything looks like cut and glued paper: torn, irregular edges, a white paper margin around, a short hard shadow below, every piece slightly crooked.\n- Kraft paper background #C9A37C with texture; scraps of newspaper and colored paper resting in the corners; translucent tape holding the main object.\n- Ransom-note letters: each letter on a different piece of paper (cream, black, yellow #E8C547, red #D8432A, blue #2F5DA8), with random font and rotation.\n- Main object in red #D8432A with a paper-fiber texture.",
   "V6": "- Printed in two overlapping inks (multiply effect): fluorescent pink #FF48B0 and blue #0078BF, on textured cream paper #F4EEE3.\n- The inks are slightly out of register (one offset about 10 px from the other); one of them as a halftone of dots.\n- Ink flaws: random white specks that move every 3 frames, as if the print were alive.\n- Text in Archivo Black, blue, with the pink offset behind the number.",
   "V7": "- A frosted glass card (780 × 1140 px, 64 px corners): it shows the blurred background behind it, with a 10% white veil, a 38% white border and a highlight on top.\n- Dark background #12162E with three large blurred light spots (violet #7B5CFF, cyan #00C2FF, pink #FF5FA2) slowly moving in circles.\n- Object in white, fading to transparent, with a soft glow around. White text in Manrope (number 800, word 600 with letter spacing).\n- The card moves with the piece; with a 3D camera, it tilts like a sheet of glass.",
   "V8": "- The image is made of characters on a fixed grid (10 × 16 px cells), like an old computer screen: each cell’s brightness picks the character from the scale \" .:-=+*%#@\".\n- Two phosphor colors: amber #FFB000 on the main object, green #3BFF8A on the text, over a near-black background #060906 with very faint scan lines and darkened edges.\n- Monospaced font (JetBrains Mono). About 3% of cells change character every frame, like static.\n- Draw the piece normally underneath and convert it to characters at the end of each frame.",
   "V9": "- Everything is made of round dots. No lines, outlines or solid areas: every shape is a dense cloud of dots, text included.\n- The dots are always light on the dark background, and the object must read from a distance. Light comes from bigger dots (up to 4 px) set closer together (one every 3 or 4 px); shadow, from smaller, sparser dots. Never dark or faded dots: a dot exists at full brightness or not at all. Random distribution, no visible grid.\n- Three colors: solid navy background #0F1B2D; gold dots #C9A24C on the main object; cream dots #F3EDE2 on text and the lightest parts.\n- The dots never stand still: each one jitters less than 1 px. About 140 faint cream dust grains drift slowly across the background.\n- Headlines in a serif (Fraunces), supporting text in a sans serif (Manrope), letter-spaced.\n- With a reference image (photo, logo, drawing): redraw the image in dots, like this:\n  1. A plain background (white, preferably) and a single object. The background touching the edges disappears; whatever is inside the object (the text on a package) stays part of the object.\n  2. Crop to the object only. It takes up about 70% of the frame width.\n  3. Dark drawing on a light background (almost every logo): invert it, so the drawing becomes light dots.\n  4. Thin strokes must not vanish: thicken the drawing first (about 6 px at final size).\n  5. Dots on a 3 to 7 px grid with randomized positions. The image tone becomes size (lighter is bigger) and color (gold on the main drawing, cream on details and letters); opacity never drops below 60%.\n  6. Fade the base if the figure would end in a straight cut (the bottom 20%).\n  7. The page has a \"Choose image\" button: the person picks the file and it turns into dots right there (works when opened with a double click). If there is a `logo.png` in the same folder, the page uses it on its own, which is the path for recording video.\n- This recipe comes from Forster’s grain engine and uses two ideas from Fernando Araújo’s pointillism skill (BRABO, MIT license): inverting dark drawings and fading the base.",
   "V10": "- Only the tool’s box, redrawn, large and centered: 900 × 1240 px, 48 px corners, white, with a light gray border #E1E5EC and a wide soft shadow. On top, a bar with three gray dots and a thin line below.\n- Light bluish-gray background, a gradient from the center (#F4F6FA) to the edges (#DCE1EA). Nothing from the real interface besides the box.\n- Text in DM Sans: primary #1B1F2A, secondary #6A7182. Blue accent #3D6BFF (button, icon, checkmark).\n- Flat: no texture, no 3D, no shine.",
   "V11": "- The same card as V10, but dark (#16171C at 92%), with a 10% white border and the top dots in 18% white.\n- Behind the card, the actual result of what the tool does (the product photo, the generated image), full screen, blurred (26 px), dark (brightness at 42%) and slowly zooming. The edges darken.\n- White text in DM Sans; light blue accent #7AA2FF.\n- It links the tool to what it produces: the result shows behind it the whole time.",
   "M0": "- The main object grows in from 0 with an overshoot (0.55 s) and turns from -25 degrees to 0.\n- The number counts from 0 to the final value in 1.1 s, braking at the end; the word comes in letter by letter, rising 40 px, 0.025 s between letters.\n- At 2.5 s, a pulse on the object (+10% and back with a bounce). Slow scale drift of the group the whole time. Duration: 4 s.",
   "M1": "- The letters are the motion. The number starts huge (2×) and each digit drops from above, spinning 50 degrees, with an overshoot, 0.2 s apart; a scale punch when the last one lands.\n- At 1.45 s, the number shrinks to normal size and moves down into place (0.5 s). The letters of the word arrive from random positions and rotations across the screen, in random order (0.55 s each, 0.025 s apart).\n- The object comes in last, spinning. At 3 s, a wave runs through the letters of the word (they rise 34 px and come back, one after another). Duration: 4 s.",
   "M2": "- The piece starts apart: the dots scattered across the screen, in a ring around the center, 260 to 950 px from where each one belongs.\n- From 0.1 s to 1.8 s, the dots return to their place on a smooth curve (slow start, fast middle, brake), each with a random delay of up to 0.45 s: the shape condenses in waves.\n- Once formed, the piece stays alive for about 1 s: a scale pulse at 2.2 s (+8% and back with a light bounce).\n- From 2.9 s to 4 s, it comes apart again, accelerating, as if blown away, and the dots fly back out.\n- Duration: 4 s, looping.",
   "M3": "- One shape turns into another without a cut: the outline is the same set of points (180, starting at the top, clockwise) that slides from one shape into the next.\n- A change every second (0.9 s, 1.9 s, 2.9 s), each change in 0.6 s with a small anticipation and overshoot, and a 14-degree turn that goes and comes back.\n- The text comes in at the start and stays. Duration: 4 s.",
   "M4": "- The object’s outline draws itself in front of the viewer, like a pen (1.2 s, constant speed), with a small dot marking the pen tip.\n- Once the outline is done, the fill comes in from inside (0.4 s). Then the number and the word write themselves from left to right, each with the pen tip running ahead.\n- At 3 s, a pulse on the object. Duration: 4 s.",
   "M5": "- The object appears through a round window that opens from its center (0.7 s).\n- Each line of text appears through a color band: the band grows from the left until it covers the line (0.35 s) and exits to the right, leaving the text (0.4 s). The second line starts 0.25 s later.\n- At 2.7 s, the window closes (0.35 s), the object changes shape and the window reopens (0.55 s). Duration: 4 s.",
   "M6": "- The scene is made of flat layers at different depths: the object, the number, the word and about ten small decorations (some behind, some in front, the front ones bigger and blurred).\n- A camera moves slowly on a diagonal and comes a little closer over the 4 s; each layer moves more or less according to its depth, which creates the sense of depth.\n- The elements fade in one after another in the first half second. Duration: 4 s.",
   "M7": "- The piece is a plane in space. The camera arrives from far away, tilted (50 degrees sideways, 22 up), and lands (0.65 s).\n- It dives in to the number, getting very close (0.6 s); sweeps to the object (0.5 s); and pulls back tilting the other way (0.6 s).\n- Nothing stays still for more than 1.5 s. Duration: 4 s.",
   "M8": "- Time moves in jumps: 8 frames per second (each image holds for 3 frames in a 24 fps video).\n- At each jump, everything jitters a little (up to 5 px and 1.2 degrees, random per jump) and the shapes’ outlines \"boil\" (the outline points move up to 3 px).\n- The object drops from above and bounces; the digits appear one at a time, every 0.25 s; the words appear one at a time. Duration: 4 s.",
   "M9": "- The piece comes in with a strong glitch that fades out in jumps (0.55 s). Two short glitches later, at 1.55 s and at 2.6 s.\n- The glitch: horizontal slices of the image shifted sideways (up to 160 px) and the color channels split (red one way, blue the other, up to 16 px). In the strongest glitch, the number briefly shows the wrong value.\n- Outside the glitches, the image stays clean. Duration: 4 s.",
   "M10": "No code recipe: each frame is drawn by hand; in rotoscoping, over filmed video. Ask an illustrator or an AI video tool.",
   "M11": "No code recipe: it depends on the recorded video. Video editors (Final Cut, Premiere, After Effects) pin the text or arrow to the moving object.",
   "M12": "- The prompt appears letter by letter, about 22 letters per second (0.045 s per letter), with the text cursor blinking at the end.\n- The card starts one line tall and grows smoothly with each new line.\n- Once typed: the mouse cursor moves to the send button (0.45 s) and clicks (shrinks to 82% and back, in 3 frames). The text disappears and the card opens to full size (0.6 s, smooth curve).\n- The result appears inside the card: the main element jumps in with a small overshoot (0.5 s), then the supporting text, letter by letter or line by line.\n- Duration: the typing time plus 2.6 s.",
   "M13": "- The cursor brings a file (a white paper thumbnail with the image and its name below) from off screen to the center of the box (0.85 s, smooth curve), with the file slightly tilted.\n- When the file enters, the drop area lights up: a dashed border in the accent color.\n- The cursor clicks and lets go; the file grows and fades, becoming the result, which jumps into the same spot; the number counts up and the word appears. Duration: 4.2 s.",
   "M14": "- The steps appear one by one inside the card, every 0.55 s: each with a spinning circle next to it, which turns into a checkmark with a small bounce 0.42 s later.\n- From the fourth step on, the content scrolls up inside the card; the camera stays still.\n- At the end, the list scrolls away and the result rises from below into place (0.7 s); the number counts up. Duration: about 5.2 s.",
   "M15": "- About 640 dots spread evenly over a sphere that spins the whole time, tilted 18 degrees. The front dots are bigger and stronger; the back ones, smaller and faint.\n- The dots arrive scattered and form the sphere (0.8 s). At 1.3 s, a band of light sweeps across the globe from one side to the other (0.9 s), lighting the dots it passes.\n- At 2.4 s the sphere \"breathes\" (grows 12% and back, twice). At 3.3 s, a tilted ring of dots goes into orbit around it. Duration: 4.6 s."
  },
  "geral": "- Movements last 0.4 to 0.6 seconds; nothing stays still for more than 1.5 seconds (always a slight scale drift, from 96% to 103%).\n- Smooth curves: start slow, speed up and brake; jumps with a small overshoot and settle.\n- One main thing at a time in the center of the screen; the bottom quarter of the frame stays free for captions.",
  "formato": "A single HTML file that runs in the browser, with the animation in a `<canvas>` (GSAP from cdnjs is fine). To record it frame by frame, the page exposes `window.cena = { duracao, fps: 24, pronto: true, irPara(t) }`, where `irPara(t)` draws exactly the instant `t`, without depending on the clock; and it only animates on its own, looping, when the address does not have `?render=1`. In `?render=1` mode, buttons and any other controls are hidden so they do not show up in the video.",
  "pedido": {
   "abre": "I want a short animation for a Reel (vertical, 1080 × 1920, about {s} seconds, looping) of:",
   "vazio": "[describe here what should appear]",
   "imagem": "Use the image I attached as a reference: redraw it in the style below, keeping the shape recognizable. The page needs a discreet \"Choose image\" button: when I choose the image file, it is turned into the style (do not draw the shape by hand). If there is a logo.png file in the same folder as the page, use it automatically, without the button.",
   "estilo": "Drawing style",
   "movimento": "Motion",
   "geral": "General rules",
   "formato": "Delivery format"
  }
 },
 "es": {
  "itens": {
   "V1": {
    "nome": "Flat",
    "oque": "Colores planos, sin sombra ni textura. Se lee rápido en cualquier pantalla.",
    "cabe": "Comercio (ofertas, fechas de promoción) y tecnología (un ícono por función)."
   },
   "V2": {
    "nome": "Trazo",
    "oque": "Solo líneas finas, como un dibujo a pluma. Calmo y elegante.",
    "cabe": "Salud: explicar un órgano, un examen, un procedimiento."
   },
   "V3": {
    "nome": "Isométrico",
    "oque": "Piezas en bloque vistas desde una esquina, como una maqueta.",
    "cabe": "Tecnología: servidores, flujos de trabajo, estructura."
   },
   "V4": {
    "nome": "Plastilina",
    "oque": "Formas suaves y brillantes, como modeladas en plastilina.",
    "cabe": "Marcas simpáticas, fechas festivas, salud explicada sin asustar."
   },
   "V5": {
    "nome": "Recorte y collage",
    "oque": "Papel recortado, cinta adhesiva y letras sacadas de revistas.",
    "cabe": "Comercio, moda, novedades de la tienda."
   },
   "V6": {
    "nome": "Risografía",
    "oque": "Dos tintas fuertes, un poco fuera de registro, con fallas de impresión.",
    "cabe": "Campañas de temporada, eventos, titulares con aire de afiche."
   },
   "V7": {
    "nome": "Vidrio esmerilado",
    "oque": "Una tarjeta translúcida sobre luces de colores desenfocadas. Aire de aplicación.",
    "cabe": "Pantallas de producto, paneles, un número de resultado."
   },
   "V8": {
    "nome": "ASCII",
    "oque": "La imagen hecha de letras y símbolos, como una pantalla de computadora antigua.",
    "cabe": "Tecnología, la apertura de un video técnico, un gancho."
   },
   "V9": {
    "nome": "Puntillismo",
    "oque": "La imagen hecha de miles de puntitos, con luz y sombra según el tamaño del punto.",
    "cabe": "Salud, ciencia, marcas que piden elegancia."
   },
   "V10": {
    "nome": "Tarjeta de interfaz",
    "oque": "Solo la caja de la herramienta, redibujada, grande y en el centro de la pantalla.",
    "cabe": "Demostración de una herramienta digital."
   },
   "V11": {
    "nome": "Tarjeta sobre el resultado",
    "oque": "La misma tarjeta, con el propio resultado desenfocado y oscuro detrás.",
    "cabe": "Una herramienta que genera algo: el resultado aparece detrás."
   },
   "M0": {
    "nome": "Entrada simple",
    "oque": "La pieza solo entra. Sirve para ver el visual solo.",
    "cabe": ""
   },
   "M1": {
    "nome": "Tipografía cinética",
    "oque": "Las letras y los números son el movimiento: caen, giran y encajan.",
    "cabe": "Titulares, precios, un número destacado."
   },
   "M2": {
    "nome": "Partículas",
    "oque": "La pieza se arma a partir de granos sueltos y después se deshace.",
    "cabe": "Ciencia, salud, algo que toma forma."
   },
   "M3": {
    "nome": "Morph",
    "oque": "Una forma se convierte en otra sin corte.",
    "cabe": "Explicar una transformación."
   },
   "M4": {
    "nome": "Dibujo en trazo",
    "oque": "El contorno se dibuja frente a quien mira y después se rellena.",
    "cabe": "Explicar paso a paso."
   },
   "M5": {
    "nome": "Revelado con máscara",
    "oque": "La pieza aparece por una ventana que se abre o por una franja que pasa.",
    "cabe": "Revelar un producto, antes y después."
   },
   "M6": {
    "nome": "Capas en profundidad",
    "oque": "Capas planas se mueven a distintas velocidades y dan sensación de fondo (2,5D).",
    "cabe": "Fotos de producto, ambientes."
   },
   "M7": {
    "nome": "Cámara 3D",
    "oque": "La pieza es un plano en el espacio; la cámara llega inclinada, se acerca y se aleja.",
    "cabe": "Pantallas de producto."
   },
   "M8": {
    "nome": "Stop motion",
    "oque": "Avanza a saltos, ocho cuadros por segundo, con un temblor leve.",
    "cabe": "Productos, aire de hecho a mano."
   },
   "M9": {
    "nome": "Glitch",
    "oque": "Falla digital: la imagen se parte, se desplaza y separa los colores.",
    "cabe": "Tecnología, el problema antes de la solución."
   },
   "M10": {
    "nome": "Cuadro a cuadro y rotoscopia",
    "oque": "Cada cuadro dibujado a mano; en la rotoscopia, sobre un video filmado.",
    "cabe": "Requiere ilustrador. Aperturas especiales, campañas."
   },
   "M11": {
    "nome": "Seguimiento",
    "oque": "Un texto o una flecha pegados a algo que se mueve en el video filmado.",
    "cabe": "Depende de la grabación; los editores de video ya lo hacen."
   },
   "M12": {
    "nome": "Escritura",
    "oque": "El pedido aparece letra por letra y la tarjeta crece con el texto.",
    "cabe": "Herramientas con IA, un pedido escrito."
   },
   "M13": {
    "nome": "Arrastrar y soltar",
    "oque": "El cursor trae un archivo a la caja y se convierte en el resultado.",
    "cabe": "Subir un archivo, la foto del producto."
   },
   "M14": {
    "nome": "Lista de progreso",
    "oque": "Los pasos aparecen uno por uno y reciben una marca de listo.",
    "cabe": "Procesos por etapas."
   },
   "M15": {
    "nome": "Esfera de puntos",
    "oque": "Puntos forman una esfera que gira, recibe una franja de luz, respira y gana un anillo en órbita.",
    "cabe": "Productos de IA, pantallas de espera, algo que piensa o trabaja."
   }
  },
  "combinacoes": [
   {
    "nome": "Granos que toman forma",
    "para": "Salud y ciencia"
   },
   {
    "nome": "Vidrio en el espacio",
    "para": "Pantallas de producto"
   },
   {
    "nome": "Collage a saltos",
    "para": "Comercio"
   },
   {
    "nome": "Foto en la caja",
    "para": "Demostración de herramienta"
   },
   {
    "nome": "Orbe de puntos",
    "para": "Productos de IA"
   }
  ],
  "refs": {
   "filmes": [
    {
     "titulo": "Microsoft Designer",
     "autor": "NotReal para Microsoft",
     "diz": "Un mundo suave de plastilina, con el pedido escrito en una barra sobre la escena. El resultado aparece en tarjetas que giran.",
     "momentos": [
      "una pincelada se convierte en cinta (morph)",
      "el pedido se escribe sobre la escena 3D",
      "la barra del pedido sobre el pastel, letra por letra",
      "el resultado aparece en tarjetas que giran",
      "la pieza terminada se arma en la pantalla"
     ]
    },
    {
     "titulo": "Windows 365",
     "autor": "Tendril para Microsoft",
     "diz": "La cámara entra en el monitor hasta el navegador, y las ventanas se vuelven placas de vidrio sueltas en el espacio. Es el mismo principio de nuestra cámara 3D.",
     "momentos": [
      "la cámara se sumerge en el monitor (cámara 3D)",
      "ventanas de vidrio saltan de la pantalla",
      "el cursor arrastra un archivo (arrastrar y soltar)",
      "servidores como cubos de vidrio, vistos desde una esquina",
      "un campo de cubitos (partículas)"
     ]
    },
    {
     "titulo": "Icon Celebration",
     "autor": "Tendril para Microsoft",
     "diz": "Los íconos nacen como dibujo técnico, en cuadrícula y contorno, y se vuelven bloques 3D. Las piezas se juntan como un rompecabezas.",
     "momentos": [
      "hojas y cuadrícula de dibujo técnico",
      "el contorno del ícono se dibuja en la cuadrícula (dibujo en trazo)",
      "una cinta se convierte en el ícono (morph)",
      "las piezas se juntan (montaje, todavía no está en el catálogo)",
      "íconos en bloques, vistos desde una esquina"
     ]
    },
    {
     "titulo": "Nuevo diseño de Microsoft 365 Copilot",
     "autor": "Microsoft Design",
     "diz": "Interfaz blanca y limpia, frases que aparecen palabra por palabra y pedidos escritos en la barra del asistente. Es casi exactamente nuestra tarjeta de interfaz.",
     "momentos": [
      "la frase aparece palabra por palabra (tipografía cinética)",
      "un ícono se convierte en el menú",
      "pedidos escritos en la barra \"Ask Copilot\"",
      "\"To offer you\": tipografía que cambia de tamaño",
      "el documento se escribe solo"
     ]
    },
    {
     "titulo": "Meet Copilot",
     "autor": "Microsoft",
     "diz": "Tarjetas de vidrio sobre el resultado colorido, y cada pedido se escribe en letras grandes, inclinadas en el espacio.",
     "momentos": [
      "la pregunta escrita en letras grandes, en perspectiva",
      "\"Generating output...\": el aviso de que está trabajando",
      "el pedido dentro del documento",
      "\"Create a 10 slide presentation\"",
      "una serie de pedidos, uno tras otro"
     ]
    },
    {
     "titulo": "Microsoft Planner",
     "autor": "Microsoft",
     "diz": "Paneles de vidrio inclinados y listas de tareas que se completan. Un botón al hacer clic explota en burbujas.",
     "momentos": [
      "el botón explota en burbujas (partículas)",
      "la lista de tareas se completa (lista de progreso)",
      "tarjetas en perspectiva (cámara 3D)",
      "piezas que corren sobre rieles",
      "la lista recibe las marcas de listo"
     ]
    },
    {
     "titulo": "Themes by Copilot en Outlook",
     "autor": "Microsoft",
     "diz": "El pedido se arma con etiquetas, la imagen generada entra detrás de la ventana y se vuelve el tema. Termina en un mosaico de pantallas en profundidad.",
     "momentos": [
      "burbujas de colores se vuelven la elección del tema",
      "el pedido armado con etiquetas",
      "la imagen generada entra detrás de la ventana (tarjeta sobre el resultado)",
      "la página gira y cambia el tema",
      "un mosaico de pantallas en profundidad"
     ]
    },
    {
     "titulo": "La nueva generación de OneDrive",
     "autor": "Microsoft",
     "diz": "\"Help me get organized\" se escribe en la búsqueda, aparece un ícono de nube de vidrio y las carpetas vuelan hasta ordenarse en una cuadrícula.",
     "momentos": [
      "\"Help me get organized\" escrito en la búsqueda",
      "la nube de vidrio",
      "una ondulación se convierte en la tarjeta (todavía no está en el catálogo)",
      "paneles en perspectiva",
      "las carpetas vuelan y encajan en una cuadrícula (todavía no está en el catálogo)"
     ]
    }
   ],
   "faltam": [
    {
     "nome": "Montaje por piezas",
     "oque": "Las partes llegan desde varios lados y encajan hasta formar el objeto. Lo contrario, la vista explotada, separa las piezas para mostrar lo que hay dentro.",
     "visto": "Icon Celebration, a los 15 s"
    },
    {
     "nome": "Encajar en cuadrícula",
     "oque": "Elementos sueltos vuelan y se ordenan en una cuadrícula prolija. Bueno para \"organizar\", \"reunir\", \"catálogo\".",
     "visto": "OneDrive, a los 48 s"
    },
    {
     "nome": "Ondulación",
     "oque": "Una onda se expande por la superficie, como una gota en el agua, y revela la pantalla siguiente.",
     "visto": "OneDrive, a los 10 s"
    },
    {
     "nome": "Cinta que se desliza",
     "oque": "Una cinta ancha cruza la pantalla, se dobla y se convierte en otra forma. Une una escena con otra sin corte.",
     "visto": "Microsoft Designer, a los 3 s; Icon Celebration, a los 11 s"
    }
   ]
  },
  "receitas": {
   "V1": "- Colores planos, sin sombra, sin degradé, sin textura. Formas simples y grandes, con esquinas levemente redondeadas.\n- Paleta de cuatro colores: fondo crema #F4EDE1; objeto principal naranja #E4572E; apoyo azul #2E86AB; texto y detalles azul oscuro #1D2A44. Un círculo grande de color claro (#F6CFAE) detrás del objeto principal, que se mueve con él.\n- Texto en Bricolage Grotesque: título muy grueso (800), apoyo seminegrita (600) espaciado.\n- Sin contornos; cuando haga falta separar formas, use otro color plano.",
   "V2": "- Solo líneas: trazo de 6 px, puntas y esquinas redondeadas, azul oscuro #1F2A44, sobre fondo de papel #FAF6EF con renglones muy claros.\n- Dentro de las formas, una segunda línea más fina (2,5 px) al 84% del tamaño y un rayado diagonal leve en terracota #C8553D. Nada de relleno plano.\n- Números en contorno (letra hueca, con serifa, Fraunces 600); palabras en Fraunces itálica.\n- Un detalle pequeño en terracota (un círculo, una marca) como toque de color.",
   "V3": "- La pieza está sobre una pared isométrica: inclinada 30 grados (las líneas horizontales suben hacia la derecha), como una maqueta vista desde una esquina.\n- Cada forma tiene espesor: la cara frontal en azul #4C7DF0 y el costado, más oscuro (#2A4BA6), desplazado hacia atrás y arriba unos 34 px. Una línea clara fina en el borde de la cara.\n- Números y letras también con espesor (cara amarilla #FFB547, costado casi negro #0E1626), en Space Grotesk grueso.\n- Fondo gris claro #EDF1F7 con la cuadrícula isométrica muy suave, que se desliza despacio.",
   "V4": "- Formas suaves, de contorno ondulado (nada de esquinas vivas), como modeladas en plastilina.\n- Cada forma tiene volumen: degradé radial de claro (arriba a la izquierda) a oscuro, un brillo blanco difuso arriba y una sombra grande y suave abajo. Marquitas de dedo muy leves.\n- Paleta: objeto en coral (#FFB09C → #EC6248 → #B13E2C), apoyo en azul (#A9C8FF → #3459B8), fondo durazno claro en degradé.\n- Texto en Fredoka (redondo y grueso), con degradé vertical y sombra.",
   "V5": "- Todo parece papel recortado y pegado: bordes rasgados e irregulares, un margen de papel blanco alrededor, sombra corta y dura abajo, cada pieza levemente torcida.\n- Fondo de papel kraft #C9A37C con textura; recortes de diario y de papel de color quietos en las esquinas; cinta adhesiva translúcida sosteniendo el objeto principal.\n- Letras de nota de rescate: cada letra en un pedazo de papel distinto (crema, negro, amarillo #E8C547, rojo #D8432A, azul #2F5DA8), con fuente y giro al azar.\n- Objeto principal en rojo #D8432A con textura de fibra de papel.",
   "V6": "- Impresión en dos tintas que se superponen (efecto multiplicar): rosa fluorescente #FF48B0 y azul #0078BF, sobre papel crema #F4EEE3 con textura.\n- Las tintas quedan un poco fuera de registro (una desplazada unos 10 px de la otra); una de ellas en trama de puntos.\n- Fallas de tinta: manchitas blancas al azar que cambian de lugar cada 3 cuadros, como si la impresión estuviera viva.\n- Texto en Archivo Black, azul, con el rosa desplazado detrás del número.",
   "V7": "- Una tarjeta de vidrio esmerilado (780 × 1140 px, esquinas de 64 px): muestra el fondo desenfocado detrás, con un velo blanco del 10%, borde blanco al 38% y un brillo arriba.\n- Fondo oscuro #12162E con tres manchas de luz grandes y desenfocadas (violeta #7B5CFF, cian #00C2FF, rosa #FF5FA2) que se mueven despacio en círculos.\n- Objeto en blanco con degradé a transparente y brillo suave alrededor. Texto blanco en Manrope (número 800, palabra 600 espaciada).\n- La tarjeta se mueve con la pieza; con una cámara 3D, se inclina como una placa de vidrio.",
   "V8": "- La imagen está hecha de caracteres en una cuadrícula fija (celdas de 10 × 16 px), como una pantalla de computadora antigua: la claridad de cada celda elige el carácter de la escala \" .:-=+*%#@\".\n- Dos colores de fósforo: ámbar #FFB000 en el objeto principal, verde #3BFF8A en el texto, sobre fondo casi negro #060906 con líneas de barrido muy suaves y los bordes oscurecidos.\n- Fuente monoespaciada (JetBrains Mono). Cerca del 3% de las celdas cambia de carácter en cada cuadro, como interferencia.\n- Dibuje la pieza normalmente debajo y conviértala en caracteres al final de cada cuadro.",
   "V9": "- Todo está hecho de puntos redondos. Nada de líneas, contornos o áreas planas: cada forma es una nube densa de puntos, incluido el texto.\n- Los puntos siempre son claros sobre el fondo oscuro, y el objeto tiene que leerse de lejos. La luz se hace con puntos más grandes (hasta 4 px) y más juntos (uno cada 3 o 4 px); la sombra, con puntos más chicos y más separados. Nunca con puntos oscuros o apagados: un punto existe con brillo total o no existe. La distribución es al azar, sin cuadrícula visible.\n- Tres colores: fondo azul marino plano #0F1B2D; puntos dorados #C9A24C en el objeto principal; puntos crema #F3EDE2 en el texto y en las partes más claras.\n- Los puntos nunca quedan quietos: cada uno tiembla menos de 1 px. Unos 140 granos de polvo crema, muy transparentes, cruzan el fondo despacio.\n- Títulos con serifa (Fraunces), apoyo sin serifa (Manrope), espaciado.\n- Con imagen de referencia (foto, logo, dibujo): redibujar la imagen en puntos, así:\n  1. Fondo liso (blanco, de preferencia) y un solo objeto. El fondo que toca los bordes desaparece; lo que está dentro del objeto (el texto de un envase) sigue siendo objeto.\n  2. Recortar solo el objeto. Ocupa cerca del 70% del ancho del cuadro.\n  3. Dibujo oscuro sobre fondo claro (casi todo logo): invertirlo, para que el dibujo se vuelva punto claro.\n  4. Los trazos finos no pueden desaparecer: engrosar el dibujo antes (unos 6 px en el tamaño final).\n  5. Puntos en una cuadrícula de 3 a 7 px con la posición al azar. El tono de la imagen se vuelve tamaño (claro, más grande) y color (dorado en el dibujo principal, crema en los detalles y las letras); la opacidad nunca baja del 60%.\n  6. Esfumar la base si la figura terminaría en un corte recto (el 20% de abajo).\n  7. La página tiene un botón \"Elegir imagen\": la persona elige el archivo y se vuelve puntos ahí mismo (funciona abierta con doble clic). Si hay un `logo.png` en la misma carpeta, la página lo usa sola, que es el camino para grabar video.\n- Esta receta viene del motor de granos de Forster y usa dos ideas de la skill de puntillismo de Fernando Araújo (BRABO, licencia MIT): invertir el dibujo oscuro y esfumar la base.",
   "V10": "- Solo la caja de la herramienta, redibujada, grande y en el centro: 900 × 1240 px, esquinas de 48 px, blanca, con borde gris claro #E1E5EC y sombra amplia y suave. Arriba, una barra con tres puntitos grises y una línea fina debajo.\n- Fondo gris azulado claro, en degradé del centro (#F4F6FA) a los bordes (#DCE1EA). Nada de la interfaz real además de la caja.\n- Texto en DM Sans: principal #1B1F2A, secundario #6A7182. Color de acento azul #3D6BFF (botón, ícono, marca de listo).\n- Plano: sin textura, sin 3D, sin brillo.",
   "V11": "- La misma tarjeta del V10, pero oscura (#16171C al 92%), con borde blanco al 10% y los puntitos de arriba en blanco al 18%.\n- Detrás de la tarjeta, el propio resultado de lo que hace la herramienta (la foto del producto, la imagen generada), en pantalla completa, desenfocado (26 px), oscuro (brillo al 42%) y con un zoom lento. Los bordes se oscurecen.\n- Texto blanco en DM Sans; acento azul claro #7AA2FF.\n- Une la herramienta con lo que produce: el resultado aparece detrás todo el tiempo.",
   "M0": "- El objeto principal entra creciendo desde 0 con un pequeño exceso (0,55 s) y un giro de -25 grados a 0.\n- El número cuenta de 0 al valor final en 1,1 s, frenando al final; la palabra entra letra por letra, subiendo 40 px, 0,025 s entre letras.\n- A los 2,5 s, un pulso en el objeto (+10% y vuelta con rebote). Deriva lenta de escala del grupo todo el tiempo. Duración: 4 s.",
   "M1": "- Las letras son el movimiento. El número empieza gigante (2 veces) y cada dígito cae desde arriba, girando 50 grados, con un pequeño exceso, 0,2 s entre ellos; un golpe de escala cuando llega el último.\n- A los 1,45 s, el número se achica al tamaño normal y baja a su lugar (0,5 s). Las letras de la palabra llegan desde posiciones y giros al azar por toda la pantalla, en orden al azar (0,55 s cada una, 0,025 s entre ellas).\n- El objeto entra al final, girando. A los 3 s, una ola pasa por las letras de la palabra (suben 34 px y vuelven, una tras otra). Duración: 4 s.",
   "M2": "- La pieza empieza deshecha: los puntos dispersos por la pantalla, en un anillo alrededor del centro, a 260 a 950 px del lugar de cada uno.\n- De 0,1 s a 1,8 s, los puntos vuelven a su lugar con curva suave (salen despacio, corren, frenan), cada uno con un retraso al azar de hasta 0,45 s: la forma se condensa en olas.\n- Formada, la pieza queda viva cerca de 1 s: un pulso de escala a los 2,2 s (+8% y vuelta con un rebote leve).\n- De 2,9 s a 4 s, se deshace otra vez, acelerando, como si la soplaran, y los puntos vuelven lejos.\n- Duración: 4 s, en bucle.",
   "M3": "- Una forma se convierte en otra sin corte: el contorno es el mismo conjunto de puntos (180, empezando arriba, en sentido horario) que se desliza de una forma a la otra.\n- Un cambio cada segundo (0,9 s, 1,9 s, 2,9 s), cada uno en 0,6 s con un pequeño amago y exceso, y un giro de 14 grados que va y vuelve.\n- El texto entra al principio y se queda. Duración: 4 s.",
   "M4": "- El contorno del objeto se dibuja frente a quien mira, como una pluma (1,2 s, velocidad constante), con un puntito marcando la punta.\n- Terminado el contorno, el relleno entra por dentro (0,4 s). Después el número y la palabra se escriben de izquierda a derecha, cada uno con la punta corriendo adelante.\n- A los 3 s, un pulso en el objeto. Duración: 4 s.",
   "M5": "- El objeto aparece por una ventana redonda que se abre desde su centro (0,7 s).\n- Cada línea de texto aparece por una franja de color: la franja crece desde la izquierda hasta cubrir la línea (0,35 s) y sale por la derecha, dejando el texto (0,4 s). La segunda línea empieza 0,25 s después.\n- A los 2,7 s, la ventana se cierra (0,35 s), el objeto cambia de forma y la ventana se vuelve a abrir (0,55 s). Duración: 4 s.",
   "M6": "- La escena está hecha de capas planas a distintas profundidades: el objeto, el número, la palabra y unos diez adornos pequeños (algunos detrás, algunos adelante; los de adelante, más grandes y desenfocados).\n- Una cámara se mueve despacio en diagonal y se acerca un poco durante los 4 s; cada capa se mueve más o menos según su profundidad, lo que da la sensación de fondo.\n- Los elementos aparecen uno tras otro en el primer medio segundo. Duración: 4 s.",
   "M7": "- La pieza es un plano en el espacio. La cámara llega desde lejos, inclinada (50 grados de costado, 22 hacia arriba), y se posa (0,65 s).\n- Se acerca al número, quedando muy cerca (0,6 s); barre hasta el objeto (0,5 s); y se aleja inclinándose hacia el otro lado (0,6 s).\n- Nada queda quieto más de 1,5 s. Duración: 4 s.",
   "M8": "- El tiempo avanza a saltos: 8 cuadros por segundo (cada imagen dura 3 cuadros en un video de 24).\n- En cada salto, todo tiembla un poco (hasta 5 px y 1,2 grados, al azar por salto) y el contorno de las formas \"hierve\" (los puntos del contorno se mueven hasta 3 px).\n- El objeto cae desde arriba y rebota; los dígitos aparecen de a uno, cada 0,25 s; las palabras aparecen de a una. Duración: 4 s.",
   "M9": "- La pieza entra con una falla fuerte que va desapareciendo a saltos (0,55 s). Dos fallas cortas después, a los 1,55 s y a los 2,6 s.\n- La falla: franjas horizontales de la imagen desplazadas hacia los lados (hasta 160 px) y los canales de color separados (rojo hacia un lado, azul hacia el otro, hasta 16 px). En la falla más fuerte, el número aparece cambiado por un instante.\n- Fuera de las fallas, la imagen queda limpia. Duración: 4 s.",
   "M10": "Sin receta en código: cada cuadro se dibuja a mano; en la rotoscopia, sobre un video filmado. Pídalo a un ilustrador o a una herramienta de video con IA.",
   "M11": "Sin receta en código: depende del video grabado. Los editores de video (Final Cut, Premiere, After Effects) pegan el texto o la flecha al objeto que se mueve.",
   "M12": "- El pedido aparece letra por letra, unas 22 letras por segundo (0,045 s por letra), con el cursor de texto parpadeando al final.\n- La tarjeta empieza con la altura de una línea y crece suavemente con cada línea nueva.\n- Terminado el texto: el cursor del mouse va hasta el botón de enviar (0,45 s) y hace clic (se achica al 82% y vuelve, en 3 cuadros). El texto desaparece y la tarjeta se abre a tamaño completo (0,6 s, curva suave).\n- El resultado aparece dentro de la tarjeta: el elemento principal salta con un pequeño exceso (0,5 s), después el texto de apoyo, letra por letra o línea por línea.\n- Duración: el tiempo de escritura más 2,6 s.",
   "M13": "- El cursor trae un archivo (una miniatura de papel blanco con la imagen y el nombre debajo) desde fuera de la pantalla hasta el centro de la caja (0,85 s, curva suave), con el archivo un poco torcido.\n- Cuando el archivo entra, el área para soltar se enciende: un borde punteado en el color de acento.\n- El cursor hace clic y suelta; el archivo crece y desaparece, convirtiéndose en el resultado, que salta en el mismo lugar; el número cuenta y aparece la palabra. Duración: 4,2 s.",
   "M14": "- Los pasos aparecen uno por uno dentro de la tarjeta, cada 0,55 s: cada uno con un círculo girando al lado, que se vuelve una marca de listo con un pequeño rebote 0,42 s después.\n- Del cuarto paso en adelante, el contenido se desplaza hacia arriba dentro de la tarjeta; la cámara queda quieta.\n- Al final, la lista sale hacia arriba y el resultado sube desde abajo a su lugar (0,7 s); el número cuenta. Duración: cerca de 5,2 s.",
   "M15": "- Unos 640 puntos repartidos por igual en una esfera que gira todo el tiempo, inclinada 18 grados. Los puntos de adelante son más grandes y fuertes; los de atrás, más chicos y tenues.\n- Los puntos llegan dispersos y forman la esfera (0,8 s). A los 1,3 s, una franja de luz barre el globo de un lado al otro (0,9 s), encendiendo los puntos por donde pasa.\n- A los 2,4 s la esfera \"respira\" (crece 12% y vuelve, dos veces). A los 3,3 s, un anillo inclinado de puntos entra en órbita a su alrededor. Duración: 4,6 s."
  },
  "geral": "- Movimientos de 0,4 a 0,6 segundos; nada queda quieto más de 1,5 segundos (siempre una deriva leve de escala, de 96% a 103%).\n- Curvas suaves: empieza lento, acelera y frena; saltos con un pequeño exceso y vuelta.\n- Una cosa principal por vez en el centro de la pantalla; el cuarto inferior del cuadro queda libre para los subtítulos.",
  "formato": "Un único archivo HTML que funciona en el navegador, con la animación en un `<canvas>` (se puede usar GSAP desde cdnjs). Para grabarla cuadro a cuadro, la página expone `window.cena = { duracao, fps: 24, pronto: true, irPara(t) }`, donde `irPara(t)` dibuja exactamente el instante `t`, sin depender del reloj; y solo se anima sola, en bucle, cuando la dirección no tiene `?render=1`. En el modo `?render=1`, los botones y cualquier otro control quedan ocultos para que no aparezcan en el video.",
  "pedido": {
   "abre": "Quiero una animación corta para Reel (vertical, 1080 × 1920, de unos {s} segundos, en bucle) de:",
   "vazio": "[describa aquí lo que debe aparecer]",
   "imagem": "Use la imagen que adjunté como referencia: redibújela en el estilo de abajo, manteniendo la forma reconocible. La página necesita un botón discreto \"Elegir imagen\": cuando elija el archivo de la imagen, se transforma en el estilo (no dibuje la forma a mano). Si existe un archivo logo.png en la misma carpeta de la página, úselo automáticamente, sin necesidad del botón.",
   "estilo": "Estilo de dibujo",
   "movimento": "Movimiento",
   "geral": "Reglas generales",
   "formato": "Formato de entrega"
  }
 }
};

window.aplicarLingua = function (lingua) {
  window.LINGUA = lingua || 'pt';
  const T = window.TRADUCOES[lingua];
  if (!T) return;   // pt (ou língua desconhecida): fica como está
  if (window.MI) {
    for (const v of window.MI.visuais) Object.assign(v, T.itens['V' + v.n] || {});
    for (const m of window.MI.movimentos) Object.assign(m, T.itens['M' + m.n] || {});
    window.MI.combinacoes.forEach((c, i) => Object.assign(c, T.combinacoes[i] || {}));
  }
  if (window.REFS) {
    window.REFS.filmes.forEach((f, i) => {
      const t = T.refs.filmes[i]; if (!t) return;
      f.titulo = t.titulo; f.autor = t.autor; f.diz = t.diz;
      f.momentos = f.momentos.map(([s], j) => [s, t.momentos[j]]);
    });
    window.REFS.faltam = T.refs.faltam;
  }
  if (window.RECEITAS) {
    Object.assign(window.RECEITAS, T.receitas);
    window.RECEITAS_GERAL = T.geral; window.RECEITAS_FORMATO = T.formato;
    const P = T.pedido;
    window.pedidoAberto = function ({ v, m, nomeV, nomeM, assunto, comImagem, segundos }) {
      const R = window.RECEITAS;
      let p = `${P.abre.replace('{s}', segundos || 4)}\n${assunto || P.vazio}\n`;
      if (comImagem) p += `\n${P.imagem}\n`;
      p += `\n${P.estilo}: V${v} ${nomeV}\n${R['V' + v]}\n\n${P.movimento}: M${m} ${nomeM}\n${R['M' + m]}\n\n${P.geral}:\n${window.RECEITAS_GERAL}\n\n${P.formato}:\n${window.RECEITAS_FORMATO}`;
      return p;
    };
  }
};
