import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { PageHero } from "../../components/PageHero";
import { FormField } from "../../components/FormField";
import { Button } from "../../components/Button";
import { cadastrar } from "../../services/usuarioService";
import { useAuth } from "../../context/auth";
import { cpfValido, mensagemErro } from "../../utils/formatar";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import type { CadastroFormValues } from "../../types";
import imgCadastro from "../../assets/hero/img-cadastro.png";

const inputClasses = "campo-formulario";

/**
 * Página de cadastro — migrada de paginas/login/cadastro.html.
 * Usa React Hook Form com validação de nome, e-mail, senha e confirmação
 * de senha (comparação de campos via watch/validate). Ao concluir,
 * recebe os dados da API e abre o painel com useNavigate.
 */
export default function Cadastro() {
  useDocumentTitle("Cadastro");
  const navigate = useNavigate();
  const { iniciarSessao } = useAuth();
  const [erroCadastro, setErroCadastro] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CadastroFormValues>({ mode: "onBlur" });

  const senha = useWatch({ control, name: "senha" });

  async function onSubmit(dados: CadastroFormValues) {
    setErroCadastro("");
    try {
      const resposta = await cadastrar({ nome: dados.nome.trim(), idade: dados.idade,
        cpf: Number(dados.cpf.replace(/\D/g, "")), email: dados.email.trim(), senha: dados.senha });
      iniciarSessao(resposta);
      navigate("/app", { replace: true });
    } catch (erro) {
      setErroCadastro(mensagemErro(erro));
    }
  }

  return (
    <>
      <PageHero
        titulo={<>Crie sua <em className="not-italic text-soulup-500">Conta</em></>}
        imagem={imgCadastro}
        imagemAlt="Cadastro"
      >
        <p>Cadastre-se gratuitamente e comece a converter seus pontos SoulUp em créditos de transporte.</p>
      </PageHero>

      <section className="mx-auto max-w-md px-6 py-14 tablet:py-20">
        <div className="rounded-2xl border border-soulup-100 bg-white p-6 shadow-sm shadow-soulup-900/5 xs:p-8">
          <h2 className="text-xl font-bold text-soulup-900">Cadastro</h2>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormField label="Nome completo" htmlFor="nome" erro={errors.nome?.message}>
              <input
                id="nome"
                type="text"
                placeholder="Seu nome completo"
                className={inputClasses}
                aria-invalid={Boolean(errors.nome)}
                {...register("nome", {
                  required: "Informe seu nome completo.",
                  minLength: { value: 3, message: "O nome deve ter pelo menos 3 caracteres." },
                  maxLength: { value: 100, message: "O nome deve ter no máximo 100 caracteres." },
                })}
              />
            </FormField>

            <FormField label="Idade" htmlFor="idade" erro={errors.idade?.message}>
              <input id="idade" type="number" className={inputClasses} aria-invalid={Boolean(errors.idade)}
                {...register("idade", { valueAsNumber: true, required: "Informe a idade.",
                  min: { value: 1, message: "Informe uma idade válida." },
                  max: { value: 120, message: "Confira a idade informada." },
                  validate: n => Number.isInteger(n) || "Informe uma idade inteira." })} />
            </FormField>
            <FormField label="CPF" htmlFor="cpf" erro={errors.cpf?.message}>
              <input id="cpf" inputMode="numeric" maxLength={14} className={inputClasses}
                aria-invalid={Boolean(errors.cpf)} placeholder="Somente números"
                {...register("cpf", { required: "Informe o CPF.", validate: c => cpfValido(c) || "Informe um CPF válido." })} />
            </FormField>
            <FormField label="E-mail" htmlFor="email" erro={errors.email?.message}>
              <input
                id="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                className={inputClasses}
                aria-invalid={Boolean(errors.email)}
                {...register("email", {
                  required: "Informe um e-mail válido.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Digite um e-mail válido.",
                  },
                })}
              />
            </FormField>

            <FormField label="Senha" htmlFor="senha" erro={errors.senha?.message}>
              <input
                id="senha"
                autoComplete="new-password"
                type="password"
                placeholder="Mínimo 5 caracteres"
                className={inputClasses}
                aria-invalid={Boolean(errors.senha)}
                {...register("senha", {
                  required: "Crie uma senha.",
                  minLength: { value: 5, message: "A senha deve ter pelo menos 5 caracteres." },
                  maxLength: { value: 30, message: "A senha deve ter no máximo 30 caracteres." },
                })}
              />
            </FormField>

            <FormField
              label="Confirmar senha"
              htmlFor="confirmarSenha"
              erro={errors.confirmarSenha?.message}
            >
              <input
                id="confirmarSenha"
                autoComplete="new-password"
                type="password"
                placeholder="Digite a senha novamente"
                className={inputClasses}
                aria-invalid={Boolean(errors.confirmarSenha)}
                {...register("confirmarSenha", {
                  required: "Confirme a senha digitada.",
                  validate: (valor) => valor === senha || "As senhas não coincidem.",
                })}
              />
            </FormField>

            {erroCadastro ? (
              <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {erroCadastro}
              </p>
            ) : null}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-soulup-900/70">
            Já tem uma conta?{" "}
            <Link to="/login" className="font-semibold text-soulup-700 hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

