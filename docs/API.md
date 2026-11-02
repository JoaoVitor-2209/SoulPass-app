# Integração com a API Java SoulPass

Base remota: `https://soulpass-api.onrender.com`.

O navegador chama `/api`. O Vite em desenvolvimento e o `vercel.json` em produção encaminham a chamada para a base remota. Não é preciso alterar as rotas do Java nem criar um banco no front.

## Endpoints utilizados

| Verbo | Endpoint | Corpo | Resposta |
| --- | --- | --- | --- |
| POST | `/usuarios` | nome, idade, cpf, email, senha | `{ usuario, conta }` |
| POST | `/usuarios/login` | email, senha | `{ usuario, conta }` |
| GET | `/usuarios/{idUser}` | — | Usuario |
| PUT | `/usuarios/{idUser}` | nome, idade, cpf | Usuario atualizado |
| GET | `/contas/{idConta}` | — | Conta |
| GET | `/contas/{idConta}/resumo` | — | ResumoConta |
| GET | `/contas/{idConta}/conversao?pontos=605` | — | Simulacao |
| POST | `/contas/{idConta}/conversao` | `{ pontos }` | Conversao |
| GET | `/bilhetes/usuario/{idUser}` | — | Bilhete; 404 significa ausência |
| POST | `/bilhetes/usuario/{idUser}` | `{ numBilhete }` | Bilhete criado |
| PUT | `/bilhetes/{idTicket}` | `{ status }` | Bilhete atualizado |
| GET | `/caminhadas/conta/{idConta}` | — | Caminhada[] |
| GET | `/caminhadas/{idCaminhada}` | — | Caminhada |
| POST | `/caminhadas` | `{ idConta, kmAndados }` | CaminhadaRegistrada |
| DELETE | `/caminhadas/{idCaminhada}` | — | 204 sem corpo |
| GET | `/historicos/conta/{idConta}` | — | `{ totalRegistros, pontosConquistados, registros }` |
| GET | `/historicos/conta/{idConta}?origem=CAMINHADA` | — | Mesmo wrapper com filtro |

Não são utilizadas listagens globais de usuários, contas ou bilhetes. Cada tela trabalha com os identificadores devolvidos no login da própria conta.

## Campos importantes

- Usuário: `idUser`, `nome`, `idade`, `cpf`, `email`, `bilhete`.
- Conta: `idConta`, `idUser`, `atividade`, `qtdePontos`, `limitePontos`, `equivalenteEmCredito`, `pontosFaltantesPassagem`, `bilhete`.
- Bilhete: `idTicket`, `credito`, `numBilhete`, `status`.
- Caminhada: `idCaminhada`, `diaCaminhada`, `kmAndados`, `idConta`.
- Resultado do registro: `diaCaminhada`, `kmAndados`, `pontosGanhos`, `saldoPontos`. Esse DTO não devolve o ID; o front recarrega a lista para obter os identificadores.
- Histórico: cada registro tem `idHistorico`, `idConta`, `origem`, `pontosGanhos`, `dataRegistro`.
- Simulação: `pontosNecessarios`, `saldoAposConversao`, `creditoRecebido`, `saldoSuficiente`.
- Conversão: `pontosConvertidos`, `creditoRecebido`, `saldoPontos`, `saldoBilhete`.
- Resumo: `nome`, `conta`, `kmSemana`, `kmHoje`, `metaDiariaKm`, `percentualMeta`, `kmFaltantes`, `limitePontosDia`, `ultimos7Dias`, `ultimasAtividades`.

Os tipos completos estão em `src/types/api.ts`. Não há adaptação para `/auth/login`, `/usuarios/me`, `/contas/me`, `/conversoes` ou `/contatos`: essas rotas não constam do backend atual.

## Regras da interface

1. Registro de caminhada envia somente conta e distância. Data, pontuação e limites ficam com o servidor.
2. A simulação é GET, sem alteração da conta. A confirmação é um POST separado, após ação explícita do usuário.
3. Alterar o número de pontos invalida a prévia anterior.
4. Enquanto a conversão está pendente, o botão fica desabilitado. Em erro, é preciso consultar o saldo antes de tentar novamente.
5. Atualização de perfil envia apenas os campos suportados. O e-mail é somente leitura.
6. O status do bilhete pode ser alterado; o saldo não é editável manualmente pela interface.
7. A exclusão usa o ID da caminhada e verifica se o registro retornado pertence à conta da sessão. A autorização definitiva deve existir também no backend.

## Erros HTTP

- 400: dados inválidos; apresenta o motivo de negócio informado pelo servidor.
- 401: login inválido.
- 403: acesso recusado.
- 404: registro não encontrado; só a consulta de bilhete trata isso como estado vazio.
- 409: conflito de cadastro ou regra de negócio.
- 500+: mensagem genérica, sem detalhes internos do banco.
- 204: sucesso sem tentativa de ler JSON.
- Rede/timeout: apresenta feedback, sem substituir a resposta por dados locais.

A API inclui outros endpoints administrativos e recuperação de senha. Eles não são necessários aos fluxos implementados e não foram apresentados como recursos funcionais deste front.
