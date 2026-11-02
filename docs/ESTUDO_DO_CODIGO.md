# Como entender e apresentar o código

## 1. Comece pelo main.tsx

O `createBrowserRouter` define as páginas públicas e o grupo `/app`. As rotas filhas aparecem no `Outlet` do Layout original. O grupo `/app` também é filho desse Layout e usa `LayoutPainel` para seu menu lateral e cabeçalho da conta, reutilizando também o Footer original. O Layout raiz usa `useLocation` para mostrar o cabeçalho público apenas fora de `/app`, mantendo scroll e chatbot compartilhados. A rota `/app/caminhadas/:id` reutiliza uma mesma página para diferentes caminhadas; o `useParams` recupera o ID da URL.

## 2. Entenda os tipos

`src/types/api.ts` acompanha os DTOs Java. `interface` descreve objetos como Conta e Usuario. `StatusBilhete` é um union type, que aceita somente `ATIVO` ou `NAO_ATIVO`. `CadastroDados` usa uma interseção para juntar os dados de login aos dados pessoais. `PerfilDados` usa `Pick` para selecionar apenas os campos editáveis.

Os tipos ajudam o editor e o compilador, mas não validam sozinhos a resposta de um servidor em execução.

## 3. A requisição tem uma responsabilidade

`services/api.ts` reúne `fetch`, cabeçalhos, tratamento de status, corpo vazio e timeout. Cada entidade tem um serviço simples: `usuarioService`, `contaService`, `caminhadaService`, `bilheteService` e `historicoService`.

Exemplo: `registrarCaminhada(idConta, kmAndados)` faz um POST e transforma o objeto em JSON com `JSON.stringify`. O componente recebe o resultado e mostra os pontos retornados pelo Java.

## 4. useState e useEffect

Nas páginas, `useState` guarda dados, carregamento, erro e sucesso. `useEffect` busca os dados ao abrir a tela ou mudar um filtro. A variável `ativo` evita atualizar a tela depois que o usuário já saiu dela. A consulta não é disparada a cada render: suas dependências são o identificador da conta, o filtro ou a tentativa de atualização.

## 5. Formulários com React Hook Form

`register` liga o input à biblioteca; `handleSubmit` executa a função somente depois da validação. `errors` contém as mensagens. `isSubmitting` evita envio duplo durante uma requisição. `valueAsNumber` transforma idade, pontos e distância em números.

O CPF é digitado como texto para aceitar máscara e zeros; antes do envio, é normalizado e convertido para o tipo numérico exigido pela API. `useWatch` acompanha a senha para comparar a confirmação no cadastro.

## 6. Contexto da sessão

`AuthProvider` fornece nome e identificadores às páginas. O hook `useAuth` evita passar essas mesmas informações por todas as camadas de componentes. `sessionStorage` mantém a sessão ao atualizar a aba; a senha nunca é salva ali.

O backend atual não fornece token. Explique essa limitação e não apresente a proteção visual de rotas como autorização segura no servidor.

## 7. CRUD

- CREATE: cadastro de usuário, bilhete e caminhada — POST.
- READ: resumo, perfil, caminhada, conta, bilhete e histórico — GET.
- UPDATE: perfil e status do bilhete — PUT.
- DELETE: caminhada — DELETE, com confirmação.

O modal de exclusão usa `useRef<HTMLDialogElement>` e os métodos nativos `showModal()` e `close()`, de forma semelhante ao exemplo de produtos da aula.

## 8. Por que a conversão tem duas etapas?

A prévia consulta o servidor sem mudar o saldo. O usuário verifica os valores e confirma. A confirmação faz o POST. Depois, o saldo é consultado novamente. Não se deve inventar crédito no estado local nem supor que uma falha de conexão significa que o servidor não recebeu o pedido.

## 9. O que mudou em relação ao projeto anterior?

- O cadastro/login simulados deram lugar à API Java real.
- Idade e CPF foram adicionados ao formulário, conforme o DTO de cadastro.
- O painel usa saldo, resumo e histórico do backend.
- As telas da solução estão no grupo `/app`, com menu responsivo.
- Caminhadas têm criação, listagem, detalhes e exclusão.
- Perfil e bilhete têm atualização via PUT.
- A camada de integração usa `fetch`, sem Axios.
- O contato aponta para os canais da equipe, pois não existe endpoint de mensagens.

## 10. Relação com as aulas

A organização `routes`, `components`, `services` e `types` segue os exemplos estudados. O fluxo de produtos do professor foi adaptado ao domínio da SoulPass: os nomes mudam, mas o caminho continua sendo formulário → função de serviço → requisição HTTP → resposta → atualização da interface.

Leia primeiro `Caminhadas/index.tsx`, depois `caminhadaService.ts` e, por último, `api.ts`. Em seguida, acompanhe `Perfil` para o PUT e `CaminhadaDetalhe` para parâmetros de rota e DELETE.

## 11. Onde editar o CSS global?

Abra `src/index.css`. O começo mantém o tema roxo/magenta e os breakpoints do GitHub. O bloco identificado como Sprint 4 acrescenta classes com `@apply`, mantendo o Tailwind exigido no Challenge. Por exemplo, `campo-formulario` define os inputs e `grade-resumo` organiza os cartões responsivos. O JSX referencia esses nomes; não há um CSS separado para o painel nem estilos inline nas novas telas.

A aparência do Card original foi centralizada na classe `cartao-padrao`, e o painel reutiliza esse componente. O bloco final contém o visual da referência: Home, marca, menu público, menu lateral da conta, cartões e login. Sobre, FAQ e as demais páginas institucionais preservam o conteúdo e a organização anteriores.
