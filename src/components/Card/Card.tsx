import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Contêiner genérico com o "look" padrão do site (cantos arredondados,
 * sombra suave, respiro interno) reaproveitado por FAQ, Sobre, Solução etc.
 */
export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`cartao-padrao ${className}`}
    >
      {children}
    </div>
  );
}

