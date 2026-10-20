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
    slug: "controle-contas-dados-marketing",
    title:
      "Sua empresa é realmente dona do próprio marketing? O risco de perder o controle sobre contas e dados",
    seoTitle: "Quem é Dono das Suas Contas de Marketing? O Risco de Perder Dados e Acessos",
    description:
      "Sua agência controla suas contas, pixels e dados? Entenda por que acessos e ativos de marketing devem permanecer sob controle da empresa.",
    excerpt:
      "Fornecedores podem mudar; os ativos da empresa precisam permanecer. A diferença entre operar e possuir contas de anúncios, Analytics e Tag Manager, e como organizar os acessos.",
    category: "Gestão de Marketing",
    publishedAt: "2026-10-07",
    readingMinutes: 8,
    cover: {
      src: "/blog/controle-contas-dados-marketing.jpg",
      alt: "Contas e dados de marketing protegidos por cadeado representando falta de controle sobre ativos digitais",
      width: 1672,
      height: 941,
    },
    ogImage: {
      src: "/blog/controle-contas-dados-marketing-og.jpg",
      alt: "Contas e dados de marketing protegidos por cadeado representando falta de controle sobre ativos digitais",
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
  {
    slug: "contrato-agencia-marketing-cancelamento-fidelidade",
    title: "Contrato de marketing não deveria parecer uma prisão",
    seoTitle: "Contrato com Agência de Marketing: Prazo, Cancelamento e Fidelidade",
    description:
      "Tem receio de ficar preso a uma agência? Entenda o que observar em prazo, cancelamento, multas, acessos e regras antes de assinar um contrato de marketing.",
    excerpt:
      "O problema não é existir contrato ou prazo, e sim dependência sem transparência nem critério de saída. O que perguntar sobre prazo, multa, acessos e encerramento antes de assinar.",
    category: "Gestão de Marketing",
    publishedAt: "2026-10-07",
    readingMinutes: 8,
    cover: {
      src: "/blog/contrato-agencia-marketing-cancelamento-fidelidade.jpg",
      alt: "Contrato assinado sobre uma mesa escura, preso a uma pasta por uma corrente aberta, com uma chave ao lado e, ao fundo, uma linha do tempo iluminada em verde que termina na etapa de saída.",
      width: 1672,
      height: 941,
    },
    ogImage: {
      src: "/blog/contrato-agencia-marketing-cancelamento-fidelidade-og.jpg",
      alt: "Contrato assinado sobre uma mesa escura, preso a uma pasta por uma corrente aberta, com uma chave ao lado e, ao fundo, uma linha do tempo iluminada em verde que termina na etapa de saída.",
      width: 1200,
      height: 630,
    },
  },
  {
    slug: "follow-up-leads-vendas",
    title: "O lead chegou. E depois? Como a falta de follow-up desperdiça oportunidades",
    seoTitle: "Follow-up de Vendas: Seus Leads Somem ou Sua Empresa Para de Acompanhá-los?",
    description:
      "Seus leads chegam mas não viram vendas? Entenda como a falta de follow-up, CRM e próxima ação pode estar desperdiçando oportunidades já geradas.",
    excerpt:
      "O lead não é o resultado final, é a entrada de uma oportunidade. Como próxima ação, responsável, pipeline e CRM evitam que contatos já gerados se percam no comercial.",
    category: "Vendas e Conversão",
    publishedAt: "2026-10-07",
    readingMinutes: 8,
    cover: {
      src: "/blog/follow-up-leads-vendas.jpg",
      alt: "Pipeline comercial na tela de um computador sobre uma mesa escura: leads entram em verde pelas etapas novo lead, contato e proposta, mas na etapa de follow-up os cartões ficam parados com alertas, e uma ficha mostra último contato há 7 dias e o campo próxima ação vazio.",
      width: 1672,
      height: 941,
    },
    ogImage: {
      src: "/blog/follow-up-leads-vendas-og.jpg",
      alt: "Pipeline comercial na tela de um computador sobre uma mesa escura: leads entram em verde pelas etapas novo lead, contato e proposta, mas na etapa de follow-up os cartões ficam parados com alertas, e uma ficha mostra último contato há 7 dias e o campo próxima ação vazio.",
      width: 1200,
      height: 630,
    },
  },
  {
    slug: "dependencia-indicacao-portais-aquisicao",
    title: "Sua empresa vende porque tem aquisição — ou porque terceiros ainda estão trazendo clientes?",
    seoTitle: "Sua Empresa Depende de Indicação ou Portal para Conseguir Clientes?",
    description:
      "Indicação e portais podem gerar ótimas oportunidades, mas depender de um único canal aumenta o risco. Veja como construir uma aquisição mais diversificada e previsível.",
    excerpt:
      "Indicação é canal. Portal é canal. Nenhum deles deveria ser a única infraestrutura de aquisição. Um teste de dependência, a diferença entre canal próprio e alugado e como diversificar sem abandonar o que funciona.",
    category: "Aquisição de Clientes",
    publishedAt: "2026-10-07",
    readingMinutes: 9,
    cover: {
      src: "/blog/dependencia-indicacao-portais-aquisicao.jpg",
      alt: "Ilustração de uma empresa no centro de uma cidade escura: à esquerda, um portal em preto e branco concentra todos os contatos num único caminho; à direita, caminhos verdes iluminados chegam de vários canais próprios, como Google, indicação, conteúdo, tráfego pago, site, redes sociais e CRM.",
      width: 1672,
      height: 941,
    },
    ogImage: {
      src: "/blog/dependencia-indicacao-portais-aquisicao-og.jpg",
      alt: "Ilustração de uma empresa no centro de uma cidade escura: à esquerda, um portal em preto e branco concentra todos os contatos num único caminho; à direita, caminhos verdes iluminados chegam de vários canais próprios, como Google, indicação, conteúdo, tráfego pago, site, redes sociais e CRM.",
      width: 1200,
      height: 630,
    },
  },
  {
    slug: "escritorio-contatos-poucos-contratos",
    title:
      "Meu escritório recebe contatos, mas fecha poucos contratos: como o marketing pode ajudar?",
    seoTitle: "Escritório recebe contatos, mas fecha poucos contratos?",
    description:
      "Seu escritório recebe mensagens, mas poucas viram contrato? Veja como o marketing ajuda a atrair demandas compatíveis, apresentar o trabalho e acompanhar os contatos.",
    excerpt:
      "Antes de aumentar a verba, entenda o que acontece nas conversas: se as pessoas procuram o trabalho que o escritório oferece, onde o atendimento para e o que esperar de uma agência.",
    category: "Marketing Jurídico",
    publishedAt: "2026-10-20",
    readingMinutes: 7,
    cover: {
      src: "/blog/escritorio-contatos-poucos-contratos.jpg",
      alt: "Smartphone sobre uma mesa escura com balões de mensagem, um deles em verde, ao lado de uma pasta de couro com documento e caneta, com o título: Muitos contatos. Poucos contratos. Como o marketing pode ajudar seu escritório.",
      width: 1672,
      height: 941,
    },
    ogImage: {
      src: "/blog/escritorio-contatos-poucos-contratos-og.jpg",
      alt: "Smartphone sobre uma mesa escura com balões de mensagem, um deles em verde, ao lado de uma pasta de couro com documento e caneta, com o título: Muitos contatos. Poucos contratos. Como o marketing pode ajudar seu escritório.",
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
