import { useState } from "react";
import { useAuth } from "../../context/auth";
import { NavLink as RouterNavLink } from "react-router";
import { navLinks } from "../../data/navigation";

/**
 * Navegação principal. Usa useState para controlar a abertura do menu
 * mobile (hambúrguer) — visível apenas abaixo do breakpoint "desktop".
 */
export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { sessao } = useAuth();

  function fecharMenu() {
    setMenuAberto(false);
  }

  // No menu mobile o painel abre com fundo branco (texto escuro).
  // A partir de "desktop" o menu fica embutido no header em gradiente
  // roxo/magenta, então o texto precisa virar branco para ter contraste.
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `block rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
      isActive
        ? "bg-soulup-500 text-white desktop:bg-white desktop:text-soulup-900"
        : "text-soulup-900 hover:bg-soulup-100 desktop:text-white/90 desktop:hover:bg-white/15"
    }`;

  return (
    <nav aria-label="Navegação principal">
      <button
        type="button"
        className="desktop:hidden inline-flex items-center justify-center rounded-full border border-white/50 px-3 py-2 text-white"
        aria-expanded={menuAberto}
        aria-controls="menu-principal"
        onClick={() => setMenuAberto((aberto) => !aberto)}
      >
        <span className="sr-only">Abrir menu</span>
        <span aria-hidden="true">{menuAberto ? "✕" : "☰"}</span>
      </button>

      <ul
        id="menu-principal"
        className={`${
          menuAberto ? "flex" : "hidden"
        } desktop:flex absolute inset-x-0 top-full flex-col gap-1 bg-white px-4 pb-4 shadow-lg desktop:static desktop:flex-row desktop:gap-2 desktop:bg-transparent desktop:p-0 desktop:shadow-none`}
      >
        {navLinks.map((link) => (
          <li key={link.to}>
            <RouterNavLink
              to={link.to}
              end={link.to === "/"}
              className={linkClasses}
              onClick={fecharMenu}
            >
              {link.label}
            </RouterNavLink>
          </li>
        ))}
        <li className="desktop:ml-2">
          <RouterNavLink
            to={sessao ? "/app" : "/login"}
            className="block rounded-full bg-soulup-900 px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-soulup-700 desktop:bg-white desktop:text-soulup-900 desktop:hover:bg-soulup-100"
            onClick={fecharMenu}
          >
            {sessao ? "Meu painel" : "Login"}
          </RouterNavLink>
        </li>
      </ul>
    </nav>
  );
}

