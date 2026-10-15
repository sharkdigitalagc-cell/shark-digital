// Content of the interactive funnel on /como-trabalhamos. The funnel is a
// model to read the journey, not a claim that every customer follows the
// same order: people enter through different channels, go back and skip steps.

export type StageId = "descoberta" | "consideracao" | "intencao" | "conversao" | "resultado";
export type SourceId = "meta" | "organico" | "google" | "indicacao";

export type Stage = {
  id: StageId;
  name: string;
  /** Short label inside the funnel drawing. */
  short: string;
  tagline: string;
  /** What the person looks for or needs at this moment. */
  need: string;
  /** Channels or resources that influence the decision. */
  levers: string;
  /** Indicator that helps evaluate the stage. */
  metric: string;
  /** Entry points highlighted in the drawing when the stage is active. */
  sources: SourceId[];
  /** Google Search is the agency's core specialty. */
  specialty?: string;
  /** Where the client's own team takes part. */
  clientRole?: string;
};

export const STAGES: Stage[] = [
  {
    id: "descoberta",
    name: "Descoberta",
    short: "Descoberta",
    tagline: "Ser visto antes de ser procurado.",
    need: "Ainda não busca um serviço, mas reconhece o problema quando ele aparece num vídeo, num post ou numa conversa.",
    levers: "Meta Ads, conteúdo no Instagram e campanhas de alcance e vídeo.",
    metric: "Alcance no público certo e retenção dos vídeos: estamos chegando em quem pode precisar?",
    sources: ["meta"],
  },
  {
    id: "consideracao",
    name: "Consideração",
    short: "Consideração",
    tagline: "Transformar atenção em confiança.",
    need: "Comparar opções e entender se a empresa resolve o caso dela e se dá para confiar.",
    levers: "Instagram, páginas do site, conteúdo que explica, avaliações e indicação de quem já foi atendido.",
    metric: "Visitas ao perfil e ao site, salvamentos e retorno de quem já conhecia a empresa.",
    sources: ["meta", "organico", "indicacao"],
  },
  {
    id: "intencao",
    name: "Intenção",
    short: "Intenção",
    tagline: "Ser encontrado quando surge a necessidade.",
    need: "Já sabe o que precisa e pesquisa agora, muitas vezes com urgência, comparando quem aparece primeiro.",
    levers: "Google Pesquisa, páginas feitas para cada demanda e o Perfil da Empresa no Google.",
    metric: "Termos de pesquisa reais, parcela de impressões e custo por contato que vem da busca.",
    sources: ["google", "organico"],
    specialty: "Nossa especialidade: campanhas de pesquisa no Google Ads.",
  },
  {
    id: "conversao",
    name: "Conversão",
    short: "Conversão",
    tagline: "Transformar interesse em contato qualificado.",
    need: "Um caminho simples para falar com alguém, sabendo o que acontece depois do clique.",
    levers: "Landing pages, formulários, WhatsApp com mensagem pronta e o primeiro atendimento.",
    metric: "Taxa de conversão da página e custo por contato qualificado, não só por lead.",
    sources: ["google", "indicacao"],
  },
  {
    id: "resultado",
    name: "Resultado comercial",
    short: "Resultado",
    tagline: "Acompanhar o que vira oportunidade, proposta e contrato.",
    need: "Resposta rápida, proposta clara e acompanhamento até a decisão.",
    levers: "CRM, rotina de follow-up e o retorno do seu time sobre cada contato recebido.",
    metric: "Contatos qualificados, propostas enviadas e contratos fechados, separados por origem.",
    sources: [],
    clientRole: "Aqui o seu time participa: sem saber o que virou contrato, a otimização fica no escuro.",
  },
];

export const SOURCES: { id: SourceId; lines: [string, string?]; label: string }[] = [
  { id: "meta", lines: ["Meta Ads", "e conteúdo"], label: "Meta Ads e conteúdo" },
  { id: "organico", lines: ["Busca orgânica", "e presença"], label: "Busca orgânica e presença digital" },
  { id: "google", lines: ["Google", "Pesquisa"], label: "Google Pesquisa" },
  { id: "indicacao", lines: ["Indicação"], label: "Indicação e recomendação" },
];

/** How growth is worked: a loop, not a straight line. */
export const CYCLE = ["Pesquisa", "Hipótese", "Execução", "Mensuração", "Aprendizado", "Otimização"];
