import type { StaticImageData } from "next/image";
import { IMAGES } from "@/content/portfolio/images";
import type { Category } from "@/lib/portfolio-categories";

export { CATEGORIES, FULL_SERVICE_LABEL, categoryLabel, type Category } from "@/lib/portfolio-categories";

export type Shot = { image: StaticImageData; alt: string };

export type GallerySection = {
  title: string;
  /** posts: masonry of feed/story pieces; wide: landscape pieces; logos: square tiles. */
  layout: "posts" | "wide" | "logos";
  items: Shot[];
};

export type Project = {
  slug: string;
  name: string;
  segment: string;
  location?: string;
  /** Only when the folders show the dates. */
  period?: string;
  /** One line for cards and the meta description. */
  summary: string;
  intro: string[];
  deliveries: string[];
  categories: Category[];
  cover: Shot;
  /** JPG version of the cover for link previews (WhatsApp, redes). */
  og: StaticImageData;
  site?: {
    /** Public address, only when the site is online. */
    url?: string;
    desktop: Shot;
    page: Shot;
    mobile: Shot;
  };
  instagram?: string;
  gallery: GallerySection[];
  /** The Shark built the client's marketing from zero and still runs it. */
  fullService?: boolean;
  /** Shown on the home page and in the client strip, in this order. */
  featured?: boolean;
};


/*
 * Trabalho feito pela Shark, com imagens tiradas das pastas de cada cliente.
 * Só entra o que a Shark produziu: fotos do cliente, marcas criadas por
 * terceiros e personagens licenciados ficam de fora. Nada de resultados,
 * números ou depoimentos sem fonte.
 */

function img(key: string): StaticImageData {
  const image = (IMAGES as Record<string, StaticImageData>)[key];
  if (!image) throw new Error(`Imagem do portfólio não encontrada: ${key}`);
  return image;
}

const shot = (key: string, alt: string): Shot => ({ image: img(key), alt });

/** `<slug>/<prefix>-01`, `-02`… with one alt text per piece. */
function series(slug: string, prefix: string, alts: string[]): Shot[] {
  return alts.map((alt, i) => shot(`${slug}/${prefix}-${String(i + 1).padStart(2, "0")}`, alt));
}

function siteShots(slug: string, name: string, url?: string): Project["site"] {
  return {
    url,
    desktop: shot(`${slug}/site-desktop`, `Primeira dobra do site ${name} no computador`),
    page: shot(`${slug}/site-pagina`, `Página inicial do site ${name}, inteira, no computador`),
    mobile: shot(`${slug}/site-celular`, `Site ${name} no celular`),
  };
}

const cover = (slug: string, alt: string) => shot(`${slug}/capa`, alt);

export const PORTFOLIO: Project[] = [
  {
    slug: "arthemi",
    name: "Arthemi Coworking de Saúde",
    segment: "Coworking de saúde",
    location: "Belo Horizonte, MG",
    period: "2026",
    summary: "Do zero: marca, site com reserva e pagamento online, lançamento, Instagram e anúncios. A Shark cuida de tudo.",
    intro: [
      "A Arthemi chegou à Shark antes de abrir as portas. Criamos a marca, o site e o sistema de reservas, planejamos a inauguração e seguimos cuidando de todo o marketing: Instagram, anúncios e os ajustes do site.",
      "O espaço aluga consultórios mobiliados por hora na área hospitalar de BH. O site apresenta as salas e leva o profissional direto para a reserva: escolhe o consultório, o horário e paga online, sem depender de alguém para confirmar.",
      "No Instagram, a linha editorial fala com quem está começando a atender ou quer sair do custo fixo de uma clínica própria: agenda, endereço profissional e a experiência do paciente desde a chegada.",
    ],
    deliveries: [
      "Identidade visual",
      "Site",
      "Sistema de reservas com pagamento online",
      "Plano de lançamento",
      "Social media",
      "Gestão de tráfego",
    ],
    categories: ["sites", "identidade", "social"],
    cover: cover("arthemi", "Site da Arthemi no computador e no celular"),
    og: img("arthemi/og.jpg"),
    site: siteShots("arthemi", "da Arthemi", "https://www.arthemisaude.com"),
    instagram: "arthemi.coworking",
    gallery: [
      {
        title: "Marca",
        layout: "logos",
        items: series("arthemi", "marca", [
          "Logotipo Arthemi em verde sobre areia",
          "Logo Arthemi com o símbolo de estrelas, sobre caramelo",
          "Foto de perfil do Instagram com a marca sobre o consultório",
        ]),
      },
      {
        title: "Instagram",
        layout: "posts",
        items: series("arthemi", "post", [
          "Post: quantas vezes você ouviu “atende depois das 18h?”",
          "Post: atender em casa é econômico até começar a limitar os atendimentos",
          "Post: o que o endereço responde por você",
          "Post: se eu estivesse começando a atender hoje, faria essas 5 coisas primeiro",
          "Post: você não precisa começar grande",
          "Post: a pessoa entrou no seu Instagram, em 10 segundos ela entende o que você faz?",
          "Post: sua estrutura pode crescer no mesmo ritmo da sua agenda",
          "Post: pequenos detalhes, grandes experiências",
          "Story: toda semana chega essa pergunta",
          "Story: consultórios completos",
        ]),
      },
      {
        title: "Anúncios de lançamento",
        layout: "posts",
        items: [
          shot("arthemi/anuncio-02", "Anúncio: espaço profissional com preço promocional por tempo limitado"),
          shot("arthemi/anuncio-03", "Anúncio: você atende, nós cuidamos do resto. Reservar consultório"),
          shot("arthemi/anuncio-04", "Story: consultório profissional por hora com preço promocional"),
          shot("arthemi/anuncio-01", "Anúncio horizontal: você atende, nós cuidamos do resto"),
        ],
      },
    ],
    fullService: true,
    featured: true,
  },
  {
    slug: "fausto-carretos",
    name: "Fausto Carretos",
    segment: "Carretos e pequenas mudanças",
    location: "Belo Horizonte, MG",
    period: "2026",
    summary: "Do zero: página, campanha no Google e pedidos de orçamento direto no WhatsApp. A Shark cuida de toda a aquisição.",
    intro: [
      "A Fausto Carretos começou no digital com a Shark. Montamos tudo do zero (a página, a campanha no Google e a medição de cada contato) e seguimos cuidando da operação: quem pesquisa “carreto BH” chega ao WhatsApp pronto para pedir orçamento.",
      "A página tem objetivo único. Mostra o responsável e o caminhão de verdade, a área atendida e o que mandar na mensagem (origem, destino e fotos), para o orçamento sair na primeira conversa.",
      "Todo dado da página saiu do que o cliente confirmou: nada de avaliação ou número que ele não pudesse comprovar.",
    ],
    deliveries: ["Landing page", "Google Ads", "Medição de conversões", "Atendimento pelo WhatsApp", "Gestão contínua"],
    categories: ["sites"],
    cover: cover("fausto-carretos", "Landing page da Fausto Carretos no computador e no celular"),
    og: img("fausto-carretos/og.jpg"),
    site: siteShots("fausto-carretos", "da Fausto Carretos", "https://www.faustocarretos.com.br"),
    instagram: "faustocarretos",
    gallery: [],
    fullService: true,
    featured: true,
  },
  {
    slug: "amaral-carretos",
    name: "Amaral Carretos",
    segment: "Entulho, poda e carretos",
    location: "Belo Horizonte, MG",
    period: "2026",
    summary: "Do zero: Google Ads, Perfil da Empresa, página, WhatsApp e CRM. A Shark cuida de toda a aquisição.",
    intro: [
      "A Amaral Carretos começou no digital com a Shark. Montamos a operação de aquisição do zero e seguimos cuidando dela, com acompanhamento semanal e otimização da campanha.",
      "Para uma verba pequena, a decisão foi concentrar tudo na pesquisa do Google e nos serviços de ticket maior, entulho e poda, com o carreto como volume.",
      "A operação tem a página, a estrutura da campanha com palavras-chave e negativas, a otimização do Perfil da Empresa no Google, respostas prontas para o WhatsApp e um CRM em planilha com rotina semanal de decisão.",
    ],
    deliveries: [
      "Landing page",
      "Google Ads",
      "Perfil da Empresa no Google",
      "Atendimento pelo WhatsApp",
      "CRM",
      "Gestão contínua",
    ],
    categories: ["sites"],
    cover: cover("amaral-carretos", "Landing page da Amaral Carretos no computador e no celular"),
    og: img("amaral-carretos/og.jpg"),
    site: siteShots("amaral-carretos", "da Amaral Carretos"),
    gallery: [],
    fullService: true,
    featured: true,
  },
  {
    slug: "colen-advogados",
    name: "Colen Advogados",
    segment: "Advocacia",
    location: "Belo Horizonte, MG",
    period: "2026",
    summary: "Site com blog e landing pages, tráfego e o Instagram do escritório, com uma série sobre planos de saúde.",
    intro: [
      "O site reúne as áreas de atuação, o sócio fundador e o blog, e ganhou landing pages próprias para as campanhas de cada área.",
      "No Instagram, o feed segue a linguagem da marca do escritório: fundo escuro, tipografia limpa e textos curtos. Há uma linha só para direito da saúde, com negativa de cobertura e reajuste por faixa etária.",
    ],
    deliveries: ["Site e blog", "Landing pages", "Social media", "Gestão de tráfego", "Funil"],
    categories: ["sites", "social"],
    cover: cover("colen-advogados", "Site da Colen Advogados no computador e no celular"),
    og: img("colen-advogados/og.jpg"),
    site: siteShots("colen-advogados", "da Colen Advogados", "https://www.colenadvogados.com.br"),
    instagram: "colenadvogados",
    gallery: [
      {
        title: "Instagram",
        layout: "posts",
        items: series("colen-advogados", "post", [
          "Post de apresentação do escritório com o sócio fundador",
          "Post: toda demanda complexa envolve camadas que não se revelam à primeira vista",
          "Post: atuação além do escritório",
          "Post: o problema jurídico quase nunca começa no processo",
          "Post de direito da saúde: nem toda negativa é ilegal, mas muitas podem ser abusivas",
          "Post de direito da saúde: depois dos 60, o plano não pode aumentar por idade",
          "Post: o custo invisível de esperar",
          "Post: estratégia com inteligência, execução com excelência",
        ]),
      },
    ],
    featured: true,
  },
  {
    slug: "marcelo-colen",
    name: "Marcelo Colen",
    segment: "Advocacia em concursos e heteroidentificação",
    location: "Belo Horizonte, MG",
    period: "2026",
    summary: "Landing page para recurso de candidato reprovado na banca de heteroidentificação, com Google Ads e Instagram.",
    intro: [
      "Página feita para quem passou nas provas e foi eliminado na banca de heteroidentificação. Ela explica, em linguagem direta, quando cabe recurso administrativo ou mandado de segurança e leva o candidato a enviar o caso pelo WhatsApp.",
      "O tráfego vem de campanhas de pesquisa no Google. No Instagram pessoal do advogado, os carrosséis tratam das mesmas dúvidas: prazos, limites da comissão e o que torna uma decisão contestável.",
    ],
    deliveries: ["Landing page", "Google Ads", "Social media"],
    categories: ["sites", "social"],
    cover: cover("marcelo-colen", "Landing page de Marcelo Colen no computador e no celular"),
    og: img("marcelo-colen/og.jpg"),
    site: siteShots("marcelo-colen", "de Marcelo Colen", "https://marcelocolen.com.br"),
    instagram: "marcelocolen.adv",
    gallery: [
      {
        title: "Instagram",
        layout: "posts",
        items: series("marcelo-colen", "post", [
          "Post: anos de estudo, aprovado nas provas, barrado na banca",
          "Post: recurso administrativo negado",
          "Post: sem critérios, sem defesa",
          "Post: o ponto não é transformar o Judiciário em nova banca",
          "Post: a comissão pode avaliar, mas não de qualquer forma",
          "Post: o remédio? Mandado de segurança",
          "Story: reprovado? O problema pode estar na decisão",
          "Story: recurso administrativo negado",
        ]),
      },
    ],
    featured: true,
  },
  {
    slug: "sereia",
    name: "Sereia Nails & Lashes",
    segment: "Produtos para nail designers e lash designers",
    location: "Foz do Iguaçu, PR",
    period: "2026",
    summary: "Conteúdo e anúncios no Meta para uma loja de produtos de unhas e cílios, com pedido pelo WhatsApp.",
    intro: [
      "A Sereia vende géis, bases, colas e acessórios para profissionais de unhas e cílios. Os carrosséis ensinam (preparação, escolha do gel, erros que fazem o alongamento descolar) e os anúncios levam a profissional a pedir pelo WhatsApp.",
      "A identidade das peças usa o universo do nome: tons lilás e azul-piscina, conchas e pérolas, com o produto sempre em destaque.",
    ],
    deliveries: ["Social media", "Anúncios no Meta", "Funil de pedido pelo WhatsApp"],
    categories: ["social"],
    cover: cover("sereia", "Três peças da Sereia: novidade, 4 erros do alongamento e escolha do gel"),
    og: img("sereia/og.jpg"),
    instagram: "sereianails.lash",
    gallery: [
      {
        title: "Carrosséis, posts e anúncios",
        layout: "posts",
        items: series("sereia", "post", [
          "Capa de carrossel: 4 erros que fazem o alongamento descolar antes da hora",
          "Slide de carrossel: estrutura mal construída",
          "Anúncio: seu estoque está no fim? Peça sua reposição",
          "Anúncio: novidade, base gel Anylovy",
          "Anúncio: qual é o seu momento, novidade ou reposição",
          "Anúncio: géis de unha mais pedidos",
          "Anúncio: colas para cílios",
          "Slide de carrossel: limpeza e preparação",
          "Capa de carrossel: vai comprar gel ou construtor? Não escolha só pela embalagem",
          "Anúncio: precisa de produto para a bancada?",
          "Anúncio: também trabalha com lashes?",
          "Post interativo: qual desses você colocaria no próximo pedido?",
        ]),
      },
    ],
    featured: true,
  },
  {
    slug: "dra-thais-santos",
    name: "Dra. Thaís Santos",
    segment: "Acupuntura médica",
    location: "Belo Horizonte, MG",
    period: "2026",
    summary: "Carrosséis educativos para uma médica acupunturista, com base em evidência e direção de arte própria.",
    intro: [
      "Cada carrossel parte de uma dúvida real de consultório, como enxaqueca, dor no pescoço ou o que significa a dor sair de 10 para 3, e organiza a resposta em sequência, com a fonte dos estudos citada.",
      "A direção de arte alterna fotos da médica com fundos em verde e areia e uma tipografia serifada, para o feed ter cara de consultório e não de anúncio.",
    ],
    deliveries: ["Estratégia de conteúdo", "Carrosséis", "Direção de arte"],
    categories: ["social"],
    cover: cover("dra-thais-santos", "Capas de três carrosséis da Dra. Thaís Santos"),
    og: img("dra-thais-santos/og.jpg"),
    instagram: "drathais.bh",
    gallery: [
      {
        title: "Carrosséis",
        layout: "posts",
        items: series("dra-thais-santos", "post", [
          "Capa: acupuntura médica, entenda como funciona o atendimento",
          "Slide: para quem é o atendimento",
          "Slide: como é o atendimento",
          "Capa: enxaqueca, a acupuntura pode ajudar a diminuir as crises?",
          "Slide: o que os estudos mostram",
          "Capa: dor no pescoço que sempre volta?",
          "Slide: antes de qualquer agulha, vem a avaliação",
          "Capa: sua dor era 10, agora é 3. Mas ainda dói, isso é melhora?",
          "Slide: de 10 para 3",
          "Slide: por isso eu faço duas perguntas",
        ]),
      },
    ],
    featured: true,
  },
  {
    slug: "barp-hoff",
    name: "Barp.Hoff Advocacia",
    segment: "Direito da saúde",
    location: "Foz do Iguaçu, PR",
    summary: "Site institucional com blog para um escritório de direito da saúde, e gestão de tráfego no Google.",
    intro: [
      "O site apresenta as advogadas, as áreas de atuação e um caminho direto para o WhatsApp. O blog trabalha os temas que as pessoas pesquisam no Google quando têm um tratamento ou medicamento negado pelo SUS ou pelo plano.",
    ],
    deliveries: ["Site", "Blog com SEO", "Gestão de tráfego"],
    categories: ["sites"],
    cover: cover("barp-hoff", "Site da Barp.Hoff no computador e no celular"),
    og: img("barp-hoff/og.jpg"),
    site: siteShots("barp-hoff", "da Barp.Hoff", "https://www.barphoff.com.br"),
    instagram: "advpacientes",
    gallery: [],
    featured: true,
  },
  {
    slug: "pedro-josino",
    name: "Pedro Josino Advogados",
    segment: "Direito imobiliário",
    period: "2026",
    summary: "Identidade visual e landing pages para regularização de imóveis e leilões.",
    intro: [
      "A marca junta uma coluna clássica às iniciais P e J, em dourado sobre preto, com versões em verde-escuro e vinho.",
      "As landing pages seguem a mesma linguagem e explicam cada serviço em etapas, da análise dos documentos ao registro em cartório, sempre com o caminho para falar com o advogado.",
    ],
    deliveries: ["Identidade visual", "Landing pages"],
    categories: ["identidade", "sites"],
    cover: cover("pedro-josino", "Landing page de Pedro Josino no computador e no celular"),
    og: img("pedro-josino/og.jpg"),
    site: siteShots("pedro-josino", "de Pedro Josino"),
    instagram: "pedrojosino.adv",
    gallery: [
      {
        title: "Marca",
        layout: "logos",
        items: series("pedro-josino", "marca", [
          "Logo Pedro Josino em dourado sobre preto",
          "Logo Pedro Josino em verde-escuro",
          "Logo Pedro Josino em vinho",
          "Símbolo e nome Pedro Josino em dourado",
        ]),
      },
      {
        title: "Imagens de compartilhamento",
        layout: "wide",
        items: series("pedro-josino", "compartilhamento", [
          "Regularização de imóveis: você pagou, mora, cuida. A matrícula ainda diz outro nome.",
          "Leilão de imóveis: comprar bem é só metade do leilão",
          "Quem é: Pedro Josino, advocacia em direito imobiliário",
        ]),
      },
    ],
    featured: true,
  },
  {
    slug: "petria-azevedo",
    name: "Pétria Azevedo Advocacia",
    segment: "Direitos da gestante no trabalho",
    period: "2026",
    summary: "Landing page para gestantes demitidas, com campanha no Google, perfil da empresa e roteiro de triagem no WhatsApp.",
    intro: [
      "A página responde, em ordem, às dúvidas de quem foi demitida grávida: quando existe estabilidade, o que muda em contrato de experiência ou sem registro e como pedir uma análise do caso.",
      "Junto com a página foram entregues o briefing da campanha no Google Ads, o checklist do Perfil da Empresa no Google e o roteiro de triagem para o atendimento no WhatsApp.",
    ],
    deliveries: ["Landing page", "Google Ads", "Perfil da Empresa no Google", "Roteiro de atendimento no WhatsApp"],
    categories: ["sites"],
    cover: cover("petria-azevedo", "Landing page da Pétria Azevedo no computador e no celular"),
    og: img("petria-azevedo/og.jpg"),
    site: siteShots("petria-azevedo", "da Pétria Azevedo", "https://www.petriaazevedo.com.br"),
    instagram: "petriaazevedo",
    gallery: [],
    featured: true,
  },
  {
    slug: "cardoso-goncalves",
    name: "Cardoso Gonçalves Advogados",
    segment: "Advocacia",
    period: "2026",
    summary: "Identidade visual completa: monograma, versões do logotipo, paleta e documento de voz e posicionamento.",
    intro: [
      "O monograma une o C e o G em um losango de traço contínuo, em azul e dourado. A marca tem três composições (principal, horizontal e só o símbolo), cada uma em cor, azul, negativo e branco.",
      "A entrega veio com os arquivos em AI, PDF, SVG e PNG e com o documento de voz e posicionamento, que define como o escritório fala e quando usar cada versão.",
    ],
    deliveries: ["Identidade visual", "Manual de voz e posicionamento"],
    categories: ["identidade"],
    cover: cover("cardoso-goncalves", "Logo da Cardoso Gonçalves Advogados em negativo, sobre azul"),
    og: img("cardoso-goncalves/og.jpg"),
    gallery: [
      {
        title: "Versões da marca",
        layout: "wide",
        items: series("cardoso-goncalves", "marca", [
          "Versão principal em cor, sobre fundo claro",
          "Versão principal em negativo, sobre azul",
          "Versão horizontal em cor",
          "Versão horizontal em negativo",
          "Monograma em cor",
          "Monograma em negativo",
        ]),
      },
    ],
  },
  {
    slug: "di-terroir",
    name: "Di Terroir",
    segment: "Vinhos, cafés, chocolates e charutos",
    location: "Foz do Iguaçu, PR",
    summary: "Logotipo, loja virtual com checkout em PIX e as peças de lançamento da marca.",
    intro: [
      "O logo encaixa uma taça e um cacho de uva entre o D e o Terroir, em vinho escuro. As peças de lançamento apresentam a curadoria em fundo bordô, com uva, saca-rolhas e os produtos da casa.",
      "A loja virtual organiza o catálogo por categoria (vinhos, charutos e chocolates) e tem checkout com PIX.",
    ],
    deliveries: ["Logotipo", "Loja virtual", "Social media"],
    categories: ["identidade", "social"],
    cover: cover("di-terroir", "Peças de lançamento da Di Terroir"),
    og: img("di-terroir/og.jpg"),
    gallery: [
      {
        title: "Marca",
        layout: "wide",
        items: [shot("di-terroir/marca-01", "Logo Di Terroir em branco sobre bordô")],
      },
      {
        title: "Lançamento",
        layout: "posts",
        items: series("di-terroir", "post", [
          "Post: apresentamos Di Terroir, sabores que atravessam fronteiras",
          "Story: café Bonafide e charutos da curadoria",
          "Post de lançamento com uvas, café e chocolates",
        ]),
      },
    ],
  },
];

export const FEATURED_PROJECTS = PORTFOLIO.filter((p) => p.featured);

export function getProject(slug: string) {
  return PORTFOLIO.find((p) => p.slug === slug);
}
