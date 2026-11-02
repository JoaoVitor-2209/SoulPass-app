import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth";
import { buscarUsuario, atualizarUsuario } from "../../services/usuarioService";
import { cpfValido, mensagemErro } from "../../utils/formatar";
import {
  Aviso,
  Card,
  Titulo,
  Carregando,
  Falha,
  campo,
  botao,
} from "../../components/Painel/ui";
import { FormField } from "../../components/FormField";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

interface Formulario {
  nome: string;
  idade: number;
  cpf: string;
}
export default function Perfil() {
  useDocumentTitle("Meu perfil");
  const { sessao, atualizarNome } = useAuth();
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erroCarga, setErroCarga] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [tentativa, setTentativa] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Formulario>({ mode: "onBlur" });
  const idUser = sessao?.idUser;
  useEffect(() => {
    if (!idUser) return;
    let ativo = true;
    // oxlint-disable-next-line react/set-state-in-effect -- Reinicia o loading de uma nova consulta HTTP.
    setCarregando(true);
    setErroCarga("");
    buscarUsuario(idUser)
      .then((d) => {
        if (ativo) {
          reset({
            nome: d.nome,
            idade: d.idade,
            cpf: String(d.cpf).padStart(11, "0"),
          });
          setEmail(d.email);
        }
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
  }, [idUser, tentativa, reset]);
  async function salvar(dados: Formulario) {
    if (!sessao) return;
    setErro("");
    setSucesso("");
    try {
      const usuario = await atualizarUsuario(sessao.idUser, {
        nome: dados.nome.trim(),
        idade: dados.idade,
        cpf: Number(dados.cpf.replace(/\D/g, "")),
      });
      atualizarNome(usuario.nome);
      reset({
        nome: usuario.nome,
        idade: usuario.idade,
        cpf: String(usuario.cpf).padStart(11, "0"),
      });
      setSucesso("Seu perfil foi atualizado com sucesso.");
    } catch (e) {
      setErro(mensagemErro(e));
    }
  }
  return (
    <>
      <Titulo
        titulo="Meu perfil"
        descricao="Mantenha seus dados atualizados para seguir com a SoulPass."
      />
      {carregando ? (
        <Carregando />
      ) : erroCarga ? (
        <Falha erro={erroCarga} tentar={() => setTentativa((v) => v + 1)} />
      ) : (
        <Card className="largura-formulario">
          <h2 className="titulo-cartao">Dados pessoais</h2>
          <form
            className="formulario-painel"
            noValidate
            onSubmit={handleSubmit(salvar)}
          >
            <FormField
              label="Nome completo"
              htmlFor="nome"
              erro={errors.nome?.message}
            >
              <input
                id="nome"
                className={campo}
                autoComplete="name"
                aria-invalid={!!errors.nome}
                {...register("nome", {
                  required: "Informe seu nome.",
                  validate: (n) =>
                    n.trim().length >= 3 || "Use pelo menos três caracteres.",
                  maxLength: {
                    value: 100,
                    message: "Use no máximo 100 caracteres.",
                  },
                })}
              />
            </FormField>
            <div className="grade-campos">
              <FormField
                label="Idade"
                htmlFor="idade"
                erro={errors.idade?.message}
              >
                <input
                  id="idade"
                  type="number"
                  className={campo}
                  aria-invalid={!!errors.idade}
                  {...register("idade", {
                    valueAsNumber: true,
                    required: "Informe a idade.",
                    min: { value: 1, message: "Idade inválida." },
                    max: { value: 120, message: "Confira a idade informada." },
                    validate: (n) =>
                      Number.isInteger(n) || "Use uma idade inteira.",
                  })}
                />
              </FormField>
              <FormField label="CPF" htmlFor="cpf" erro={errors.cpf?.message}>
                <input
                  id="cpf"
                  inputMode="numeric"
                  maxLength={14}
                  className={campo}
                  aria-invalid={!!errors.cpf}
                  {...register("cpf", {
                    required: "Informe o CPF.",
                    validate: (c) => cpfValido(c) || "Informe um CPF válido.",
                  })}
                />
              </FormField>
            </div>
            <FormField label="E-mail cadastrado" htmlFor="email">
              <input
                id="email"
                type="email"
                value={email}
                readOnly
                className={campo + " campo-somente-leitura"}
              />
              <p className="ajuda-campo">
                O e-mail não é alterável no cadastro atual.
              </p>
            </FormField>
            <Aviso texto={erro} />
            <Aviso texto={sucesso} tipo="sucesso" />
            <button className={botao} disabled={isSubmitting}>
              {isSubmitting ? "Salvando…" : "Salvar alterações"}
            </button>
          </form>
        </Card>
      )}
    </>
  );
}
