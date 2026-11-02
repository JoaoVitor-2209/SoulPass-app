// Tipos centrais do domínio SoulPass, compartilhados entre páginas e componentes.

export interface Integrante {
  /** slug usado na rota dinâmica /integrantes/:id */
  id: string;
  nome: string;
  rm: string;
  foto: string;
  linkedin: string;
  github: string;
  bio: string;
}

export interface FaqItem {
  id: string;
  pergunta: string;
  resposta: string;
}

export interface Entregavel {
  id: string;
  materia: string;
  titulo: string;
  emoji: string;
  imagem: string;
  resumo: string;
  descricao: string;
  videoId: string;
  /** Links de apoio citados no PDF da disciplina (BMC, backlog, diagramas, protótipo etc). */
  linksExtras?: { label: string; url: string }[];
}

export interface NavLink {
  label: string;
  to: string;
}

/** Payload validado do formulário de contato (React Hook Form). */
export interface ContatoFormValues {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
  termos: boolean;
}

/** Payload validado do formulário de login. */
export interface LoginFormValues {
  email: string;
  senha: string;
}

/** Payload validado do formulário de cadastro. */
export interface CadastroFormValues {
  nome: string;
  idade: number;
  cpf: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export type FormStatus = "idle" | "success" | "error";

