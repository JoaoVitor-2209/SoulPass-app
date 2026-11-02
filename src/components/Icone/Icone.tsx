export type NomeIcone =
  | "painel"
  | "caminhada"
  | "troca"
  | "bilhete"
  | "historico"
  | "perfil"
  | "folha"
  | "seta"
  | "mais"
  | "sair"
  | "menu"
  | "fechar"
  | "pontos"
  | "check"
  | "onibus";

const desenhos: Record<NomeIcone, string[]> = {
  painel: ["M3 3h7v7H3z", "M14 3h7v7h-7z", "M3 14h7v7H3z", "M14 14h7v7h-7z"],
  caminhada: [
    "M15 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
    "m12 8 3 4 4 1",
    "m7 13 3-5 4-1",
    "m12 10-2 6 5 6",
    "m10 16-4 6",
  ],
  troca: ["M4 7h16m-4-4 4 4-4 4", "M20 17H4m4-4-4 4 4 4"],
  bilhete: [
    "M3 5h18v5a2 2 0 0 0 0 4v5H3v-5a2 2 0 0 0 0-4Z",
    "M15 5v3m0 3v2m0 3v3",
  ],
  historico: ["M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", "M12 7v5l3 2"],
  perfil: ["M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z", "M4 21v-2a8 8 0 0 1 16 0v2"],
  folha: ["M20 3C8 2 2 8 5 15c3 7 16 6 15-12Z", "M3 22 16 9"],
  seta: ["M4 12h16m-6-6 6 6-6 6"],
  mais: ["M12 5v14M5 12h14"],
  sair: ["M9 4H4v16h5", "M9 12h12m-5-5 5 5-5 5"],
  menu: ["M4 6h16M4 12h16M4 18h16"],
  fechar: ["m6 6 12 12M18 6 6 18"],
  pontos: ["m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z"],
  check: ["m5 12 4 4L19 6"],
  onibus: [
    "M6 3h12a2 2 0 0 1 2 2v13H4V5a2 2 0 0 1 2-2Z",
    "M4 11h16M8 6h8M7 15h1m8 0h1M7 18v3m10-3v3",
  ],
};

/** Ícones em SVG: sem dependências e com o estilo definido no CSS global. */
export default function Icone({
  nome,
  className = "",
}: {
  nome: NomeIcone;
  className?: string;
}) {
  return (
    <svg
      className={"icone " + className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {desenhos[nome].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
