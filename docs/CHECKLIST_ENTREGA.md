# Conferência da Sprint 4

Base: enunciado do Challenge FIAP 2026, 2º semestre, seção Front-end Design Engineering.

| Critério | Implementação / ação necessária |
| --- | --- |
| React + Vite + TypeScript | Estrutura e build presentes |
| Rotas estáticas e dinâmicas | Páginas públicas; `/app/caminhadas/:id`, integrantes e entregáveis |
| Tipos, interface, union e intersection | `src/types/api.ts` |
| Tailwind e responsividade | Tema original e classes globais em index.css; grades e menu da conta responsivos |
| Service organizada com fetch | Serviços por entidade e tratamento central de HTTP |
| API Java remota | Configurada para o endereço Render fornecido |
| GET, POST, PUT e DELETE | Caminhadas, usuários, conta, histórico e bilhete |
| Loading, erro e lista vazia | Componentes reutilizáveis, feedback e nova tentativa |
| Páginas obrigatórias | Home, integrantes, sobre, FAQ e contato |
| Duas ou mais páginas da solução | Painel, caminhadas, carteira, bilhete, histórico e perfil |
| README e identificação | Incluídos, com dados preservados da equipe |
| ZIP sem node_modules e menor que 50 MB | Conferir o pacote final; não compactar dependências |
| Deploy Vercel | PENDENTE: publicar e inserir URL no README |
| Vídeo YouTube de até 3 minutos | Link enviado pela equipe incluído no README; conferir duração e conteúdo final |
| Git/GitHub/GitFlow e commits | Histórico original preservado e Sprint 4 organizada em commits na feature, develop e main |
| Validação completa da API publicada | PENDENTE: testar com conta de teste autorizada |
| Conferência visual mobile, tablet e desktop | Home, login e painel conferidos em 390px, 768px e desktop; repetir o fluxo real da equipe antes da entrega |

O enunciado pede pelo menos 5 commits por integrante e mínimo total de 15. Com cinco integrantes, 5 por pessoa corresponde a pelo menos 25 commits. São contribuições reais de desenvolvimento; não crie datas ou autores artificiais.

## Antes de enviar

1. Abra o ZIP extraído em outra pasta e execute `npm ci`, `npm test`, `npm run lint` e `npm run build`.
2. Com uma conta de teste, faça cadastro/login, registre uma caminhada e confira resumo, histórico e saldo.
3. Edite o perfil, cadastre um bilhete, consulte a simulação e confirme uma conversão acadêmica.
4. Verifique uma exclusão de caminhada, observando a regra de saldo documentada.
5. Teste rede indisponível, conta sem bilhete, lista vazia, erro de login e rota inválida.
6. Valide celular, tablet e desktop; confira menu, formulários, imagens e leitura sem rolagem horizontal.
7. Confira nome, RM, turma e perfis de todos os integrantes.
8. Preencha o link do deploy no README e confira o vídeo já informado.
9. Preserve o histórico importado e registre as próximas contribuições reais nas branches da equipe.
10. Entregue o ZIP no Portal do Aluno. Não substitua o ZIP apenas por link.

## Roteiro sugerido para o vídeo (até 3 minutos)

- 0:00–0:20 — Equipe, problema de mobilidade e proposta SoulPass.
- 0:20–0:45 — Site, integrantes, navegação e layout em celular.
- 0:45–1:15 — Cadastro/login e visão geral da conta.
- 1:15–1:45 — Registro e listagem de caminhada; mostrar GET/POST na aba Network.
- 1:45–2:10 — Edição do perfil por PUT e detalhe/exclusão por DELETE.
- 2:10–2:35 — Bilhete, prévia e confirmação da conversão.
- 2:35–3:00 — Pasta de serviços, tipagem, erros e endereço do deploy.

## Resultado de verificação desta versão

O build e os 19 testes de serviço passaram. O lint não apresentou avisos nem erros. Os testes de serviço usam respostas HTTP controladas e não alteram dados reais.

A Home e o login foram conferidos no navegador, incluindo o botão principal que abre `/login` e o redirecionamento de `/app` sem sessão. Home, login e painel foram inspecionados em 390px, 768px e desktop, incluindo abertura do menu móvel. Para conferir os cartões e o gráfico do painel, foi usado um ambiente isolado com respostas controladas para uma conta vazia e uma conta com atividades. Esse ambiente não faz parte do ZIP.

O fluxo completo de cadastro/login, caminhada, bilhete e conversão na API publicada ainda deve ser conferido com uma conta autorizada. A revisão visual não substitui esse teste.

## Visual atualizado

A Home, o login e o painel seguem a referência visual enviada pela equipe. O projeto preserva React, TypeScript, Tailwind, rotas, serviços Java, formulários e o CSS global em `src/index.css`. O menu lateral da conta substitui a antiga barra horizontal. Os botões públicos de acesso abrem o login; o painel usa os dados da API e não contém uma área de demonstração.

O cabeçalho público em gradiente e o Footer escuro originais foram restaurados. A marca volta a usar `onibus-pass.png`, inclusive no menu lateral da conta.
