import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { LoginResposta, Sessao } from "../types/api";

const CHAVE = "soulpass:sessao:v4";
import { AuthContext } from "./auth";

function lerSessao(): Sessao | null {
  try {
    const dados = JSON.parse(sessionStorage.getItem(CHAVE) || "null") as Sessao | null;
    if (dados && Number.isInteger(dados.idUser) && dados.idUser > 0 &&
      Number.isInteger(dados.idConta) && dados.idConta > 0 && typeof dados.nome === "string") {
      return { idUser: dados.idUser, idConta: dados.idConta, nome: dados.nome };
    }
  } catch { /* Uma sessão inválida volta para a tela de login. */ }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [sessao, setSessao] = useState<Sessao | null>(lerSessao);
  useEffect(() => {
    // Limpa somente o cadastro demonstrativo da versão anterior, que guardava senhas.
    try { localStorage.removeItem("soulpass:usuarios"); } catch { /* Armazenamento indisponível. */ }
  }, []);

  function salvar(dados: Sessao | null) {
    setSessao(dados);
    try {
      if (dados) sessionStorage.setItem(CHAVE, JSON.stringify(dados));
      else sessionStorage.removeItem(CHAVE);
    } catch { /* Sem acesso ao armazenamento, a sessão dura enquanto a SPA estiver aberta. */ }
  }
  function iniciarSessao(resposta: LoginResposta) {
    if (!resposta.usuario?.idUser || !resposta.conta?.idConta || resposta.conta.idUser !== resposta.usuario.idUser) {
      throw new Error("A API não retornou o usuário e a conta esperados.");
    }
    salvar({ idUser: resposta.usuario.idUser, idConta: resposta.conta.idConta, nome: resposta.usuario.nome });
  }
  function atualizarNome(nome: string) { if (sessao) salvar({ ...sessao, nome }); }
  return <AuthContext.Provider value={{ sessao, iniciarSessao, atualizarNome, sair: () => salvar(null) }}>{children}</AuthContext.Provider>;
}
