import { Link } from "react-router";
import { PageHero } from "../../components/PageHero";
import { LinkButton } from "../../components/Button";
import { entregaveis } from "../../data/entregaveis";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import imgEntrega from "../../assets/sobre/img-entrega.png";

/**
 * Página "Solução do Projeto" — migrada de paginas/informacao/pagina2.html.
 * Cada entregável leva para a rota dinâmica /solucao/:id.
 */
export default function Solucao() {
  useDocumentTitle("Solução do projeto");

  return (
    <>
      <PageHero
        titulo={<>Nossos <em className="not-italic text-soulup-500">Entregáveis</em></>}
        imagem={imgEntrega}
        imagemAlt="Ônibus SoulPass"
        acoes={<LinkButton to="/videos">Assistir vídeos</LinkButton>}
      >
        <p>Veja o que foi desenvolvido em cada disciplina do Challenge FIAP 2026, Sprint 4 do 2º Semestre.</p>
      </PageHero>

      <section className="mx-auto max-w-6xl px-6 py-14 tablet:py-20">
        <div className="grid gap-6 tablet:grid-cols-2">
          {entregaveis.map((item) => (
            <Link
              key={item.id}
              to={`/solucao/${item.id}`}
              className="group flex flex-col gap-4 rounded-2xl border border-soulup-100 bg-white p-6 shadow-sm shadow-soulup-900/5 transition-shadow hover:shadow-md"
            >
              <img src={item.imagem} alt="" className="solucao-capa" width="1672" height="941" loading="lazy" decoding="async" aria-hidden="true" />
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-soulup-500">
                    {item.emoji} {item.materia}
                  </p>
                  <h2 className="text-lg font-bold text-soulup-900">{item.titulo}</h2>
                </div>
              </div>
              <p className="text-sm text-soulup-900/75">{item.resumo}</p>
              <span className="mt-auto text-sm font-semibold text-soulup-700 group-hover:underline">
                Ver detalhes →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

