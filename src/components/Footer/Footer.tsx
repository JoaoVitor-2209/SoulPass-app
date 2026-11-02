import iconeGithub from "../../assets/icones/github.png";
import iconeYoutube from "../../assets/icones/youtube.png";

/**
 * Rodapé padrão reutilizado em todas as páginas, com links externos
 * para o GitHub e o canal do YouTube do projeto.
 */
const anoAtual = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="mt-16 bg-soulup-900 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/20"
            href="https://github.com/SoulPass-1TDSPJ"
            target="_blank"
            rel="noreferrer"
          >
            <img src={iconeGithub} alt="" className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/20"
            href="https://www.youtube.com/@SoulPassFiap"
            target="_blank"
            rel="noreferrer"
          >
            <img src={iconeYoutube} alt="" className="h-4 w-4" aria-hidden="true" />
            Youtube
          </a>
        </div>
        <div className="h-px w-24 bg-white/20" aria-hidden="true" />
        <p className="text-sm text-white/70">
          SoulPass · Todos os direitos reservados · &copy; · {anoAtual}
        </p>
      </div>
    </footer>
  );
}

