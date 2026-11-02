import { requisicao } from "./api";
import type { Conta, Conversao, ResumoConta, Simulacao } from "../types/api";

export function buscarConta(id: number) { return requisicao<Conta>(`/contas/${id}`); }
export function buscarResumo(id: number) { return requisicao<ResumoConta>(`/contas/${id}/resumo`); }
export function simularConversao(id: number, pontos: number) {
  return requisicao<Simulacao>(`/contas/${id}/conversao?pontos=${encodeURIComponent(pontos)}`);
}
export function converterPontos(id: number, pontos: number) {
  return requisicao<Conversao>(`/contas/${id}/conversao`, { method: "POST", body: JSON.stringify({ pontos }) });
}
