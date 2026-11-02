import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useAuth } from "../../context/auth";
import {
  listarCaminhadas,
  registrarCaminhada,
} from "../../services/caminhadaService";
import type { Caminhada } from "../../types/api";
import { dataHora, numero, mensagemErro } from "../../utils/formatar";
import {
  Aviso,
  Card,
  Titulo,
  Carregando,
  Vazio,
  campo,
  botao,
  secundario,
} from "../../components/Painel/ui";
import { FormField } from "../../components/FormField";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

interface Formulario {
  kmAndados: number;
}
export default function Caminhadas() {
  useDocumentTitle("Minhas caminhadas");
  const { sessao } = useAuth();
  const [lista, setLista] = useState<Caminhada[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erroLista, setErroLista] = useState("");
  const [erroForm, setErroForm] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [versao, setVersao] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Formulario>();
  const idConta = sessao?.idConta;
  useEffect(() => {
    if (!idConta) return;
    let ativo = true;
    // oxlint-disable-next-line react/set-state-in-effect -- Reinicia o loading de uma nova consulta HTTP.
    setCarregando(true);
    setErroLista("");
    listarCaminhadas(idConta)
      .then((d) => {
        if (ativo) setLista(d);
      })
      .catch((e) => {
        if (ativo) setErroLista(mensagemErro(e));
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });
    return () => {
      ativo = false;
    };
  }, [idConta, versao]);
  async function onSubmit(dados: Formulario) {
    if (!sessao) return;
    setErroForm("");
    setSucesso("");
    try {
      const resultado = await registrarCaminhada(
        sessao.idConta,
        dados.kmAndados,
      );
      setSucesso(
        `Caminhada registrada! ${numero(resultado.pontosGanhos)} pontos recebidos. Saldo: ${numero(resultado.saldoPontos)} pontos.`,
      );
      reset();
      setVersao((v) => v + 1);
    } catch (e) {
      setErroForm(mensagemErro(e));
    }
  }
  return (
    <>
      <Titulo
        titulo="Minhas caminhadas"
        descricao="Um passo de cada vez. Registre seu percurso e acompanhe sua evolução."
      />
      <div className="grade-formulario">
        <Card>
          <h2 className="titulo-cartao">Registrar caminhada</h2>
          <p className="descricao-cartao">
            Informe a distância percorrida. A data e os pontos são registrados
            pelo servidor.
          </p>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="formulario-painel"
          >
            <FormField
              label="Distância percorrida (km)"
              htmlFor="km"
              erro={errors.kmAndados?.message}
            >
              <input
                id="km"
                type="number"
                step="0.01"
                inputMode="decimal"
                className={campo}
                placeholder="Ex.: 2,5"
                aria-invalid={!!errors.kmAndados}
                {...register("kmAndados", {
                  valueAsNumber: true,
                  required: "Informe a distância.",
                  min: {
                    value: 0.01,
                    message: "Informe uma distância maior que zero.",
                  },
                  validate: (n) =>
                    Number.isFinite(n) || "Informe uma distância válida.",
                })}
              />
            </FormField>
            <button disabled={isSubmitting} className={botao + " botao-largo"}>
              {isSubmitting ? "Registrando…" : "Registrar caminhada"}
            </button>
          </form>
          <Aviso texto={erroForm} />
          <p className="regra-pontos">
            Até 120 pontos por dia. O cálculo e a validação são feitos pela API
            da SoulPass.
          </p>
        </Card>
        <div className="coluna-listagem">
          <Aviso texto={sucesso} tipo="sucesso" />
          {carregando ? (
            <Carregando />
          ) : (
            <Card>
              <div className="cabecalho-lista">
                <h2 className="texto-forte">Seus percursos</h2>
                <button
                  className={secundario}
                  onClick={() => setVersao((v) => v + 1)}
                >
                  Atualizar lista
                </button>
              </div>
              {erroLista ? (
                <Aviso texto={erroLista} />
              ) : !lista.length ? (
                <Vazio>
                  Você ainda não registrou caminhadas. Comece pelo formulário ao
                  lado.
                </Vazio>
              ) : (
                <ul className="lista-dividida">
                  {lista.map((c) => (
                    <li key={c.idCaminhada} className="item-percurso">
                      <div>
                        <p className="titulo-cartao">
                          {numero(c.kmAndados)} km
                        </p>
                        <p className="data-registro">
                          {dataHora(c.diaCaminhada)}
                        </p>
                      </div>
                      <Link
                        className={secundario}
                        to={`/app/caminhadas/${c.idCaminhada}`}
                      >
                        Ver detalhes →
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
