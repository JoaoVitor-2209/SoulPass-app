import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FormField } from "../../components/FormField";
import { Button } from "../../components/Button";
import { entrar } from "../../services/usuarioService";
import { useAuth } from "../../context/auth";
import { mensagemErro } from "../../utils/formatar";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import type { LoginFormValues } from "../../types";
import Icone from "../../components/Icone/Icone";
import imgLogin from "../../assets/hero/img-login.png";

const inputClasses = "campo-formulario";

/**
 * Página de login — migrada de paginas/login/login.html.
 * Após POST /usuarios/login, abre o painel com useNavigate.
 */
export default function Login() {
  useDocumentTitle("Login");
  const navigate = useNavigate();
  const { iniciarSessao } = useAuth();
  const [erroLogin, setErroLogin] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ mode: "onBlur" });

  async function onSubmit(dados: LoginFormValues) {
    setErroLogin("");
    try {
      const resultado = await entrar({
        email: dados.email.trim(),
        senha: dados.senha,
      });
      iniciarSessao(resultado);
      navigate("/app", { replace: true });
    } catch (erro) {
      setErroLogin(mensagemErro(erro));
    }
  }

  return (
    <section className="acesso-pagina">
      <div className="acesso-apresentacao">
        <span className="inicio-selo">
          <Icone nome="folha" /> Cada passo conta
        </span>
        <h1>
          Seu próximo destino
          <br />
          começa com você.
        </h1>
        <p>
          Entre para acompanhar suas caminhadas, seus pontos e suas
          possibilidades de ir mais longe.
        </p>
        <div className="acesso-imagem">
          <img src={imgLogin} alt="Pessoa usando o aplicativo SoulPass" />
        </div>
      </div>
      <div className="acesso-cartao">
        <span className="acesso-simbolo">
          <Icone nome="onibus" />
        </span>
        <h2>Que bom ter você de volta!</h2>
        <p className="acesso-subtitulo">
          Entre na sua conta SoulPass para continuar.
        </p>

        <form
          className="mt-6 space-y-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <FormField
            label="E-mail"
            htmlFor="email"
            erro={errors.email?.message}
          >
            <input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="seuemail@exemplo.com"
              className={inputClasses}
              aria-invalid={Boolean(errors.email)}
              {...register("email", {
                required: "Informe seu e-mail.",
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
              type="password"
              autoComplete="current-password"
              placeholder="Digite sua senha"
              className={inputClasses}
              aria-invalid={Boolean(errors.senha)}
              {...register("senha", {
                required: "Informe sua senha.",
              })}
            />
          </FormField>

          {erroLogin ? (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            >
              {erroLogin}
            </p>
          ) : null}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-soulup-900/70">
          Ainda não tem conta?{" "}
          <Link
            to="/cadastro"
            className="font-semibold text-soulup-700 hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
        <Link to="/" className="acesso-voltar">
          ← Voltar para o início
        </Link>
      </div>
    </section>
  );
}
