import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth";
import {
  buscarBilhete,
  cadastrarBilhete,
  atualizarStatusBilhete,
} from "../../services/bilheteService";
import type { Bilhete as TipoBilhete, StatusBilhete } from "../../types/api";
import { moeda, mensagemErro } from "../../utils/formatar";
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

export default function Bilhete() {
  useDocumentTitle("Gerenciar bilhete");
  const { sessao } = useAuth();
  const [bilhete, setBilhete] = useState<TipoBilhete | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erroCarga, setErroCarga] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [alterando, setAlterando] = useState(false);
  const [tentativa, setTentativa] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ numBilhete: string }>();
  const idUser = sessao?.idUser;
  useEffect(() => {
    if (!idUser) return;
    let ativo = true;
    // oxlint-disable-next-line react/set-state-in-effect -- Reinicia o loading de uma nova consulta HTTP.
    setCarregando(true);
    setErroCarga("");
    buscarBilhete(idUser)
      .then((d) => {
        if (ativo) setBilhete(d);
      })
      .catch((e) => {
        if (ativo) setErroCarga(mensagemErro(e));
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });
    return () => {
      ativo = false;
    };
  }, [idUser, tentativa]);
  async function vincular({ numBilhete }: { numBilhete: string }) {
    if (!sessao) return;
    setErro("");
    setSucesso("");
    try {
      setBilhete(await cadastrarBilhete(sessao.idUser, Number(numBilhete)));
      setSucesso("Bilhete vinculado à sua conta com sucesso.");
    } catch (e) {
      setErro(mensagemErro(e));
    }
  }
  async function mudarStatus(status: StatusBilhete) {
    if (!bilhete || alterando) return;
    setErro("");
    setSucesso("");
    setAlterando(true);
    try {
      setBilhete(await atualizarStatusBilhete(bilhete.idTicket, status));
      setSucesso("Status do bilhete atualizado.");
    } catch (e) {
      setErro(mensagemErro(e));
    } finally {
      setAlterando(false);
    }
  }
  return (
    <>
      <Titulo
        titulo="Gerenciar bilhete"
        descricao="Seu bilhete, conectado às possibilidades do seu movimento."
      />
      {carregando ? (
        <Carregando />
      ) : erroCarga ? (
        <Falha erro={erroCarga} tentar={() => setTentativa((v) => v + 1)} />
      ) : (
        <div className="grade-dupla">
          <Card>
            <h2 className="titulo-cartao">
              {bilhete ? "Meu bilhete" : "Vincular bilhete"}
            </h2>
            <Aviso texto={sucesso} tipo="sucesso" />
            <Aviso texto={erro} />
            {bilhete ? (
              <>
                <div className="bilhete-visual">
                  <p className="rotulo-bilhete">SoulPass · Bilhete</p>
                  <p className="bilhete-numero">
                    {String(bilhete.numBilhete).padStart(9, "0")}
                  </p>
                  <div className="bilhete-rodape">
                    <div>
                      <p className="rotulo-saldo-bilhete">Crédito disponível</p>
                      <p className="valor-bilhete-grande">
                        {moeda(bilhete.credito)}
                      </p>
                    </div>
                    <span className="selo-bilhete">
                      {bilhete.status === "ATIVO" ? "Ativo" : "Não ativo"}
                    </span>
                  </div>
                </div>
                <button
                  className={secundario + " margem-superior"}
                  disabled={alterando}
                  onClick={() =>
                    mudarStatus(
                      bilhete.status === "ATIVO" ? "NAO_ATIVO" : "ATIVO",
                    )
                  }
                >
                  {alterando
                    ? "Atualizando…"
                    : bilhete.status === "ATIVO"
                      ? "Marcar como não ativo"
                      : "Ativar bilhete"}
                </button>
              </>
            ) : (
              <form
                className="formulario-painel"
                noValidate
                onSubmit={handleSubmit(vincular)}
              >
                <FormField
                  label="Número do bilhete (9 dígitos)"
                  htmlFor="numBilhete"
                  erro={errors.numBilhete?.message}
                >
                  <input
                    id="numBilhete"
                    type="text"
                    inputMode="numeric"
                    maxLength={9}
                    className={campo}
                    placeholder="123456789"
                    aria-invalid={!!errors.numBilhete}
                    {...register("numBilhete", {
                      required: "Informe o número do bilhete.",
                      pattern: {
                        value: /^[1-9]\d{8}$/,
                        message:
                          "Informe nove dígitos, iniciando de 1 a 9, conforme o formato aceito pela API.",
                      },
                    })}
                  />
                </FormField>
                <button className={botao} disabled={isSubmitting}>
                  {isSubmitting ? "Vinculando…" : "Vincular bilhete"}
                </button>
              </form>
            )}
          </Card>
          <Card>
            <h2 className="titulo-cartao">Pronto para o próximo trajeto</h2>
            <ol className="etapas-bilhete">
              <li>
                <strong className="numero-etapa">01.</strong> Vincule o número
                do seu bilhete.
              </li>
              <li>
                <strong className="numero-etapa">02.</strong> Registre suas
                caminhadas e conquiste pontos.
              </li>
              <li>
                <strong className="numero-etapa">03.</strong> Confira a prévia
                em Pontos e créditos e confirme a conversão.
              </li>
            </ol>
            <p className="nota-bilhete">
              O saldo exibido é o registro do projeto SoulPass. Ele não
              representa uma consulta ou recarga direta no sistema da SPTrans.
            </p>
          </Card>
        </div>
      )}
    </>
  );
}
