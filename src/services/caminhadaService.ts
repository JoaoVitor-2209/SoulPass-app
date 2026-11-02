import { requisicao } from "./api";
import type { Caminhada, CaminhadaRegistrada } from "../types/api";

export function listarCaminhadas(idConta: number) {
  return requisicao<Caminhada[]>(`/caminhadas/conta/${idConta}`);
}
export function buscarCaminhada(id: number) { return requisicao<Caminhada>(`/caminhadas/${id}`); }
export function registrarCaminhada(idConta: number, kmAndados: number) {
  return requisicao<CaminhadaRegistrada>("/caminhadas", { method: "POST", body: JSON.stringify({ idConta, kmAndados }) });
}
export function excluirCaminhada(id: number) {
  return requisicao<void>(`/caminhadas/${id}`, { method: "DELETE" });
}
