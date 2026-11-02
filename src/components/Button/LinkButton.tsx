import type { ReactNode } from "react";
import { Link } from "react-router";

type Variante = "primaria" | "secundaria" | "fantasma";

interface LinkButtonProps {
  to: string;
  children: ReactNode;
  variante?: Variante;
  externo?: boolean;
  className?: string;
}

const variantes: Record<Variante, string> = {
  primaria: "botao-principal",
  secundaria: "botao-secundario",
  fantasma: "bg-transparent text-soulup-700 hover:bg-soulup-100",
};

/**
 * Mesma linguagem visual do Button, mas para navegação (rotas internas
 * via React Router ou links externos como o vídeo pitch no YouTube).
 */
export default function LinkButton({
  to,
  children,
  variante = "primaria",
  externo = false,
  className = "",
}: LinkButtonProps) {
  const classes = `botao-base ${variantes[variante]} ${className}`;

  if (externo) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  );
}
