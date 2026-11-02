import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useAuth } from "../../context/auth";
import {
  buscarCaminhada,
  excluirCaminhada,
} from "../../services/caminhadaService";
import type { Caminhada } from "../../types/api";
import { dataHora, numero, mensagemErro } from "../../utils/formatar";
import {
  Aviso,
  Card,
  Titulo,
  Carregando,
  Falha,
  botao,
  secundario,
} from "../../components/Painel/ui";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function CaminhadaDetalhe() {
  useDocumentTitle("Detalhe da caminhada");
  const { id } = useParams<{ id: string }>();
  const { sessao } = useAuth();
  const navegar = useNavigate();
  const dialogo = useRef<HTMLDialogElement>(null);
  const [caminhada, setCaminhada] = useState<Caminhada | null>(null);
  const [erro, setErro] = useState("");
  const [erroExcluir, setErroExcluir] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [excluindo, setExcluindo] = useState(false);
  const [tentativa, setTentativa] = useState(0);
  const idConta = sessao?.idConta;
  useEffect(() => {
    if (!idConta) return;
    let ativo = true;
    // oxlint-disable-next-line react/set-state-in-effect -- Reinicia o estado da consulta ao mudar o parâmetro da rota.
    setErro("");
    setCarregando(true);
    const codigo = Number(id);
    if (!Number.isSafeInteger(codigo) || codigo <= 0) {
      setErro("O código da caminhada é inválido.");
      setCarregando(false);
      return;
    }
    buscarCaminhada(codigo)
      .then((d) => {
        if (d.idConta !== idConta)
          throw new Error("Esta caminhada não pertence à sua conta.");
        if (ativo) setCaminhada(d);
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
  }, [id, idConta, tentativa]);
  async function remover() {
    if (!caminhada || caminhada.idConta !== sessao?.idConta || excluindo)
      return;
    setExcluindo(true);
    setErroExcluir("");
    try {
      await excluirCaminhada(caminhada.idCaminhada);
      navegar("/app/caminhadas", { replace: true });
    } catch (e) {
      setErroExcluir(mensagemErro(e));
    } finally {
      setExcluindo(false);
    }
  }
  return (
    <>
      <Titulo
        titulo="Detalhe da caminhada"
        descricao="Consulte as informações do percurso registrado."
        acao={
          <Link className={secundario} to="/app/caminhadas">
            ← Voltar
          </Link>
        }
      />
      {carregando ? (
        <Carregando />
      ) : erro ? (
        <Falha erro={erro} tentar={() => setTentativa((v) => v + 1)} />
      ) : (
        caminhada && (
          <Card className="largura-formulario">
            <span className="rotulo-percurso">
              Percurso #{caminhada.idCaminhada}
            </span>
            <p className="distancia-percurso">
              {numero(caminhada.kmAndados)}{" "}
              <span className="unidade-distancia">km</span>
            </p>
            <p className="data-percurso">
              Registrado em {dataHora(caminhada.diaCaminhada)}
            </p>
            <p className="observacao-historico">
              A exclusão remove o registro do percurso. O saldo de pontos e o
              histórico seguem as regras do servidor.
            </p>
            <button
              className="botao-excluir"
              onClick={() => dialogo.current?.showModal()}
            >
              Excluir caminhada
            </button>
          </Card>
        )
      )}
      <dialog
        ref={dialogo}
        onCancel={(e) => {
          if (excluindo) e.preventDefault();
        }}
        className="dialogo-confirmacao"
      >
        <h2 className="titulo-dialogo">Excluir esta caminhada?</h2>
        <p className="descricao-dialogo">
          O registro será removido. Confira se selecionou o percurso correto
          antes de continuar.
        </p>
        <Aviso texto={erroExcluir} />
        <div className="acoes-dialogo">
          <button
            className={secundario}
            disabled={excluindo}
            onClick={() => {
              setErroExcluir("");
              dialogo.current?.close();
            }}
          >
            Cancelar
          </button>
          <button
            className={botao + " botao-perigo"}
            disabled={excluindo}
            onClick={remover}
          >
            {excluindo ? "Excluindo…" : "Confirmar exclusão"}
          </button>
        </div>
      </dialog>
    </>
  );
}
