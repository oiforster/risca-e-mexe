/* referencias.js — Risca & Mexe
   Filmes reais e o que cada um usa nos dois eixos. O vídeo toca pelo player oficial do YouTube (embutir é o uso
   que o YouTube permite); nada dos filmes é copiado para o site. Momentos em segundos, para pular direto no trecho. */
window.REFS = {
  filmes: [
    {
      id: 'LPBC-lP-LQM', titulo: 'Microsoft Designer', autor: 'NotReal para a Microsoft', canal: 'Microsoft Design', motionIndex: true,
      v: 4, m: 12, tambem: [3],
      diz: 'Um mundo macio de massinha, e o pedido digitado numa barra por cima da cena. O resultado aparece em cartões que giram.',
      momentos: [[3, 'uma pincelada que se transforma em fita (morph)'], [9, 'o pedido é digitado sobre a cena 3D'], [13, 'a barra do pedido sobre o bolo, letra por letra'], [16, 'o resultado aparece em cartões que giram'], [18, 'a peça pronta se monta na tela']],
    },
    {
      id: 'fqlkvqBoQaU', titulo: 'Windows 365', autor: 'Tendril para a Microsoft', canal: 'Microsoft Design', motionIndex: true,
      v: 7, m: 7, tambem: [13, 2],
      diz: 'A câmera entra no monitor até o navegador, e as janelas viram placas de vidro soltas no espaço. É o mesmo princípio da nossa câmera 3D.',
      momentos: [[2, 'a câmera mergulha no monitor (câmera 3D)'], [10, 'janelas de vidro saltam da tela'], [26, 'o cursor arrasta um arquivo (arrastar e soltar)'], [40, 'servidores em cubos de vidro, vistos de quina'], [48, 'um campo de cubinhos (partículas)']],
    },
    {
      id: '-Y4RToW0Bok', titulo: 'Icon Celebration', autor: 'Tendril para a Microsoft', canal: 'Microsoft Design', motionIndex: true,
      v: 3, m: 4, tambem: [3],
      diz: 'Os ícones nascem como desenho técnico, em grade e contorno, e viram blocos 3D. As peças se juntam como num quebra-cabeça.',
      momentos: [[7, 'folhas e grade de desenho técnico'], [9.5, 'o contorno do ícone se desenha na grade (desenho em traço)'], [11, 'uma fita vira o ícone (morph)'], [15, 'as peças se juntam (montagem, ainda não temos)'], [24, 'ícones em blocos, vistos de quina']],
    },
    {
      id: 'ACiJFw5Rr6k', titulo: 'Novo design do Microsoft 365 Copilot', autor: 'Microsoft Design', canal: 'Microsoft Design',
      v: 10, m: 12, tambem: [1, 14],
      diz: 'Interface branca e limpa, frases que aparecem palavra por palavra e pedidos digitados na barra do assistente. É quase exatamente o nosso cartão de interface.',
      momentos: [[1, 'a frase aparece palavra por palavra (tipografia cinética)'], [11, 'um ícone vira o menu'], [23, 'pedidos digitados na barra "Ask Copilot"'], [34, '"To offer you": tipografia que muda de tamanho'], [45, 'o documento se escreve sozinho']],
    },
    {
      id: 'zy_dHJcAAho', titulo: 'Meet Copilot', autor: 'Microsoft', canal: 'Microsoft Design',
      v: 11, m: 12, tambem: [7],
      diz: 'Cartões de vidro sobre o resultado colorido, e cada pedido é digitado em letras grandes, inclinadas no espaço.',
      momentos: [[3.5, 'a pergunta digitada em letras grandes, em perspectiva'], [13, '"Generating output...": o aviso de que está trabalhando'], [20.5, 'o pedido dentro do documento'], [37.5, '"Create a 10 slide presentation"'], [75, 'uma série de pedidos, um atrás do outro']],
    },
    {
      id: 'xOGgbGfRFM0', titulo: 'Microsoft Planner', autor: 'Microsoft', canal: 'Microsoft Design',
      v: 7, m: 14, tambem: [2, 7],
      diz: 'Painéis de vidro inclinados e listas de tarefas que se preenchem. Um botão clicado explode em bolhas.',
      momentos: [[8, 'o botão clicado vira uma explosão de bolhas (partículas)'], [16, 'a lista de tarefas se preenche (lista de progresso)'], [23, 'cartões em perspectiva (câmera 3D)'], [38, 'peças correndo em trilhos'], [53.5, 'a lista ganha os sinais de feito']],
    },
    {
      id: 't3GycrxB7hQ', titulo: 'Themes by Copilot no Outlook', autor: 'Microsoft', canal: 'Microsoft Design',
      v: 11, m: 12, tambem: [6],
      diz: 'O pedido é montado com etiquetas, a imagem gerada entra atrás da janela e vira o tema. Termina num mosaico de telas em profundidade.',
      momentos: [[0.5, 'bolhas coloridas viram a escolha do tema'], [4, 'o pedido montado com etiquetas'], [7.5, 'a imagem gerada entra atrás da janela (cartão sobre o resultado)'], [10.5, 'a página vira e troca o tema'], [50.5, 'um mosaico de telas em profundidade']],
    },
    {
      id: 'DzXBdc8Dfmg', titulo: 'A nova geração do OneDrive', autor: 'Microsoft', canal: 'Microsoft Design',
      v: 7, m: 12, tambem: [7],
      diz: '"Help me get organized" é digitado na busca, um ícone de nuvem de vidro aparece e as pastas voam até se organizarem numa grade.',
      momentos: [[2, '"Help me get organized" digitado na busca'], [8, 'a nuvem de vidro'], [10, 'uma ondulação vira o cartão (ainda não temos)'], [13, 'painéis em perspectiva'], [48.5, 'as pastas voam e se encaixam numa grade (ainda não temos)']],
    },
  ],
  // movimentos que aparecem nesses filmes e o catálogo ainda não tem (convite para contribuir)
  faltam: [
    { nome: 'Montagem por peças', oque: 'As partes chegam de vários lados e se encaixam até formar o objeto. O contrário, a vista explodida, separa as peças para mostrar o que tem dentro.', visto: 'Icon Celebration, aos 15 s' },
    { nome: 'Encaixar em grade', oque: 'Itens soltos voam e se organizam numa grade arrumada. Bom para "organizar", "reunir", "catálogo".', visto: 'OneDrive, aos 48 s' },
    { nome: 'Ondulação', oque: 'Uma onda se espalha pela superfície, como uma gota na água, e revela a próxima tela.', visto: 'OneDrive, aos 10 s' },
    { nome: 'Fita que desliza', oque: 'Uma fita larga atravessa a tela, dobra e vira outra forma. Liga uma cena na outra sem corte.', visto: 'Microsoft Designer, aos 3 s; Icon Celebration, aos 11 s' },
  ],
};
