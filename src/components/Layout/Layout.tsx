import { Outlet, useLocation } from "react-router";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import { useWatsonAssistant } from "../../hooks/useWatsonAssistant";

/**
 * Layout raiz da SPA: as páginas públicas usam o cabeçalho do site.
 * O painel tem sua própria navegação lateral e seu rodapé. Scroll e
 * chatbot continuam compartilhados por todas as rotas no mesmo Outlet.
 */
export default function Layout() {
  useScrollToTop();
  useWatsonAssistant();
  const { pathname } = useLocation();
  const painel = pathname === "/app" || pathname.startsWith("/app/");

  return (
    <div className="flex min-h-screen flex-col">
      {!painel && <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!painel && <Footer />}
    </div>
  );
}
