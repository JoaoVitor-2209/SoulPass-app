export function moeda(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
export function numero(valor: number) {
  return valor.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
}
export function dataHora(valor: string) {
  const data = new Date(valor);
  return Number.isNaN(data.getTime()) ? "Data indisponível" : data.toLocaleString("pt-BR");
}
export function mensagemErro(erro: unknown) {
  return erro instanceof Error ? erro.message : "Não foi possível concluir a operação.";
}
export function cpfValido(valor: string) {
  const cpf = valor.replace(/\D/g, "");
  if (!/^\d{11}$/.test(cpf) || /^(\d)\1{10}$/.test(cpf)) return false;
  for (let tamanho = 9; tamanho <= 10; tamanho++) {
    let soma = 0;
    for (let i = 0; i < tamanho; i++) soma += Number(cpf[i]) * (tamanho + 1 - i);
    const resto = (soma * 10) % 11;
    if ((resto === 10 ? 0 : resto) !== Number(cpf[tamanho])) return false;
  }
  return true;
}
