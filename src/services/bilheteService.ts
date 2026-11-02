import { requisicao, ErroApi } from "./api";
import type { Bilhete, StatusBilhete } from "../types/api";

export async function buscarBilhete(idUser: number): Promise<Bilhete | null> {
  try { return await requisicao<Bilhete>(`/bilhetes/usuario/${idUser}`); }
  catch (erro) {
    if (erro instanceof ErroApi && erro.status === 404) return null;
    throw erro;
  }
}
export function cadastrarBilhete(idUser: number, numBilhete: number) {
  return requisicao<Bilhete>(`/bilhetes/usuario/${idUser}`, { method: "POST", body: JSON.stringify({ numBilhete }) });
}
export function atualizarStatusBilhete(id: number, status: StatusBilhete) {
  // Não permite editar crédito manualmente: a conversão é responsabilidade da API.
  return requisicao<Bilhete>(`/bilhetes/${id}`, { method: "PUT", body: JSON.stringify({ status }) });
}
