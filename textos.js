/* textos.js — Risca & Mexe
   Os textos fixos das páginas (menus, títulos, botões, passos, notas a lápis, rodapé e o pedido "com a peça do
   catálogo") em português, inglês e espanhol, um dicionário por língua. Os dados do catálogo ficam em traducoes.js.
   A língua vem do endereço: ?lang=en ou ?lang=es; sem nada é português.
   Carregar no <head>: ele marca o <html lang> e esconde a página até os textos trocarem (o português não pisca).
   Na página: aplicarLingua(LINGUA) e aplicarTextos() antes de montar qualquer coisa; linkar() no fim, para os links
   levarem a língua junto. No HTML: data-t="chave" troca o texto, data-th="chave" troca o HTML e
   data-ta="atributo:chave" troca um atributo. */
(function () {
  const pedida = new URLSearchParams(location.search).get('lang');
  const L = pedida === 'en' || pedida === 'es' ? pedida : 'pt';
  const raiz = document.documentElement;
  window.LINGUA = L;
  window.PASTA = L === 'pt' ? '' : L + '/';   // os vídeos e as miniaturas de cada língua: v/en/, capas/en/
  raiz.lang = { pt: 'pt-BR', en: 'en', es: 'es' }[L];
  if (L !== 'pt') { raiz.classList.add('traduzindo'); setTimeout(() => raiz.classList.remove('traduzindo'), 2500); }   // se algo falhar, a página aparece mesmo assim

  const TEXTOS = {
    pt: {
      navIndice: 'Índice', navMesa: 'Mesa de combinação', navRefs: 'Referências', navContribuir: 'Contribuir no GitHub',
      lingua: 'Língua',
      rodapeFeito: 'Risca & Mexe · código aberto, licença MIT · feito pela FORSTER em Igrejinha, Rio Grande do Sul, Brasil',
      rodapeEstilo: 'Quer mandar um estilo novo? O passo a passo está no GitHub.',
      rodapeCredito: 'A receita do pontilhismo usa ideias da skill de pontilhismo de Fernando Araújo (BRABO, licença MIT).',
      visual: 'Visual', movimento: 'Movimento', semModelo: 'sem modelo',
      frase: (v, m) => `${v} com ${m}`,
      // índice
      capa: 'Capa',
      sub: 'Um índice aberto de estilos de animação.<b>Toda animação é duas escolhas: como ela é desenhada e como ela se mexe. Escolhe uma de cada e vê ao vivo.</b>',
      etiqueta: 'feito pela',
      notaCapa: 'cada cartão é um estilo, rodando de verdade',
      legendasCapa: ['pontilhismo', 'vidro 3D', 'recorte', 'digitação', 'traço', 'ascii', 'colagem', 'massinha'],
      indice: 'Índice',
      notaIndice: 'o visual é o desenho; o movimento é o jeito de mexer. Qualquer um combina com qualquer outro, menos os de interface (M12 a M14), que pedem um cartão: V7, V10 ou V11.',
      combinacoes: 'Combinações', referencias: 'Referências',
      cap1: 'Capítulo um · como é desenhado', cap2: 'Capítulo dois · como se mexe', cap3: 'Capítulo três · um de cada', cap4: 'Capítulo quatro · filmes de verdade',
      // item
      capituloV: 'Capítulo um · Visual', capituloM: 'Capítulo dois · Movimento',
      eixoV: 'O visual: como é desenhado', eixoM: 'O movimento: como se mexe',
      ondeCabe: 'Onde cabe:',
      explicaRef: 'Este movimento fica no catálogo como referência: não tem modelo no motor, então não abre na mesa de combinação.',
      explicaInter: 'Este é um dos eixos. Este movimento acontece dentro do cartão de uma ferramenta, então combina com os visuais que têm cartão: V7, V10 e V11.',
      explicaV: 'Este é um dos eixos. O desenho não decide o movimento: qualquer movimento do catálogo pode ser aplicado a ele, do mais calmo ao mais agitado.',
      explicaVcartao: ' Só os de interface (M12 a M14) pedem um visual com cartão.',
      explicaM: 'Este é um dos eixos. O movimento não decide o desenho: ele funciona com qualquer visual do catálogo, do chapado ao pontilhismo.',
      notaInter: 'aqui o visual é o cartão de interface: é nele que este movimento acontece',
      notaV: 'compara com os outros visuais: a peça é sempre a mesma, só muda o desenho',
      notaM: 'aqui o visual é sempre o chapado, para ver só o movimento',
      combinaV: 'Combina com um movimento', combinaM: 'Combina com um visual',
      abrirMesa: 'Abrir na mesa de combinação',
      pag: (k, n) => `${k} de ${n}`,
      naVidaReal: 'Na vida real',
      vidaLead: c => `Filmes de verdade que usam o ${c}. Cada um abre na página de referências, com os momentos marcados.`,
      vidaNota: 'Nos filmes, o desenho é 3D; aqui o estilo é o mesmo, desenhado em 2D.',
      marcaV: 'o visual mais perto deste', marcaM: 'é o movimento principal', apareceJunto: 'aparece junto',
      comoFazer: 'Como fazer',
      receitaRef: (c, nome) => `O ${c} ${nome} não tem receita no motor. O caminho é este:`,
      receitaLead: (c, nome) => `As regras do ${c} ${nome}, para quem quiser animar sem IA, em qualquer ferramenta.`,
      semReceita: 'A receita deste item ainda não foi escrita.',
      // mesa
      tituloMesa: 'Mesa de combinação · Risca & Mexe', mesa: 'Mesa de combinação',
      mesaLead: 'Um visual de um lado, um movimento do outro. A cena roda aqui mesmo.',
      mesaMao: 'clica num de cada lado e a peça muda na hora',
      comoDesenhado: 'como é desenhado', comoMexe: 'como se mexe',
      cenaTitulo: 'A combinação rodando', combinaTag: 'combina',
      avisoAntes: 'O', avisoMeio: 'acontece num cartão de interface: combina com', ou: 'ou',
      aoVivo: 'ao vivo',
      levar: 'Levar esta cena para a IA ↓',
      nota2: 'a cena vira um pedido pronto para colar no Claude, no ChatGPT ou em outra IA',
      comoUsar: 'Como usar com IA',
      passo1t: 'Escolhe a combinação', passo1p: 'Um visual e um movimento na mesa acima. O pedido muda junto.',
      passo2t: 'Preenche o teu assunto', passo2p: 'Troca o que está entre colchetes: o que aparece no lugar da estrela, a palavra, o número e as cores da tua marca. Pode escrever do teu jeito.',
      passo2tTeu: 'Descreve o teu assunto', passo2pTeu: 'Escreve no campo ao lado o que deve aparecer: o produto, o logo, uma frase, um número. Se for usar uma imagem, marca a caixa e anexa a imagem junto com o pedido.',
      passo3t: 'Cola numa IA que escreve código',
      passo3p: 'Claude, ChatGPT ou outra. Ela usa o motor aberto do Risca & Mexe e devolve uma página que roda a animação no navegador.',
      passo3pTeu: 'Claude, ChatGPT ou outra. O pedido leva a receita do visual e do movimento, e ela devolve uma página que roda a animação no navegador.',
      passo4t: 'Grava em vídeo', passo4p: 'O motor grava a página quadro a quadro, sem tremer nem perder qualidade. O passo a passo está no README do projeto, no GitHub. Para um teste rápido, gravar a tela também serve.',
      nota3: 'a IA não precisa saber nada de animação: o pedido já explica tudo para ela',
      doisJeitos: 'Dois jeitos de pedir', abaCatalogo: 'Com a peça do catálogo', abaTeu: 'Do teu jeito',
      pedidoTitulo: 'O pedido para a IA',
      copiar: 'Copiar o pedido', copiarCodigo: 'Copiar só o código', copiado: 'Copiado', selecionado: 'Selecionado, é só copiar',
      avisoCodigo: '"Copiar só o código" é para quem já tem o motor do Risca & Mexe no projeto: é a linha que monta esta cena.',
      campoRotulo: 'O que vai aparecer na animação',
      campoExemplo: 'ex.: o logo da padaria, com a frase "Pão quente às 17h"',
      comImagem: 'Vou anexar uma imagem (meu logo, uma foto)',
      avisoImagem: 'Com imagem: a página que a IA devolver tem um botão "Escolher imagem". Para ela carregar a imagem sozinha, salva o arquivo como <code>logo.png</code> na mesma pasta da página e abre a página por um servidor local. Aberta com dois cliques, o navegador bloqueia a imagem.',
      // o pedido "com a peça do catálogo" (os nomes dos campos do motor ficam em português: são código)
      pedido: {
        duracao: { 12: 'cerca de 5 segundos', 13: '4,2 segundos', 14: '5,2 segundos', 15: '4,6 segundos', padrao: '4 segundos' },
        segundos: { 12: 5, 13: '4,2', 14: '5,2', 15: '4,6', padrao: 4 },   // o pedido do teu jeito já escreve "cerca de"
        abre: d => `Quero uma animação curta (${d}, vertical, 1080 × 1920) no estilo Risca & Mexe:`,
        visual: 'visual', movimento: 'com o movimento',
        motor: u => `Use o motor aberto do Risca & Mexe (${u}): os arquivos nucleo.js, visuais.js e movimentos.js. A cena é montada assim:`,
        campos: 'Campos que o montar aceita:',
        base: [
          '- palavra: o texto embaixo do número.',
          '- valor: o número, escrito com ponto nos decimais (4.9, 120, 1200). Na tela ele sai com as mesmas casas decimais, no formato brasileiro: 4,9 · 120 · 1.200.',
          '- prefixo e sufixo: o que vem antes e depois do número, como "+" ou "%".',
          '- duracao: a duração em segundos, para encaixar no corte.',
          '- formas: para trocar a estrela. Antes do montar, crie a forma com Catalogo.novaForma("nome", pontos), com os pontos do contorno como [x, y], em sentido horário e começando no alto, e passe formas: ["nome"].',
        ],
        m3: ['- no M3, formas é a sequência que se transforma, uma na outra: ["estrela", "nome", "circulo", "estrela"].'],
        m12: ['- pedido: o texto que aparece sendo digitado no cartão. A duração acompanha o tamanho do texto.', '- o texto digitado:', '[ex.: Uma estrela com a nota 4,9 dos clientes]'],
        m13: ['- arquivo: o nome do arquivo que o cursor arrasta para dentro da caixa.', '- o nome do arquivo:', '[ex.: foto-do-produto.png]'],
        m14: ['- passos: a lista de passos, na ordem em que aparecem, como ["Lendo o pedido", "Pronto"].', '- os passos:', '[ex.: Lendo o pedido, Escolhendo as cores, Pronto]'],
        v11: ['- resultado: o endereço da imagem que fica borrada e escura atrás do cartão.', '- a imagem do resultado:', '[o arquivo ou o endereço da imagem]'],
        troque: 'Troque a peça de exemplo (a estrela, a nota e a palavra) pelo meu assunto:',
        assunto: [['- o que aparece no lugar da estrela:', '[descreva aqui]'], ['- a palavra:', '[ex.: CLIENTES ATENDIDOS]'], ['- o número:', '[ex.: 4,9 · +120 · 98%]']],
        cores: ['- as cores da minha marca:', '[ex.: azul-escuro #0F1B2D e dourado #C9A24C]'],
        fim: ['Mantenha o ritmo do estilo: movimentos de 0,4 a 0,6 segundo e nada parado por mais de 1,5 segundo.', 'Me devolva um arquivo HTML único, que rode no navegador, com a animação em laço.'],
      },
      // referências
      tituloRefs: 'Da referência ao código · Risca & Mexe', refsH1: 'Da referência ao código',
      refsLead: 'Filmes de verdade, lidos nos dois eixos. Toca o filme, vê o que ele usa e leva a mesma ideia para a mesa.',
      refsMao: 'os filmes tocam pelo YouTube, com o crédito de quem fez',
      tocar: 'Tocar o filme', noCanal: c => `no canal ${c} do YouTube`, encontradoNo: 'encontrado no',
      refN: (i, n) => `Referência ${i} de ${n}`, tambem: 'Também aparece:', abrirNaMesa: p => `Abrir ${p} na mesa`,
      filmeTitulo: 'Filme de referência',
      faltaRotulo: 'O que ainda falta no catálogo', faltaH2: 'O que esses filmes fazem e o catálogo ainda não tem',
      faltaLead: 'Movimentos que aparecem nas referências e ainda não viraram item do Risca & Mexe. Cada um pode virar um M novo, feito por nós ou por quem quiser contribuir.',
      apareceEm: 'Aparece em:',
      verMomentos: n => `ver os ${n} momentos`,
      // página não encontrada
      titulo404: 'Página não encontrada · Risca & Mexe', naoEncontrada: 'Página não encontrada',
      naoEncontradaFrase: 'Esse endereço não existe ou mudou de lugar. O catálogo continua aqui:',
      irIndice: 'Ir para o índice', irMesa: 'Abrir a mesa de combinação',
    },

    en: {
      navIndice: 'Index', navMesa: 'Combination table', navRefs: 'References', navContribuir: 'Contribute on GitHub',
      lingua: 'Language',
      rodapeFeito: 'Risca & Mexe · open source, MIT license · made by FORSTER in Igrejinha, Rio Grande do Sul, Brazil',
      rodapeEstilo: 'Want to send a new style? The step-by-step guide is on GitHub.',
      rodapeCredito: 'The pointillism recipe uses ideas from Fernando Araújo’s pointillism skill (BRABO, MIT license).',
      visual: 'Visual', movimento: 'Motion', semModelo: 'no template',
      frase: (v, m) => `${v} with ${m}`,
      capa: 'Cover',
      sub: 'Draw &amp; move · an open index of animation styles.<b>Every animation is two choices: how it is drawn and how it moves. Pick one of each and watch it live.</b>',
      etiqueta: 'made by',
      notaCapa: 'each card is a style, running for real',
      legendasCapa: ['pointillism', '3D glass', 'cut-out', 'typing', 'line art', 'ascii', 'collage', 'clay'],
      indice: 'Index',
      notaIndice: 'the visual is the drawing; the motion is the way it moves. Any one works with any other, except the interface ones (M12 to M14), which need a card: V7, V10 or V11.',
      combinacoes: 'Combinations', referencias: 'References',
      cap1: 'Chapter one · how it is drawn', cap2: 'Chapter two · how it moves', cap3: 'Chapter three · one of each', cap4: 'Chapter four · real films',
      capituloV: 'Chapter one · Visual', capituloM: 'Chapter two · Motion',
      eixoV: 'The visual: how it is drawn', eixoM: 'The motion: how it moves',
      ondeCabe: 'Where it fits:',
      explicaRef: 'This motion stays in the catalog as a reference: it has no template in the engine, so it does not open on the combination table.',
      explicaInter: 'This is one of the axes. This motion happens inside a tool’s card, so it works with the visuals that have a card: V7, V10 and V11.',
      explicaV: 'This is one of the axes. The drawing does not decide the motion: any motion in the catalog can be applied to it, from the calmest to the busiest.',
      explicaVcartao: ' Only the interface ones (M12 to M14) need a visual with a card.',
      explicaM: 'This is one of the axes. The motion does not decide the drawing: it works with any visual in the catalog, from flat color to pointillism.',
      notaInter: 'here the visual is the interface card: that is where this motion happens',
      notaV: 'compare it with the other visuals: the piece is always the same, only the drawing changes',
      notaM: 'here the visual is always flat, so you see only the motion',
      combinaV: 'Pairs with a motion', combinaM: 'Pairs with a visual',
      abrirMesa: 'Open on the combination table',
      pag: (k, n) => `${k} of ${n}`,
      naVidaReal: 'In real life',
      vidaLead: c => `Real films that use ${c}. Each one opens on the references page, with the moments marked.`,
      vidaNota: 'In the films, the drawing is 3D; here the style is the same, drawn in 2D.',
      marcaV: 'the closest visual to this one', marcaM: 'the main motion', apareceJunto: 'also appears',
      comoFazer: 'How to make it',
      receitaRef: (c, nome) => `${c} ${nome} has no recipe in the engine. This is the way:`,
      receitaLead: (c, nome) => `The rules of ${c} ${nome}, for anyone who wants to animate without AI, in any tool.`,
      semReceita: 'The recipe for this item has not been written yet.',
      tituloMesa: 'Combination table · Risca & Mexe', mesa: 'Combination table',
      mesaLead: 'A visual on one side, a motion on the other. The scene runs right here.',
      mesaMao: 'click one on each side and the piece changes right away',
      comoDesenhado: 'how it is drawn', comoMexe: 'how it moves',
      cenaTitulo: 'The combination running', combinaTag: 'fits',
      avisoAntes: '', avisoMeio: 'happens on an interface card: it works with', ou: 'or',
      aoVivo: 'live',
      levar: 'Take this scene to an AI ↓',
      nota2: 'the scene becomes a ready-made prompt to paste into Claude, ChatGPT or another AI',
      comoUsar: 'How to use it with AI',
      passo1t: 'Pick the combination', passo1p: 'A visual and a motion on the table above. The prompt changes with them.',
      passo2t: 'Fill in your subject', passo2p: 'Replace what is in brackets: what appears in place of the star, the word, the number and your brand colors. You can write it your own way.',
      passo2tTeu: 'Describe your subject', passo2pTeu: 'Write in the field next to it what should appear: the product, the logo, a sentence, a number. If you are using an image, check the box and attach the image along with the prompt.',
      passo3t: 'Paste it into an AI that writes code',
      passo3p: 'Claude, ChatGPT or another. It uses the open Risca & Mexe engine and returns a page that runs the animation in the browser.',
      passo3pTeu: 'Claude, ChatGPT or another. The prompt carries the recipe for the visual and the motion, and the AI returns a page that runs the animation in the browser.',
      passo4t: 'Record it as video', passo4p: 'The engine records the page frame by frame, with no jitter and no loss of quality. The step-by-step guide is in the project’s README, on GitHub. For a quick test, a screen recording works too.',
      nota3: 'the AI does not need to know anything about animation: the prompt already explains everything',
      doisJeitos: 'Two ways to ask', abaCatalogo: 'With the catalog piece', abaTeu: 'Your own way',
      pedidoTitulo: 'The prompt for the AI',
      copiar: 'Copy the prompt', copiarCodigo: 'Copy only the code', copiado: 'Copied', selecionado: 'Selected, just copy it',
      avisoCodigo: '"Copy only the code" is for anyone who already has the Risca & Mexe engine in their project: it is the line that builds this scene.',
      campoRotulo: 'What will appear in the animation',
      campoExemplo: 'e.g. the bakery logo, with the line "Fresh bread at 5 pm"',
      comImagem: 'I will attach an image (my logo, a photo)',
      avisoImagem: 'With an image: the page the AI returns has a "Choose image" button. For it to load the image on its own, save the file as <code>logo.png</code> in the same folder as the page and open the page through a local server. Opened with a double click, the browser blocks the image.',
      pedido: {
        duracao: { 12: 'about 5 seconds', 13: '4.2 seconds', 14: '5.2 seconds', 15: '4.6 seconds', padrao: '4 seconds' },
        segundos: { 12: 5, 13: '4.2', 14: '5.2', 15: '4.6', padrao: 4 },
        abre: d => `I want a short animation (${d}, vertical, 1080 × 1920) in the Risca & Mexe style:`,
        visual: 'visual', movimento: 'with the motion',
        motor: u => `Use the open Risca & Mexe engine (${u}): the files nucleo.js, visuais.js and movimentos.js. The scene is built like this:`,
        campos: 'Fields that montar accepts (the names are in Portuguese, as in the engine):',
        base: [
          '- lingua: "en" puts the engine’s sample texts and the number format in English.',
          '- palavra: the text below the number.',
          '- valor: the number, with a point for decimals (4.9, 120, 1200). On screen it keeps the same decimal places, in English format: 4.9 · 120 · 1,200.',
          '- prefixo and sufixo: what comes before and after the number, like "+" or "%".',
          '- duracao: the duration in seconds, to fit the edit.',
          '- formas: to replace the star. Before montar, create the shape with Catalogo.novaForma("name", points), with the outline points as [x, y], clockwise and starting at the top, and pass formas: ["name"].',
        ],
        m3: ['- in M3, formas is the sequence of shapes that turn into one another: ["estrela", "name", "circulo", "estrela"] ("estrela" is the star, "circulo" the circle).'],
        m12: ['- pedido: the text that is typed into the card. The duration follows the length of the text.', '- the typed text:', '[e.g. A star with a 4.9 customer rating]'],
        m13: ['- arquivo: the name of the file the cursor drags into the box.', '- the file name:', '[e.g. product-photo.png]'],
        m14: ['- passos: the list of steps, in the order they appear, like ["Reading the request", "Done"].', '- the steps:', '[e.g. Reading the request, Picking the colors, Done]'],
        v11: ['- resultado: the address of the image that sits blurred and dark behind the card.', '- the result image:', '[the file or the image address]'],
        troque: 'Replace the sample piece (the star, the rating and the word) with my subject:',
        assunto: [['- what appears in place of the star:', '[describe it here]'], ['- the word:', '[e.g. CUSTOMERS SERVED]'], ['- the number:', '[e.g. 4.9 · +120 · 98%]']],
        cores: ['- my brand colors:', '[e.g. dark blue #0F1B2D and gold #C9A24C]'],
        fim: ['Keep the rhythm of the style: movements of 0.4 to 0.6 seconds and nothing still for more than 1.5 seconds.', 'Give me back a single HTML file that runs in the browser, with the animation looping.'],
      },
      tituloRefs: 'From reference to code · Risca & Mexe', refsH1: 'From reference to code',
      refsLead: 'Real films, read on both axes. Play the film, see what it uses and take the same idea to the table.',
      refsMao: 'the films play through YouTube, credited to the people who made them',
      tocar: 'Play the film', noCanal: c => `on the ${c} YouTube channel`, encontradoNo: 'found on',
      refN: (i, n) => `Reference ${i} of ${n}`, tambem: 'Also appears:', abrirNaMesa: p => `Open ${p} on the table`,
      filmeTitulo: 'Reference film',
      faltaRotulo: 'What the catalog is still missing', faltaH2: 'What these films do that the catalog does not have yet',
      faltaLead: 'Motions that appear in the references and have not yet become Risca & Mexe items. Each one can become a new M, made by us or by anyone who wants to contribute.',
      apareceEm: 'Appears in:',
      verMomentos: n => `see the ${n} moments`,
      titulo404: 'Page not found · Risca & Mexe', naoEncontrada: 'Page not found',
      naoEncontradaFrase: 'This address does not exist or has moved. The catalog is still here:',
      irIndice: 'Go to the index', irMesa: 'Open the combination table',
    },

    es: {
      navIndice: 'Índice', navMesa: 'Mesa de combinación', navRefs: 'Referencias', navContribuir: 'Contribuir en GitHub',
      lingua: 'Idioma',
      rodapeFeito: 'Risca & Mexe · código abierto, licencia MIT · hecho por FORSTER en Igrejinha, Rio Grande do Sul, Brasil',
      rodapeEstilo: '¿Quieres enviar un estilo nuevo? El paso a paso está en GitHub.',
      rodapeCredito: 'La receta del puntillismo usa ideas de la skill de puntillismo de Fernando Araújo (BRABO, licencia MIT).',
      visual: 'Visual', movimento: 'Movimiento', semModelo: 'sin modelo',
      frase: (v, m) => `${v} con ${m}`,
      capa: 'Portada',
      sub: 'Dibuja y mueve · un índice abierto de estilos de animación.<b>Toda animación son dos decisiones: cómo se dibuja y cómo se mueve. Elige uno de cada y míralo en vivo.</b>',
      etiqueta: 'hecho por',
      notaCapa: 'cada tarjeta es un estilo, funcionando de verdad',
      legendasCapa: ['puntillismo', 'vidrio 3D', 'recorte', 'escritura', 'trazo', 'ascii', 'collage', 'plastilina'],
      indice: 'Índice',
      notaIndice: 'el visual es el dibujo; el movimiento es la forma de moverse. Cualquiera combina con cualquier otro, menos los de interfaz (M12 a M14), que piden una tarjeta: V7, V10 o V11.',
      combinacoes: 'Combinaciones', referencias: 'Referencias',
      cap1: 'Capítulo uno · cómo se dibuja', cap2: 'Capítulo dos · cómo se mueve', cap3: 'Capítulo tres · uno de cada', cap4: 'Capítulo cuatro · videos reales',
      capituloV: 'Capítulo uno · Visual', capituloM: 'Capítulo dos · Movimiento',
      eixoV: 'El visual: cómo se dibuja', eixoM: 'El movimiento: cómo se mueve',
      ondeCabe: 'Dónde encaja:',
      explicaRef: 'Este movimiento queda en el catálogo como referencia: no tiene modelo en el motor, así que no se abre en la mesa de combinación.',
      explicaInter: 'Este es uno de los ejes. Este movimiento ocurre dentro de la tarjeta de una herramienta, así que combina con los visuales que tienen tarjeta: V7, V10 y V11.',
      explicaV: 'Este es uno de los ejes. El dibujo no decide el movimiento: se le puede aplicar cualquier movimiento del catálogo, del más calmo al más agitado.',
      explicaVcartao: ' Solo los de interfaz (M12 a M14) piden un visual con tarjeta.',
      explicaM: 'Este es uno de los ejes. El movimiento no decide el dibujo: funciona con cualquier visual del catálogo, de los colores planos al puntillismo.',
      notaInter: 'aquí el visual es la tarjeta de interfaz: es en ella donde ocurre este movimiento',
      notaV: 'compáralo con los otros visuales: la pieza es siempre la misma, solo cambia el dibujo',
      notaM: 'aquí el visual es siempre de colores planos, para ver solo el movimiento',
      combinaV: 'Combina con un movimiento', combinaM: 'Combina con un visual',
      abrirMesa: 'Abrir en la mesa de combinación',
      pag: (k, n) => `${k} de ${n}`,
      naVidaReal: 'En la vida real',
      vidaLead: c => `Videos reales que usan el ${c}. Cada uno se abre en la página de referencias, con los momentos marcados.`,
      vidaNota: 'En los videos, el dibujo es 3D; aquí el estilo es el mismo, dibujado en 2D.',
      marcaV: 'el visual más cercano a este', marcaM: 'es el movimiento principal', apareceJunto: 'también aparece',
      comoFazer: 'Cómo hacerlo',
      receitaRef: (c, nome) => `El ${c} ${nome} no tiene receta en el motor. El camino es este:`,
      receitaLead: (c, nome) => `Las reglas del ${c} ${nome}, para quien quiera animar sin IA, en cualquier herramienta.`,
      semReceita: 'La receta de este ítem todavía no está escrita.',
      tituloMesa: 'Mesa de combinación · Risca & Mexe', mesa: 'Mesa de combinación',
      mesaLead: 'Un visual de un lado, un movimiento del otro. La escena funciona aquí mismo.',
      mesaMao: 'haz clic en uno de cada lado y la pieza cambia al instante',
      comoDesenhado: 'cómo se dibuja', comoMexe: 'cómo se mueve',
      cenaTitulo: 'La combinación en marcha', combinaTag: 'combina',
      avisoAntes: 'El', avisoMeio: 'ocurre en una tarjeta de interfaz: combina con', ou: 'o',
      aoVivo: 'en vivo',
      levar: 'Llevar esta escena a la IA ↓',
      nota2: 'la escena se vuelve un pedido listo para pegar en Claude, en ChatGPT o en otra IA',
      comoUsar: 'Cómo usarlo con IA',
      passo1t: 'Elige la combinación', passo1p: 'Un visual y un movimiento en la mesa de arriba. El pedido cambia junto.',
      passo2t: 'Completa tu tema', passo2p: 'Cambia lo que está entre corchetes: lo que aparece en lugar de la estrella, la palabra, el número y los colores de tu marca. Puedes escribirlo a tu manera.',
      passo2tTeu: 'Describe tu tema', passo2pTeu: 'Escribe en el campo de al lado lo que debe aparecer: el producto, el logo, una frase, un número. Si vas a usar una imagen, marca la casilla y adjunta la imagen junto con el pedido.',
      passo3t: 'Pégalo en una IA que escriba código',
      passo3p: 'Claude, ChatGPT u otra. Usa el motor abierto de Risca & Mexe y devuelve una página que reproduce la animación en el navegador.',
      passo3pTeu: 'Claude, ChatGPT u otra. El pedido lleva la receta del visual y del movimiento, y la IA devuelve una página que reproduce la animación en el navegador.',
      passo4t: 'Grábalo en video', passo4p: 'El motor graba la página cuadro a cuadro, sin temblores ni pérdida de calidad. El paso a paso está en el README del proyecto, en GitHub. Para una prueba rápida, grabar la pantalla también sirve.',
      nota3: 'la IA no necesita saber nada de animación: el pedido ya le explica todo',
      doisJeitos: 'Dos maneras de pedir', abaCatalogo: 'Con la pieza del catálogo', abaTeu: 'A tu manera',
      pedidoTitulo: 'El pedido para la IA',
      copiar: 'Copiar el pedido', copiarCodigo: 'Copiar solo el código', copiado: 'Copiado', selecionado: 'Seleccionado, solo falta copiar',
      avisoCodigo: '"Copiar solo el código" es para quien ya tiene el motor de Risca & Mexe en el proyecto: es la línea que arma esta escena.',
      campoRotulo: 'Lo que va a aparecer en la animación',
      campoExemplo: 'ej.: el logo de la panadería, con la frase "Pan caliente a las 17 h"',
      comImagem: 'Voy a adjuntar una imagen (mi logo, una foto)',
      avisoImagem: 'Con imagen: la página que devuelva la IA tiene un botón "Elegir imagen". Para que cargue la imagen sola, guarda el archivo como <code>logo.png</code> en la misma carpeta de la página y abre la página con un servidor local. Abierta con doble clic, el navegador bloquea la imagen.',
      pedido: {
        duracao: { 12: 'unos 5 segundos', 13: '4,2 segundos', 14: '5,2 segundos', 15: '4,6 segundos', padrao: '4 segundos' },
        segundos: { 12: 5, 13: '4,2', 14: '5,2', 15: '4,6', padrao: 4 },
        abre: d => `Quiero una animación corta (${d}, vertical, 1080 × 1920) en el estilo Risca & Mexe:`,
        visual: 'visual', movimento: 'con el movimiento',
        motor: u => `Use el motor abierto de Risca & Mexe (${u}): los archivos nucleo.js, visuais.js y movimentos.js. La escena se arma así:`,
        campos: 'Campos que acepta el montar (los nombres están en portugués, como en el motor):',
        base: [
          '- lingua: "es" pone en español los textos de ejemplo del motor y el formato del número.',
          '- palavra: el texto debajo del número.',
          '- valor: el número, escrito con punto en los decimales (4.9, 120, 1200). En pantalla sale con los mismos decimales, en formato español: 4,9 · 120 · 1200.',
          '- prefixo y sufixo: lo que va antes y después del número, como "+" o "%".',
          '- duracao: la duración en segundos, para encajar en el corte.',
          '- formas: para cambiar la estrella. Antes del montar, cree la forma con Catalogo.novaForma("nombre", puntos), con los puntos del contorno como [x, y], en sentido horario y empezando arriba, y pase formas: ["nombre"].',
        ],
        m3: ['- en el M3, formas es la secuencia que se transforma, una en otra: ["estrela", "nombre", "circulo", "estrela"] ("estrela" es la estrella y "circulo", el círculo).'],
        m12: ['- pedido: el texto que aparece escribiéndose en la tarjeta. La duración acompaña el largo del texto.', '- el texto escrito:', '[ej.: Una estrella con la nota 4,9 de los clientes]'],
        m13: ['- arquivo: el nombre del archivo que el cursor arrastra dentro de la caja.', '- el nombre del archivo:', '[ej.: foto-del-producto.png]'],
        m14: ['- passos: la lista de pasos, en el orden en que aparecen, como ["Leyendo el pedido", "Listo"].', '- los pasos:', '[ej.: Leyendo el pedido, Eligiendo los colores, Listo]'],
        v11: ['- resultado: la dirección de la imagen que queda desenfocada y oscura detrás de la tarjeta.', '- la imagen del resultado:', '[el archivo o la dirección de la imagen]'],
        troque: 'Cambie la pieza de ejemplo (la estrella, la nota y la palabra) por mi tema:',
        assunto: [['- lo que aparece en lugar de la estrella:', '[describa aquí]'], ['- la palabra:', '[ej.: CLIENTES ATENDIDOS]'], ['- el número:', '[ej.: 4,9 · +120 · 98%]']],
        cores: ['- los colores de mi marca:', '[ej.: azul oscuro #0F1B2D y dorado #C9A24C]'],
        fim: ['Mantenga el ritmo del estilo: movimientos de 0,4 a 0,6 segundos y nada quieto por más de 1,5 segundos.', 'Devuélvame un único archivo HTML, que funcione en el navegador, con la animación en bucle.'],
      },
      tituloRefs: 'De la referencia al código · Risca & Mexe', refsH1: 'De la referencia al código',
      refsLead: 'Videos reales, leídos en los dos ejes. Reproduce el video, mira lo que usa y lleva la misma idea a la mesa.',
      refsMao: 'los videos se reproducen en YouTube, con el crédito de quien los hizo',
      tocar: 'Reproducir el video', noCanal: c => `en el canal ${c} de YouTube`, encontradoNo: 'encontrado en',
      refN: (i, n) => `Referencia ${i} de ${n}`, tambem: 'También aparece:', abrirNaMesa: p => `Abrir ${p} en la mesa`,
      filmeTitulo: 'Video de referencia',
      faltaRotulo: 'Lo que todavía falta en el catálogo', faltaH2: 'Lo que hacen estos videos y el catálogo todavía no tiene',
      faltaLead: 'Movimientos que aparecen en las referencias y todavía no son ítems de Risca & Mexe. Cada uno puede convertirse en un M nuevo, hecho por nosotros o por quien quiera contribuir.',
      apareceEm: 'Aparece en:',
      verMomentos: n => `ver los ${n} momentos`,
      titulo404: 'Página no encontrada · Risca & Mexe', naoEncontrada: 'Página no encontrada',
      naoEncontradaFrase: 'Esta dirección no existe o cambió de lugar. El catálogo sigue aquí:',
      irIndice: 'Ir al índice', irMesa: 'Abrir la mesa de combinación',
    },
  };
  window.TEXTOS = TEXTOS;
  window.T = Object.assign({}, TEXTOS.pt, TEXTOS[L]);

  // nome de movimento no meio da frase: minúsculo, menos siglas e números ("câmera 3D", não "câmera 3d")
  window.minusc = s => s.split(' ').map(w => /\d/.test(w) || (w.length > 1 && w === w.toUpperCase()) ? w : w.toLowerCase()).join(' ');

  // o seletor PT · EN · ES leva para a mesma página, com os mesmos parâmetros, na outra língua
  function urlNa(l) {
    const p = new URLSearchParams(location.search);
    if (l === 'pt') p.delete('lang'); else p.set('lang', l);
    const s = p.toString();
    return (location.pathname.split('/').pop() || './') + (s ? '?' + s : '') + location.hash;
  }
  window.marcarLinguas = function () {
    document.querySelectorAll('.linguas a[data-lingua]').forEach(a => {
      const l = a.dataset.lingua; a.hidden = false; a.setAttribute('href', urlNa(l));
      if (l === L) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  };

  window.aplicarTextos = function () {
    document.querySelectorAll('[data-t]').forEach(e => { const t = T[e.dataset.t]; if (typeof t === 'string') e.textContent = t; });
    document.querySelectorAll('[data-th]').forEach(e => { const t = T[e.dataset.th]; if (typeof t === 'string') e.innerHTML = t; });
    document.querySelectorAll('[data-ta]').forEach(e => e.dataset.ta.split(';').forEach(par => {
      const [a, k] = par.split(':'); if (typeof T[k] === 'string') e.setAttribute(a.trim(), T[k]);
    }));
    marcarLinguas();
    raiz.classList.remove('traduzindo');
  };

  // os links entre as páginas levam a língua junto (âncoras da própria página e links de fora ficam como estão)
  const PAGINAS = /^(index|Item|Mesa|Referencias)\.html$/;
  window.comLingua = function (href) {
    if (L === 'pt' || !href) return href;
    const m = href.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
    if (!m || !PAGINAS.test(m[1])) return href;
    const p = new URLSearchParams((m[2] || '').slice(1)); p.set('lang', L);
    return m[1] + '?' + p + (m[3] || '');
  };
  window.linkar = function () {
    document.querySelectorAll('a[href]').forEach(a => { if (!a.closest('.linguas')) a.setAttribute('href', comLingua(a.getAttribute('href'))); });
  };

  // celular: a legenda de uma polaroide fica numa linha só; quando o texto não cabe na largura do cartão, fica só o número
  // (o .resto some). Roda depois das fontes e a cada mudança de tamanho; no computador não muda nada.
  window.ajustarLegendas = function () {
    const celular = matchMedia('(max-width: 600px)').matches;
    document.querySelectorAll('.polaroide .legenda').forEach(l => {
      l.classList.remove('so-numero');
      if (celular && l.querySelector('.resto') && l.scrollWidth > l.clientWidth + 1) l.classList.add('so-numero');
    });
  };
  document.fonts.ready.then(() => window.ajustarLegendas());
  addEventListener('resize', () => window.ajustarLegendas());
  addEventListener('load', () => window.ajustarLegendas());
})();
