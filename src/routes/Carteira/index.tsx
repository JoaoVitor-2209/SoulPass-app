import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth";
import {
  buscarConta,
  simularConversao,
  converterPontos,
} from "../../services/contaService";
import type { Conta, Simulacao } from "../../types/api";
import { moeda, numero, mensagemErro } from "../../utils/formatar";
import {
  Aviso,
  Card,
  Titulo,
  Carregando,
  Falha,
  campo,
  botao,
  secundario,
} from "../../components/Painel/ui";
import { FormField } from "../../components/FormField";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function Carteira() {
  useDocumentTitle("Pontos e créditos");
  const { sessao } = useAuth();
  const [conta, setConta] = useState<Conta | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erroConta, setErroConta] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [previa, setPrevia] = useState<{
    pontos: number;
    dados: Simulacao;
  } | null>(null);
  const [convertendo, setConvertendo] = useState(false);
  const [conferirSaldo, setConferirSaldo] = useState(false);
  const [tentativa, setTentativa] = useState(0);
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ pontos: number }>();
  const idConta = sessao?.idConta;
  useEffect(() => {
    if (!idConta) return;
    let ativo = true;
    // oxlint-disable-next-line react/set-state-in-effect -- Reinicia o loading de uma nova consulta HTTP.
    setCarregando(true);
    setErroConta("");
    setPrevia(null);
    buscarConta(idConta)
      .then((d) => {
        if (ativo) {
          setConta(d);
          setConferirSaldo(false);
        }
      })
      .catch((e) => {
        if (ativo) setErroConta(mensagemErro(e));
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });
    return () => {
      ativo = false;
    };
  }, [idConta, tentativa]);
  async function simular({ pontos }: { pontos: number }) {
    if (!sessao) return;
    setErro("");
    setSucesso("");
    setPrevia(null);
    try {
      const dados = await simularConversao(sessao.idConta, pontos);
      if (getValues("pontos") === pontos) setPrevia({ pontos, dados });
    } catch (e) {
      setErro(mensagemErro(e));
    }
  }
  async function converter() {
    if (
      !sessao ||
      !previa ||
      convertendo ||
      conferirSaldo ||
      !previa.dados.saldoSuficiente ||
      getValues("pontos") !== previa.pontos
    )
      return;
    setConvertendo(true);
    setErro("");
    try {
      const resultado = await converterPontos(sessao.idConta, previa.pontos);
      setSucesso(
        `${numero(resultado.pontosConvertidos)} pontos convertidos em ${moeda(resultado.creditoRecebido)}. Saldo do bilhete: ${moeda(resultado.saldoBilhete)}.`,
      );
      setPrevia(null);
      setTentativa((v) => v + 1);
    } catch (e) {
      setErro(mensagemErro(e));
      setPrevia(null);
      setConferirSaldo(true);
    } finally {
      setConvertendo(false);
    }
  }
  return (
    <>
      <Titulo
        titulo="Pontos e créditos"
        descricao="Veja quanto seu movimento rendeu e transforme seus pontos em crédito."
      />
      <Aviso texto={sucesso} tipo="sucesso" />
      {carregando ? (
        <Carregando />
      ) : erroConta ? (
        <Falha erro={erroConta} tentar={() => setTentativa((v) => v + 1)} />
      ) : (
        conta && (
          <div className="grade-formulario">
            <Card className="cartao-destaque">
              <p className="rotulo-destaque">Seu saldo disponível</p>
              <h2 className="saldo-pontos">
                {numero(conta.qtdePontos)}{" "}
                <span className="unidade-saldo">pontos</span>
              </h2>
              <p className="saldo-equivalente">
                Equivalente a {moeda(conta.equivalenteEmCredito)}
              </p>
              <div className="saldo-bilhete-secao">
                <p className="rotulo-saldo-bilhete">Crédito no bilhete</p>
                <p className="valor-bilhete">
                  {moeda(conta.bilhete?.credito || 0)}
                </p>
              </div>
              <p className="observacao-destaque">
                Os créditos pertencem ao sistema acadêmico SoulPass. A
                integração de recarga com a operadora de transporte é uma etapa
                futura.
              </p>
            </Card>
            <Card className="coluna-ampla">
              <h2 className="titulo-cartao">Converter pontos</h2>
              <p className="descricao-cartao">
                Simule primeiro para conferir o valor. O saldo só muda após sua
                confirmação.
              </p>
              {conta.atividade !== "ATIVO" && (
                <Aviso
                  texto="Sua conta está inativa. A conversão não está disponível."
                  tipo="info"
                />
              )}
              {!conta.bilhete && (
                <Aviso
                  texto="Vincule um bilhete antes de converter seus pontos."
                  tipo="info"
                />
              )}
              {conta.bilhete?.status === "NAO_ATIVO" && (
                <Aviso
                  texto="Ative seu bilhete na página Gerenciar bilhete antes de converter."
                  tipo="info"
                />
              )}
              <form
                noValidate
                onSubmit={handleSubmit(simular)}
                className="formulario-conversao"
              >
                <FormField
                  label="Quantidade de pontos"
                  htmlFor="pontos"
                  erro={errors.pontos?.message}
                >
                  <input
                    id="pontos"
                    type="number"
                    min="1"
                    step="1"
                    className={campo}
                    aria-invalid={!!errors.pontos}
                    {...register("pontos", {
                      valueAsNumber: true,
                      required: "Informe os pontos para simular.",
                      min: {
                        value: 1,
                        message: "Informe pelo menos um ponto.",
                      },
                      validate: (n) =>
                        Number.isSafeInteger(n) ||
                        "Informe uma quantidade inteira de pontos.",
                      onChange: () => setPrevia(null),
                    })}
                  />
                </FormField>
                <button
                  className={secundario}
                  disabled={isSubmitting || convertendo || conferirSaldo}
                >
                  {isSubmitting ? "Simulando…" : "Simular conversão"}
                </button>
              </form>
              <Aviso texto={erro} />
              {conferirSaldo && (
                <div>
                  <p className="texto-informativo">
                    Antes de tentar uma nova conversão, confira o saldo para
                    verificar se a operação foi registrada.
                  </p>
                  <button
                    className={secundario + " margem-superior-curta"}
                    onClick={() => setTentativa((v) => v + 1)}
                  >
                    Consultar saldo novamente
                  </button>
                </div>
              )}
              {previa && (
                <div className="caixa-previa">
                  <h3 className="texto-semidestaque">Prévia da conversão</h3>
                  <dl className="grade-previa">
                    <div>
                      <dt className="rotulo-previa">Pontos utilizados</dt>
                      <dd className="valor-previa">
                        {numero(previa.dados.pontosNecessarios)}
                      </dd>
                    </div>
                    <div>
                      <dt className="rotulo-previa">Crédito a receber</dt>
                      <dd className="credito-previa">
                        {moeda(previa.dados.creditoRecebido)}
                      </dd>
                    </div>
                    <div>
                      <dt className="rotulo-previa">Saldo após a conversão</dt>
                      <dd className="valor-previa">
                        {numero(previa.dados.saldoAposConversao)} pontos
                      </dd>
                    </div>
                  </dl>
                  {!previa.dados.saldoSuficiente ? (
                    <Aviso
                      texto="Você ainda não tem pontos suficientes para esta conversão."
                      tipo="info"
                    />
                  ) : previa.dados.creditoRecebido <= 0 ? (
                    <Aviso
                      texto="Esta quantidade de pontos ainda não gera crédito. Aumente a quantidade e simule novamente."
                      tipo="info"
                    />
                  ) : (
                    <button
                      className={botao + " margem-superior-media"}
                      onClick={converter}
                      disabled={
                        convertendo ||
                        !conta.bilhete ||
                        conta.bilhete.status !== "ATIVO" ||
                        conta.atividade !== "ATIVO"
                      }
                    >
                      {convertendo ? "Convertendo…" : "Confirmar conversão"}
                    </button>
                  )}
                </div>
              )}
              <Link className="link-gerenciar" to="/app/bilhete">
                Gerenciar meu bilhete →
              </Link>
            </Card>
          </div>
        )
      )}
    </>
  );
}
