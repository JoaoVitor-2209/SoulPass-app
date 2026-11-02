import { createContext, useContext } from "react";
import type { LoginResposta, Sessao } from "../types/api";

export interface AuthDados {
  sessao: Sessao | null;
  iniciarSessao: (resposta: LoginResposta) => void;
  atualizarNome: (nome: string) => void;
  sair: () => void;
}
export const AuthContext = createContext<AuthDados | null>(null);

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error("useAuth precisa estar dentro do AuthProvider.");
  return contexto;
}
