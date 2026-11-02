// Os nomes acompanham os records (DTOs) do projeto Java da equipe.
export type StatusConta = "ATIVO" | "INATIVO";
export type StatusBilhete = "ATIVO" | "NAO_ATIVO";
export type OrigemPontos = "CAMINHADA" | "POST";

export interface Bilhete {
  idTicket: number;
  credito: number;
  numBilhete: number;
  status: StatusBilhete;
}
export interface Usuario {
  idUser: number;
  nome: string;
  idade: number;
  cpf: number;
  email: string;
  bilhete: Bilhete | null;
}
export interface Conta {
  idConta: number;
  idUser: number;
  atividade: StatusConta;
  qtdePontos: number;
  limitePontos: number;
  equivalenteEmCredito: number;
  pontosFaltantesPassagem: number;
  bilhete: Bilhete | null;
}
export interface LoginResposta { usuario: Usuario; conta: Conta }
export interface LoginDados { email: string; senha: string }
export type CadastroDados = LoginDados & { nome: string; idade: number; cpf: number };
export type PerfilDados = Pick<Usuario, "nome" | "idade" | "cpf">;
// A sessão guarda somente identificadores e nome, nunca a senha ou um token inventado.
export interface Sessao { idUser: number; idConta: number; nome: string }
export interface Caminhada {
  idCaminhada: number;
  diaCaminhada: string;
  kmAndados: number;
  idConta: number;
}
export interface CaminhadaRegistrada {
  diaCaminhada: string;
  kmAndados: number;
  pontosGanhos: number;
  saldoPontos: number;
}
export interface RegistroPontos {
  idHistorico: number;
  idConta: number;
  origem: OrigemPontos;
  pontosGanhos: number;
  dataRegistro: string;
}
export interface Historico {
  totalRegistros: number;
  pontosConquistados: number;
  registros: RegistroPontos[];
}
export interface ResumoConta {
  nome: string;
  conta: Conta;
  kmSemana: number;
  kmHoje: number;
  metaDiariaKm: number;
  percentualMeta: number;
  kmFaltantes: number;
  limitePontosDia: number;
  ultimos7Dias: { data: string; km: number }[];
  ultimasAtividades: RegistroPontos[];
}
export interface Simulacao {
  pontosNecessarios: number;
  saldoAposConversao: number;
  creditoRecebido: number;
  saldoSuficiente: boolean;
}
export interface Conversao {
  pontosConvertidos: number;
  creditoRecebido: number;
  saldoPontos: number;
  saldoBilhete: number;
}
