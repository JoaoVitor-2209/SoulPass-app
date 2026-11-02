import type { Entregavel } from "../types";
import imgFrontend from "../assets/pagina2/img-frontend.png";
import imgJava from "../assets/pagina2/img-java.png";
import imgDatabase from "../assets/pagina2/img-database.png";
import imgPython from "../assets/pagina2/img-python.png";
import imgChatbot from "../assets/pagina2/img-chatbot.png";
import imgBusiness from "../assets/pagina2/img-business.png";

// Entregáveis do projeto original, atualizados com os vídeos e as informações da Sprint 4.
export const entregaveis: Entregavel[] = [
  {
    id: "front-end",
    materia: "Front-End Design Engineering",
    emoji: "💻",
    titulo: "Site SoulPass",
    imagem: imgFrontend,
    resumo:
      "Site responsivo em React e TypeScript, com cadastro, login e painel integrado à API Java da SoulPass.",
    descricao:
      "A interface da SoulPass foi desenvolvida em React, Vite e TypeScript, com Tailwind CSS, CSS global e navegação por rotas. A entrega inclui cadastro e login pela API Java, além de painel com pontos, créditos no bilhete, distância percorrida e meta diária. Na área da conta, o usuário pode registrar e consultar caminhadas, abrir os detalhes de um percurso, confirmar sua exclusão, atualizar o perfil, vincular um bilhete e consultar a prévia antes de converter pontos. O site também reúne as páginas institucionais e o chatbot IBM Watson.",
    videoId: "m-VH4_5tVMo",
  },
  {
    id: "java",
    materia: "Domain Driven Design Using Java",
    emoji: "☕",
    titulo: "API Java SoulPass",
    imagem: imgJava,
    resumo:
      "API REST responsável pelos usuários, contas, bilhetes, caminhadas, pontos e histórico da SoulPass.",
    descricao:
      "A entrega em Java fornece a API REST utilizada pelo front-end da SoulPass. Os recursos incluem cadastro e login de usuários, atualização de perfil, consulta de contas, gerenciamento de bilhetes, registro e exclusão de caminhadas e consulta do histórico de pontos. A API centraliza as regras de pontuação e oferece a simulação e a confirmação da conversão de pontos em crédito no sistema acadêmico. Os serviços HTTP conectam a interface às operações do backend.",
    videoId: "ckK5oXD6J28",
  },
  {
    id: "banco-de-dados",
    materia: "Building Relational Database",
    emoji: "🗄️",
    titulo: "Banco de Dados",
    imagem: imgDatabase,
    resumo:
      "Estrutura relacional e persistência dos dados que sustentam os fluxos de mobilidade, pontos e bilhetes da SoulPass.",
    descricao:
      "A entrega de Banco de Dados reúne a organização e a persistência das informações da SoulPass em uma estrutura relacional. O trabalho dá suporte aos dados da solução, aos relacionamentos entre as entidades e às operações de consulta e manutenção dos registros. Essa base sustenta os fluxos de usuários, contas, caminhadas, bilhetes e histórico de pontos utilizados pela aplicação, mantendo o foco na integridade e na consistência das informações.",
    videoId: "MaTUtCVnbeo",
  },
  {
    id: "python",
    materia: "Computational Thinking Using Python",
    emoji: "🐍",
    titulo: "Programa Python",
    imagem: imgPython,
    resumo:
      "Programa no terminal com banco Oracle, cartão digital, exportação em JSON e consulta de clima pela API Open-Meteo.",
    descricao:
      "A entrega em Python mantém o menu no terminal e o cartão digital da SoulPass, com persistência dos usuários e embarques em banco Oracle. O usuário pode se cadastrar com validação de CPF, fazer login, consultar saldo e pontos, alterar o nome, excluir a conta após confirmação, resgatar uma passagem de demonstração e registrar embarques. O programa reúne histórico de embarques, exportação das consultas em JSON e geração de cartão PNG e QR Code. A integração com a API pública Open-Meteo permite consultar o clima atual e a previsão dos próximos cinco dias por cidade, apoiando o planejamento das viagens.",
    videoId: "WmvKd3M_kH4",
  },
  {
    id: "ia-chatbot",
    materia: "Artificial Intelligence & Chatbot | Machine Learning",
    emoji: "🤖",
    titulo: "Chatbot e Machine Learning",
    imagem: imgChatbot,
    resumo:
      "Apresentação conjunta de Chatbot e Machine Learning, com o SoulPassBot como canal de apoio ao usuário.",
    descricao:
      "Esta apresentação reúne as entregas de Artificial Intelligence & Chatbot e Machine Learning da SoulPass. O assistente virtual SoulPassBot, desenvolvido no IBM Watson e integrado ao site, oferece um canal de apoio durante a navegação. O vídeo compartilhado apresenta o trabalho das duas disciplinas dentro da proposta de mobilidade e recompensas por caminhada da solução.",
    videoId: "N4dTCG0Tdy8",
  },
  {
    id: "business",
    materia: "Software Engineering & Business Model",
    emoji: "📊",
    titulo: "Pitch de Negócio",
    imagem: imgBusiness,
    resumo:
      "Business Model Canvas atualizado, backlog do produto e pitch apresentando o novo modelo de recompensas por caminhada.",
    descricao:
      "Documentamos o negócio da SoulPass identificando a oportunidade real: grande parte da população enfrenta dificuldade para adotar hábitos de mobilidade mais ativos e sustentáveis, por falta de incentivo e de benefícios concretos que tornem o transporte público e a caminhada mais atrativos no dia a dia. Nesta versão, o modelo de recompensa foi revisado: em vez de pontos por engajamento na rede social, os usuários agora acumulam pontos com base na distância percorrida a pé (registrada via GPS), podendo depois trocá-los por créditos de transporte público — a cada 110 pontos, R$ 1,00 em crédito. O Business Model Canvas foi atualizado com esse novo fluxo, o backlog do produto foi detalhado por épicos no Trello, e o pitch apresenta o problema, a solução revisada e os diferenciais com a voz dos próprios integrantes.",
    videoId: "8AIbNRM5C5Q",
    linksExtras: [
      { label: "Business Model Canvas (novo)", url: "https://canva.link/5x0b68xqa93ix9d" },
      { label: "Business Model Canvas (versão anterior)", url: "https://canva.link/633e2yi8m8l4c91" },
      { label: "Backlog do produto (Trello)", url: "https://trello.com/b/2H3SFGux/soulpass-backlog" },
      {
        label: "Diagrama de Casos de Uso",
        url: "https://drive.google.com/drive/folders/1Fo0iIQ6Euz5PiY2SBVgrs6x1t-wnwI7Z",
      },
      {
        label: "Diagrama de Atividade (Figma)",
        url: "https://www.figma.com/board/qf4quAaE7DtHxI4N9hzCY7/Sem-t%C3%ADtulo?t=3wUBI9SzNmDHRHoH-1",
      },
      {
        label: "Protótipo de Fidelidade (Figma)",
        url: "https://www.figma.com/site/0cQyRoIL1mQcZd8ziV5CTK/Sem-t%C3%ADtulo?node-id=10-5&t=qYRP5q0e9Rnxyw2T-1",
      },
    ],
  },
];

