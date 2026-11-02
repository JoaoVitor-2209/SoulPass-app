// /api é encaminhado para a API remota pelo Vite (dev) e pela Vercel (produção).
export const API_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

export class ErroApi extends Error {
  status: number;
  constructor(mensagem: string, status: number) {
    super(mensagem);
    this.name = "ErroApi";
    this.status = status;
  }
}

const mensagens: Record<number, string> = {
  400: "Confira os dados informados e tente novamente.",
  401: "E-mail ou senha inválidos.",
  403: "Não foi possível acessar este recurso.",
  404: "O registro solicitado não foi encontrado.",
  409: "Esta operação entra em conflito com os dados cadastrados.",
  500: "O servidor encontrou um problema. Tente novamente em instantes.",
};

// Uma única função concentra fetch, status HTTP, corpo vazio e tempo de espera.
export async function requisicao<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  const controller = new AbortController();
  const tempoLimite = setTimeout(() => controller.abort(), 90000);
  try {
    const resposta = await fetch(API_URL + caminho, {
      ...opcoes,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(opcoes.body ? { "Content-Type": "application/json" } : {}),
        ...opcoes.headers,
      },
    });
    const texto = resposta.status === 204 ? "" : await resposta.text();
    let dados: unknown;
    try { dados = texto ? JSON.parse(texto) : undefined; }
    catch {
      if (resposta.ok) throw new ErroApi("O servidor retornou uma resposta inesperada.", resposta.status);
    }
    if (!resposta.ok) {
      const erro = dados as { message?: unknown; mensagem?: unknown } | undefined;
      // Erros internos não exibem detalhes de banco ou stack trace na interface.
      const detalhe = resposta.status < 500 ? erro?.mensagem ?? erro?.message : undefined;
      throw new ErroApi(
        typeof detalhe === "string" && detalhe.trim() ? detalhe : mensagens[resposta.status] || "Não foi possível concluir a operação.",
        resposta.status,
      );
    }
    return dados as T;
  } catch (erro) {
    if (erro instanceof ErroApi) throw erro;
    if (opcoes.method && !["GET", "HEAD"].includes(opcoes.method.toUpperCase())) {
      throw new Error("Não foi possível confirmar a operação. Consulte a listagem ou o saldo antes de reenviar, pois o servidor pode ter recebido a solicitação.");
    }
    if (erro instanceof Error && erro.name === "AbortError") {
      throw new Error("A API demorou para responder. Aguarde alguns instantes e tente novamente.");
    }
    throw new Error("Não foi possível conectar à API. Verifique a conexão e tente novamente.");
  } finally {
    clearTimeout(tempoLimite);
  }
}
