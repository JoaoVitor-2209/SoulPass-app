import { Link } from "react-router";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useAuth } from "../../context/auth";
import Icone from "../../components/Icone/Icone";
import girlBanner from "../../assets/hero/girl-banner.png";

export default function Home() {
  useDocumentTitle("Cada passo conta");
  const { sessao } = useAuth();
  const acesso = sessao ? "/app" : "/login";
  return (
    <>
      <section className="inicio-hero">
        <div className="inicio-texto">
          <span className="inicio-selo">
            <Icone nome="folha" /> Movimento que transforma
          </span>
          <h1>
            Seu próximo
            <br />
            trajeto começa
            <br />
            <span>a pé.</span>
          </h1>
          <p className="inicio-descricao">
            Uma caminhada até o metrô. Uma volta pelo bairro. Com a SoulPass,
            seus passos viram pontos e novas possibilidades de mobilidade.
          </p>
          <div className="inicio-acoes">
            <Link to={acesso} className="botao-principal">
              {sessao ? "Acessar meu painel" : "Começar minha jornada"}
              <Icone nome="seta" />
            </Link>
            <a href="#como-funciona" className="botao-secundario">
              Como funciona
            </a>
          </div>
          <p className="inicio-nota">
            {sessao
              ? "Seu movimento, seus pontos, seu próximo destino."
              : "Entre na sua conta para acompanhar suas caminhadas e seus pontos."}
          </p>
          <dl className="inicio-numeros">
            <div>
              <dt>2 km</dt>
              <dd>para ganhar 40 pontos</dd>
            </div>
            <div>
              <dt>120 pts</dt>
              <dd>por dia, no seu ritmo</dd>
            </div>
          </dl>
        </div>
        <div className="inicio-imagem">
          <div className="inicio-arco" aria-hidden="true" />
          <img
            src={girlBanner}
            alt="Pessoa sorrindo enquanto usa o celular"
            fetchPriority="high"
          />
          <div className="inicio-mensagem">
            <span className="inicio-check">
              <Icone nome="check" />
            </span>
            <div>
              <strong>Mais movimento. Mais possibilidades.</strong>
              <p>Uma cidade melhor começa no seu caminho.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="como-funciona" className="inicio-como">
        <p className="inicio-sobretitulo">
          Simples, do começo ao próximo destino
        </p>
        <h2>Sua rotina pode te levar além.</h2>
        <div className="inicio-etapas">
          <article>
            <span className="inicio-numero">01</span>
            <Icone nome="caminhada" />
            <h3>Encontre seu ritmo</h3>
            <p>
              Registre a distância das suas caminhadas e acompanhe sua evolução
              na sua conta.
            </p>
          </article>
          <article>
            <span className="inicio-numero">02</span>
            <Icone nome="pontos" />
            <h3>Veja seus pontos crescerem</h3>
            <p>
              Cada marco de 2 km no dia vale 40 pontos. São até 120 pontos
              diários pelas suas caminhadas.
            </p>
          </article>
          <article>
            <span className="inicio-numero">03</span>
            <Icone nome="onibus" />
            <h3>Escolha seu próximo destino</h3>
            <p>
              Confira seu saldo, simule uma conversão e transforme seus pontos
              em créditos no bilhete cadastrado.
            </p>
          </article>
        </div>
      </section>
      <section className="inicio-convite">
        <Icone nome="folha" />
        <h2>O primeiro passo é seu.</h2>
        <p>Comece sua jornada de pontos e mobilidade.</p>
        <Link to={acesso} className="botao-principal">
          {sessao ? "Ir para meu painel" : "Entrar na minha conta"}
          <Icone nome="seta" />
        </Link>
      </section>
    </>
  );
}
