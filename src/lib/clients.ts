export type ClientStatus = "ativo" | "pausado";

export type Client = {
  /** URL fragment, also used as the card id on /clientes. */
  slug: string;
  name: string;
  /**
   * Segment, only when it is evident. The first three come from the client's
   * own name (coworking, advogados, nails e lashes); Barphoff has none yet.
   */
  segment?: string;
  /** One factual line about the scope, built only from the services below. */
  summary: string;
  services: string[];
  /** Shown on the home page (max. three). */
  featured?: boolean;
  /**
   * Internal record only, never shown on the site (public pages present
   * projects and deliveries, not the contract status).
   */
  status: ClientStatus;
  statusNote?: string;
};

/*
 * Clientes e serviços informados pela Shark. Use apenas o que o cliente
 * autorizou: sem resultados, números, depoimentos ou logos não confirmados.
 * Métricas só com valor, período, definição e fonte.
 */
export const CLIENTS: Client[] = [
  {
    slug: "arthemi-coworking",
    name: "Arthemi Coworking",
    segment: "Coworking",
    summary:
      "Gestão de mídia e tráfego, mais um sistema de reserva com pagamento automático.",
    services: [
      "Gestão de mídia",
      "Gestão de tráfego",
      "Sistema de reserva e pagamento automático",
    ],
    featured: true,
    status: "ativo",
  },
  {
    slug: "colen-advogados",
    name: "Colen Advogados",
    segment: "Advocacia",
    summary: "Tráfego, mídia e funil, com desenvolvimento do site e do blog.",
    services: [
      "Gestão de tráfego",
      "Gestão de mídia",
      "Funil",
      "Desenvolvimento web",
      "Blog",
    ],
    featured: true,
    status: "ativo",
  },
  {
    slug: "sereia-nails-e-lashes",
    name: "Sereia Nails e Lashes",
    segment: "Beleza",
    summary: "Tráfego no Meta, gestão das mídias sociais e funil.",
    services: [
      "Gestão de tráfego no Meta",
      "Gestão de mídias sociais",
      "Funil",
    ],
    featured: true,
    status: "ativo",
  },
  {
    slug: "barphoff",
    name: "Barphoff",
    summary: "Gestão de tráfego, desenvolvimento do site e blog no Google.",
    services: ["Gestão de tráfego", "Desenvolvimento de site", "Blog no Google"],
    status: "pausado",
    statusNote: "Pausado para reestruturação do comercial",
  },
];

export const FEATURED_CLIENTS = CLIENTS.filter((c) => c.featured).slice(0, 3);
