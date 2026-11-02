import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variante = "primaria" | "secundaria" | "fantasma";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variante?: Variante;
}

const variantes: Record<Variante, string> = {
  primaria: "botao-principal",
  secundaria: "botao-secundario",
  fantasma: "bg-transparent text-soulup-700 hover:bg-soulup-100",
};

/**
 * Botão padrão do design system SoulPass. Usado tanto para navegação
 * (envolvido por <Link>) quanto para ações de formulário (type="submit").
 */
export default function Button({
  children,
  variante = "primaria",
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`botao-base ${variantes[variante]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
