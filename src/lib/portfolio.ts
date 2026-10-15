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
  /** One line for cards and the meta description: what the Shark does there. */
  summary: string;
  /** Main challenge, shown on cards. */
  challenge: string;
  /** Case study, in four blocks: starting point, decision, operation, evidence. */
  startingPoint: string;
  decision: string;
  operation: string[];
  /** Verifiable, non-numeric lessons. */
  learnings?: string[];
  /** Results only with client authorization, period and source. */
  metrics?: { value: string; label: string; period: string; source: string }[];
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
    challenge: "Abrir um coworking de saúde do zero e encher a agenda de consultórios por hora.",
    startingPoint: "Consultórios mobiliados na área hospitalar de BH, antes da inauguração: sem marca, sem site, sem perfil e sem clientes.",
    decision: "Tirar o atendimento manual do caminho da reserva. O profissional vê as salas, entende o preço e reserva sozinho, e o Instagram fala com quem está começando a atender ou quer sair do custo fixo de uma clínica própria.",
    operation: [
      "Marca: logotipo, versão com símbolo e aplicações",
      "Site com páginas por profissão e reserva com pagamento online",
      "Plano de inauguração com anúncios de preço promocional",
      "Instagram com linha editorial para profissionais de saúde",
      "Gestão de tráfego e ajustes contínuos no site e na oferta",
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
    challenge: "Começar do zero no digital e receber pedidos de quem pesquisa carreto em BH.",
    startingPoint: "Um prestador de carretos e pequenas mudanças em BH, com 13 anos de estrada e nenhum canal próprio para captar pedidos online.",
    decision: "Concentrar no Google Pesquisa, onde está quem precisa de carreto agora, e levar direto ao WhatsApp com o que agiliza o orçamento. Na página, só entra informação que o cliente confirma.",
    operation: [
      "Landing page de objetivo único, com o responsável e o veículo reais",
      "Campanha de pesquisa no Google para carreto e mudança em BH",
      "Medição de cada clique no WhatsApp e no telefone, com a origem da campanha",
      "Mensagens prontas no WhatsApp para cada tipo de serviço",
      "Gestão contínua da campanha",
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
    challenge: "Gerar pedidos com verba pequena num mercado local disputado.",
    startingPoint: "Prestador de entulho, poda e carretos na Zona Sul de BH, começando no digital com verba de anúncio enxuta.",
    decision: "Tudo no Google Pesquisa, porque quem precisa de entulho ou poda pesquisa, não descobre no feed. Foco nos serviços de ticket maior, Perfil da Empresa arrumado antes do primeiro anúncio e uma regra combinada: o custo por conversa decide se a verba sobe.",
    operation: [
      "Perfil da Empresa no Google otimizado, com rotina de avaliações",
      "Campanha de pesquisa com palavras-chave e negativas por serviço",
      "Landing page com orçamento pelo WhatsApp",
      "Links e respostas prontas para o WhatsApp",
      "CRM em planilha com decisão semanal",
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
    challenge: "Transformar indicação e reputação em clientes nas áreas de maior valor, dentro das regras da OAB.",
    startingPoint: "Escritório bem avaliado em BH, com clientes que chegavam sobretudo por indicação. Quem era indicado conferia o Instagram e o Google antes de chamar.",
    decision: "Fortalecer onde o indicado confere (site, Instagram e avaliações) e abrir aquisição por busca e conteúdo nas áreas de ticket alto, com uma linha própria para direito da saúde e filtro de viabilidade antes do contato.",
    operation: [
      "Site com áreas de atuação, sócio fundador e blog",
      "Landing pages por área para as campanhas",
      "Instagram institucional e série de direito da saúde",
      "Gestão de tráfego e funil até o WhatsApp",
      "Comunicação dentro do Provimento 205/2021 da OAB",
    ],
    learnings: [
      "Anúncio genérico para saúde atrai contato que o escritório não atende. A linha de saúde passou a explicar o que é viável antes do contato.",
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
    challenge: "Chegar rápido a candidatos eliminados na banca de heteroidentificação, que têm prazo curto para recorrer.",
    startingPoint: "Advogado com atuação em cotas e heteroidentificação, mestre pela UFMG, atendendo candidatos de concursos em todo o país.",
    decision: "Busca no Google em escala nacional, porque quem foi reprovado pesquisa a solução com urgência, e uma página que explica o caminho do recurso antes de pedir o contato.",
    operation: [
      "Landing page sobre recurso administrativo e mandado de segurança",
      "Campanha de pesquisa no Google em 25 estados, com palavras negativas",
      "Revisão contínua de termos de pesquisa e anúncios",
      "Instagram pessoal com carrosséis sobre prazos e limites da banca",
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
    challenge: "Vender mais para profissionais de unhas e cílios que compram pelo WhatsApp.",
    startingPoint: "Loja de produtos para nail e lash designers em Foz do Iguaçu, com as vendas fechadas na conversa do WhatsApp.",
    decision: "Anúncios no Meta levando direto à conversa, conteúdo que ensina a escolher produto e, antes de aumentar a verba, olhar o que acontece depois do clique.",
    operation: [
      "Anúncios no Meta para novidade e reposição",
      "Carrosséis educativos sobre preparação, gel e alongamento",
      "Palavras-chave simples para pedir pelo WhatsApp",
      "Análise das vendas por horário, criativo e recompra",
    ],
    learnings: [
      "O maior gargalo estava depois do anúncio: pedidos de produto em falta e clientes que abriam conversa e sumiam. Reposição e follow-up entraram na pauta.",
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
    challenge: "Ser lembrada como médica especialista em acupuntura em BH, dentro das regras da publicidade médica.",
    startingPoint: "Médica acupunturista em BH, já presente no Instagram e à vontade em vídeo, ainda sem anúncio nem site próprio.",
    decision: "Começar pelo orgânico: o que as pessoas salvam e perguntam guia o anúncio e o site depois. Perfil e canal de agendamento ficam prontos antes de investir em mídia.",
    operation: [
      "Estratégia em três fases: orgânico, tráfego pago e site",
      "Roteiros, gravação e edição de Reels",
      "Carrosséis com base em evidência e fontes citadas",
      "Acompanhamento de alcance, salvamentos e cliques no contato",
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
    challenge: "Ser encontrado em todo o país por quem teve tratamento negado pelo plano ou pelo SUS.",
    startingPoint: "Escritório com 17 anos de dedicação ao direito da saúde, em Foz do Iguaçu, atendendo pacientes de todo o Brasil.",
    decision: "Unir busca paga e conteúdo: Google Ads para quem precisa de ajuda agora e um blog que responde às dúvidas que as famílias pesquisam depois de uma negativa.",
    operation: [
      "Site institucional com caminho direto para o WhatsApp",
      "Blog com SEO para temas de direito da saúde",
      "Gestão de tráfego no Google",
      "Direção de marca e design do site",
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
    challenge: "Posicionar um advogado imobiliário em serviços técnicos, como regularização e leilão.",
    startingPoint: "Advogado imobiliário com atuação em regularização de imóveis e leilões, construindo a marca do escritório.",
    decision: "Uma marca sóbria, de tradição, e uma página para cada serviço, porque cada demanda tem dúvidas e documentos diferentes.",
    operation: [
      "Identidade visual com versões de cor",
      "Landing pages de regularização e de leilão de imóveis",
      "Página institucional e imagens de compartilhamento",
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
    challenge: "Chegar à gestante demitida no momento em que ela descobre que pode ter direitos.",
    startingPoint: "Advogada trabalhista focada nos direitos da gestante, com atendimento online para todo o Brasil.",
    decision: "Google Pesquisa organizado por tema (alta intenção, dúvida e termos próximos) e uma página que responde às situações mais comuns antes do contato.",
    operation: [
      "Landing page sobre demissão de gestante",
      "Campanhas no Google com grupos de tema único",
      "Conversão medida no clique do WhatsApp",
      "Checklist do Perfil da Empresa e roteiro de triagem no WhatsApp",
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
    challenge: "Criar uma marca que transmita solidez para um escritório de advocacia.",
    startingPoint: "Escritório de advocacia construindo a marca desde o início.",
    decision: "Explorar direções visuais antes de decidir e fechar a marca junto com a voz: como o escritório fala e quando usar cada versão.",
    operation: [
      "Monograma e versões principal, horizontal e símbolo",
      "Paleta e arquivos em AI, PDF, SVG e PNG",
      "Documento de voz e posicionamento",
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
    challenge: "Lançar uma curadoria de vinhos, cafés, chocolates e charutos com venda online.",
    startingPoint: "Uma loja nova em Foz do Iguaçu, com curadoria de produtos importados, ainda sem marca nem canal de venda online.",
    decision: "Marca com cara de curadoria e loja própria com checkout em PIX, para vender sem depender só do atendimento.",
    operation: [
      "Logotipo",
      "Loja virtual com catálogo por categoria e checkout em PIX",
      "Peças de lançamento para as redes",
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
