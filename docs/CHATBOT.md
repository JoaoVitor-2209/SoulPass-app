# Chatbot IBM Watson integrado

O chatbot foi configurado no hook que o repositório já possui, `src/hooks/useWatsonAssistant.ts`, chamado pelo Layout compartilhado das páginas públicas e da área da conta.

Os três campos abaixo foram preservados exatamente como no código de incorporação enviado pela equipe:

```text
integrationID: e3b7d962-7de4-4105-9fcc-2645dd6f580d
region: https://integrations.us-south.assistant.watson.appdomain.cloud
serviceInstanceID: 17b1816c-9ace-4e29-9af9-9b91c042aacf
```

Neste snippet, `region` contém uma URL completa. O projeto mantém esse valor sem trocar por um código curto de região.

## Como usar

Execute normalmente:

```bash
npm ci
npm run dev
```

Sem `.env`, o hook já usa os valores acima e habilita o carregamento do widget. Não é necessário colar outro `<script>` no `index.html` ou em cada página. Isso evita duplicar o chatbot ao navegar entre as rotas.

Se já houver um `.env` antigo com `VITE_WATSON_ENABLED=false`, altere o valor para `true` ou remova essa variável e reinicie o Vite. O `.env.example` foi atualizado com a configuração enviada.

Para configurar explicitamente:

```env
VITE_WATSON_ENABLED=true
VITE_WATSON_INTEGRATION_ID=e3b7d962-7de4-4105-9fcc-2645dd6f580d
VITE_WATSON_REGION=https://integrations.us-south.assistant.watson.appdomain.cloud
VITE_WATSON_SERVICE_INSTANCE_ID=17b1816c-9ace-4e29-9af9-9b91c042aacf
```

Para desativar o chatbot, defina `VITE_WATSON_ENABLED=false`.

Na Vercel, não são necessárias variáveis novas para esses valores padrão. Caso existam variáveis antigas, atualize-as ou remova-as para usar os valores do código e faça um novo deploy.

## Onde obter uma nova configuração

No IBM watsonx Assistant, abra seu assistente e entre em **Integrations > Web chat > Open**. Selecione o ambiente e abra **Embed**. Copie o código de incorporação desse ambiente e mantenha seus campos conforme fornecidos pelo IBM.

Documentação oficial: https://cloud.ibm.com/docs/watson-assistant?topic=watson-assistant-deploy-web-chat

Os identificadores do Web chat são públicos. Não coloque API keys, senhas, tokens IAM ou chaves privadas em variáveis `VITE_*`.

## Verificação

O projeto foi verificado por build e lint. Não foi enviada nenhuma conversa ao assistente durante esta atualização; a disponibilidade da instância e suas respostas precisam ser conferidas no navegador ao executar o projeto.

O carregamento utiliza o script oficial da IBM e chama `instance.render()` no callback `onLoad`, como no snippet recebido. A verificação pelo ID do script evita inserções duplicadas; o timer é limpo durante o ciclo de vida do React.
