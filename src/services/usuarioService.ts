import { requisicao } from "./api";
import type { CadastroDados, LoginDados, LoginResposta, PerfilDados, Usuario } from "../types/api";

export function entrar(dados: LoginDados) {
  return requisicao<LoginResposta>("/usuarios/login", { method: "POST", body: JSON.stringify(dados) });
}
export function cadastrar(dados: CadastroDados) {
  return requisicao<LoginResposta>("/usuarios", { method: "POST", body: JSON.stringify(dados) });
}
export function buscarUsuario(id: number) {
  return requisicao<Usuario>(`/usuarios/${id}`);
}
export function atualizarUsuario(id: number, dados: PerfilDados) {
  return requisicao<Usuario>(`/usuarios/${id}`, { method: "PUT", body: JSON.stringify(dados) });
}
