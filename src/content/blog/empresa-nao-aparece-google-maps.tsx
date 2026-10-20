import type { ArticleCtaCopy } from "@/components/blog/article-cta";
import {
  A,
  Callout,
  Checklist,
  FactorSum,
  FlowRow,
  H2,
  List,
  P,
  PullQuote,
  SearchQueries,
  StepChain,
  Strong,
  Versus,
} from "@/components/blog/prose";

/*
 * Editorial rules for this post: no statistics, rankings, search volumes,
 * Shark results or cases, and no promise of position. Statements about how
 * Google works come only from the official Google help pages in `sources`.
 * Everything else is acquisition analysis and is written as such.
 */

const RANKING_URL = "https://support.google.com/business/answer/7091?hl=pt-BR";
const GUIDELINES_URL = "https://support.google.com/business/answer/3038177?hl=pt-BR";
const CREATE_PROFILE_URL = "https://support.google.com/business/answer/7039811?hl=pt-BR";
const REVIEWS_POLICY_URL = "https://support.google.com/contributionpolicy/answer/7400114?hl=pt-BR";
const REPLY_REVIEWS_URL = "https://support.google.com/business/answer/3474050?hl=pt-BR";

export const toc = [
  { id: "demanda-vs-presenca", label: "Não aparecer não é falta de demanda" },
  { id: "google-maps", label: "O Google Maps não é apenas um mapa" },
  { id: "marca-vs-servico", label: "Busca de marca e busca de serviço" },
  { id: "como-o-google-decide", label: "Como o Google decide quem aparece" },
  { id: "perfil-abandonado", label: "Perfil que existe, mas está abandonado" },
  { id: "informacao-completa", label: "Informação completa" },
  { id: "avaliacoes", label: "Avaliações" },
  { id: "site-e-perfil", label: "Site e Perfil da Empresa juntos" },
  { id: "varias-regioes", label: "Empresas com várias regiões" },
  { id: "jornada", label: "Maps dentro da jornada de aquisição" },
  { id: "seo-local-e-anuncios", label: "SEO local e anúncios" },
  { id: "teste", label: "Faça este teste agora" },
  { id: "infraestrutura", label: "Presença local é infraestrutura" },
];

export const sources = [
  {
    label: "Ajuda do Perfil da Empresa no Google: Dicas para melhorar sua classificação local no Google",
    href: RANKING_URL,
  },
  {
    label: "Ajuda do Perfil da Empresa no Google: Diretrizes para representar sua empresa no Google",
    href: GUIDELINES_URL,
  },
  {
    label: "Ajuda do Perfil da Empresa no Google: Crie seu Perfil da Empresa no Google",
    href: CREATE_PROFILE_URL,
  },
  {
    label: "Política de conteúdo de contribuições de usuários do Maps: conteúdo proibido e restrito",
    href: REVIEWS_POLICY_URL,
  },
  {
    label: "Ajuda do Perfil da Empresa no Google: Gerenciar avaliações de clientes",
    href: REPLY_REVIEWS_URL,
  },
];

export const cta: ArticleCtaCopy = {
  title: "Sua empresa está invisível justamente quando o cliente procura?",
  text: "Antes de aumentar o investimento em mídia, entenda como sua empresa aparece no Google, no Maps e ao longo da jornada de aquisição local.",
  buttonLabel: "Falar com a Shark",
  whatsappText:
    "Olá, Shark! Li o artigo sobre empresas que não aparecem no Google Maps e quero entender como a minha empresa aparece nas buscas locais.",
};

export default function Article() {
  return (
    <>
      <p className="text-pretty text-[1.2rem] leading-[1.65] text-fg md:text-[1.3rem]">
        Existe uma diferença importante entre tentar criar demanda e estar presente quando a
        demanda já existe.
      </p>
      <P>Pense em pesquisas como estas:</P>
      <SearchQueries
        label="Exemplos de pesquisas locais com intenção"
        queries={[
          "advogado trabalhista perto de mim",
          "imobiliária em [cidade]",
          "clínica odontológica perto de mim",
          "empresa de energia solar em [cidade]",
        ]}
      />
      <P>
        Quem digita algo assim não está simplesmente navegando pelas redes sociais. Está procurando
        uma solução, muitas vezes para agora, e muitas vezes perto de onde está.
      </P>
      <P>Então a pergunta que interessa ao dono do negócio é direta:</P>
      <PullQuote>
        Quando alguém procura exatamente pelo que você vende na sua região, sua empresa aparece?
      </PullQuote>
      <P>
        Se a resposta for “não sei”, existe uma parte importante da aquisição que ainda não está
        sob controle. E ela costuma ser justamente a parte em que o cliente já decidiu que precisa
        do serviço.
      </P>

      <H2 id="demanda-vs-presenca">Não aparecer no Google é diferente de não existir demanda</H2>
      <P>
        Quando os contatos diminuem, a conclusão mais comum é: “precisamos anunciar mais”. Às vezes
        é verdade. Mas existe uma etapa anterior, que é olhar para as pesquisas que as pessoas já
        fazem todos os dias na sua região:
      </P>
      <SearchQueries
        label="Formatos de pesquisa local"
        queries={[
          "serviço + cidade",
          "serviço + bairro",
          "serviço + perto de mim",
          "melhor + categoria + cidade",
        ]}
      />
      <P>
        Essas pesquisas acontecem com ou sem a sua empresa nos resultados. Se você não aparece,
        alguém aparece no seu lugar.
      </P>
      <PullQuote>
        Se outras empresas aparecem e a sua não, o problema pode não ser falta de mercado. Pode ser
        falta de presença.
      </PullQuote>

      <H2 id="google-maps">O Google Maps não é apenas um mapa</H2>
      <P>
        O{" "}
        <A href={CREATE_PROFILE_URL} external>
          Perfil da Empresa no Google
        </A>{" "}
        (antigo Google Meu Negócio, chamado em inglês de Google Business Profile) é a ferramenta
        gratuita com que a empresa gerencia como aparece na Pesquisa Google e no Google Maps. Em um
        único lugar, quem pesquisa pode encontrar:
      </P>
      <List>
        <li>localização e como chegar;</li>
        <li>telefone;</li>
        <li>horário de funcionamento;</li>
        <li>link para o site;</li>
        <li>avaliações e respostas da empresa;</li>
        <li>fotos;</li>
        <li>serviços oferecidos;</li>
        <li>outras informações comerciais.</li>
      </List>
      <P>
        Muitas vezes a pessoa decide se vai ligar, pedir rota ou visitar o site sem sair dessa
        tela. Por isso o perfil não deveria ser tratado como um cadastro feito uma vez e esquecido.
      </P>
      <Callout label="Na prática">
        <p className="text-[1.15rem] font-semibold leading-snug text-fg">
          O Perfil da Empresa é um ponto de contato entre a intenção de busca e o seu negócio.
        </p>
      </Callout>

      <H2 id="marca-vs-servico">Existe uma diferença entre procurar sua marca e procurar seu serviço</H2>
      <P>
        Muitas empresas testam a própria presença pesquisando o próprio nome. Aparecem, e concluem
        que está tudo bem. Só que essa é a pesquisa de quem já conhece a empresa.
      </P>
      <Versus
        label="Busca pela marca versus busca pelo serviço"
        joiner="versus"
        highlight="second"
        sides={[
          {
            label: "Busca 1",
            title: "“Nome da empresa”",
            items: [
              "A pessoa já conhece você",
              "Veio por indicação, anúncio ou lembrança",
              "Aparecer aqui é o mínimo esperado",
            ],
          },
          {
            label: "Busca 2",
            title: "“Serviço + cidade”",
            items: [
              "A pessoa está decidindo quem conhecer",
              "Compara as opções que aparecem na tela",
              "Quem não aparece não entra na comparação",
            ],
          },
        ]}
      />
      <PullQuote>
        Quem procura pelo nome da empresa já conhece a empresa. Quem procura pelo serviço pode estar
        escolhendo quem conhecer.
      </PullQuote>

      <H2 id="como-o-google-decide">Como o Google decide quais empresas aparecem?</H2>
      <P>
        O próprio Google explica, na página{" "}
        <A href={RANKING_URL} external>
          Dicas para melhorar sua classificação local
        </A>
        , que os resultados locais se baseiam principalmente em três fatores:
      </P>
      <FactorSum
        label="Os três fatores principais dos resultados locais, segundo o Google"
        factors={[
          {
            title: "Relevância",
            text: "O quanto o perfil corresponde ao que a pessoa está procurando.",
          },
          {
            title: "Distância",
            text: "O quanto cada empresa está longe de quem pesquisa ou do local informado na busca.",
          },
          {
            title: "Destaque",
            text: "O nível de popularidade da empresa, o quanto ela é conhecida e estabelecida.",
          },
        ]}
        result="Resultados locais"
      />
      <P>
        Sobre o destaque, o Google cita como exemplos quantos sites têm links para a empresa e
        quantas avaliações ela tem, e diz que avaliações e classificações positivas ajudam na
        classificação local.
      </P>
      <P>
        O Google afirma manter em sigilo os detalhes do algoritmo e não divulga o peso de cada
        fator, e este artigo não vai inventar uma fórmula. O que
        dá para afirmar é o sentido geral: o perfil precisa ser relevante para a pesquisa, a
        distância é um limite real, e a reputação construída ao longo do tempo pesa.
      </P>
      <Callout label="Importante" tone="neutral">
        <p className="text-[1.1rem] font-semibold leading-snug text-fg">
          Não existe botão para comprar o primeiro lugar orgânico no Maps.
        </p>
        <p>
          A mesma página do Google afirma que não há como solicitar ou pagar por uma classificação
          local melhor. Anúncios do Google Ads são outro produto: aparecem identificados como
          anúncio.
        </p>
        <p>
          Por isso, desconfie de quem garante posição. O que dá para fazer é trabalhar os fatores
          que estão ao alcance da empresa e acompanhar o que acontece.
        </p>
      </Callout>
      <Versus
        label="Resultado orgânico local versus publicidade paga"
        joiner="≠"
        highlight="both"
        sides={[
          {
            label: "Orgânico",
            title: "Resultado orgânico local",
            items: [
              "Depende de relevância, distância e destaque",
              "Não pode ser comprado nem solicitado",
              "Construído com informação e reputação",
            ],
          },
          {
            label: "Pago",
            title: "Publicidade",
            items: [
              "Aparece identificada como anúncio",
              "Exposição enquanto houver investimento",
              "Exige campanha, verba e acompanhamento",
            ],
          },
        ]}
      />

      <H2 id="perfil-abandonado">O problema começa quando o perfil existe, mas está abandonado</H2>
      <P>
        Muitas empresas têm perfil. Poucas cuidam dele. Com o tempo, aparecem problemas que
        atrapalham tanto quem procura quanto a própria leitura do Google sobre o negócio:
      </P>
      <List>
        <li>horário desatualizado;</li>
        <li>categoria que não descreve o negócio principal;</li>
        <li>telefone antigo;</li>
        <li>site errado ou sem link;</li>
        <li>poucas informações e poucas fotos;</li>
        <li>avaliações sem resposta;</li>
        <li>serviços mal apresentados;</li>
        <li>dados diferentes no perfil, no site e nas redes.</li>
      </List>
      <Versus
        label="Ter perfil é diferente de gerenciar presença local"
        joiner="≠"
        highlight="second"
        sides={[
          {
            label: "Cadastro",
            title: "Ter perfil",
            items: ["Criado uma vez", "Ninguém responsável", "Informação parada no tempo"],
          },
          {
            label: "Gestão",
            title: "Gerenciar presença local",
            items: [
              "Informações revisadas",
              "Avaliações acompanhadas e respondidas",
              "Coerente com o site e a operação",
            ],
          },
        ]}
      />

      <H2 id="informacao-completa">Informação completa ajuda o Google a entender o negócio</H2>
      <P>
        Entre as dicas oficiais do Google estão inserir dados completos, verificar a empresa, manter
        o horário correto, responder a avaliações e adicionar fotos e vídeos. Nas palavras do
        Google, empresas com informações completas e precisas têm mais chances de aparecer nos
        resultados da pesquisa local. Na prática, vale revisar:
      </P>
      <List>
        <li>endereço ou área de atendimento;</li>
        <li>telefone;</li>
        <li>categorias, usando o menor número possível que descreva o negócio principal;</li>
        <li>horário, inclusive em feriados;</li>
        <li>site;</li>
        <li>descrição do negócio;</li>
        <li>fotos e vídeos;</li>
        <li>atributos relevantes para quem procura.</li>
      </List>
      <Callout label="Atenção" tone="neutral">
        <p className="text-[1.1rem] font-semibold leading-snug text-fg">
          Otimizar não significa manipular.
        </p>
        <p>
          As{" "}
          <A href={GUIDELINES_URL} external>
            diretrizes do Google para representar sua empresa
          </A>{" "}
          pedem que o nome no perfil reflita o nome real do negócio, usado de maneira consistente na
          fachada, no site e nos materiais da empresa. Adicionar informações desnecessárias ao nome,
          como serviços, slogans ou localização, não é permitido e pode levar à suspensão do perfil.
        </p>
      </Callout>

      <H2 id="avaliacoes">Avaliações também fazem parte da presença local</H2>
      <P>
        Imagine duas empresas hipotéticas aparecendo lado a lado na mesma pesquisa:
      </P>
      <Versus
        label="Exemplo conceitual de dois perfis na mesma pesquisa"
        joiner="versus"
        highlight="second"
        sides={[
          {
            label: "Empresa A",
            title: "Perfil parado",
            items: ["Perfil incompleto", "Poucas fotos", "Avaliações antigas", "Nenhuma resposta"],
          },
          {
            label: "Empresa B",
            title: "Perfil cuidado",
            items: [
              "Informações atualizadas",
              "Fotos do lugar e do serviço",
              "Avaliações recentes",
              "Respostas da empresa",
            ],
          },
        ]}
      />
      <P>
        Antes mesmo de entrar em qualquer site, quem pesquisa já tem elementos para comparar as duas.
        E, como vimos, o Google informa que a quantidade de avaliações e as classificações podem
        contribuir para a classificação local. O Google também recomenda{" "}
        <A href={REPLY_REVIEWS_URL} external>
          ler e responder às avaliações
        </A>
        : segundo ele, respostas úteis mostram que a empresa se importa com os clientes.
      </P>
      <Callout label="Limites" tone="neutral">
        <p>
          Avaliação precisa refletir uma experiência real. A{" "}
          <A href={REVIEWS_POLICY_URL} external>
            política de conteúdo do Google Maps
          </A>{" "}
          proíbe engajamento falso, como avaliações pagas, e não permite oferecer pagamento,
          descontos, produtos ou serviços gratuitos em troca de avaliações, nem pedir avaliações
          positivas só aos clientes satisfeitos. A empresa pode pedir avaliações genuínas, desde que
          não ofereça incentivos nem tente influenciar a nota ou o conteúdo.
        </p>
      </Callout>

      <H2 id="site-e-perfil">Seu site e seu Perfil da Empresa não deveriam funcionar separados</H2>
      <StepChain
        label="Como site, perfil e Google se conectam até o cliente"
        steps={[
          { title: "Site", text: "Explica em detalhe quem é a empresa, o que faz e onde atua." },
          { title: "Perfil da Empresa", text: "Leva essas informações para a Pesquisa e o Maps." },
          { title: "Google", text: "Cruza o que encontra para decidir quando mostrar a empresa." },
          { title: "Cliente", text: "Encontra informação coerente e decide com mais segurança." },
        ]}
      />
      <P>
        O site é onde a empresa explica, com espaço, quem é, o que oferece, onde atua, quais serviços
        presta e quais problemas resolve. Isso ajuda tanto as pessoas quanto os mecanismos de busca a
        entender o negócio. O Perfil da Empresa acrescenta outra camada a essa presença, na
        Pesquisa e no Maps, e pode levar quem pesquisa direto para o site.
      </P>
      <P>
        Quando o site diz uma coisa e o perfil diz outra, quem pesquisa percebe, e a empresa perde
        confiança justamente no momento da escolha.
      </P>
      <PullQuote>
        SEO local não deveria ser tratado como “arrumar o Maps”. É construir presença local
        consistente.
      </PullQuote>

      <H2 id="varias-regioes">Uma empresa com várias regiões precisa pensar diferente</H2>
      <P>
        Empresas com várias unidades, ou que atendem clientes em várias cidades, precisam de uma
        estratégia própria. E é aqui que aparecem as tentações mais arriscadas: criar perfis para
        lugares onde a empresa não opera, usar escritórios virtuais só para aparecer em outra cidade
        ou publicar dezenas de páginas iguais trocando apenas o nome do município.
      </P>
      <P>
        As{" "}
        <A href={GUIDELINES_URL} external>
          diretrizes do Google
        </A>{" "}
        são claras sobre alguns pontos:
      </P>
      <List>
        <li>
          Somente empresas que têm contato direto com os clientes podem ter um Perfil da Empresa;
          negócios que só funcionam on-line não se qualificam.
        </li>
        <li>
          Um endereço alugado apenas para correspondência, onde a empresa não opera (escritório
          virtual), não se qualifica. Caixas postais também não são aceitas.
        </li>
        <li>
          Empresas que atendem no local do cliente e não recebem clientes no endereço não devem
          mostrar o endereço; informam a área de atendimento.
        </li>
        <li>
          Deve haver um perfil por empresa, e não se deve criar mais de uma página para o mesmo
          local. Unidades distintas, com equipe própria, podem ter perfis próprios.
        </li>
      </List>
      <P>
        A consequência para quem quer crescer em outras regiões é simples: a presença local precisa
        acompanhar a operação real. Primeiro a empresa passa a atender de verdade aquela região;
        depois a presença digital mostra isso. Páginas regionais no site devem ter conteúdo útil
        para quem mora ali, e não ser cópias com o nome da cidade trocado.
      </P>

      <H2 id="jornada">O Google Maps não deveria existir isolado da aquisição</H2>
      <FlowRow
        label="Jornada de aquisição local"
        steps={[
          "Pesquisa",
          "Google / Maps",
          "Perfil da Empresa",
          "Site",
          "Contato",
          "Atendimento",
          "Oportunidade",
        ]}
      />
      <P>
        Aparecer bem é apenas uma etapa. Depois que a pessoa encontra a empresa, outros gargalos
        podem desperdiçar a mesma oportunidade:
      </P>
      <List>
        <li>site confuso ou que não explica o serviço;</li>
        <li>página lenta no celular;</li>
        <li>WhatsApp sem resposta;</li>
        <li>atendimento demorado;</li>
        <li>nenhum registro de quem entrou em contato;</li>
        <li>nenhum retorno para quem não fechou na primeira conversa;</li>
        <li>nenhuma forma de medir de onde vieram os contatos.</li>
      </List>
      <P>
        Se esses pontos soam familiares, os artigos sobre{" "}
        <A href="/blog/leads-clinica-nao-agendam">leads da clínica que não agendam</A> e sobre{" "}
        <A href="/blog/escritorio-contatos-poucos-contratos">escritórios que recebem contatos e fecham poucos contratos</A>{" "}
        mostram como encontrar em que etapa as oportunidades se perdem.
      </P>
      <PullQuote>
        O objetivo não deveria ser simplesmente ficar bem posicionado no Maps. O objetivo deveria
        ser transformar intenção local em uma jornada de aquisição mensurável.
      </PullQuote>

      <H2 id="seo-local-e-anuncios">
        Antes de investir mais em anúncios, descubra o que acontece com a demanda que já existe
      </H2>
      <P>
        SEO local e tráfego pago não são rivais. Cada um cumpre um papel:
      </P>
      <Versus
        label="SEO local e Google Ads como estratégias que se somam"
        joiner="+"
        highlight="both"
        sides={[
          {
            label: "Orgânico",
            title: "SEO local",
            items: [
              "Constrói presença orgânica na Pesquisa e no Maps",
              "Depende de informação, reputação e consistência",
              "Resultado que se acumula com o tempo",
            ],
          },
          {
            label: "Pago",
            title: "Google Ads",
            items: [
              "Aumenta a exposição paga nas pesquisas",
              "Permite escolher termos, regiões e horários",
              "Funciona enquanto houver investimento",
            ],
          },
        ]}
      />
      <P>
        As duas estratégias podem coexistir, e muitas vezes deveriam. Mas mesmo quem já investe em
        mídia precisa saber como a empresa aparece organicamente. Se o anúncio leva a pessoa a um
        perfil abandonado ou a um site que não responde às dúvidas dela, parte da verba trabalha
        contra a própria empresa. É por isso que{" "}
        <A href="/#solucoes">as soluções da Shark</A> tratam mídia, conteúdo e site como partes da
        mesma estrutura.
      </P>

      <H2 id="teste">Faça este teste agora</H2>
      <P>
        Abra o Google e o Google Maps no celular e pesquise como um cliente pesquisaria, sem usar o
        nome da sua empresa:
      </P>
      <SearchQueries
        label="Pesquisas para o teste"
        queries={["serviço + cidade", "serviço + bairro", "serviço perto de mim", "categoria + cidade"]}
      />
      <P>Depois, observe:</P>
      <Checklist
        label="Checklist da mini auditoria de presença local"
        items={[
          { q: "Minha empresa aparece?" },
          { q: "Em qual contexto?", look: "No mapa, na lista de empresas, nos resultados do site ou em nenhum." },
          { q: "Quem aparece antes?" },
          { q: "Meu perfil está completo?" },
          { q: "Meu site está conectado ao perfil?" },
          { q: "Meu horário está correto?" },
          { q: "Meu telefone está correto?" },
          { q: "Existem avaliações?" },
          { q: "As avaliações recebem respostas?" },
          { q: "Os serviços estão claros?" },
          { q: "O cliente consegue entrar em contato facilmente?" },
        ]}
      />
      <Callout label="Antes de tirar conclusões" tone="neutral">
        <p>
          Resultados locais variam conforme a localização de quem pesquisa, o contexto e outros
          fatores. Uma pesquisa isolada não deve ser tratada como medição definitiva de ranking. Use
          o teste para enxergar o cenário, não para dar nota à empresa.
        </p>
      </Callout>

      <H2 id="infraestrutura">Presença local é infraestrutura de aquisição</H2>
      <P>
        Na Shark Digital, acreditamos que aquisição não começa necessariamente no anúncio. Ela
        começa quando existe uma intenção.
      </P>
      <P>
        Se alguém procura exatamente pelo serviço que sua empresa oferece e encontra três
        concorrentes antes de encontrar você, existe uma oportunidade de aquisição que merece ser
        investigada.
      </P>
      <FlowRow
        label="Componentes da presença local"
        joiner="+"
        steps={[
          "SEO local",
          "Perfil da Empresa",
          "Site",
          "Conteúdo",
          "Reputação",
          "Mídia",
          "Mensuração",
          "Atendimento",
        ]}
      />
      <P>
        <Strong>Cada elemento resolve uma parte diferente da jornada.</Strong> Nenhum deles,
        sozinho, garante resultado, e é por isso que o{" "}
        <A href="/#metodo">método de trabalho da Shark</A> começa entendendo o negócio antes de
        escolher canais.
      </P>
      <P>A pergunta não deveria ser apenas:</P>
      <PullQuote>“Minha empresa está cadastrada no Google?”</PullQuote>
      <P>A pergunta mais importante é:</P>
      <PullQuote>
        “Quando meu cliente procura pelo que eu vendo, minha empresa é uma das opções que ele
        encontra?”
      </PullQuote>
      <P>
        <Strong>
          Seu cliente já está procurando. A questão é se ele encontra você ou encontra seu
          concorrente.
        </Strong>
      </P>
    </>
  );
}
