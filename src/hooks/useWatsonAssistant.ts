import { useEffect } from "react";

/**
 * Tipagem da configuração exigida pelo widget do Watson Assistant.
 * Não faz parte da lib oficial (não tem @types), então declaramos aqui
 * a extensão mínima da interface global Window que usamos.
 */
declare global {
  interface Window {
    watsonAssistantChatOptions?: {
      integrationID: string;
      region: string;
      serviceInstanceID: string;
      clientVersion?: string;
      onLoad: (instance: { render: () => Promise<void> }) => Promise<void>;
    };
  }
}

const WATSON_SCRIPT_ID = "watson-assistant-chat-entry";

/**
 * Carrega o widget do Watson Assistant (SoulPassBot) uma única vez,
 * dentro do ciclo de vida do React — substitui o script que antes vivia
 * solto em public/watson-assistant.js e era referenciado no index.html.
 *
 * A checagem por WATSON_SCRIPT_ID evita que o script seja injetado duas
 * vezes (ex.: o modo StrictMode do React executa efeitos duas vezes em
 * desenvolvimento).
 */
export function useWatsonAssistant(): void {
  useEffect(() => {
    if (import.meta.env.VITE_WATSON_ENABLED === "false") return;
    if (document.getElementById(WATSON_SCRIPT_ID)) {
      return;
    }

    window.watsonAssistantChatOptions = {
      integrationID: import.meta.env.VITE_WATSON_INTEGRATION_ID || "e3b7d962-7de4-4105-9fcc-2645dd6f580d",
      region: import.meta.env.VITE_WATSON_REGION || "https://integrations.us-south.assistant.watson.appdomain.cloud",
      serviceInstanceID: import.meta.env.VITE_WATSON_SERVICE_INSTANCE_ID || "17b1816c-9ace-4e29-9af9-9b91c042aacf",
      onLoad: async (instance) => {
        await instance.render();
      },
    };

    const timer = setTimeout(() => {
      if (document.getElementById(WATSON_SCRIPT_ID)) return;
      const script = document.createElement("script");
      script.id = WATSON_SCRIPT_ID;
      script.src =
        "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
        (window.watsonAssistantChatOptions?.clientVersion ?? "latest") +
        "/WatsonAssistantChatEntry.js";
      document.head.appendChild(script);
    });

    return () => clearTimeout(timer);
  }, []);
}

