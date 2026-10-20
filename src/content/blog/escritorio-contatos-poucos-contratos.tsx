import type { ArticleCtaCopy } from "@/components/blog/article-cta";
import { A, DataTable, H2, List, P, Strong } from "@/components/blog/prose";

/*
 * Text supplied by Shark, published as written. No market figures, results
 * or cases; the example of the labor law firm is hypothetical, as the text
 * says. Statements about the rules come only from the OAB pages in `sources`.
 */

const GOOGLE_ADS_URL = "https://support.google.com/google-ads/answer/11459091?hl=pt-BR";
const PROVIMENTO_URL = "https://www.oab.org.br/leisnormas/legislacao/provimentos/205-2021";
const CARTILHA_URL =
  "https://www.oab.org.br/noticia/62451/cartilha-oferece-esclarecimentos-e-diretrizes-eticas-sobre-publicidade-para-advogados";

export const toc = [
  { id: "trabalho-oferecido", label: "As pessoas procuram o trabalho que você oferece?" },
  { id: "comunicacao", label: "A comunicação ajuda a compreender o atendimento?" },
  { id: "conversas-param", label: "Em que momento as conversas deixam de avançar?" },
  { id: "o-que-esperar", label: "O que esperar de uma agência" },
  { id: "outras-decisoes", label: "A contratação envolve outras decisões" },
  { id: "publicidade-advocacia", label: "Respeitar a publicidade na advocacia" },
  { id: "shark", label: "Como a Shark pode ajudar" },
];

export const sources = [
  { label: "Google Ads Ajuda: documentação sobre leads qualificados e convertidos", href: GOOGLE_ADS_URL },
  {
    label: "Conselho Federal da OAB: Provimento nº 205/2021, publicidade e informação da advocacia (texto oficial)",
    href: PROVIMENTO_URL,
  },
  {
    label: "Conselho Federal da OAB: cartilha com esclarecimentos e diretrizes éticas sobre publicidade para advogados",
    href: CARTILHA_URL,
  },
];

export const cta: ArticleCtaCopy = {
  title: "Seu escritório recebe contatos, mas poucos viram contratos?",
  text: "Conte à Shark quais assuntos aparecem, como os interessados conhecem o trabalho e em que momento as conversas param. A partir disso, dá para discutir prioridades e um escopo compatível com a atuação do escritório.",
  buttonLabel: "Falar com a Shark",
  whatsappText:
    "Olá, Shark! Li o artigo sobre escritórios que recebem contatos, mas fecham poucos contratos, e quero conversar sobre o marketing do meu escritório.",
};

export default function Article() {
  return (
    <>
      <p className="text-pretty text-[1.2rem] leading-[1.65] text-fg md:text-[1.3rem]">
        O marketing pode ajudar seu escritório a ser encontrado por pessoas com necessidades
        compatíveis com sua atuação, apresentar melhor o trabalho realizado e acompanhar o que
        acontece depois do primeiro contato. Quando chegam mensagens, mas poucas conversas avançam
        para a contratação, esse olhar ajuda a decidir onde concentrar o investimento e o esforço
        da equipe.
      </p>
      <P>
        A situação pode ser familiar: o WhatsApp recebe perguntas, você dedica tempo às respostas e
        algumas pessoas desaparecem depois de conhecer as condições do atendimento. No fim do mês,
        fica a dúvida sobre o retorno da divulgação.
      </P>
      <P>
        Antes de aumentar a verba ou mudar toda a comunicação, vale compreender o que está
        acontecendo nessas conversas. Dependendo do motivo, o escritório pode precisar de uma
        apresentação mais clara, de ajustes na divulgação ou de apoio para organizar a passagem do
        contato ao atendimento.
      </P>

      <H2 id="trabalho-oferecido">
        As pessoas que chegam procuram o trabalho que seu escritório oferece?
      </H2>
      <P>
        Uma pessoa pode precisar de orientação jurídica e, ainda assim, procurar uma atuação
        diferente da que o escritório desenvolve. Essa diferença ajuda a explicar por que algumas
        conversas consomem tempo sem criar uma possibilidade de contratação.
      </P>
      <P>
        Considere um exemplo hipotético: um escritório que presta assessoria trabalhista a empresas
        recebe, com frequência, perguntas de trabalhadores sobre rescisão. Existe interesse em um
        assunto relacionado à área, mas a demanda não corresponde ao serviço que aquele escritório
        pretende divulgar.
      </P>
      <P>
        Nesse cenário, uma avaliação de marketing pode examinar como a atuação está apresentada no
        site, nos conteúdos e nos anúncios. A comunicação deixa claro quem o escritório atende? Os
        assuntos publicados correspondem ao trabalho que a equipe está preparada para assumir? A
        pessoa encontra informações coerentes ao passar de um canal para outro?
      </P>
      <P>
        Esse alinhamento pode reduzir ambiguidades e facilitar o reconhecimento do serviço pelo
        público adequado. Seu efeito precisa ser acompanhado: uma mudança no texto, por si só, não
        comprova melhora nos contratos.
      </P>

      <H2 id="comunicacao">A comunicação ajuda o interessado a compreender o atendimento?</H2>
      <P>
        Quem procura um advogado pode ter dúvidas sobre a situação que está vivendo, sobre a atuação
        do profissional e sobre o que acontece na primeira conversa. Uma apresentação clara oferece
        referências para essa decisão.
      </P>
      <P>
        O site e os conteúdos podem explicar as áreas de atuação, os profissionais responsáveis, a
        localização, as modalidades de atendimento e os canais de contato. Informações jurídicas
        úteis também podem ajudar o leitor a compreender o assunto antes de apresentar sua situação
        ao escritório.
      </P>
      <P>
        Quando esses elementos são vagos ou inconsistentes, o interessado pode chegar com uma
        expectativa que o atendimento precisará desfazer. Um conteúdo sobre direitos, por exemplo,
        pode gerar perguntas iniciais de pessoas que ainda estão tentando entender o próprio
        problema. Isso pede uma leitura diferente de uma solicitação de atendimento sobre um assunto
        que o escritório efetivamente acompanha.
      </P>
      <P>
        Cabe ao planejamento considerar essas intenções. A agência pode trabalhar a clareza da
        comunicação; a avaliação da situação jurídica e a definição do atendimento permanecem com o
        advogado.
      </P>

      <H2 id="conversas-param">Em que momento as conversas deixam de avançar?</H2>
      <P>
        A frase “recebemos contatos, mas fechamos pouco” reúne situações diferentes. Saber em qual
        delas o escritório se encontra permite uma conversa mais precisa sobre o investimento em
        marketing.
      </P>
      <DataTable
        caption="Situações percebidas pelo escritório e o que cada uma pede que seja compreendido"
        head={["O que o escritório percebe", "O que essa situação pede que seja compreendido"]}
        rows={[
          [
            "Chegam muitas perguntas sobre assuntos que a equipe não atende.",
            "Se a divulgação e a apresentação das áreas de atuação estão gerando expectativas incompatíveis.",
          ],
          [
            "Pessoas com uma demanda compatível não conseguem dar continuidade à conversa.",
            "Se ficaram sem retorno, sem uma informação necessária ou sem entender o próximo passo.",
          ],
          [
            "As conversas avançam e param depois da apresentação das condições.",
            "Se houve dúvida sobre o escopo, limitação financeira, mudança de prioridade ou outra razão informada pelo interessado.",
          ],
          [
            "Existem atendimentos em andamento, mas o retorno parece insuficiente.",
            "Se o tempo de decisão e a origem dessas conversas estão sendo considerados na avaliação.",
          ],
        ]}
      />
      <P>
        Essas situações são hipóteses de análise, não diagnósticos automáticos. O silêncio de uma
        pessoa, isoladamente, não revela por que ela deixou de responder. Pode haver falta de
        condições para contratar, necessidade de tempo ou uma decisão de não seguir adiante.
      </P>
      <P>
        Uma agência pode ajudar a organizar a leitura das origens dos contatos e dos desfechos,
        usando as informações necessárias ao acompanhamento e preservando o sigilo dos casos. Assim,
        o escritório consegue discutir o que precisa melhorar com mais contexto, sem depender apenas
        da impressão de uma semana movimentada ou de alguns atendimentos frustrados.
      </P>

      <H2 id="o-que-esperar">O que esperar de uma agência ao analisar essa dificuldade</H2>
      <P>
        Uma proposta de trabalho precisa considerar a atuação do escritório, as demandas que ele
        deseja atender e sua capacidade de receber novos interessados. Esses pontos orientam a
        escolha dos canais, dos conteúdos e das páginas que serão desenvolvidas.
      </P>
      <P>Para avaliar uma possível parceria, vale conversar sobre questões como:</P>
      <List>
        <li>Como a agência vai compreender as áreas de atuação e o público do escritório?</li>
        <li>O trabalho inclui revisar a clareza do site e das páginas usadas na divulgação?</li>
        <li>Como serão acompanhados os contatos recebidos e seu andamento?</li>
        <li>
          Quais informações o escritório precisará fornecer e quais responsabilidades ficarão com
          cada equipe?
        </li>
      </List>
      <P>
        As respostas devem resultar em um escopo compreensível. Pode fazer sentido revisar a
        apresentação de uma área de atuação, adequar uma página às dúvidas de quem procura
        atendimento ou reorganizar as prioridades das campanhas. A escolha depende do que a análise
        encontrar.
      </P>
      <P>
        No acompanhamento, é útil distinguir contatos recebidos, demandas compatíveis com a atuação
        e contratações efetivadas. Essa distinção também aparece na documentação do Google Ads, que
        permite representar etapas posteriores ao contato inicial por meio de metas de leads
        qualificados e convertidos. [Fonte:{" "}
        <A href={GOOGLE_ADS_URL} external>
          Google Ads
        </A>
        ].
      </P>
      <P>
        Para o sócio do escritório, o benefício dessa leitura é conseguir avaliar o trabalho
        contratado e participar das decisões com informações que façam sentido para a operação.
      </P>

      <H2 id="outras-decisoes">
        O marketing pode ajudar, mas a contratação envolve outras decisões
      </H2>
      <P>
        A clareza da divulgação e a compatibilidade dos contatos são partes do caminho. A
        contratação também depende da análise jurídica, das condições apresentadas, da
        disponibilidade do escritório e da escolha do interessado.
      </P>
      <P>
        Por isso, uma conversa que não resulta em contrato precisa ser compreendida no seu contexto.
        O caso pode não ser adequado à atuação do escritório. A pessoa pode decidir esperar. O
        advogado pode concluir que não faz sentido assumir aquela demanda.
      </P>
      <P>
        Também é preciso considerar o tempo entre o primeiro contato e a decisão. Comparar as
        mensagens recebidas neste mês com todos os contratos assinados no mesmo mês pode misturar
        pessoas que chegaram em momentos diferentes. Uma leitura cuidadosa acompanha a evolução
        dessas conversas ao longo do período necessário.
      </P>
      <P>
        Esse entendimento ajuda a construir expectativas realistas para a parceria com a agência.
        Nenhuma ação isolada de marketing permite assegurar um número de contratos.
      </P>

      <H2 id="publicidade-advocacia">O planejamento precisa respeitar a publicidade na advocacia</H2>
      <P>
        O{" "}
        <A href={PROVIMENTO_URL} external>
          Provimento 205/2021 da OAB
        </A>{" "}
        admite o marketing jurídico dentro dos limites éticos da profissão. A publicidade deve ser
        informativa, discreta e sóbria. Promessas de resultado e referências a honorários,
        gratuidade ou descontos usadas para captar clientes estão entre as restrições previstas na
        norma.
      </P>
      <P>
        O anexo também trata do Google Ads: o uso de palavras-chave deve responder a uma busca
        iniciada pelo potencial cliente e observar os limites éticos. A{" "}
        <A href={CARTILHA_URL} external>
          cartilha divulgada pelo Conselho Federal
        </A>{" "}
        complementa essas orientações sobre comunicação e ferramentas digitais.
      </P>
      <P>
        Esses cuidados devem fazer parte do planejamento e da revisão das peças do escritório. É
        possível abordar a clareza das informações e a organização da presença digital sem criar
        expectativas sobre o resultado de uma demanda jurídica.
      </P>

      <H2 id="shark">Como a Shark pode ajudar a entender o momento do seu escritório</H2>
      <P>
        A Shark Digital trabalha com planejamento, posicionamento, conteúdo, mídia paga, páginas e
        acompanhamento de resultados. O ponto de partida é compreender o contexto do negócio e
        definir o que precisa ser estruturado.
      </P>
      <P>
        Se o seu escritório já recebe contatos, a conversa pode começar pelo que vocês estão
        observando: quais assuntos aparecem, como os interessados conhecem o trabalho e em que
        momento surgem as principais dificuldades para dar continuidade ao atendimento.
      </P>
      <P>
        A partir desse contexto, é possível discutir prioridades e um escopo de marketing
        compatível com a atuação do escritório.
      </P>
      <P>
        <Strong>
          <A href="/#contato">Converse com a Shark sobre o marketing do seu escritório.</A>
        </Strong>
      </P>
    </>
  );
}
