import type { ArticleCtaCopy } from "@/components/blog/article-cta";
import {
  A,
  Callout,
  Checklist,
  DiagnosisTable,
  FlowRow,
  Formula,
  H2,
  H3,
  List,
  P,
  QuestionGrid,
  StepChain,
  Strong,
} from "@/components/blog/prose";

/*
 * Editorial rules for this post: no market benchmarks, conversion rates, CPL
 * or CAC figures (none found with a reliable primary source; the ones on
 * agency blogs are unsourced or self-reported cases), no Shark results or
 * cases. Statements about advertising rules come only from Provimento
 * 205/2021 of the Conselho Federal da OAB and cite the article or the Anexo
 * Único item. Everything else is marked as operational recommendation.
 */

const PROVIMENTO_URL = "https://www.oab.org.br/leisnormas/legislacao/provimentos/205-2021";

export const toc = [
  { id: "lead-ruim", label: "Lead ruim ou processo ruim?" },
  { id: "caminho", label: "O caminho entre o anúncio e o contrato" },
  { id: "sete-pontos", label: "7 pontos onde as oportunidades se perdem" },
  { id: "antes-de-culpar", label: "Antes de culpar o tráfego" },
  { id: "cpl", label: "Por que só o CPL pode enganar" },
  { id: "dados", label: "Marketing e atendimento compartilhando dados" },
  { id: "diagnostico", label: "Como diagnosticar o funil" },
  { id: "oab", label: "Marketing jurídico e regras da OAB" },
  { id: "faq", label: "Perguntas frequentes" },
  { id: "conclusao", label: "Antes de investir mais, entenda melhor" },
];

export const sources = [
  {
    label: "Conselho Federal da OAB: Provimento nº 205/2021, publicidade e informação da advocacia (texto oficial)",
    href: PROVIMENTO_URL,
  },
  {
    label: "Google Ads Ajuda: perguntas frequentes sobre importação de conversões offline",
    href: "https://support.google.com/google-ads/answer/10029210?hl=pt",
  },
  {
    label: "Meta for Developers: Conversions API",
    href: "https://developers.facebook.com/docs/marketing-api/conversions-api",
  },
];

export const cta: ArticleCtaCopy = {
  title:
    "Seu escritório já investe em marketing, mas ainda não sabe onde as oportunidades estão sendo perdidas?",
  text: "A Shark analisa aquisição, comunicação, mídia e jornada do contato para identificar os gargalos antes de recomendar mais investimento.",
  whatsappText:
    "Olá, Shark! Li o artigo sobre leads de advocacia que não viram contrato e quero entender onde meu escritório está perdendo oportunidades.",
};

const JOURNEY = [
  "Anúncio",
  "Intenção",
  "Página",
  "Contato",
  "Qualificação",
  "Atendimento",
  "Oportunidade",
  "Contrato",
];

export default function Article() {
  return (
    <>
      <p className="text-pretty text-[1.2rem] leading-[1.65] text-fg md:text-[1.3rem]">
        O escritório investe em marketing. Os contatos chegam, o WhatsApp recebe mensagens, o
        formulário é preenchido. Mas poucos viram consulta, menos ainda viram contrato. Logo surge
        a conclusão: <Strong>“os leads são ruins”</Strong>. Pode ser. Mas, sem dados, essa frase
        é uma hipótese, não um diagnóstico.
      </p>
      <P>
        Entre o anúncio e o contrato há várias etapas, e qualquer uma delas pode estar perdendo
        oportunidades: a campanha, a mensagem, a página, o primeiro atendimento, a qualificação ou o
        acompanhamento. Antes de trocar de campanha, de agência ou aumentar o investimento, vale
        descobrir <Strong>em qual etapa a jornada está quebrando</Strong>. É isso que este guia
        ajuda a fazer.
      </P>
      <Callout label="Como ler este artigo" tone="neutral">
        <p>
          O texto separa três tipos de conteúdo. <Strong>Análise de marketing</Strong>: como a Shark
          enxerga o funil de aquisição. <Strong>Norma oficial</Strong>: o que diz o Provimento
          205/2021 do Conselho Federal da OAB, sempre com o artigo citado.{" "}
          <Strong>Recomendação operacional</Strong>: práticas de organização que cada escritório
          deve adaptar. Não há aqui taxas de conversão nem “custo por lead ideal”: não encontramos
          fonte primária confiável para esses números.
        </p>
      </Callout>

      <H2 id="lead-ruim">Lead ruim ou processo ruim?</H2>
      <P>
        “Lead desqualificado” só significa alguma coisa quando o escritório definiu, por escrito, o
        que é um lead qualificado. Sem esse critério, “lead ruim” vira percepção, geralmente formada
        pelas últimas conversas difíceis, e cada pessoa da equipe conta uma coisa diferente.
      </P>
      <P>
        Não existe um critério universal. Cada escritório define o seu, a partir das áreas em que
        atua e do tipo de caso que aceita. Alguns exemplos do que costuma entrar nessa definição:
      </P>
      <List>
        <li>
          <Strong>Área jurídica:</Strong> a demanda é de uma área que o escritório atende?
        </li>
        <li>
          <Strong>Tipo de demanda:</Strong> é o tipo de caso que o escritório aceita (por exemplo,
          consultivo ou contencioso, pessoa física ou empresa)?
        </li>
        <li>
          <Strong>Localização:</Strong> a pessoa está numa região ou jurisdição em que o escritório
          consegue atuar?
        </li>
        <li>
          <Strong>Aderência ao serviço:</Strong> o que ela procura corresponde ao que o escritório
          oferece?
        </li>
        <li>
          <Strong>Momento da necessidade:</Strong> há uma situação concreta agora, ou é uma dúvida
          genérica?
        </li>
        <li>
          <Strong>Outros critérios do próprio escritório:</Strong> prazos, documentação mínima,
          conflito de interesses, capacidade da equipe.
        </li>
      </List>
      <P>
        Com o critério escrito, cada contato pode ser classificado no momento do atendimento. A
        pergunta deixa de ser “os leads são ruins?” e passa a ser “que parte dos contatos não atende
        aos critérios, e de qual campanha ela vem?”. Essa segunda pergunta tem resposta.
      </P>

      <H2 id="caminho">O caminho entre o anúncio e o contrato</H2>
      <P>
        Relatórios de mídia costumam terminar no lead. O escritório costuma olhar só o contrato
        assinado. Entre os dois há um caminho inteiro que quase ninguém acompanha de ponta a ponta:
      </P>
      <FlowRow steps={JOURNEY} label="Caminho de um contato do anúncio até o contrato" />
      <StepChain
        label="O que pode falhar em cada etapa"
        steps={[
          { title: "Anúncio", text: "Em que termo de pesquisa ou para qual público ele apareceu." },
          { title: "Intenção", text: "O que a pessoa estava procurando quando viu o anúncio." },
          { title: "Página", text: "Se a página explica para quem o escritório atua e o que acontece no contato." },
          { title: "Contato", text: "Formulário, WhatsApp ou ligação: se chegou e se ficou registrado." },
          { title: "Qualificação", text: "Se o contato atende aos critérios definidos pelo escritório." },
          { title: "Atendimento", text: "Quanto tempo levou, quem atendeu e qual próximo passo foi proposto." },
          { title: "Oportunidade", text: "Consulta realizada ou proposta de honorários apresentada." },
          { title: "Contrato", text: "Contrato assinado, ou motivo registrado de não ter fechado." },
        ]}
      />
      <P>
        Cada etapa pode perder eficiência sozinha. Uma campanha bem segmentada pode levar a uma
        página confusa. Uma página clara pode gerar contatos que esperam um dia por resposta. Um
        atendimento rápido pode terminar sem nenhum próximo passo. Olhar só a ponta (custo por lead)
        ou só o final (contratos do mês) esconde onde a perda realmente acontece.
      </P>

      <H2 id="sete-pontos">7 pontos onde seu escritório pode estar perdendo oportunidades</H2>
      <P>
        Os pontos abaixo são hipóteses de investigação, não veredictos. É comum haver mais de um
        gargalo ao mesmo tempo; o trabalho é descobrir qual pesa mais.
      </P>

      <H3>1. Campanha atraindo a intenção errada</H3>
      <P>
        No tráfego pago para advogados, o mesmo assunto pode atrair intenções muito diferentes.
        Quem pesquisa o nome de um direito para entender o que é está num momento diferente de quem
        procura um advogado para um problema que já aconteceu. Termos de pesquisa amplos demais,
        públicos genéricos nas redes sociais ou uma região mal configurada trazem contatos que nunca
        teriam aderência, por melhor que seja o atendimento.
      </P>
      <P>
        <Strong>Onde olhar:</Strong> o relatório de termos de pesquisa do Google Ads, a região de
        origem dos contatos e a proporção de contatos fora dos critérios, separada por campanha.
      </P>

      <H3>2. Comunicação genérica</H3>
      <P>
        Um anúncio que poderia ser de qualquer escritório atrai qualquer pessoa. Quando a mensagem
        não diz para quem o escritório atua, em que área e em que tipo de situação, quem chega
        precisa descobrir isso na conversa, e o atendimento vira triagem. A comunicação clara
        funciona como um primeiro filtro: ajuda quem tem aderência a se reconhecer e quem não tem a
        seguir adiante.
      </P>
      <P>
        Clareza aqui não significa linguagem persuasiva. Como mostra a seção sobre a OAB, a
        publicidade da advocacia tem limites próprios. Ser específico sobre áreas de atuação e sobre
        como funciona o atendimento é compatível com caráter informativo.
      </P>

      <H3>3. Landing page sem contexto ou qualificação</H3>
      <P>
        A página de destino é onde a intenção vira contato. Se ela é só um botão de WhatsApp, sem
        explicar a área de atuação, a região atendida ou o que acontece depois do contato, ela gera
        volume, mas não gera contexto. Um formulário curto, com uma ou duas perguntas sobre o tipo de
        demanda, já permite que o atendimento comece sabendo do que se trata.
      </P>
      <P>
        Há um equilíbrio a buscar: cada pergunta a mais filtra melhor, mas também pode reduzir o
        número de contatos. Esse equilíbrio se ajusta com dados do próprio escritório, não com
        regra pronta.
      </P>

      <H3>4. Critério de lead qualificado inexistente</H3>
      <P>
        É o ponto que sustenta todos os outros. Sem critério escrito, marketing e atendimento
        discutem impressões. Com critério, o marketing pode ser cobrado pela proporção de contatos
        qualificados que gera, e o atendimento pela proporção de qualificados que avança.
      </P>
      <Callout label="Exercício rápido">
        <p>
          Peça para duas pessoas do escritório classificarem, separadamente, os mesmos 20 contatos
          recentes como “qualificado” ou “não qualificado”. Se as respostas divergem muito, o
          problema começa antes da campanha: falta um critério comum.
        </p>
      </Callout>

      <H3>5. Atendimento desorganizado</H3>
      <P>
        Muitos escritórios recebem os contatos no WhatsApp e atendem entre audiências, prazos e
        reuniões. Sem alguém responsável, sem horário definido e sem registro, a resposta depende de
        quem viu a mensagem primeiro. Alguns sinais comuns:
      </P>
      <List>
        <li>Ninguém sabe quantos contatos do último mês ficaram sem resposta.</li>
        <li>Mais de uma pessoa atende, ou há mais de um número, sem histórico compartilhado.</li>
        <li>O primeiro contato responde a dúvida, mas não propõe um próximo passo (consulta, envio de documentos, reunião).</li>
        <li>Mensagens que chegam fora do horário são respondidas só dias depois.</li>
      </List>
      <P>
        Em vez de perseguir um “tempo ideal de resposta” citado sem fonte, meça o tempo do seu
        escritório: hora de chegada, hora da primeira resposta útil e o que aconteceu com o contato.
        Com algumas semanas de registro, compare o resultado dos contatos respondidos rápido com o
        dos respondidos tarde. Se houver diferença consistente, você tem um argumento concreto para
        mudar o processo.
      </P>

      <H3>6. Falta de acompanhamento das oportunidades</H3>
      <P>
        Contratar um advogado raramente é uma decisão imediata. A pessoa pode precisar conversar com
        a família, reunir documentos ou comparar propostas. Se a oportunidade não tem uma próxima
        ação registrada, com data, ela depende da memória de quem atendeu, e costuma ser esquecida.
      </P>
      <Formula>
        leads sem contrato com próxima ação registrada ÷ total de leads sem contrato
      </Formula>
      <P>
        Esse indicador mostra quanto do funil está sendo de fato acompanhado. O retorno deve ser
        respeitoso, ter limite de tentativas e se dirigir a quem já procurou o escritório.
      </P>

      <H3>7. Marketing sem feedback sobre o que aconteceu com os leads</H3>
      <P>
        Se o marketing só recebe o número de contatos, ele otimiza para gerar mais contatos, não
        mais contratos. É assim que uma campanha com custo por lead baixo pode continuar recebendo
        verba enquanto gera, sobretudo, demandas sem aderência. A próxima seção sobre CPL e a seção
        sobre compartilhamento de dados detalham esse ponto, que é o mais negligenciado.
      </P>

      <QuestionGrid
        id="antes-de-culpar"
        title="Antes de culpar o tráfego, responda estas perguntas"
        questions={[
          "O escritório tem um critério escrito de lead qualificado?",
          "Você sabe de qual campanha veio cada contato do último mês?",
          "Que parte dos contatos estava fora dos critérios, e de onde ela veio?",
          "Quanto tempo leva, em média, entre o contato e a primeira resposta útil?",
          "Cada conversa termina com um próximo passo proposto?",
          "Quantos leads sem contrato têm uma próxima ação registrada?",
          "Os motivos de perda são registrados numa lista fechada?",
          "O marketing recebe de volta quais leads viraram consulta e contrato?",
        ]}
      />
      <P>
        Se várias respostas forem “não sei”, mudar a campanha agora seria decidir sem informação.
        O primeiro trabalho é passar a enxergar o funil.
      </P>

      <H2 id="cpl">Por que olhar apenas para o CPL pode enganar</H2>
      <P>
        O custo por lead (CPL) é a métrica mais visível do marketing para advogados, porque é a que
        as plataformas de anúncio mostram:
      </P>
      <Formula>CPL = investimento em mídia ÷ número de leads</Formula>
      <P>
        O problema é que o CPL mede o custo de gerar um contato, não o custo de gerar um cliente.
        Uma campanha com CPL baixo pode trazer mais contatos fora dos critérios; outra, com CPL mais
        alto, pode trazer menos contatos e mais contratos. Por isso não existe “CPL ideal” fora do
        contexto de cada escritório, e números de mercado sem fonte não ajudam a decidir. O que
        ajuda é acompanhar o funil inteiro:
      </P>
      <StepChain
        label="Funil do investimento até o contrato"
        steps={[
          { title: "Investimento" },
          { title: "Leads" },
          { title: "Leads qualificados" },
          { title: "Consultas" },
          { title: "Oportunidades" },
          { title: "Contratos" },
        ]}
      />
      <P>Com essas etapas contadas, as métricas sobem de nível:</P>
      <Formula>Custo por lead qualificado = investimento ÷ leads qualificados</Formula>
      <Formula>Custo por contrato = investimento atribuível ÷ contratos atribuíveis</Formula>
      <P>
        Quando a conta inclui todos os custos de aquisição (mídia, produção, ferramentas e o tempo
        da equipe), chega-se ao <Strong>CAC</Strong>, o custo de aquisição de cliente. Comparar o
        CAC com o valor dos honorários de cada tipo de caso mostra a qualidade econômica da
        operação, o que o CPL isolado não revela.
      </P>
      <P>
        Dois cuidados. Primeiro, <Strong>atribuível</Strong>: contratos vindos de indicação não
        devem entrar na conta da mídia. Segundo, <Strong>tempo</Strong>: um lead de setembro pode
        virar contrato em novembro. Acompanhe cada grupo de leads até o fim do caminho, em vez de
        comparar leads e contratos do mesmo mês.
      </P>

      <H2 id="dados">Marketing e atendimento precisam compartilhar dados</H2>
      <P>
        Esta é a tese central do artigo. Marketing e atendimento costumam funcionar como áreas
        separadas: um gera contatos, o outro tenta convertê-los, e cada um culpa o outro quando o
        resultado não vem. Na visão da Shark, aquisição só funciona como sistema quando a informação
        volta. Para decidir bem, o marketing precisa saber:
      </P>
      <List>
        <li>quais leads tinham aderência aos critérios do escritório;</li>
        <li>quais avançaram para consulta e proposta;</li>
        <li>quais não avançaram, e por quê;</li>
        <li>quais campanhas originaram oportunidades e contratos;</li>
        <li>quais mensagens atraíram demandas incompatíveis.</li>
      </List>
      <FlowRow
        steps={["Respostas do atendimento", "Análise", "Próxima decisão"]}
        label="Ciclo de feedback entre atendimento e marketing"
      />
      <P>
        Na prática, isso pode começar com uma planilha atualizada a cada atendimento: data, origem
        (campanha), área, se atende aos critérios, etapa alcançada, motivo de perda e próxima ação.
        Um CRM passa a fazer sentido quando o volume ou o tamanho da equipe tornam a planilha
        difícil de manter. Desenhe o processo antes de escolher a ferramenta.
      </P>
      <P>
        Para saber a origem de cada lead, use links com parâmetros de campanha, um campo de origem
        no formulário e mensagens pré-preenchidas diferentes nos botões de WhatsApp de cada canal.
        Com o tempo, essa informação pode voltar para as próprias plataformas: o Google Ads permite
        importar conversões offline para indicar quais leads se qualificaram ou fecharam negócio, e
        a Conversions API da Meta permite enviar eventos do CRM (detalhes nas{" "}
        <A href="#fontes">fontes</A>). Assim, as campanhas passam a ser otimizadas por
        oportunidades, não só por contatos.
      </P>
      <Callout label="Cuidado com dados" tone="neutral">
        <p>
          Contatos de potenciais clientes podem trazer detalhes sensíveis do caso. Registre apenas
          o necessário para o acompanhamento comercial, limite quem tem acesso e observe a LGPD e o
          sigilo profissional.
        </p>
      </Callout>

      <H2 id="diagnostico">Como diagnosticar seu funil de aquisição jurídica</H2>
      <P>
        Use as perguntas abaixo com os contatos dos últimos 30 a 60 dias. Elas seguem a ordem do
        caminho, do anúncio ao contrato.
      </P>
      <Checklist
        label="Checklist de diagnóstico do funil jurídico"
        items={[
          { q: "Quem está chegando?", look: "Área, tipo de demanda e região de cada contato." },
          { q: "O que essa pessoa pesquisou ou viu?", look: "Termo de pesquisa, anúncio ou publicação que gerou o contato." },
          { q: "Qual campanha originou o contato?", look: "Parâmetros de campanha, campo de origem ou mensagem pré-preenchida." },
          { q: "Qual serviço ela procura?", look: "Compare com as áreas que o escritório realmente atende." },
          { q: "O contato atende aos critérios definidos pelo escritório?", look: "Classificação feita no atendimento, com o critério escrito." },
          { q: "Quanto tempo existe entre contato e primeiro atendimento?", look: "Hora de chegada e hora da primeira resposta útil." },
          { q: "Quantos leads avançam?", look: "Proporção que passa de cada etapa para a seguinte." },
          { q: "Onde os leads abandonam?", look: "A etapa com a maior perda proporcional é o primeiro lugar a investigar." },
          { q: "Quais motivos de perda aparecem com frequência?", look: "Lista fechada: fora da área, fora da região, parou de responder, honorários, escolheu outro escritório." },
          { q: "Marketing recebe essas informações?", look: "Com que frequência e em que formato o retorno chega a quem cuida das campanhas." },
        ]}
      />
      <P>Com as etapas contadas, a tabela abaixo ajuda a decidir por onde começar:</P>
      <DiagnosisTable
        caption="Sintoma observado nos números e primeiro lugar a investigar"
        head={["Sintoma", "Onde investigar primeiro"]}
        rows={[
          ["Muitos contatos fora da área ou da região", "Termos de pesquisa, segmentação, região e mensagem do anúncio"],
          ["Contatos na área certa, mas sem contexto", "Página de destino e perguntas do formulário"],
          ["Leads qualificados sem resposta rápida", "Responsável, horários e canais monitorados no atendimento"],
          ["Respondidos que não marcam consulta", "Primeira abordagem e próximo passo proposto"],
          ["Consultas que não viram contrato", "Apresentação da proposta e acompanhamento depois da consulta"],
          ["Contratos existem, mas ninguém sabe de onde vieram", "Registro de origem e retorno de dados ao marketing"],
        ]}
      />
      <P>
        Só a primeira linha começa pela mídia. As outras começam pela página, pelo atendimento ou
        pela mensuração. O mesmo raciocínio vale para outros negócios que dependem de atendimento
        depois do lead; aplicamos a mesma lógica no artigo sobre{" "}
        <A href="/blog/leads-clinica-nao-agendam">clínicas que recebem leads, mas não agendam</A>,
        que traz uma calculadora de etapas.
      </P>

      <H2 id="oab">Marketing jurídico e regras da OAB</H2>
      <P>
        Esta seção resume pontos do texto oficial do{" "}
        <A href={PROVIMENTO_URL} external>
          Provimento nº 205/2021 do Conselho Federal da OAB
        </A>
        , que dispõe sobre a publicidade e a informação da advocacia. É um resumo informativo, não
        uma orientação jurídica.
      </P>
      <List>
        <li>
          <Strong>Marketing jurídico é permitido</Strong>, desde que compatível com os preceitos
          éticos e com os limites do Estatuto da Advocacia, do Regulamento Geral, do Código de
          Ética e Disciplina e do próprio provimento (art. 1º). As informações devem ser objetivas e
          verdadeiras (art. 1º, § 1º).
        </li>
        <li>
          <Strong>Caráter informativo, discrição e sobriedade:</Strong> a publicidade profissional
          deve ter caráter meramente informativo, sem configurar captação de clientela ou
          mercantilização da profissão (art. 3º).
        </li>
        <li>
          <Strong>Condutas vedadas</Strong> incluem referência a valores de honorários, forma de
          pagamento, gratuidade ou descontos como forma de captação de clientes, e o uso de
          “orações ou expressões persuasivas, de autoengrandecimento ou de comparação” (art. 3º,
          I e IV).
        </li>
        <li>
          <Strong>Promessa de resultados</Strong> e uso de casos concretos para oferecer atuação
          profissional são vedados, assim como a ostentação de bens (art. 6º).
        </li>
        <li>
          <Strong>Anúncios pagos</Strong> são admitidos no marketing de conteúdos jurídicos, desde
          que não estejam incutidas a mercantilização, a captação de clientela ou o emprego
          excessivo de recursos financeiros (art. 4º).
        </li>
        <li>
          <Strong>Google Ads e palavras-chave:</Strong> o Anexo Único permite ferramentas de
          aquisição de palavra-chave quando o anúncio responde a uma busca iniciada pelo potencial
          cliente e as palavras estão de acordo com os ditames éticos, e proíbe anúncios ostensivos
          em plataformas de vídeo.
        </li>
        <li>
          <Strong>Impulsionamento nas redes sociais:</Strong> o Anexo Único permite, desde que não
          se trate de publicidade contendo oferta de serviços jurídicos.
        </li>
        <li>
          <Strong>Chatbot e WhatsApp:</Strong> o Anexo Único permite chatbot para facilitar a
          comunicação, por exemplo para responder as primeiras dúvidas de um potencial cliente,
          sem afastar a pessoalidade do serviço. Não admite aplicativos que respondam
          automaticamente, de forma indiscriminada, consultas jurídicas a não clientes. A
          divulgação em grupos de WhatsApp é permitida quando o grupo é de pessoas determinadas,
          das relações do advogado ou do escritório.
        </li>
      </List>
      <P>
        Para o funil, isso tem uma consequência prática (aqui já é análise de marketing, não norma):
        como a publicidade jurídica não pode recorrer a promessas, preços ou linguagem persuasiva, a
        clareza sobre área de atuação e a qualidade do atendimento depois do contato pesam ainda
        mais na conversão. Automatizar o primeiro contato pode ajudar na organização, mas a
        orientação jurídica continua sendo do advogado.
      </P>
      <Callout label="Observação" tone="neutral">
        <p>
          As regras podem ser atualizadas e situações específicas devem ser avaliadas à luz das
          normas vigentes e, quando necessário, com orientação ética/jurídica adequada. Consulte
          sempre o texto oficial e a seccional da OAB do seu estado.
        </p>
      </Callout>

      <H2 id="faq">Perguntas frequentes</H2>

      <H3>O que é um lead qualificado para advogados?</H3>
      <P>
        É um contato que atende aos critérios definidos pelo próprio escritório, como área
        jurídica, tipo de demanda, localização e momento da necessidade. Não há definição
        universal: o importante é que o critério esteja escrito e seja usado igual por todos.
      </P>

      <H3>Por que meus leads não fecham contrato?</H3>
      <P>
        Pode ser intenção errada na campanha, comunicação genérica, página sem contexto, ausência de
        critério de qualificação, atendimento lento ou sem próximo passo, falta de acompanhamento
        ou ausência de feedback para o marketing. A resposta está nos dados de cada etapa, não numa
        causa única.
      </P>

      <H3>Como saber se o problema está no tráfego ou no atendimento?</H3>
      <P>
        Classifique os contatos de um período pela última etapa que alcançaram e pelo motivo de
        perda. Se a maioria está fora dos critérios, comece pela campanha e pela mensagem. Se a
        maioria é qualificada e se perde depois, comece pelo atendimento e pelo acompanhamento.
      </P>

      <H3>CPL baixo significa campanha boa?</H3>
      <P>
        Não necessariamente. O CPL mostra quanto custa gerar um contato, não quanto custa gerar um
        contrato. Compare campanhas pelo custo por lead qualificado e pelo custo por contrato.
      </P>

      <H3>Advogados podem fazer tráfego pago?</H3>
      <P>
        Segundo o Provimento 205/2021, anúncios pagos são admitidos dentro dos limites éticos: sem
        mercantilização, captação de clientela ou emprego excessivo de recursos financeiros (art.
        4º). O impulsionamento em redes sociais é permitido desde que não contenha oferta de
        serviços jurídicos (Anexo Único).
      </P>

      <H3>Google Ads é permitido para advogados?</H3>
      <P>
        O Anexo Único do Provimento 205/2021 permite a aquisição de palavras-chave quando o anúncio
        responde a uma busca iniciada pelo potencial cliente e as palavras estão de acordo com os
        ditames éticos. Anúncios ostensivos em plataformas de vídeo são proibidos.
      </P>

      <H3>O escritório deve acompanhar os leads até o contrato?</H3>
      <P>
        Do ponto de vista de gestão, sim: sem acompanhar o lead até o contrato (ou até o motivo de
        perda), não é possível saber quais campanhas geram clientes e quais geram só contatos.
      </P>

      <H2 id="conclusao">Antes de investir mais, entenda melhor</H2>
      <P>
        Mais leads não corrigem um funil quebrado. Se o escritório não consegue identificar quem
        chegou, quem era qualificado, quem avançou, quem virou oportunidade, quem contratou e por que
        os demais foram perdidos, aumentar a mídia pode apenas aumentar o volume do problema.
      </P>
      <P>
        O caminho é o inverso: defina o critério, registre cada etapa, encontre a maior perda,
        ajuste e meça de novo. É a mesma lógica do{" "}
        <A href="/#metodo">método de trabalho da Shark</A>, em que os dados da campanha e o retorno
        do atendimento comercial definem o próximo ciclo. Antes de investir mais, entenda melhor.
      </P>
    </>
  );
}
