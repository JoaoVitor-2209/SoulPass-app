# Evolução da entrega de Front-end

O repositório de destino é `JoaoVitor-2209/SoulPass-app`. A base é
`SoulPass-1TDSPJ/SoulPass-app`, no commit
`81eec6964a1d3999cf6c0fd5296dd15f3cea2fb6`.

Os 32 commits originais foram preservados integralmente, com os mesmos hashes,
autores, datas e merges. As cinco branches de funcionalidades originais também
fazem parte da transferência. Algumas datas antigas estão fora da ordem dos
antecessores; foram mantidas para preservar o histórico recebido.

## Participação no histórico de origem

| Integrante | Commits sem merges |
| --- | ---: |
| João Vitor Cruz de Lima | 7 |
| Matheus Ferreira Antônio | 5 |
| Sophia Silveira dos Santos | 5 |
| Renato da Silva Tenorio | 5 |
| Renato Ruiz Ferreira Fonseca Scolamieri | 5 |

Essa contagem é do histórico geral. Ela não equivale a cinco novos commits por
integrante na Sprint 4. Os novos commits de integração foram preparados em nome
de João Vitor, com auxílio de IA, sem atribuir mudanças novas aos demais autores.

## Etapas da Sprint 4

A versão final revisada foi separada em mudanças funcionais na branch
`feature/sprint4-front`, partindo de `develop`. Cada etapa de código foi
compilada antes de seu commit. A feature é integrada em `develop` e depois em
`main` por merges, preservando os commits individuais.

- `2f8f0dc` — chore(front): prepara componentes e estilos globais da Sprint 4
- `5d80764` — feat(api): adiciona contratos e servicos da API Java
- `476efb6` — feat(auth): integra cadastro, login e painel protegido
- `663f78f` — feat(caminhadas): registra, consulta e exclui percursos
- `ee89d4e` — feat(conta): integra carteira, bilhete, historico e perfil
- `ad4c467` — feat(site): atualiza home, contato e chatbot
- `5436726` — content: atualiza videos e descricoes da Sprint 4
- `4a3833c` — style(solucao): aplica as seis capas enviadas pela equipe
- `abad2cc` — chore(deploy): configura rotas e API na Vercel

O último commit acrescenta as instruções e esta documentação. O projeto mantém
um CSS global, o cabeçalho em gradiente, o ônibus e o rodapé originais. A API é
remota, publicada no Render; os testes de serviço usam respostas controladas.

## Verificação e pendências

- Build em cada etapa de código.
- Testes dos serviços e lint aprovados.
- Conferência de que o resultado preserva o conteúdo funcional do ZIP final,
  incluindo os seis arquivos de capa enviados pela equipe.
- Publicação na Vercel e validação completa com conta autorizada na API ainda
  precisam ser realizadas. O README mantém essas pendências explícitas.

## Limpeza final

A branch `hotfix/remover-auth-local` remove o serviço demonstrativo antigo de
cadastro local, que já não era importado pelas telas integradas à API Java.
O build foi conferido novamente após a remoção.
