import type { ContatoFormValues } from "../types";

// A API fornecida não possui endpoint de contato. Somente prepara um rascunho local.
export function prepararMensagem(dados: ContatoFormValues): string {
  return `Nome: ${dados.nome}\nE-mail: ${dados.email}\nAssunto: ${dados.assunto}\n\n${dados.mensagem}`;
}
