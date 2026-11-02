import type { ReactNode } from "react";
import { Card as CardOriginal } from "../Card";

// Nomes das classes: as regras visuais ficam em src/index.css.
export const campo = "campo-formulario";
export const botao = "botao-principal";
export const secundario = "botao-secundario";

export function Titulo({
  titulo,
  descricao,
  acao,
}: {
  titulo: string;
  descricao: string;
  acao?: ReactNode;
}) {
  return (
    <div className="painel-titulo">
      <div>
        <h1>{titulo}</h1>
        <p>{descricao}</p>
      </div>
      {acao}
    </div>
  );
}
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <CardOriginal className={`painel-cartao ${className}`}>
      {children}
    </CardOriginal>
  );
}
export function Aviso({
  texto,
  tipo = "erro",
}: {
  texto: string;
  tipo?: "erro" | "sucesso" | "info";
}) {
  if (!texto) return null;
  return (
    <p
      role={tipo === "erro" ? "alert" : "status"}
      className={`aviso aviso-${tipo}`}
    >
      {texto}
    </p>
  );
}
export function Carregando() {
  return (
    <p role="status" className="painel-carregando">
      Carregando seus dados… A primeira conexão pode levar alguns instantes.
    </p>
  );
}
export function Falha({ erro, tentar }: { erro: string; tentar: () => void }) {
  return (
    <Card>
      <Aviso texto={erro} />
      <button type="button" className={secundario} onClick={tentar}>
        Tentar novamente
      </button>
    </Card>
  );
}
export function Vazio({ children }: { children: ReactNode }) {
  return <p className="painel-vazio">{children}</p>;
}
