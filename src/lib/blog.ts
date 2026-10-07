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
  /** Optional: posts without a cover show no image at the top. */
  cover?: { src: string; alt: string; width: number; height: number };
  /** Landscape image for the listing card when the cover is not 16:9. */
  card?: { src: string; width: number; height: number };
  /** 1200×630 image for social previews (a crop of the cover, when there is one). */
  ogImage: { src: string; alt: string; width: number; height: number };
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
    ogImage: {
      src: "/blog/leads-clinica-nao-agendam-og.jpg",
      alt: "Médico analisa no notebook notificações de novos contatos e um funil que vai das visitas aos novos pacientes, com a pergunta: onde estão sendo perdidos?",
      width: 1200,
      height: 630,
    },
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
    ogImage: {
      src: "/blog/leads-advogados-nao-convertem-og.jpg",
      alt: "Funil preto com ícones de WhatsApp e de contatos entrando no topo e linhas verdes passando pelas etapas leads, contatos, qualificação, atendimento, oportunidades e contratos, ao lado do título do artigo.",
      width: 1200,
      height: 630,
    },
  },
  {
    slug: "agencia-nao-entende-meu-segmento",
    title: "A agência não entende meu segmento: como avaliar isso na prática",
    seoTitle: "Agência não entende seu segmento? Como avaliar | Shark",
    description:
      "Veja como avaliar se sua agência entende a operação da clínica, quais evidências pedir e quando revisar o briefing, o escopo ou o fornecedor.",
    excerpt:
      "Entender o segmento aparece nas decisões, não no discurso. Que evidências levar para a reunião, como avaliar os contatos e o que perguntar antes de renovar.",
    category: "Marketing para clínicas",
    publishedAt: "2026-10-05",
    readingMinutes: 6,
    cover: {
      src: "/blog/agencia-nao-entende-meu-segmento.jpg",
      alt: "Mão marcando itens de uma lista de verificação numa prancheta, ao lado de um notebook, com o título: A agência entende seu segmento? Critérios para avaliar a parceria.",
      width: 1672,
      height: 941,
    },
    ogImage: {
      src: "/blog/agencia-nao-entende-meu-segmento-og.jpg",
      alt: "Mão marcando itens de uma lista de verificação numa prancheta, ao lado de um notebook, com o título: A agência entende seu segmento? Critérios para avaliar a parceria.",
      width: 1200,
      height: 630,
    },
  },
  {
    slug: "marketing-juridico-medo-regulamentacao-oab",
    title: "Medo da OAB: quando o receio da regulamentação impede o crescimento do escritório",
    seoTitle: "Marketing Jurídico e OAB: Como Crescer Sem Medo da Regulamentação",
    description:
      "O medo das regras da OAB está impedindo seu escritório de investir em marketing? Entenda o que é permitido e como estruturar uma estratégia de aquisição com conformidade.",
    excerpt:
      "Não poder fazer marketing é diferente de não poder fazer marketing de qualquer maneira. O que o Provimento 205/2021 permite e como crescer dentro das regras.",
    category: "Marketing Jurídico",
    publishedAt: "2026-10-07",
    readingMinutes: 7,
    cover: {
      src: "/blog/marketing-juridico-medo-regulamentacao-oab.jpg",
      alt: "Documento do Provimento nº 205/2021 sobre uma mesa escura, separado por uma placa de vidro iluminada em verde de um notebook que mostra gráficos de crescimento.",
      width: 1672,
      height: 941,
    },
    ogImage: {
      src: "/blog/marketing-juridico-medo-regulamentacao-oab-og.jpg",
      alt: "Documento do Provimento nº 205/2021 sobre uma mesa escura, separado por uma placa de vidro iluminada em verde de um notebook que mostra gráficos de crescimento.",
      width: 1200,
      height: 630,
    },
  },
  {
    slug: "empresa-nao-aparece-google-maps",
    title: "Seu cliente está procurando no Google. A sua empresa aparece?",
    seoTitle: "Sua Empresa Não Aparece no Google Maps? Entenda o Que Está Acontecendo",
    description:
      "Seu cliente procura pelo seu serviço no Google, mas encontra seus concorrentes? Entenda como Google Maps, Perfil da Empresa e SEO local influenciam sua aquisição.",
    excerpt:
      "Quem pesquisa “serviço + cidade” já tem intenção. Como o Google escolhe quem aparece no Maps, o que atrapalha um perfil e um teste para ver onde sua empresa está.",
    category: "SEO Local",
    publishedAt: "2026-10-07",
    readingMinutes: 10,
    cover: {
      src: "/blog/empresa-nao-aparece-google-maps.jpg",
      alt: "Interface de pesquisa local com a busca “serviço perto de mim” sobre uma cidade escura vista de cima: concorrentes marcados por pins verdes iluminados e um ponto apagado com um ponto de interrogação.",
      width: 1672,
      height: 941,
    },
    ogImage: {
      src: "/blog/empresa-nao-aparece-google-maps-og.jpg",
      alt: "Interface de pesquisa local com a busca “serviço perto de mim” sobre uma cidade escura vista de cima: concorrentes marcados por pins verdes iluminados e um ponto apagado com um ponto de interrogação.",
      width: 1200,
      height: 630,
    },
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
