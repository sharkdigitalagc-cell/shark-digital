/**
 * Blog posts: metadata lives here, the body of each post is a component in
 * src/content/blog (registered in src/content/blog/index.ts).
 * Dates are ISO (YYYY-MM-DD). Newest first is computed, order here is free.
 */

export type BlogPost = {
  slug: string;
  /** H1 shown on the page. */
  title: string;
  /** <title> tag; keep it around 60 characters. */
  seoTitle: string;
  /** Meta description; keep it under ~160 characters. */
  description: string;
  /** Short text for the blog listing card. */
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  cover: { src: string; alt: string; width: number; height: number };
  /** Landscape image for the listing card when the cover is not 16:9. */
  card?: { src: string; width: number; height: number };
  /** 1200×630 crop of the cover for social previews. */
  ogImage: { src: string; width: number; height: number };
};

const POSTS: BlogPost[] = [
  {
    slug: "leads-clinica-nao-agendam",
    title: "Sua clínica recebe leads, mas eles não agendam? Descubra onde está o problema",
    seoTitle: "Leads da clínica não agendam? Descubra onde está o problema",
    description:
      "Sua clínica recebe contatos, mas poucos viram consulta? Veja como descobrir se a perda está nos anúncios, no atendimento, na agenda ou na mensuração.",
    excerpt:
      "Lead sem agendamento é sintoma, não diagnóstico. Um roteiro para localizar em que etapa os potenciais pacientes estão sendo perdidos, com calculadora.",
    category: "Aquisição para clínicas",
    publishedAt: "2026-10-03",
    readingMinutes: 12,
    cover: {
      src: "/blog/leads-clinica-nao-agendam.jpg",
      alt: "Médico analisa no notebook notificações de novos contatos e um funil que vai das visitas aos novos pacientes, com a pergunta: onde estão sendo perdidos?",
      width: 1536,
      height: 1024,
    },
    ogImage: { src: "/blog/leads-clinica-nao-agendam-og.jpg", width: 1200, height: 630 },
  },
  {
    slug: "leads-advogados-nao-convertem",
    title:
      "Seu escritório recebe leads, mas não fecha contratos? Veja onde o marketing jurídico pode estar falhando",
    seoTitle: "Leads para advogados que não convertem: onde está o problema?",
    description:
      "Seu escritório recebe leads, mas poucos viram contratos? Veja como identificar gargalos entre tráfego, qualificação, atendimento e conversão no marketing jurídico.",
    excerpt:
      "“Lead ruim” é hipótese, não diagnóstico. Como descobrir em que etapa, do anúncio ao contrato, o escritório está perdendo oportunidades, dentro das regras da OAB.",
    category: "Aquisição para advocacia",
    publishedAt: "2026-10-05",
    readingMinutes: 13,
    cover: {
      src: "/blog/leads-advogados-nao-convertem.jpg",
      alt: "Funil preto com ícones de WhatsApp e de contatos entrando no topo e linhas verdes passando pelas etapas leads, contatos, qualificação, atendimento, oportunidades e contratos, ao lado do título do artigo.",
      width: 1254,
      height: 1254,
    },
    card: { src: "/blog/leads-advogados-nao-convertem-og.jpg", width: 1200, height: 630 },
    ogImage: { src: "/blog/leads-advogados-nao-convertem-og.jpg", width: 1200, height: 630 },
  },
];

export function getAllPosts(): BlogPost[] {
  return [...POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((post) => post.slug === slug);
}

/** "3 de outubro de 2026". Parsed as UTC so the day never shifts. */
export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
