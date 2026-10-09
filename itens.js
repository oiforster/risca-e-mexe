/* itens.js — Risca & Mexe
   Os itens do catálogo nos dois eixos. Texto em português (a língua de origem); inglês e espanhol entram depois
   da aprovação do desenho, no mesmo formato (campos nome, oque e cabe por língua). */
window.MI = {
  visuais: [
    { n: 1, nome: 'Flat', arq: 'V1_flat', oque: 'Cores chapadas, sem sombra nem textura. Lê rápido em qualquer tela.', cabe: 'Varejo (oferta, data da promoção) e tecnologia (ícone de cada função).' },
    { n: 2, nome: 'Traço', arq: 'V2_traco', oque: 'Só linhas finas, como desenho a caneta. Calmo e elegante.', cabe: 'Saúde: explicar um órgão, um exame, um procedimento.' },
    { n: 3, nome: 'Isométrico', arq: 'V3_isometrico', oque: 'Peças em bloco, vistas de quina, como uma maquete.', cabe: 'Tecnologia: servidor, fluxo de trabalho, estrutura.' },
    { n: 4, nome: 'Massinha', arq: 'V4_massinha', oque: 'Formas fofas e brilhantes, como modeladas em massinha.', cabe: 'Marcas simpáticas, datas festivas, saúde explicada sem assustar.' },
    { n: 5, nome: 'Recorte e colagem', arq: 'V5_recorte', oque: 'Papel recortado, fita adesiva e letras tiradas de revista.', cabe: 'Varejo, moda, novidade da loja.' },
    { n: 6, nome: 'Risografia', arq: 'V6_risografia', oque: 'Duas tintas fortes, um pouco fora do lugar, com falhas de impressão.', cabe: 'Campanha de data, evento, manchete com cara de cartaz.' },
    { n: 7, nome: 'Vidro fosco', arq: 'V7_vidro', oque: 'Cartão translúcido sobre luzes coloridas desfocadas. Cara de aplicativo.', cabe: 'Tela de produto, painel, número de resultado.' },
    { n: 8, nome: 'ASCII', arq: 'V8_ascii', oque: 'A imagem feita de letras e símbolos, como tela de computador antigo.', cabe: 'Tecnologia, abertura de vídeo técnico, gancho.' },
    { n: 9, nome: 'Pontilhismo', arq: 'V9_pontilhismo', oque: 'A imagem feita de milhares de pontinhos, com luz e sombra pelo tamanho do ponto.', cabe: 'Saúde, ciência, marca que pede elegância.' },
    { n: 10, nome: 'Cartão de interface', arq: 'V10_cartao', oque: 'Só a caixa da ferramenta, redesenhada, grande e no meio da tela.', cabe: 'Demonstração de ferramenta digital.' },
    { n: 11, nome: 'Cartão sobre o resultado', arq: 'V11_cartao-resultado', oque: 'O mesmo cartão, com o próprio resultado borrado e escuro atrás.', cabe: 'Ferramenta que gera algo: o resultado aparece por trás.' },
  ],
  movimentos: [
    { n: 0, nome: 'Entrada simples', arq: null, oque: 'A peça só entra. Serve para ver o visual sozinho.', cabe: '' },
    { n: 1, nome: 'Tipografia cinética', arq: 'M1_tipografia', oque: 'As letras e os números são o movimento: caem, giram e se encaixam.', cabe: 'Manchete, preço, número de destaque.' },
    { n: 2, nome: 'Partículas', arq: 'M2_particulas', oque: 'A peça se monta a partir de grãos soltos e depois se desfaz.', cabe: 'Ciência, saúde, algo que se forma.' },
    { n: 3, nome: 'Morph', arq: 'M3_morph', oque: 'Uma forma vira outra sem corte.', cabe: 'Explicar uma transformação.' },
    { n: 4, nome: 'Desenho em traço', arq: 'M4_traco', oque: 'O contorno se desenha na frente de quem vê e depois se preenche.', cabe: 'Explicar passo a passo.' },
    { n: 5, nome: 'Revelação por máscara', arq: 'M5_mascara', oque: 'A peça aparece por uma janela que abre ou por uma faixa que passa.', cabe: 'Revelar um produto, antes e depois.' },
    { n: 6, nome: 'Camadas em profundidade', arq: 'M6_profundidade', oque: 'Camadas planas andam em velocidades diferentes e dão sensação de fundo.', cabe: 'Foto de produto, ambiente.' },
    { n: 7, nome: 'Câmera 3D', arq: 'M7_camera3d', oque: 'A peça é um plano no espaço; a câmera chega inclinada, mergulha e recua.', cabe: 'Tela de produto.' },
    { n: 8, nome: 'Stop motion', arq: 'M8_stopmotion', oque: 'Anda aos saltos, oito quadros por segundo, com um tremor leve.', cabe: 'Produto, cara de feito à mão.' },
    { n: 9, nome: 'Glitch', arq: 'M9_glitch', oque: 'Falha digital: a imagem se parte, se desloca e separa as cores.', cabe: 'Tecnologia, o problema antes da solução.' },
    { n: 10, nome: 'Quadro a quadro e rotoscopia', arq: null, ref: true, oque: 'Cada quadro desenhado à mão; na rotoscopia, por cima de um vídeo filmado.', cabe: 'Pede desenhista. Abertura especial, campanha.' },
    { n: 11, nome: 'Rastreamento', arq: null, ref: true, oque: 'Um texto ou uma seta preso a algo que se mexe no vídeo filmado.', cabe: 'Depende da gravação; os editores de vídeo já fazem.' },
    { n: 12, nome: 'Digitação', arq: 'M12_digitacao', oque: 'O pedido aparece letra por letra e o cartão cresce com o texto.', cabe: 'Ferramenta com IA, pedido escrito.' },
    { n: 13, nome: 'Arrastar e soltar', arq: 'M13_arrastar', oque: 'O cursor traz um arquivo para dentro da caixa e ele vira o resultado.', cabe: 'Enviar um arquivo, a foto do produto.' },
    { n: 14, nome: 'Lista de progresso', arq: 'M14_lista', oque: 'Os passos aparecem um por um e ganham o sinal de feito.', cabe: 'Processo em etapas.' },
    { n: 15, nome: 'Esfera de pontos', arq: 'M15_esfera', oque: 'Pontos formam uma esfera que gira, ganha uma faixa de luz, respira e ganha um anel em órbita.', cabe: 'Produto de IA, tela de espera, algo que pensa ou trabalha.' },
  ],
  combinacoes: [
    { v: 9, m: 2, arq: 'X1_pontilhismo-particulas', nome: 'Grãos que se formam', para: 'Saúde e ciência' },
    { v: 7, m: 7, arq: 'X2_vidro-camera3d', nome: 'Vidro no espaço', para: 'Tela de produto' },
    { v: 5, m: 8, arq: 'X3_recorte-stopmotion', nome: 'Colagem aos saltos', para: 'Varejo' },
    { v: 11, m: 13, arq: 'X4_resultado-arrastar', nome: 'Foto na caixa', para: 'Demonstração de ferramenta' },
    { v: 9, m: 15, arq: 'X5_orbe-pontilhismo', nome: 'Orbe de pontos', para: 'Produto de IA' },
  ],
};
