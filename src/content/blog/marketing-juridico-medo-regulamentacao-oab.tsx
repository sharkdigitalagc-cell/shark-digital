import type { ArticleCtaCopy } from "@/components/blog/article-cta";
import {
  A,
  Callout,
  Checklist,
  H2,
  List,
  P,
  PullQuote,
  StepChain,
  Strong,
  Versus,
} from "@/components/blog/prose";

/*
 * Editorial rules for this post: no statistics, Shark results or cases, and
 * no claim that a proposed rule change is in force. Statements about the
 * rules come only from the official OAB pages in `sources` (Provimento
 * 205/2021 with article or Anexo Único item, the Conselho Federal news item
 * about the cartilha, and the Comitê Regulador site). Everything else is
 * marketing analysis and is written as such.
 */

const PROVIMENTO_URL = "https://www.oab.org.br/leisnormas/legislacao/provimentos/205-2021";
const CARTILHA_URL =
  "https://www.oab.org.br/noticia/62451/cartilha-oferece-esclarecimentos-e-diretrizes-eticas-sobre-publicidade-para-advogados";
const COMITE_URL = "https://marketingjuridico.oab.org.br/";

export const toc = [
  { id: "nao-e-proibido", label: "Marketing jurídico não é proibido" },
  { id: "o-que-a-oab-impede", label: "O que a OAB procura impedir?" },
  { id: "advogado-pode-anunciar", label: "Então advogado pode anunciar?" },
  { id: "invisibilidade", label: "Prudência que vira invisibilidade" },
  { id: "estrategia", label: "Estratégia antes do anúncio" },
  { id: "restricao-de-projeto", label: "Regulamentação como restrição de projeto" },
  { id: "regras-podem-mudar", label: "E as regras podem mudar" },
  { id: "crescer-e-respeitar", label: "Crescer e respeitar a OAB" },
  { id: "processo", label: "Transforme regulamentação em processo" },
];

export const sources = [
  {
    label: "Conselho Federal da OAB: Provimento nº 205/2021, publicidade e informação da advocacia (texto oficial)",
    href: PROVIMENTO_URL,
  },
  {
    label:
      "Conselho Federal da OAB: cartilha “Principais dúvidas sobre publicidade na advocacia: entendendo o Provimento 205/2021” (notícia oficial, com link para download)",
    href: CARTILHA_URL,
  },
  {
    label: "Comitê Regulador do Marketing Jurídico do Conselho Federal da OAB (site oficial)",
    href: COMITE_URL,
  },
];

export const cta: ArticleCtaCopy = {
  title: "Seu escritório está deixando de crescer por medo de fazer marketing?",
  text: "Antes de aumentar investimento em anúncios, entenda onde estão as oportunidades, os gargalos e os limites da sua operação de aquisição.",
  buttonLabel: "Falar com a Shark",
  whatsappText:
    "Olá, Shark! Li o artigo sobre marketing jurídico e as regras da OAB e quero conversar sobre a aquisição do meu escritório.",
};

export default function Article() {
  return (
    <>
      <p className="text-pretty text-[1.2rem] leading-[1.65] text-fg md:text-[1.3rem]">
        Para muitos escritórios de advocacia, a primeira pergunta antes de investir em marketing não
        é “quanto precisamos investir?” nem “qual canal devemos usar?”. É:{" "}
        <Strong>“será que a OAB permite fazer isso?”</Strong>
      </p>
      <P>
        A preocupação é legítima. A advocacia tem regras próprias de publicidade, e quem as
        descumpre responde por isso perante a Ordem. Ninguém quer arriscar a reputação do
        escritório por causa de um anúncio.
      </P>
      <P>
        O problema começa quando cautela vira paralisia. Na dúvida, o escritório não produz
        conteúdo, não investe no site, não testa nenhum canal e passa a depender só de indicação.
        Este artigo parte de uma distinção simples:
      </P>
      <PullQuote>
        Existe diferença entre não poder fazer marketing e não poder fazer marketing de qualquer
        maneira.
      </PullQuote>

      <H2 id="nao-e-proibido">Marketing jurídico não é proibido</H2>
      <P>
        O{" "}
        <A href={PROVIMENTO_URL} external>
          Provimento nº 205/2021 do Conselho Federal da OAB
        </A>
        , que trata da publicidade e da informação da advocacia, começa pela permissão: “é
        permitido o marketing jurídico, desde que exercido de forma compatível com os preceitos
        éticos” e com os limites do Estatuto da Advocacia, do Regulamento Geral, do Código de Ética
        e Disciplina e do próprio provimento (art. 1º). As informações divulgadas devem ser
        objetivas e verdadeiras (art. 1º, § 1º).
      </P>
      <P>
        O provimento também define o <Strong>marketing de conteúdos jurídicos</Strong>: a
        estratégia que usa a criação e a divulgação de conteúdos jurídicos para informar o público
        e consolidar a imagem profissional do advogado ou do escritório (art. 2º, II). Artigos,
        explicações sobre direitos, vídeos e publicações educativas entram aqui.
      </P>
      <P>
        Ou seja: a regra não diz “não faça”. Diz “faça com caráter informativo, com verdade e dentro
        de limites”. Isso muda a pergunta que o escritório deveria estar fazendo.
      </P>
      <Callout label="A pergunta certa">
        <p className="text-[1.15rem] font-semibold leading-snug text-fg">
          Como estruturar marketing para um escritório respeitando os limites da advocacia?
        </p>
      </Callout>

      <H2 id="o-que-a-oab-impede">O que a OAB procura impedir?</H2>
      <P>
        Em linguagem simples, e sem pretender substituir a leitura do texto oficial, o provimento
        procura impedir que a publicidade transforme a advocacia em comércio. Segundo o art. 3º, a
        publicidade profissional deve ter caráter meramente informativo, primar pela discrição e
        sobriedade e não configurar captação de clientela nem mercantilização da profissão. Entre as
        condutas vedadas pelo provimento estão:
      </P>
      <List>
        <li>
          <Strong>Captação indevida de clientela:</Strong> mecanismos que, de forma ativa, buscam
          angariar clientes pela indução à contratação ou pelo estímulo ao litígio (art. 2º, VIII).
        </li>
        <li>
          <Strong>Mercantilização da profissão</Strong>, tratando o serviço jurídico como
          mercadoria (art. 3º).
        </li>
        <li>
          <Strong>Informações enganosas:</Strong> o que possa induzir a erro ou causar dano a
          clientes, a outros advogados ou à sociedade (art. 3º, II).
        </li>
        <li>
          <Strong>Autoengrandecimento e comparação:</Strong> “orações ou expressões persuasivas, de
          autoengrandecimento ou de comparação” (art. 3º, IV).
        </li>
        <li>
          <Strong>Honorários e descontos como isca:</Strong> referência a valores de honorários,
          forma de pagamento, gratuidade ou descontos como forma de captação de clientes (art. 3º,
          I).
        </li>
        <li>
          <Strong>Promessa de resultados</Strong> e uso de casos concretos para oferecer atuação
          profissional (art. 6º).
        </li>
      </List>
      <Versus
        label="Diferença entre comunicação e mercantilização"
        joiner="versus"
        sides={[
          {
            label: "Comunicação",
            title: "Informação + autoridade + presença digital",
            items: [
              "Explica direitos, prazos e caminhos possíveis",
              "Mostra áreas de atuação e qualificações verdadeiras",
              "Está presente onde o público procura informação",
            ],
          },
          {
            label: "Mercantilização",
            title: "Promessas + pressão comercial + captação indevida",
            items: [
              "Promete resultado ou usa casos concretos para vender",
              "Usa preço, desconto ou gratuidade como isca",
              "Pressiona, compara ou induz à contratação",
            ],
          },
        ]}
      />
      <P>
        O quadro é uma leitura de marketing, não um parecer. Casos concretos devem ser avaliados à
        luz do texto oficial e, quando necessário, com orientação ética adequada.
      </P>

      <H2 id="advogado-pode-anunciar">Então advogado pode anunciar?</H2>
      <P>
        Sim, dentro de limites. No marketing de conteúdos jurídicos, o provimento admite a
        publicidade ativa ou passiva e a utilização de anúncios, pagos ou não, desde que não estejam
        incutidas a mercantilização, a captação de clientela ou o emprego excessivo de recursos
        financeiros (art. 4º).
      </P>
      <P>
        Sobre o Google Ads, o Anexo Único do provimento é específico. Ele permite ferramentas de
        aquisição de palavra-chave “quando responsivo a uma busca iniciada pelo potencial cliente”
        e desde que as palavras escolhidas estejam de acordo com os ditames éticos. No mesmo item,
        proíbe anúncios ostensivos em plataformas de vídeo. Na prática, o anúncio aparece para quem
        já está procurando, em vez de abordar quem não procurou nada.
      </P>
      <P>
        Para o impulsionamento nas redes sociais, o Anexo Único traz outra condição: é permitido
        desde que não se trate de publicidade contendo oferta de serviços jurídicos.
      </P>
      <P>
        Em 2024, o Conselho Federal divulgou a cartilha{" "}
        <A href={CARTILHA_URL} external>
          “Principais dúvidas sobre publicidade na advocacia: entendendo o Provimento 205/2021”
        </A>
        , elaborada pelo Comitê Regulador do Marketing Jurídico. Segundo a notícia oficial, ela
        responde dúvidas frequentes, como o uso de Google Ads, impulsionamento, lives e chatbots, e
        o que continua vedado. É uma boa leitura para quem decide sobre marketing no escritório.
      </P>
      <P>
        Se o escritório já anuncia e o problema é outro, contatos que não viram contrato, o artigo
        sobre{" "}
        <A href="/blog/leads-advogados-nao-convertem">leads de advocacia que não convertem</A>{" "}
        mostra como encontrar em que etapa as oportunidades se perdem.
      </P>

      <H2 id="invisibilidade">O problema de transformar prudência em invisibilidade</H2>
      <P>
        Considere dois escritórios hipotéticos. Os dois respeitam as regras. A diferença está no que
        cada um fez com essa cautela.
      </P>
      <Versus
        label="Exemplo conceitual de dois escritórios que respeitam as regras"
        joiner="e"
        highlight="second"
        sides={[
          {
            label: "Escritório A",
            title: "Prudente e invisível",
            items: [
              "Tecnicamente competente",
              "Praticamente invisível no digital",
              "Depende de indicação",
              "Site pouco desenvolvido",
              "Pouca produção de conteúdo",
              "Nenhuma estratégia estruturada de aquisição",
            ],
          },
          {
            label: "Escritório B",
            title: "Prudente e presente",
            items: [
              "Também respeita as regras",
              "Produz conteúdo informativo",
              "Tem presença profissional",
              "Tem páginas sobre as áreas de atuação",
              "Aparece quando potenciais clientes pesquisam certos problemas jurídicos",
              "Tem uma jornada digital estruturada",
            ],
          },
        ]}
      />
      <P>
        O exemplo não diz que o escritório B terá necessariamente mais clientes. Isso depende de
        área, região, atendimento e muitos outros fatores. O que ele mostra é outra coisa: quando
        alguém pesquisa um problema jurídico, só um dos dois tem chance de ser encontrado.
      </P>
      <PullQuote>Um está presente quando a demanda aparece. O outro depende de ser lembrado.</PullQuote>
      <P>
        <Strong>Esse é o custo menos óbvio do medo da regulamentação.</Strong> Ele não aparece em
        nenhuma notificação da OAB, porque não houve infração. Aparece nas oportunidades que nunca
        chegaram a bater na porta.
      </P>

      <H2 id="estrategia">O marketing jurídico precisa começar pela estratégia, não pelo anúncio</H2>
      <P>
        Descobrir que Google Ads para advogados é permitido não significa que basta criar uma
        campanha. Anúncio sem estrutura costuma gerar contatos que ninguém consegue acompanhar.
        Antes da mídia, o escritório precisa definir:
      </P>
      <List>
        <li>áreas prioritárias e demandas desejadas;</li>
        <li>público e intenção de busca de cada demanda;</li>
        <li>conteúdo e páginas de destino para cada área;</li>
        <li>quem atende, como e em quanto tempo;</li>
        <li>como cada contato é acompanhado e medido;</li>
        <li>critérios de conformidade que valem para tudo isso.</li>
      </List>
      <StepChain
        label="Jornada de aquisição de um escritório"
        steps={[
          { title: "Busca", text: "A pessoa pesquisa um problema ou uma área do direito." },
          { title: "Conteúdo / anúncio", text: "Encontra uma resposta informativa do escritório." },
          { title: "Página", text: "Entende quem o escritório atende e como funciona o contato." },
          { title: "Contato", text: "Envia mensagem, formulário ou liga." },
          { title: "Atendimento", text: "Recebe resposta e um próximo passo claro." },
          { title: "Acompanhamento", text: "A oportunidade tem responsável e próxima ação registrada." },
          { title: "Análise", text: "O resultado volta para orientar a próxima decisão." },
        ]}
      />
      <PullQuote>
        O anúncio gera o contato. Mas é a operação inteira que determina o que acontece depois.
      </PullQuote>

      <H2 id="restricao-de-projeto">
        Regulamentação deveria ser uma restrição de projeto, não uma barreira ao crescimento
      </H2>
      <P>
        Em engenharia e em produtos digitais existe a ideia de <Strong>compliance by design</Strong>
        : as exigências regulatórias entram no desenho desde o começo, em vez de serem conferidas no
        fim, quando corrigir custa mais caro.
      </P>
      <P>
        Aplicada ao marketing jurídico, a ideia é simples. As regras da OAB entram antes da criação
        das campanhas: na escolha das palavras-chave, no texto dos anúncios, nas páginas, nas
        mensagens de atendimento. Assim, a conformidade deixa de ser um freio de última hora e passa
        a ser um critério de projeto, como prazo ou orçamento.
      </P>
      <Checklist
        label="Checklist editorial antes de publicar"
        items={[
          { q: "A informação é verdadeira?" },
          { q: "Existe promessa de resultado?" },
          { q: "Existe comparação ou autoengrandecimento?" },
          { q: "A comunicação mantém caráter informativo?" },
          { q: "Existe indução inadequada à contratação?" },
          { q: "A landing page mantém os mesmos critérios?" },
          { q: "Criativos, anúncios e páginas estão coerentes entre si?" },
        ]}
      />
      <Callout label="Importante" tone="neutral">
        <p>
          Este checklist é um instrumento editorial e operacional para revisar peças antes da
          publicação. Ele não substitui a leitura do texto oficial nem a análise jurídica de cada
          caso.
        </p>
      </Callout>

      <H2 id="regras-podem-mudar">E as regras podem mudar</H2>
      <P>
        Regulamentação e interpretações evoluem. O próprio Provimento 205/2021 criou, no art. 9º, o{" "}
        <A href={COMITE_URL} external>
          Comitê Regulador do Marketing Jurídico
        </A>
        , órgão consultivo vinculado à Diretoria do Conselho Federal. Entre suas atribuições está
        acompanhar os critérios do Anexo Único e propor ao Conselho Federal a alteração, a supressão
        ou a inclusão de critérios, além de sugerir interpretações para uniformizar a aplicação das
        regras.
      </P>
      <P>
        Por isso, conformidade não é uma checagem feita uma vez. É um processo contínuo: acompanhar
        as fontes oficiais, revisar peças antigas quando algo mudar e não tratar como regra uma
        proposta que ainda não foi aprovada.
      </P>

      <H2 id="crescer-e-respeitar">O escritório não precisa escolher entre crescer e respeitar a OAB</H2>
      <Versus
        label="Crescimento e conformidade como objetivos que coexistem"
        joiner="+"
        highlight="both"
        sides={[
          {
            label: "Objetivo",
            title: "Crescimento",
            items: ["Ser encontrado", "Gerar contatos com aderência", "Converter com bom atendimento"],
          },
          {
            label: "Objetivo",
            title: "Conformidade",
            items: ["Informar com verdade", "Sem captação indevida", "Sem mercantilização"],
          },
        ]}
      />
      <P>
        Os dois objetivos podem coexistir. Sempre respeitando as normas aplicáveis, o escritório
        pode:
      </P>
      <List>
        <li>construir autoridade com conteúdo informativo;</li>
        <li>melhorar sua presença digital;</li>
        <li>estruturar páginas para cada área de atuação;</li>
        <li>usar as ferramentas permitidas, como a aquisição de palavras-chave responsiva à busca;</li>
        <li>melhorar o atendimento de quem já entrou em contato;</li>
        <li>medir a jornada de aquisição do primeiro contato ao contrato.</li>
      </List>

      <H2 id="processo">Transforme regulamentação em processo</H2>
      <P>
        Na Shark Digital, acreditamos que marketing para setores regulados não deve começar pela
        pergunta: “Qual anúncio vamos subir?”
      </P>
      <P>
        Primeiro é necessário entender o negócio, o público, as restrições, a jornada de aquisição
        e a operação comercial que receberá as oportunidades geradas. Depois, mídia, conteúdo,
        páginas e mensuração são organizados dentro dessa estrutura. É assim que funciona o{" "}
        <A href="/#metodo">método de trabalho da Shark</A>.
      </P>
      <PullQuote>
        Porque uma operação de aquisição madura não precisa ignorar regulamentações para crescer.
        Precisa saber crescer dentro delas.
      </PullQuote>
      <p className="mt-12 border-t border-line pt-5 text-sm leading-relaxed text-muted">
        Este conteúdo possui caráter informativo sobre estratégia de marketing e não constitui
        parecer ou orientação jurídica. Normas, provimentos e interpretações podem ser atualizados.
        Consulte as fontes oficiais e profissionais habilitados quando necessário.
      </p>
    </>
  );
}
