import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { listarHistorico } from "../../services/historicoService";
import type { Historico as TipoHistorico, OrigemPontos } from "../../types/api";
import { dataHora, numero, mensagemErro } from "../../utils/formatar";
import {
  Card,
  Titulo,
  Carregando,
  Falha,
  Vazio,
  campo,
} from "../../components/Painel/ui";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

type Filtro = "TODAS" | OrigemPontos;
export default function Historico() {
  useDocumentTitle("Meu histórico");
  const { sessao } = useAuth();
  const [filtro, setFiltro] = useState<Filtro>("TODAS");
  const [dados, setDados] = useState<TipoHistorico | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0);
  const idConta = sessao?.idConta;
  useEffect(() => {
    if (!idConta) return;
    let ativo = true;
    // oxlint-disable-next-line react/set-state-in-effect -- Reinicia o loading de uma nova consulta HTTP.
    setCarregando(true);
    setErro("");
    listarHistorico(idConta, filtro === "TODAS" ? undefined : filtro)
      .then((d) => {
        if (ativo) setDados(d);
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
  }, [idConta, filtro, tentativa]);
  return (
    <>
      <Titulo
        titulo="Meu histórico"
        descricao="Cada conquista deixa um registro. Acompanhe os pontos recebidos na sua conta."
      />
      <div className="filtro-historico">
        <label htmlFor="origem" className="rotulo-filtro">
          Origem dos pontos
        </label>
        <select
          id="origem"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value as Filtro)}
          className={campo}
        >
          <option value="TODAS">Todas as origens</option>
          <option value="CAMINHADA">Caminhadas</option>
          <option value="POST">Publicações</option>
        </select>
      </div>
      {carregando ? (
        <Carregando />
      ) : erro ? (
        <Falha erro={erro} tentar={() => setTentativa((v) => v + 1)} />
      ) : (
        dados && (
          <>
            <div className="grade-totais">
              <Card>
                <p className="rotulo-total">Registros no filtro</p>
                <p className="valor-total">{numero(dados.totalRegistros)}</p>
              </Card>
              <Card>
                <p className="rotulo-total">Pontos conquistados no filtro</p>
                <p className="valor-total-pontos">
                  {numero(dados.pontosConquistados)}
                </p>
              </Card>
            </div>
            <Card>
              <h2 className="titulo-listagem">Atividades da conta</h2>
              {!dados.registros.length ? (
                <Vazio>Nenhuma atividade encontrada para este filtro.</Vazio>
              ) : (
                <ul className="lista-dividida">
                  {dados.registros.map((r) => (
                    <li key={r.idHistorico} className="item-percurso">
                      <div>
                        <p className="titulo-atividade">
                          {r.origem === "CAMINHADA"
                            ? "Caminhada registrada"
                            : "Atividade de publicação"}
                        </p>
                        <p className="data-registro">
                          {dataHora(r.dataRegistro)}
                        </p>
                      </div>
                      <span className="pontos-historico">
                        +{numero(r.pontosGanhos)} pts
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <p className="observacao-bilhete">
                Este histórico registra pontos conquistados. O saldo atual após
                conversões está em Pontos e créditos.
              </p>
            </Card>
          </>
        )
      )}
    </>
  );
}
