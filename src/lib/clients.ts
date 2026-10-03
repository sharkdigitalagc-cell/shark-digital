export type ClientStatus = "ativo" | "pausado";

export type Client = {
  name: string;
  services: string[];
  status: ClientStatus;
  /** Optional note shown next to the status (e.g. why it is paused). */
  statusNote?: string;
};

/*
 * Clientes e serviços informados pela Shark. Use apenas o que o cliente
 * autorizou: sem resultados, números, depoimentos ou logos não confirmados.
 */
export const CLIENTS: Client[] = [
  {
    name: "Arthemi Coworking",
    services: [
      "Gestão de mídia",
      "Gestão de tráfego",
      "Sistema de reserva e pagamento automático",
    ],
    status: "ativo",
  },
  {
    name: "Colen Advogados",
    services: [
      "Gestão de tráfego",
      "Gestão de mídia",
      "Funil",
      "Desenvolvimento web",
      "Blog",
    ],
    status: "ativo",
  },
  {
    name: "Sereia Nails e Lashes",
    services: [
      "Gestão de tráfego no Meta",
      "Gestão de mídias sociais",
      "Funil",
    ],
    status: "ativo",
  },
  {
    name: "Barphoff",
    services: ["Gestão de tráfego", "Desenvolvimento de site", "Blog no Google"],
    status: "pausado",
    statusNote: "Pausado para reestruturação do comercial",
  },
];
