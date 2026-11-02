import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/auth";
import { buscarResumo } from "../../services/contaService";
import type { ResumoConta } from "../../types/api";
import { moeda, numero, dataHora, mensagemErro } from "../../utils/formatar";
import { Card, Carregando, Falha, Vazio } from "../../components/Painel/ui";
import Icone from "../../components/Icone/Icone";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function Painel() {
  useDocumentTitle("Visão geral");
  const { sessao } = useAuth();
  const [resumo, setResumo] = useState<ResumoConta | null>(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [tentativa, setTentativa] = useState(0);
  const idConta = sessao?.idConta;
  useEffect(() => {
    if (!idConta) return;
    let ativo = true;
    // oxlint-disable-next-line react/set-state-in-effect -- Reinicia o estado ao consultar outra conta.
    setCarregando(true);
    setErro("");
    buscarResumo(idConta)
      .then((dados) => {
        if (ativo) setResumo(dados);
      })
      .catch((e) => {
        if (ativo) setErro(mensagemErro(e));
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });
    return () => {
      ativo = false;
    };
  }, [idConta, tentativa]);

  const percentual = Math.min(100, Math.max(0, resumo?.percentualMeta || 0));
  const maiorDistancia = Math.max(
    1,
    ...(resumo?.ultimos7Dias.map((dia) => dia.km) || []),
  );

  return (
    <>
      <div className="painel-boas-vindas">
        <div>
          <p>
            Que bom ter você por aqui <span aria-hidden="true">👋</span>
          </p>
          <h1>Olá, {sessao?.nome.split(" ")[0] || "você"}!</h1>
        </div>
        <Link to="/app/caminhadas" className="botao-secundario">
          <Icone nome="mais" />
          Registrar caminhada
        </Link>
      </div>
      <section className="painel-banner">
        <div className="painel-banner-texto">
          <p className="painel-banner-rotulo">Seu movimento tem valor</p>
          <h2>
            O próximo destino começa <br />
            com o seu próximo passo.
          </h2>
          <p>
            Caminhe, acumule pontos e transforme sua rotina em novas
            possibilidades de ir e vir.
          </p>
          <Link to="/app/carteira" className="painel-banner-link">
            Usar meus pontos
            <Icone nome="seta" />
          </Link>
        </div>
        <div className="painel-banner-arte" aria-hidden="true">
          <Icone nome="caminhada" />
          <span />
          <span />
        </div>
      </section>
      {carregando ? (
        <Carregando />
      ) : erro ? (
        <Falha erro={erro} tentar={() => setTentativa(tentativa + 1)} />
      ) : (
        resumo && (
          <>
            <section
              className="painel-indicadores"
              aria-label="Resumo da sua jornada"
            >
              <Card>
                <div className="painel-indicador-topo">
                  <p>Seus pontos</p>
                  <span className="indicador-icone">
                    <Icone nome="pontos" />
                  </span>
                </div>
                <p className="painel-numero">
                  {numero(resumo.conta.qtdePontos)}
                  <span>pts</span>
                </p>
                <p className="painel-legenda">
                  Equivalem a {moeda(resumo.conta.equivalenteEmCredito)}
                </p>
              </Card>
              <Card>
                <div className="painel-indicador-topo">
                  <p>Créditos de transporte</p>
                  <span className="indicador-icone indicador-rosa">
                    <Icone nome="bilhete" />
                  </span>
                </div>
                <p className="painel-numero">
                  {moeda(resumo.conta.bilhete?.credito || 0)}
                </p>
                <p className="painel-legenda">
                  {resumo.conta.bilhete ? (
                    "Saldo no seu bilhete cadastrado"
                  ) : (
                    <Link to="/app/bilhete">
                      Vincule seu bilhete para começar →
                    </Link>
                  )}
                </p>
              </Card>
              <Card>
                <div className="painel-indicador-topo">
                  <p>Distância nesta semana</p>
                  <span className="indicador-icone indicador-verde">
                    <Icone nome="caminhada" />
                  </span>
                </div>
                <p className="painel-numero">
                  {numero(resumo.kmSemana)}
                  <span>km</span>
                </p>
                <p className="painel-legenda">Seu movimento faz a diferença</p>
              </Card>
            </section>
            <div className="painel-grade">
              <Card className="painel-coluna-ampla">
                <div className="linha-distribuida">
                  <div>
                    <h2 className="titulo-cartao">Sua semana em movimento</h2>
                    <p className="painel-legenda">
                      Cada caminhada conta para chegar mais longe.
                    </p>
                  </div>
                  <span className="painel-periodo">Últimos 7 dias</span>
                </div>
                <div
                  className="grafico-semana"
                  role="img"
                  aria-label={
                    "Distâncias dos últimos sete dias: " +
                    resumo.ultimos7Dias
                      .map((dia) => dia.data + ": " + numero(dia.km) + " km")
                      .join("; ")
                  }
                >
                  {resumo.ultimos7Dias.map((dia, i) => (
                    <div
                      key={dia.data}
                      className="grafico-coluna"
                      aria-hidden="true"
                    >
                      <span className="grafico-valor">{numero(dia.km)}</span>
                      <svg className="grafico-base" viewBox="0 0 40 140">
                        <rect
                          className="grafico-fundo"
                          x="0"
                          y="0"
                          width="40"
                          height="140"
                          rx="7"
                        />
                        <rect
                          className={
                            "grafico-preenchimento " +
                            (i === resumo.ultimos7Dias.length - 1
                              ? "grafico-hoje"
                              : "")
                          }
                          x="0"
                          y={140 - (dia.km / maiorDistancia) * 140}
                          width="40"
                          height={(dia.km / maiorDistancia) * 140}
                          rx="7"
                        />
                      </svg>
                      <span className="grafico-dia">
                        {new Date(dia.data + "T12:00:00").toLocaleDateString(
                          "pt-BR",
                          { weekday: "short" },
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="grafico-legenda">
                  Distância caminhada em quilômetros
                </p>
              </Card>
              <Card>
                <h2 className="titulo-cartao">Sua meta de hoje</h2>
                <div className="painel-meta">
                  <div
                    className="meta-circulo"
                    role="img"
                    aria-label={numero(percentual) + "% da meta diária"}
                  >
                    <svg viewBox="0 0 120 120" aria-hidden="true">
                      <circle className="meta-trilha" cx="60" cy="60" r="49" />
                      <circle
                        className="meta-progresso"
                        cx="60"
                        cy="60"
                        r="49"
                        pathLength="100"
                        strokeDasharray={percentual + " 100"}
                      />
                    </svg>
                    <div>
                      <strong>
                        {numero(percentual)}
                        <small>%</small>
                      </strong>
                      <span>da meta diária</span>
                    </div>
                  </div>
                  <p className="meta-contagem">
                    {numero(resumo.kmHoje)}
                    <span> / {numero(resumo.metaDiariaKm)} km</span>
                  </p>
                  <p className="painel-legenda">
                    {resumo.kmFaltantes > 0
                      ? "Faltam " +
                        numero(resumo.kmFaltantes) +
                        " km. Você consegue!"
                      : "Meta de hoje alcançada. Parabéns!"}
                  </p>
                </div>
                <p className="meta-rodape">
                  Até {numero(resumo.limitePontosDia)} pontos por dia, no seu
                  ritmo.
                </p>
              </Card>
            </div>
            <div className="painel-grade">
              <Card className="painel-coluna-ampla">
                <div className="linha-distribuida">
                  <h2 className="titulo-cartao">Últimas atividades</h2>
                  <Link className="link-historico" to="/app/historico">
                    Ver tudo
                    <Icone nome="seta" />
                  </Link>
                </div>
                <div className="lista-atividades">
                  {resumo.ultimasAtividades.length ? (
                    resumo.ultimasAtividades.map((a) => (
                      <div key={a.idHistorico} className="painel-atividade">
                        <span className="atividade-icone">
                          <Icone
                            nome={
                              a.origem === "CAMINHADA" ? "caminhada" : "pontos"
                            }
                          />
                        </span>
                        <div>
                          <p className="nome-atividade">
                            {a.origem === "CAMINHADA"
                              ? "Pontos de caminhada"
                              : "Pontos de publicação"}
                          </p>
                          <p className="data-registro">
                            {dataHora(a.dataRegistro)}
                          </p>
                        </div>
                        <span className="pontos-atividade">
                          + {numero(a.pontosGanhos)} pts
                        </span>
                      </div>
                    ))
                  ) : (
                    <Vazio>
                      Seu histórico começa na primeira atividade. Registre uma
                      caminhada para dar o primeiro passo.
                    </Vazio>
                  )}
                </div>
              </Card>
              <Card className="painel-proximo">
                <Icone nome="onibus" />
                <h2>Seus passos podem pagar o próximo trajeto.</h2>
                <p>
                  {resumo.conta.pontosFaltantesPassagem > 0
                    ? "Faltam " +
                      numero(resumo.conta.pontosFaltantesPassagem) +
                      " pontos para o valor de referência de uma passagem."
                    : "Você já tem pontos suficientes para o valor de referência de uma passagem."}
                </p>
                <Link to="/app/carteira">
                  Converter meus pontos
                  <Icone nome="seta" />
                </Link>
              </Card>
            </div>
          </>
        )
      )}
    </>
  );
}
