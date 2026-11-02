import { useState } from "react";
import { Link, NavLink, Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../../context/auth";
import Marca from "../Marca/Marca";
import { Footer } from "../Footer";
import Icone from "../Icone/Icone";
import type { NomeIcone } from "../Icone/Icone";

const links: { to: string; texto: string; icone: NomeIcone }[] = [
  { to: "/app", texto: "Visão geral", icone: "painel" },
  { to: "/app/caminhadas", texto: "Minhas caminhadas", icone: "caminhada" },
  { to: "/app/carteira", texto: "Pontos e créditos", icone: "troca" },
  { to: "/app/bilhete", texto: "Meu bilhete", icone: "bilhete" },
  { to: "/app/historico", texto: "Meu histórico", icone: "historico" },
  { to: "/app/perfil", texto: "Meu perfil", icone: "perfil" },
];

export default function LayoutPainel() {
  const { sessao, sair } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);
  const local = useLocation();
  if (!sessao)
    return <Navigate to="/login" state={{ de: local.pathname }} replace />;
  const pagina =
    [...links]
      .reverse()
      .find(
        (link) =>
          local.pathname === link.to ||
          local.pathname.startsWith(link.to + "/"),
      )?.texto || "Minha conta";

  return (
    <div className="aplicativo">
      <a href="#conteudo-painel" className="pular-conteudo">
        Pular para o conteúdo
      </a>
      <aside className="app-lateral">
        <div className="app-marca">
          <Marca />
          <button
            className="app-menu-botao"
            type="button"
            aria-label={
              menuAberto ? "Fechar opções da conta" : "Abrir opções da conta"
            }
            aria-expanded={menuAberto}
            aria-controls="menu-usuario"
            onClick={() => setMenuAberto(!menuAberto)}
          >
            <Icone nome={menuAberto ? "fechar" : "menu"} />
          </button>
        </div>
        <div
          className={
            "app-lateral-conteudo " + (menuAberto ? "app-lateral-aberta" : "")
          }
          id="menu-usuario"
        >
          <p className="app-menu-rotulo">Sua mobilidade</p>
          <nav aria-label="Minha conta" className="app-menu">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/app"}
                onClick={() => setMenuAberto(false)}
                className={({ isActive }) =>
                  "app-menu-link " + (isActive ? "app-menu-ativo" : "")
                }
              >
                <Icone nome={link.icone} />
                {link.texto}
              </NavLink>
            ))}
          </nav>
          <div className="app-lateral-base">
            <div className="app-incentivo">
              <Icone nome="folha" />
              <strong>Um passo de cada vez.</strong>
              <p>Uma rotina mais ativa. Uma cidade com mais possibilidades.</p>
              <Link to="/sobre">
                Conheça a SoulPass
                <Icone nome="seta" />
              </Link>
            </div>
            <div className="app-ajuda">
              <Link to="/faq">Ajuda</Link>
              <Link to="/contato">Fale com a gente</Link>
            </div>
            <button className="app-sair" type="button" onClick={sair}>
              <Icone nome="sair" />
              Sair da conta
            </button>
          </div>
        </div>
      </aside>
      <div className="app-principal">
        <header className="app-topo">
          <p className="app-caminho">
            Seu espaço <span>/</span>
            <strong>{pagina}</strong>
          </p>
          <Link to="/app/perfil" className="app-perfil">
            <span>
              <strong>{sessao.nome.split(" ").slice(0, 2).join(" ")}</strong>
              <small>Vamos mais longe</small>
            </span>
            <span className="usuario-avatar" aria-hidden="true">
              {sessao.nome.charAt(0).toUpperCase()}
            </span>
          </Link>
        </header>
        <div id="conteudo-painel" className="app-conteudo">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}
