import type { ArticleCtaCopy } from "@/components/blog/article-cta";
import {
  A,
  Callout,
  Checklist,
  CompareColumns,
  FlowRow,
  H2,
  List,
  P,
  PullQuote,
  StepChain,
  Strong,
  TagGrid,
  Versus,
} from "@/components/blog/prose";

/*
 * Editorial rules for this post: no statistics, benchmarks, ideal number of
 * follow-ups, response times, conversion rates, Shark results or cases.
 * Statements about how CRMs work come only from the official pages in
 * `sources`. The post does not say that the Shark implements CRM or
 * automation. Everything else is process analysis and is written as such.
 */

const DYNAMICS_LEADS_URL =
  "https://learn.microsoft.com/en-us/dynamics365/sales/lead-management-overview";
const PIPEDRIVE_STAGES_URL =
  "https://support.pipedrive.com/en/article/how-can-i-customize-my-pipeline-stages";
const PIPEDRIVE_ACTIVITIES_URL = "https://support.pipedrive.com/en/article/activities";
const PIPEDRIVE_LOST_REASONS_URL = "https://support.pipedrive.com/en/article/lost-reasons";

export const toc = [
  { id: "primeiro-contato", label: "Nem todo lead compra no primeiro contato" },
  { id: "nao-e-cobranca", label: "Follow-up não é cobrança" },
  { id: "quem-fala", label: "Quem precisa falar de novo?" },
  { id: "proxima-acao", label: "Oportunidade sem próxima ação" },
  { id: "nao-respondeu", label: "“Não respondeu” não é etapa" },
  { id: "crm", label: "CRM não é só agenda de contatos" },
  { id: "diagnostico-errado", label: "O diagnóstico errado do marketing" },
  { id: "funil-completo", label: "O funil não termina no lead" },
  { id: "lead-desperdicado", label: "Lead caro × lead desperdiçado" },
  { id: "marketing-e-comercial", label: "Marketing e comercial juntos" },
  { id: "motivo", label: "Todo follow-up tem um motivo" },
  { id: "automacao", label: "Automação e contexto" },
  { id: "processo-simples", label: "Um processo simples" },
  { id: "auditoria", label: "Auditoria da operação" },
  { id: "shark", label: "Lead não é o fim da entrega" },
];

export const sources = [
  {
    label: "Microsoft Learn: Lead management overview (Dynamics 365 Sales)",
    href: DYNAMICS_LEADS_URL,
  },
  {
    label: "Pipedrive Knowledge Base: How can I customize my pipeline stages?",
    href: PIPEDRIVE_STAGES_URL,
  },
  {
    label: "Pipedrive Knowledge Base: Activities",
    href: PIPEDRIVE_ACTIVITIES_URL,
  },
  {
    label: "Pipedrive Knowledge Base: Lost reasons",
    href: PIPEDRIVE_LOST_REASONS_URL,
  },
];

export const cta: ArticleCtaCopy = {
  title: "Seus leads realmente são ruins ou ninguém está acompanhando?",
  text: "Antes de aumentar o investimento em mídia, entenda o que acontece entre o primeiro contato e a venda. Talvez sua empresa não precise apenas de mais leads. Talvez precise perder menos dos que já chegam.",
  buttonLabel: "Falar com a Shark",
  whatsappText:
    "Olá, Shark! Li o artigo sobre follow-up de leads e quero entender o que acontece entre o primeiro contato e a venda na minha empresa.",
};

/** One opportunity as it would look in a pipeline, with the next action filled in. */
function OpportunityRecord() {
  const fields: Array<[string, string, boolean?]> = [
    ["Lead", "Empresa X"],
    ["Etapa", "Proposta enviada"],
    ["Último contato", "Segunda-feira"],
    ["Próxima ação", "Retorno sobre a proposta", true],
    ["Data", "Quinta-feira", true],
    ["Responsável", "Vendedor X", true],
  ];
  return (
    <figure className="mt-8 rounded-2xl border border-line bg-card p-5 md:p-6">
      <figcaption className="inline-flex items-center gap-2.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted">
        <span aria-hidden className="size-1.5 rounded-full bg-accent" />
        Exemplo de oportunidade registrada
      </figcaption>
      <dl className="mt-4 divide-y divide-line">
        {fields.map(([term, value, lit]) => (
          <div key={term} className="grid grid-cols-[minmax(0,8.5rem)_1fr] gap-4 py-2.5 sm:grid-cols-[10rem_1fr]">
            <dt className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted">{term}</dt>
            <dd className={lit ? "font-medium text-accent" : "text-fg/90"}>{value}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}

export default function Article() {
  return (
    <>
      <P>Sua empresa investe em anúncios.</P>
      <P className="mt-2">
        O potencial cliente vê a campanha. Clica. Manda uma mensagem. Alguém responde. O cliente
        diz: “Vou pensar.”
      </P>
      <P className="mt-2">E a conversa termina ali.</P>
      <P>Três dias passam. Depois uma semana. Ninguém retoma o contato.</P>
      <PullQuote>
        <p>No relatório de marketing, aquele lead existe.</p>
        <p>No comercial, ele praticamente deixou de existir.</p>
      </PullQuote>
      <P>
        Esse é um dos vazamentos mais silenciosos de uma operação de aquisição: a empresa consegue
        gerar interesse, mas não possui processo para continuar a conversa.
      </P>
      <P>
        Muitas empresas não têm, necessariamente, um problema de geração de demanda. Têm um
        problema de continuidade comercial. E isso começa por uma mudança simples de leitura:{" "}
        <Strong>
          o lead não é o resultado final. Ele é a entrada de uma oportunidade no processo
          comercial.
        </Strong>
      </P>

      <H2 id="primeiro-contato">Nem todo lead está pronto para comprar no primeiro contato</H2>
      <P>
        Quem pede um orçamento demonstrou interesse, não decisão. Entre uma coisa e outra, essa
        pessoa pode precisar:
      </P>
      <TagGrid
        label="Motivos para um lead não fechar no primeiro contato"
        items={[
          "Comparar fornecedores",
          "Conversar com o sócio",
          "Organizar o orçamento",
          "Esperar uma data",
          "Tirar dúvidas",
          "Entender melhor a proposta",
          "Avaliar a prioridade",
          "Ganhar confiança",
        ]}
      />
      <StepChain
        label="Do interesse à decisão"
        steps={[
          { title: "Interesse", text: "A pessoa entra em contato e quer saber mais." },
          { title: "Avaliação", text: "Compara, consulta quem decide junto, organiza o caixa." },
          { title: "Decisão", text: "Fecha, adia ou escolhe outro caminho." },
        ]}
      />
      <P>
        Existe um espaço entre “tenho interesse” e “estou pronto para comprar”.{" "}
        <Strong>É nesse espaço que o follow-up existe.</Strong> Quando ninguém ocupa esse espaço,
        a decisão continua acontecendo, só que sem a sua empresa na conversa.
      </P>

      <H2 id="nao-e-cobranca">Follow-up não é mandar “e aí, decidiu?”</H2>
      <P>
        Quando se fala em follow-up de vendas, muita gente imagina insistência. E, na prática, boa
        parte dos retornos é assim mesmo:
      </P>
      <Versus
        label="Follow-up sem contexto e follow-up com contexto"
        joiner="versus"
        highlight="second"
        sides={[
          {
            label: "Sem contexto",
            title: "Mensagens que só cobram",
            items: ["“Oi, conseguiu analisar?”", "“Alguma novidade?”", "“Vamos fechar?”"],
          },
          {
            label: "Com contexto",
            title: "Mensagens que fazem a conversa andar",
            items: [
              "Resolver uma dúvida que ficou aberta",
              "Retomar um ponto da proposta",
              "Enviar uma informação útil para a decisão",
              "Confirmar o próximo passo combinado",
              "Verificar se a prioridade mudou",
              "Entender se ainda existe interesse",
            ],
          },
        ]}
      />
      <P>
        A diferença não está na frequência, mas no motivo. O primeiro tipo pede uma resposta. O
        segundo oferece algo que ajuda o cliente a decidir.
      </P>
      <PullQuote>
        <p>Follow-up não é cobrança.</p>
        <p>É continuidade comercial.</p>
      </PullQuote>

      <H2 id="quem-fala">O problema começa quando ninguém sabe quem deveria falar novamente</H2>
      <P>Imagine 30 leads entrando em uma semana. Alguns:</P>
      <List>
        <li>pedem orçamento;</li>
        <li>param de responder;</li>
        <li>dizem que vão pensar;</li>
        <li>pedem para chamar depois;</li>
        <li>querem conversar só no mês seguinte.</li>
      </List>
      <P>Agora responda, sem abrir o WhatsApp de ninguém:</P>
      <List>
        <li>Quem precisa receber contato amanhã?</li>
        <li>E daqui a três dias?</li>
        <li>E na próxima semana?</li>
      </List>
      <Callout label="Sinal de alerta">
        <p>
          Se a resposta depende da memória do vendedor, existe um problema de processo. Memória
          não escala, não tira férias com tranquilidade e não deixa registro quando alguém sai da
          empresa.
        </p>
      </Callout>
      <P>
        Esse é o mesmo padrão que aparece em outros segmentos: na{" "}
        <A href="/blog/leads-clinica-nao-agendam">clínica que recebe leads que não agendam</A> e
        no <A href="/blog/escritorio-contatos-poucos-contratos">escritório que recebe contatos e fecha poucos
        contratos</A>, boa parte da perda acontece depois do primeiro contato, e não no anúncio.
      </P>

      <H2 id="proxima-acao">Uma oportunidade sem próxima ação está parada</H2>
      <P>
        Um pipeline comercial organiza as oportunidades em etapas. Na{" "}
        <A href={PIPEDRIVE_STAGES_URL} external>
          documentação do Pipedrive
        </A>
        , cada etapa representa um passo que o negócio percorre antes de ser ganho ou perdido, e a
        recomendação é usar nomes claros e ligados a ações reais, como “Proposta enviada”, em vez
        de rótulos vagos como “Em andamento”. Os nomes mudam de empresa para empresa. Um desenho
        possível:
      </P>
      <FlowRow
        label="Exemplo de etapas de um pipeline comercial"
        steps={[
          "Lead",
          "Qualificação",
          "Reunião",
          "Proposta",
          "Follow-up",
          "Negociação",
          "Ganho / perdido",
        ]}
      />
      <P>
        Mas a etapa, sozinha, só diz onde a oportunidade está. A camada mais importante é outra:{" "}
        <Strong>a próxima ação.</Strong> O que vai acontecer, quando e por quem. Não por acaso, o
        Pipedrive trata{" "}
        <A href={PIPEDRIVE_ACTIVITIES_URL} external>
          atividades
        </A>{" "}
        (ligações, reuniões, tarefas, e-mails) como as ações que fazem o negócio avançar, cada uma
        com um responsável, e mostra a data da próxima atividade ainda não concluída.
      </P>
      <OpportunityRecord />
      <P>
        Com esse registro, qualquer pessoa do time sabe o que fazer na quinta-feira. Sem ele, a
        oportunidade fica “em proposta” por tempo indeterminado.
      </P>
      <PullQuote>
        <p>Sem próxima ação, existe histórico.</p>
        <p>Com próxima ação, existe processo.</p>
      </PullQuote>

      <H2 id="nao-respondeu">“Não respondeu” não deveria ser uma etapa permanente</H2>
      <P>
        Em muitas operações existe uma coluna, uma etiqueta ou uma lista informal chamada “não
        respondeu”. Ela começa pequena e vira um limbo comercial: oportunidades que não estão
        ativas, não foram perdidas e não estão sendo trabalhadas. Ninguém sabe se vale insistir,
        e ninguém decide encerrar.
      </P>
      <P>Para sair do limbo, a empresa precisa definir:</P>
      <Checklist
        label="Critérios para tratar leads que não responderam"
        items={[
          { q: "Quantas tentativas fazer" },
          { q: "Por quais canais", look: "WhatsApp, ligação, e-mail ou a combinação que faz sentido para o seu cliente." },
          { q: "Com qual intervalo entre elas" },
          { q: "Quando continuar" },
          { q: "Quando pausar" },
          { q: "Quando encerrar como perdido" },
          { q: "Quando mover para nutrição", look: "Contatos que não são para agora, mas podem voltar a fazer sentido." },
        ]}
      />
      <Callout label="Não existe número mágico" tone="neutral">
        <p>
          Não há uma quantidade universal de tentativas que sirva para toda empresa. Um ciclo de
          venda de dias pede critérios diferentes de um ciclo de meses. O importante é que os
          critérios existam, sejam conhecidos pelo time e sejam revisados com base no que a
          própria operação registra.
        </p>
        <p>
          Algumas ferramentas ajudam a enxergar o limbo. O Pipedrive, por exemplo, permite destacar
          negócios que ficam tempo demais na mesma etapa, com o prazo definido pela própria
          empresa.
        </p>
      </Callout>

      <H2 id="crm">CRM não serve apenas para guardar contatos</H2>
      <P>
        Muitas empresas têm CRM, ou algo parecido com um: uma planilha, um quadro, as etiquetas do
        WhatsApp Business. O problema não é a ferramenta. É o uso.
      </P>
      <Versus
        label="CRM como agenda e CRM como sistema de gestão"
        joiner="versus"
        highlight="second"
        sides={[
          {
            label: "CRM como agenda",
            title: "Guarda quem entrou",
            items: ["Nome e telefone", "Algumas anotações soltas", "Atualizado quando alguém lembra"],
          },
          {
            label: "CRM como sistema de gestão",
            title: "Organiza o que precisa acontecer",
            items: [
              "Cada oportunidade tem dono, etapa e próxima ação",
              "Histórico de contatos registrado",
              "Ganhos e perdas com motivo",
            ],
          },
        ]}
      />
      <P>
        A própria documentação do{" "}
        <A href={DYNAMICS_LEADS_URL} external>
          Microsoft Dynamics 365 Sales sobre gestão de leads
        </A>{" "}
        descreve a gestão de leads como capturar, acompanhar e nutrir potenciais clientes desde o
        interesse inicial até a conversão, e a qualificação como o passo que transforma o lead em
        oportunidade. Ou seja, um processo, e não um contato parado numa lista. Na prática, um CRM
        bem usado deveria responder:
      </P>
      <TagGrid
        label="Perguntas que o CRM deveria responder"
        items={[
          "Quem entrou",
          "De onde veio",
          "Quem é o responsável",
          "Em que etapa está",
          "Último contato",
          "Próxima ação",
          "Data da próxima ação",
          "Resultado",
          "Motivo de perda",
        ]}
      />
      <P>
        O último item costuma ser esquecido. O Pipedrive, por exemplo, pede um{" "}
        <A href={PIPEDRIVE_LOST_REASONS_URL} external>
          motivo de perda
        </A>{" "}
        quando um negócio é marcado como perdido, justamente para que a empresa entenda padrões ao
        olhar o histórico.
      </P>
      <PullQuote>
        <p>O CRM não deveria registrar apenas o que aconteceu.</p>
        <p>Deveria organizar o que precisa acontecer depois.</p>
      </PullQuote>
      <P>
        Esse histórico também é um ativo da empresa. Assim como as{" "}
        <A href="/blog/controle-contas-dados-marketing">contas e os dados de marketing</A>, ele
        precisa ficar sob controle da empresa, e não na cabeça ou no celular de uma pessoa.
      </P>

      <H2 id="diagnostico-errado">Marketing sem follow-up pode produzir um diagnóstico errado</H2>
      <P>
        Imagine o cenário: 100 leads gerados no mês. Poucas vendas. A conclusão aparece rápido:
      </P>
      <PullQuote>“Os leads são ruins.”</PullQuote>
      <P>
        Pode ser verdade. Mas, antes de concluir, algumas perguntas precisam ter resposta:
      </P>
      <List>
        <li>Quantos foram respondidos?</li>
        <li>Quanto tempo a primeira resposta demorou?</li>
        <li>Quantos tiveram só uma tentativa de contato?</li>
        <li>Quantos chegaram à proposta?</li>
        <li>Quantas propostas receberam follow-up?</li>
        <li>Quantos sumiram sem próxima ação?</li>
        <li>Quantos foram classificados como perdidos?</li>
        <li>Qual foi o motivo de cada perda?</li>
      </List>
      <Callout label="O risco">
        <p>
          Sem essas respostas, a empresa pode atribuir ao marketing um problema que acontece depois
          do lead. E aí troca campanha, troca público, troca agência, e o vazamento continua no
          mesmo lugar.
        </p>
      </Callout>

      <H2 id="funil-completo">O funil não termina na geração do lead</H2>
      <CompareColumns
        label="Funil que termina no lead e operação de aquisição completa"
        columns={[
          {
            eyebrow: "Modelo fraco",
            title: "O lead como linha de chegada",
            steps: ["Anúncio", "Lead", "Fim"],
            tone: "neutral",
          },
          {
            eyebrow: "Operação de aquisição",
            title: "O lead como ponto de partida",
            steps: [
              "Anúncio",
              "Lead",
              "Atendimento",
              "Qualificação",
              "Follow-up",
              "Proposta",
              "Negociação",
              "Venda",
              "Análise",
            ],
            tone: "accent",
          },
        ]}
      />
      <P>
        No primeiro modelo, o trabalho acaba quando o contato chega. No segundo, é ali que boa
        parte do trabalho começa, e a análise no fim alimenta de volta as decisões de mídia.
      </P>
      <PullQuote>O lead é entrada, não resultado final.</PullQuote>

      <H2 id="lead-desperdicado">Um lead caro pode ser menos preocupante que um lead desperdiçado</H2>
      <P>
        Empresas que investem em tráfego pago costumam acompanhar de perto as métricas de mídia. E
        devem: custo por lead alto é um problema real e precisa ser trabalhado.
      </P>
      <Versus
        label="O que costuma ser acompanhado e o que pode ficar invisível"
        joiner="e"
        highlight="second"
        sides={[
          {
            label: "Costuma ser acompanhado",
            title: "Métricas de mídia",
            items: ["CPC (custo por clique)", "CPL (custo por lead)", "CPM (custo por mil impressões)", "CTR (taxa de cliques)"],
          },
          {
            label: "Pode ficar invisível",
            title: "Leads que…",
            items: [
              "chegaram",
              "demonstraram interesse",
              "conversaram",
              "pediram proposta",
              "nunca receberam retorno",
            ],
          },
        ]}
      />
      <P>
        Um lead caro que vira conversa, proposta e decisão foi um investimento. Um lead barato que
        ninguém acompanhou foi só custo.{" "}
        <Strong>
          As métricas de mídia continuam importantes, mas precisam ser lidas junto com o que
          acontece no comercial.
        </Strong>
      </P>

      <H2 id="marketing-e-comercial">O marketing precisa saber o que acontece depois</H2>
      <P>
        Para que marketing e comercial conversem sobre fatos, os dois precisam enxergar a mesma
        jornada, do primeiro contato ao motivo de perda:
      </P>
      <StepChain
        label="Jornada compartilhada entre marketing e comercial"
        steps={[
          { title: "Leads gerados" },
          { title: "Leads contatados" },
          { title: "Leads qualificados" },
          { title: "Reuniões" },
          { title: "Propostas" },
          { title: "Follow-ups" },
          { title: "Negociações" },
          { title: "Vendas" },
          { title: "Motivos de perda" },
        ]}
      />
      <P>
        Quando esses números existem, fica possível ver onde a jornada estreita. Se muitos leads
        não chegam a ser contatados, o gargalo é de atendimento. Se muitos recebem proposta e
        somem, o gargalo pode estar no acompanhamento. Se poucos se qualificam, aí sim a
        conversa volta para segmentação, oferta e mensagem.
      </P>
      <Callout label="Diagnóstico insuficiente" tone="neutral">
        <p>
          A agência dizer “geramos leads” e o comercial dizer “não vendemos” não é diagnóstico
          suficiente. As duas frases podem ser verdadeiras ao mesmo tempo.
        </p>
      </Callout>

      <H2 id="motivo">Um bom follow-up sempre deveria responder uma pergunta</H2>
      <PullQuote>Por que estou entrando em contato novamente?</PullQuote>
      <P>Respostas que justificam um novo contato:</P>
      <TagGrid
        label="Motivos legítimos para um follow-up"
        items={[
          "Uma nova informação",
          "Uma dúvida pendente",
          "Um compromisso anterior",
          "Um conteúdo útil",
          "Uma condição atualizada",
          "O próximo passo",
          "O contexto comercial",
        ]}
      />
      <P>
        Se o único motivo for “porque ele ainda não comprou”, a mensagem provavelmente será
        percebida como cobrança, e o cliente vai responder (ou deixar de responder) como quem
        está sendo cobrado.
      </P>

      <H2 id="automacao">Automação pode ajudar. Mas não substitui contexto</H2>
      <P>Ferramentas de automação podem criar:</P>
      <TagGrid
        label="O que a automação comercial pode organizar"
        items={["Tarefas", "Lembretes", "Sequências", "Alertas", "Priorização", "Histórico"]}
      />
      <P>
        Isso resolve um problema real: ninguém esquece de retomar um contato porque o sistema
        lembrou. Mas a automação repete o que foi definido. Ela não transforma uma mensagem ruim em
        uma boa, nem decide sozinha qual é o melhor motivo para falar com aquele cliente naquele
        momento. Automatizar um processo confuso só faz a confusão acontecer mais rápido.
      </P>
      <PullQuote>
        <p>Automação resolve repetição.</p>
        <p>Estratégia resolve contexto.</p>
      </PullQuote>

      <H2 id="processo-simples">Um processo simples já muda muita coisa</H2>
      <P>
        Não é preciso começar com uma ferramenta sofisticada. Seis regras, aplicadas com
        disciplina, já tiram a operação da memória e colocam no processo:
      </P>
      <StepChain
        label="Seis regras de um processo simples de follow-up"
        steps={[
          { title: "Responsável", text: "Todo lead precisa ter um dono." },
          { title: "Etapa", text: "Todo lead precisa estar em uma etapa." },
          { title: "Último contato", text: "A interação anterior fica registrada." },
          { title: "Próxima ação", text: "Está definido o que acontece depois." },
          { title: "Data", text: "A próxima ação tem dia marcado." },
          {
            title: "Encerramento",
            text: "Existem critérios claros de ganho, perda ou nutrição para o futuro.",
          },
        ]}
      />

      <H2 id="auditoria">Faça esta auditoria na sua operação</H2>
      <P>Responda com sim ou não, olhando para os leads do último mês:</P>
      <Checklist
        label="Auditoria de follow-up e gestão de oportunidades"
        items={[
          { q: "Todos os leads receberam contato?" },
          { q: "Existe responsável por cada oportunidade?" },
          { q: "Sabemos quando aconteceu o último contato?" },
          { q: "Todas as propostas receberam acompanhamento?" },
          { q: "Existe próxima ação registrada?" },
          { q: "Existe data para a próxima ação?" },
          { q: "Leads que sumiram receberam novas tentativas?" },
          { q: "Sabemos por que cada oportunidade foi perdida?" },
          { q: "O marketing recebe esses dados?" },
          { q: "O pipeline reflete a realidade?" },
        ]}
      />
      <P>
        <Strong>
          Se várias respostas forem “não”, talvez sua operação não esteja sofrendo apenas com
          geração de leads. Pode estar sofrendo com a gestão das oportunidades que já possui.
        </Strong>
      </P>

      <H2 id="shark">Na Shark, lead não deveria ser o fim da entrega</H2>
      <P>
        Na Shark Digital, acreditamos que uma operação de aquisição não deveria ser analisada
        apenas até o formulário ou o WhatsApp. Porque um lead sozinho não gera receita. O que gera
        receita é o que vem depois:
      </P>
      <FlowRow
        label="O que transforma um lead em receita"
        joiner="+"
        steps={[
          "Atendimento",
          "Processo",
          "Qualificação",
          "Follow-up",
          "Proposta",
          "Negociação",
          "Fechamento",
        ]}
      />
      <P>
        Por isso, quando uma empresa diz “os leads não estão convertendo”, a pergunta não deveria
        ser, de imediato, “qual campanha precisamos trocar?”. Antes, vale investigar:
      </P>
      <List>
        <li>onde os leads estão parando;</li>
        <li>quantos foram atendidos;</li>
        <li>quantos avançaram;</li>
        <li>quantos receberam proposta;</li>
        <li>quantos receberam follow-up;</li>
        <li>quantos sumiram sem próxima ação.</li>
      </List>
      <P>
        É por isso que o <A href="/#metodo">método de trabalho da Shark</A> olha para a venda, e
        não só para a atração.
      </P>
      <PullQuote>
        <p>
          Gerar mais oportunidades para uma operação que não acompanha as atuais não corrige o
          gargalo.
        </p>
        <p>Só aumenta o volume passando por ele.</p>
      </PullQuote>
    </>
  );
}
