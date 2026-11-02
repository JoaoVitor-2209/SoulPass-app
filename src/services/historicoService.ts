import { requisicao } from "./api";
import type { Historico, OrigemPontos } from "../types/api";

export function listarHistorico(idConta: number, origem?: OrigemPontos) {
  const filtro = origem ? `?origem=${encodeURIComponent(origem)}` : "";
  return requisicao<Historico>(`/historicos/conta/${idConta}${filtro}`);
}
