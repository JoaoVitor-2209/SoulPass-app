# SoulPass — Sprint 4 de Front-end

Evolução do projeto da turma **1TDSPJ / FIAP** para integrar a interface React à API Java da equipe. A SoulPass registra caminhadas, acompanha pontos e converte esses pontos em créditos dentro do sistema acadêmico.

A base é o projeto existente da equipe, com o padrão das aulas: componentes funcionais, rotas estáticas e dinâmicas, tipos e interfaces, `useState`, `useEffect`, `useContext`, `useRef`, React Hook Form e serviços com `fetch` e `async/await`.

## Tecnologias utilizadas

- React, Vite e TypeScript.
- React Router: `createBrowserRouter`, `Outlet`, `Link`, `NavLink`, `Navigate`, `useNavigate` e `useParams`.
- Tailwind CSS v4: estilos e responsividade.
- React Hook Form: validação e submissão dos formulários.
- Fetch API: comunicação HTTP com o backend remoto.
- Node Test Runner: testes locais de contrato e tratamento de respostas.

## Como usar

### Links do projeto

| Recurso | Endereço / situação |
| --- | --- |
| Repositório desta entrega | https://github.com/JoaoVitor-2209/SoulPass-app |
| Repositório de origem da equipe | https://github.com/SoulPass-1TDSPJ/SoulPass-app |
| Backend Java | https://github.com/SoulPass-1TDSPJ/java_soulpass |
| API publicada | https://soulpass-api.onrender.com |
| Deploy deste front na Vercel | **PENDENTE: publicar esta versão e inserir a URL aqui.** |
| Vídeo desta Sprint 4 no YouTube | https://youtu.be/m-VH4_5tVMo |

Esta entrega preserva o histórico Git do repositório de origem da equipe. A Sprint 4 foi acrescentada em commits separados por mudança, sem alterar os commits antigos. O deploy na Vercel e o envio ao portal da FIAP continuam sendo etapas separadas.

### Executar no computador

1. Extraia o ZIP e abra a pasta `SoulPass-app` no VS Code.
2. Instale uma versão atual do Node.js compatível com o Vite (Node 22.12+ ou 24 LTS).
3. No terminal dentro da pasta, execute:

```bash
npm ci
npm run dev
```

4. Abra o endereço exibido pelo Vite, normalmente `http://localhost:5173`.
5. Use **Cadastre-se** para criar sua própria conta acadêmica ou faça login com uma conta de teste autorizada da equipe. Não há credenciais prontas no código. As contas locais demonstrativas da Sprint 3 não correspondem a contas no backend; cadastre-se na API se necessário.

Não é obrigatório criar `.env` para usar a API informada: `/api` já é encaminhado para o endereço do Render. Para personalizar, copie `.env.example` para `.env` e reinicie o Vite.

```env
VITE_API_URL=/api
API_PROXY_TARGET=https://soulpass-api.onrender.com
VITE_WATSON_ENABLED=true
```

A primeira resposta do Render pode demorar. A aplicação informa o carregamento e aguarda até 90 segundos. Se uma operação de escrita perder a conexão, consulte o saldo ou a listagem antes de repeti-la.

### Conferir o projeto

```bash
npm run lint
npm test
npm run build
npm run preview
```

`npm test` usa respostas controladas e não consulta nem altera registros da API publicada. O front entregue sempre usa os serviços reais; não há fallback silencioso para dados de demonstração.

### Publicar na Vercel

1. Versione esta versão no repositório da equipe.
2. Importe o repositório na Vercel, selecionando a pasta que contém `package.json` como Root Directory.
3. Use o preset Vite, comando `npm run build` e diretório de saída `dist`.
4. Mantenha `VITE_API_URL=/api` ou deixe a variável ausente.
5. O `vercel.json` já encaminha `/api/*` ao Render e as páginas da SPA ao `index.html`.
6. Abra diretamente uma rota como `/app/caminhadas`, atualize a página e valide com uma conta de teste.
7. Insira a URL final na tabela de links acima.

Usar uma origem única para o navegador evita depender de configuração CORS no backend. Se optar por definir `VITE_API_URL` como a URL absoluta do Render, o Java precisará permitir a origem do site. Não coloque credenciais de banco no front.

## Base original e CSS global

Esta versão continua o repositório `SoulPass-1TDSPJ/SoulPass-app`. A Home, o login e a área da conta foram redesenhados com base na referência visual enviada pela equipe: fundo claro, botões roxos, menu lateral no painel e cartões de resumo. O cabeçalho em gradiente, o rodapé escuro e a imagem original do ônibus foram restaurados conforme solicitado.

- `src/index.css` continua sendo o único CSS global importado pelo `main.tsx`, com Tailwind, `@layer components` e `@apply`.
- As fontes, a identidade roxo/magenta e os breakpoints mobile, tablet e desktop foram preservados.
- A Home apresenta a proposta e os botões de acesso abrem `/login` quando não há sessão. Para quem já entrou, abrem `/app`.
- O grupo `/app` continua como filho do Layout raiz e usa `LayoutPainel`, com menu lateral no desktop e recolhível no celular/tablet. O Layout raiz compartilha scroll e chatbot e exibe o cabeçalho público em gradiente fora do painel. O Footer original também é reutilizado dentro da área da conta.
- O painel mostra somente os dados de `GET /contas/{id}/resumo`: pontos, saldo do bilhete, distância, gráfico, meta e atividades. Não há modo de demonstração nem valores de exemplo na aplicação entregue.
- Sobre, FAQ, Solução, integrantes, entregáveis e vídeos mantêm o conteúdo do projeto. Cards e botões compartilham os estilos globais.
- `components/Marca` usa a imagem original `onibus-pass.png`. `components/Icone` concentra os SVGs do menu e dos cartões, sem uma biblioteca adicional de ícones.

### Certificado HTTPS no ambiente local

Se o Vite mostrar `unable to get local issuer certificate`, pare o servidor com Ctrl+C e execute, com Node 22.19+ ou 24.6+:

```bash
npm run dev:certificados
```

Esse script usa `--use-system-ca`, permitindo também os certificados confiáveis do sistema sem desabilitar a validação HTTPS. Se o erro continuar, é necessário conferir a cadeia de confiança do certificado no computador. Essa configuração é para os testes locais; o build da Vercel continua usando `npm run build`.

O chatbot está configurado e habilitado no hook `src/hooks/useWatsonAssistant.ts`, usando exatamente os identificadores e a região do snippet enviado pela equipe. Para alterar a configuração, siga [docs/CHATBOT.md](docs/CHATBOT.md). Não coloque uma API key secreta em variáveis `VITE_*`.

## Funcionalidades e rotas

| Página | Rota | Integração |
| --- | --- | --- |
| Home | `/` | Apresentação original da solução |
| Integrantes e detalhe | `/integrantes`, `/integrantes/:id` | Dados, fotos e links da equipe |
| Sobre, FAQ e contato | `/sobre`, `/faq`, `/contato` | Conteúdo institucional e canais dos integrantes |
| Solução e entregáveis | `/solucao`, `/solucao/:id`, `/videos` | Conteúdo já existente da equipe |
| Cadastro | `/cadastro` | `POST /usuarios`, incluindo idade e CPF |
| Login | `/login` | `POST /usuarios/login` |
| Visão geral | `/app` | `GET /contas/{idConta}/resumo` |
| Minhas caminhadas | `/app/caminhadas` | Listar por conta e registrar caminhada |
| Detalhe da caminhada | `/app/caminhadas/:id` | Consultar e excluir, com diálogo de confirmação |
| Pontos e créditos | `/app/carteira` | Consultar conta, simular e confirmar conversão |
| Gerenciar bilhete | `/app/bilhete` | Consultar, cadastrar e atualizar status |
| Meu histórico | `/app/historico` | Totais e filtro de origem dos pontos |
| Meu perfil | `/app/perfil` | Consultar e atualizar nome, idade e CPF |

As páginas `/app/*` redirecionam para o login quando não há sessão local. A sessão armazena somente `idUser`, `idConta` e nome em `sessionStorage`, nunca a senha. O e-mail não é editável porque esse campo não faz parte do DTO de atualização do Java.

A página de contato mantém o formulário do projeto. Como a API fornecida não possui `/contatos`, o formulário prepara um rascunho e informa que ele ainda não foi enviado. Os canais da equipe continuam disponíveis na página de integrantes.

## Estrutura de pastas

```text
src/
  assets/                 Imagens e fotos já utilizadas pela equipe
  components/             Cabeçalho, rodapé, campos e componentes reutilizáveis
    Painel/               Conteúdo protegido dentro do Layout original e estados da interface
  context/                Sessão compartilhada com useContext
  data/                   Integrantes, navegação e conteúdo institucional
  hooks/                  Título da página, rolagem e chatbot opcional
  routes/                 Uma pasta por página, incluindo as telas da solução
  services/               Fetch e funções por entidade da API
  types/                  Tipos institucionais e DTOs do Java
  utils/                  Formatação e validação de CPF
  main.tsx                Árvore das rotas e AuthProvider
  index.css               Tema original, Tailwind e classes globais da Sprint 4
scripts/                  Testes locais dos serviços
docs/                     Contrato, explicação do código e checklist de entrega
```

## Autores e créditos

Turma **1TDSPJ**. Os dados e as imagens abaixo foram preservados do projeto da equipe.

| Integrante | RM | GitHub | LinkedIn |
| --- | --- | --- | --- |
| João Vitor Cruz de Lima | 571277 | [JoaoVitor-2209](https://github.com/JoaoVitor-2209) | [Perfil](https://www.linkedin.com/in/jo%C3%A3o-vitor-cruz-de-lima-ba4862219) |
| Matheus Ferreira Antônio | 570933 | [matheusfa08](https://github.com/matheusfa08) | [Perfil](https://www.linkedin.com/in/matheus-ferreira-ant%C3%B4nio-592138365) |
| Sophia Silveira dos Santos | 571932 | [SophiaS4nt](https://github.com/SophiaS4nt) | [Perfil](https://www.linkedin.com/in/sophia-silveira-9325493a1) |
| Renato da Silva Tenorio | 572928 | [EUGP2](https://github.com/EUGP2) | [Perfil](https://www.linkedin.com/in/renato-silvagp) |
| Renato Ruiz Ferreira Fonseca Scolamieri | 568667 | [Renatoruiz1](https://github.com/Renatoruiz1) | [Perfil](https://www.linkedin.com/in/renato-ruiz-ferreira-fonseca-scolamieri-32698840b) |

### Imagens e ícones do projeto

![Marca SoulPass](src/assets/misc/soulpass.jpg)
![João Vitor](src/assets/avatar/img-joao.jpg)
![Matheus](src/assets/avatar/img-matheus.jpg)
![Sophia](src/assets/avatar/img-sophia.jpg)
![Renato Tenorio](src/assets/avatar/img-gp.jpg)
![Renato Ruiz](src/assets/avatar/img-renato.jpg)

As imagens, avatares, conteúdos e ícones gráficos foram reaproveitados do projeto da equipe. As novas telas usam o mesmo Layout, Header, Footer, Card e FormField do projeto existente. Não foi utilizado um template externo de UI.

### Referências de aula

- [Aula Code Labs](https://github.com/alecarlosjesus/aula-code-labs): roteamento, hooks, TypeScript, fetch e CRUD.
- [Projeto do professor](https://github.com/alecarlosjesus/projeto-1TDSPJ-2026): separação de componentes, rotas, tipos e serviços.
- [Aula 17 da turma](https://github.com/1TDSPJ-26/front-2sem-aula-17): GET, POST, PUT, DELETE, formulários e modal com `useRef`.
- DTOs e controllers do [backend Java da SoulPass](https://github.com/SoulPass-1TDSPJ/java_soulpass).

Esta evolução foi produzida com auxílio de IA. A equipe deve revisar, compreender e adaptar o código, discutir as decisões e registrar contribuições reais no Git. A explicação das principais partes está em [docs/ESTUDO_DO_CODIGO.md](docs/ESTUDO_DO_CODIGO.md).

## Estado da integração e limites

- Os campos e endpoints foram conferidos no código-fonte Java da equipe e nas tabelas fornecidas em 27/10/2026.
- Build, TypeScript, lint e testes de serviço são verificáveis pelos comandos acima. Os testes usam mocks; isso não comprova a disponibilidade do banco Oracle ou todas as operações no Render.
- A validação completa com uma conta de teste autorizada na API publicada ainda precisa ser feita pela equipe. Não foram criados usuários, caminhadas ou conversões reais durante o desenvolvimento deste pacote.
- O contrato de login devolve usuário e conta, sem token de autenticação. A sessão do front organiza a navegação; não substitui autorização por usuário no servidor. Uso com dados reais requer essa validação no backend.
- O backend retorna CPF e bilhete como números; a interface envia números e completa zeros à esquerda do CPF na exibição. O bilhete aceita nove dígitos iniciando de 1 a 9 conforme a regra numérica atual.
- Ao excluir uma caminhada, o Java remove o registro, mas não implementa estorno dos pontos nesse método. A interface informa isso e não recalcula o saldo por conta própria.
- O histórico atual registra pontos conquistados (`CAMINHADA` e `POST`). Ele não devolve um extrato de conversões.
- Os créditos são registros do projeto acadêmico. Não há integração de recarga real com a SPTrans no código recebido.
- Confira se o deploy e o vídeo refletem a versão final. Consulte [docs/CHECKLIST_ENTREGA.md](docs/CHECKLIST_ENTREGA.md).

## Contato

Use a [organização SoulPass no GitHub](https://github.com/SoulPass-1TDSPJ) ou os perfis dos integrantes. Os mesmos canais estão disponíveis em `/contato`.
