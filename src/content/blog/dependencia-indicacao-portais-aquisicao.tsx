import type { ArticleCtaCopy } from "@/components/blog/article-cta";
import {
  A,
  Callout,
  Checklist,
  DataTable,
  FlowRow,
  H2,
  List,
  P,
  PullQuote,
  SearchQueries,
  Strong,
  TagGrid,
  Versus,
} from "@/components/blog/prose";

/*
 * Editorial rules for this post: no percentages of dependence, portal
 * statistics, search volumes, Shark results or cases, and no promise of
 * position. Indicação, portais and marketplaces are never called "bad" or
 * "unscalable": the argument is concentration of risk. Statements about how
 * Google works come only from the official Google help pages in `sources`.
 */

const BUSINESS_HELP_URL = "https://support.google.com/business/";
const RANKING_URL = "https://support.google.com/business/answer/7091?hl=pt-BR";
const BUSINESS_INFO_URL = "https://support.google.com/business/answer/2721884?hl=pt-BR";
const CREATE_PROFILE_URL = "https://support.google.com/business/answer/7039811?hl=pt-BR";

export const toc = [
  { id: "indicacao", label: "Indicação é excelente, até virar dependência" },
  { id: "problema", label: "O problema não é ter indicação" },
  { id: "portais", label: "O mesmo acontece com portais" },
  { id: "proprio-vs-alugado", label: "Canal próprio e canal alugado" },
  { id: "teste", label: "O teste da dependência" },
  { id: "aprendizado", label: "Dependência limita aprendizado" },
  { id: "google", label: "Estar no Google é presença própria" },
  { id: "demanda-fora", label: "Demanda fora do portal" },
  { id: "nao-abandonar", label: "Não abandonar o que funciona" },
  { id: "risco", label: "Quanto maior a dependência, maior o risco" },
  { id: "ativos", label: "Ativos que permanecem" },
  { id: "nova-dependencia", label: "Não trocar uma dependência por outra" },
  { id: "portfolio", label: "Aquisição como portfólio" },
  { id: "imobiliario", label: "Mercado imobiliário" },
  { id: "servicos", label: "Escritórios e empresas de serviço" },
  { id: "tempo", label: "Construir leva tempo" },
  { id: "diagnostico", label: "Faça este diagnóstico" },
  { id: "shark", label: "Canal não é estratégia" },
];

export const sources = [
  {
    label: "Ajuda do Perfil da Empresa no Google (central de ajuda)",
    href: BUSINESS_HELP_URL,
  },
  {
    label: "Ajuda do Perfil da Empresa no Google: Dicas para melhorar sua classificação local no Google",
    href: RANKING_URL,
  },
  {
    label: "Ajuda do Perfil da Empresa no Google: Como o Google disponibiliza e usa informações nos Perfis de Empresas e nos resultados da pesquisa local",
    href: BUSINESS_INFO_URL,
  },
  {
    label: "Ajuda do Perfil da Empresa no Google: Crie seu Perfil da Empresa no Google",
    href: CREATE_PROFILE_URL,
  },
];

export const cta: ArticleCtaCopy = {
  title: "Se seu maior canal parasse amanhã, sua empresa continuaria gerando oportunidades?",
  text: "Antes de aumentar investimento no canal que já funciona, entenda o nível de concentração da sua aquisição e quais ativos próprios ainda precisam ser construídos.",
  buttonLabel: "Falar com a Shark",
  whatsappText:
    "Olá, Shark! Li o artigo sobre dependência de indicação e portais e quero entender o quanto a aquisição da minha empresa está concentrada.",
};

export default function Article() {
  return (
    <>
      <p className="text-pretty text-[1.2rem] leading-[1.65] text-fg md:text-[1.3rem]">
        Tem empresa que olha para o próprio histórico de vendas e conclui: “Nosso marketing
        funciona.”
      </p>
      <P>Mas, quando você pergunta de onde vieram os clientes, a resposta é:</P>
      <List>
        <li>“Indicação.”</li>
        <li>“Portal.”</li>
        <li>“Marketplace.”</li>
        <li>“Parceiro.”</li>
        <li>“Rede de contatos.”</li>
      </List>
      <P>
        Nada disso é ruim. São fontes legítimas, muitas vezes ótimas, e várias empresas cresceram
        assim. O problema aparece quando quase toda a aquisição depende delas, e a empresa não tem
        outra forma de gerar oportunidades se uma dessas fontes diminuir.
      </P>
      <PullQuote>
        Existe uma diferença entre receber oportunidades e ter uma estrutura própria de aquisição.
      </PullQuote>

      <H2 id="indicacao">Indicação é excelente, até virar dependência</H2>
      <P>Poucos canais têm as vantagens de uma boa indicação:</P>
      <List>
        <li>
          <Strong>confiança transferida:</Strong> o cliente chega acreditando em quem indicou;
        </li>
        <li>
          <Strong>relacionamento:</Strong> já existe uma história antes da primeira conversa;
        </li>
        <li>
          <Strong>menor resistência inicial:</Strong> a negociação começa num ponto mais avançado;
        </li>
        <li>
          <Strong>autoridade:</Strong> a recomendação funciona como prova de competência.
        </li>
      </List>
      <P>
        A limitação é outra: <Strong>você não controla quando alguém vai indicar sua empresa.</Strong>{" "}
        A indicação depende de variáveis que estão do lado de quem indica:
      </P>
      <TagGrid
        label="Variáveis que decidem se uma indicação acontece"
        items={["Lembrança", "Momento", "Relacionamento", "Rede de contatos", "Contexto", "Satisfação"]}
      />
      <P>
        Um cliente satisfeito pode passar meses sem encontrar ninguém que precise do seu serviço.
        Isso não diz nada sobre a qualidade do seu trabalho. Diz apenas que o ritmo da indicação
        não é decidido pela sua empresa.
      </P>
      <PullQuote>
        Indicação pode gerar excelentes oportunidades. Mas dificilmente deveria ser o único motor de
        crescimento.
      </PullQuote>

      <H2 id="problema">O problema não é ter indicação</H2>
      <P>
        Ter clientes que recomendam a empresa é sinal de que o trabalho é bem feito. A questão
        aparece em outra pergunta:
      </P>
      <PullQuote>O que acontece quando ninguém indica naquele mês?</PullQuote>
      <P>
        Se a resposta é que o comercial praticamente para, a agenda esvazia e a equipe fica
        esperando o telefone tocar, a empresa não tem um canal de indicação. Tem uma dependência
        dele. Isso não é motivo para pânico. É uma informação sobre onde a aquisição precisa de
        estrutura.
      </P>

      <H2 id="portais">O mesmo acontece com portais</H2>
      <P>
        O mercado imobiliário é o exemplo mais claro. Um portal reúne imóveis publicados por várias
        imobiliárias, pessoas pesquisando ativamente, ferramentas de comparação e um fluxo de
        contatos para quem anuncia. É uma estrutura valiosa, e faz sentido que muitas imobiliárias
        estejam lá.
      </P>
      <P>Mas é importante entender onde a conversa acontece:</P>
      <PullQuote>O cliente está dentro da audiência de outra empresa.</PullQuote>
      <P>Dentro do portal, quem decide é a plataforma:</P>
      <TagGrid
        label="O que a plataforma controla"
        items={[
          "O ambiente",
          "A distribuição dos anúncios",
          "As regras",
          "Os formatos",
          "Os planos e preços",
          "Quais concorrentes aparecem ao lado",
        ]}
      />
      <P>
        Nenhuma dessas decisões é da sua empresa. Você pode usar bem o portal, mas joga no campo de
        outro, com as regras de outro e ao lado dos seus concorrentes.
      </P>

      <H2 id="proprio-vs-alugado">A diferença entre canal próprio e canal alugado</H2>
      <P>
        Uma forma simples de organizar isso é separar os canais que a empresa aluga dos ativos que
        ela constrói e controla:
      </P>
      <Versus
        label="Canal alugado e canal próprio"
        joiner="e"
        highlight="second"
        sides={[
          {
            label: "Canal alugado",
            title: "Audiência e regras de terceiros",
            items: ["Portal", "Marketplace", "Plataforma", "Parceiro", "Rede social"],
          },
          {
            label: "Canal próprio",
            title: "Ativos que a empresa controla",
            items: [
              "Site",
              "SEO",
              "CRM",
              "Conteúdo",
              "Base de contatos",
              "Presença no Google",
              "Landing pages",
              "Dados",
              "Processos comerciais",
            ],
          },
        ]}
      />
      <P>
        Nenhum precisa excluir o outro. O problema é possuir muitos canais alugados e quase nenhum
        ativo próprio. Se a sua base de contatos, seus dados e suas contas de anúncio também estão
        nas mãos de terceiros, vale ler sobre{" "}
        <A href="/blog/controle-contas-dados-marketing">quem é dono das contas e dos dados de marketing</A>
        .
      </P>

      <H2 id="teste">O teste da dependência</H2>
      <P>Faça a pergunta com calma, de preferência com quem cuida do comercial:</P>
      <PullQuote>
        Se amanhã seu principal canal parasse de trazer oportunidades, o que sua empresa faria?
      </PullQuote>
      <P>Alguns cenários que acontecem com qualquer canal:</P>
      <Checklist
        label="Cenários que afetam um canal de aquisição"
        items={[
          { q: "O portal aumenta o preço do plano." },
          { q: "Um parceiro encerra a relação." },
          { q: "As indicações caem por alguns meses." },
          { q: "A plataforma muda uma regra." },
          { q: "Os concorrentes aumentam o investimento no mesmo canal." },
          { q: "O algoritmo muda e o alcance diminui." },
          { q: "O marketplace perde demanda." },
        ]}
      />
      <Callout label="Sinal de alerta">
        <p>
          Se a resposta for “precisaríamos começar o marketing do zero”, existe risco de
          concentração.
        </p>
      </Callout>

      <H2 id="aprendizado">Dependência também limita aprendizado</H2>
      <P>
        Saber que o cliente “veio do portal” ou “veio por indicação” é útil, mas não responde
        perguntas que ajudam a gerar o próximo cliente:
      </P>
      <List>
        <li>o que ele pesquisou;</li>
        <li>qual dor tinha;</li>
        <li>que conteúdo viu;</li>
        <li>por que escolheu sua empresa;</li>
        <li>quais canais participaram da decisão;</li>
        <li>quanto tempo levou;</li>
        <li>qual mensagem gerou interesse.</li>
      </List>
      <P>
        Quando a oportunidade nasce dentro de um ambiente de terceiros, boa parte dessas respostas
        fica lá. A empresa vende, mas aprende pouco sobre como vendeu.
      </P>
      <PullQuote>Receber oportunidades não é o mesmo que entender como criá-las.</PullQuote>

      <H2 id="google">Estar no Google também é construir presença própria</H2>
      <P>
        O Google{" "}
        <A href={BUSINESS_INFO_URL} external>
          mostra Perfis de Empresas na Pesquisa e no Maps
        </A>
        . Empresas que têm contato direto com clientes, num endereço ou numa área de atendimento,{" "}
        <A href={CREATE_PROFILE_URL} external>
          podem criar e gerenciar o próprio perfil
        </A>{" "}
        e cuidar de informações como:
      </P>
      <TagGrid
        label="Informações do Perfil da Empresa no Google"
        items={[
          "Telefone",
          "Site",
          "Horário",
          "Endereço ou área atendida",
          "Fotos",
          "Avaliações",
          "Serviços",
        ]}
      />
      <P>
        O perfil não garante posição. O próprio Google explica que os{" "}
        <A href={RANKING_URL} external>
          resultados locais
        </A>{" "}
        consideram relevância, distância e destaque, e que não é possível pagar nem pedir uma
        classificação melhor. Algumas informações, como fotos e avaliações, também vêm de clientes.
        O que muda é a natureza da presença: ela é mantida pela empresa e não depende de alguém
        lembrar dela.
      </P>
      <PullQuote>
        Em vez de depender apenas de alguém recomendar, a empresa começa a ser encontrada quando
        existe busca ativa.
      </PullQuote>
      <P>
        Se sua empresa ainda não aparece quando alguém procura pelo seu serviço, o artigo sobre{" "}
        <A href="/blog/empresa-nao-aparece-google-maps">empresas que não aparecem no Google Maps</A>{" "}
        mostra como o Google escolhe quem aparece e o que costuma atrapalhar.
      </P>

      <H2 id="demanda-fora">Existe demanda que acontece fora do portal</H2>
      <P>Pense em pesquisas como estas:</P>
      <SearchQueries
        label="Exemplos de pesquisas fora de portais"
        queries={[
          "imobiliária em Foz do Iguaçu",
          "apartamento à venda em [bairro]",
          "advogado trabalhista em [cidade]",
          "clínica perto de mim",
          "empresa de energia solar em [cidade]",
        ]}
      />
      <P>
        Essa intenção existe fora de qualquer portal específico. A pessoa abriu o Google, não uma
        plataforma. Se a empresa só existe dentro do portal, essa busca é atendida por outra.
      </P>

      <H2 id="nao-abandonar">O objetivo não é abandonar o que já funciona</H2>
      <P>Uma aquisição mais resiliente costuma combinar várias frentes:</P>
      <TagGrid
        label="Frentes de aquisição que podem conviver"
        items={[
          "Indicação",
          "Portal",
          "Google",
          "Tráfego pago",
          "SEO",
          "Conteúdo",
          "Parcerias",
          "Base própria",
        ]}
      />
      <List>
        <li>Se indicação funciona, preserve.</li>
        <li>Se portal funciona, preserve.</li>
        <li>Se marketplace funciona, continue avaliando.</li>
      </List>
      <P>
        O objetivo é reduzir concentração, não trocar o que dá resultado por uma aposta.
      </P>

      <H2 id="risco">Quanto maior a dependência, maior o risco</H2>
      <P>Ao avaliar um canal, a maioria das empresas faz só a primeira pergunta:</P>
      <Versus
        label="Duas perguntas para avaliar um canal"
        joiner="+"
        highlight="both"
        sides={[
          {
            label: "Pergunta 1",
            title: "Esse canal funciona?",
            items: ["Traz oportunidades?", "As oportunidades fecham?"],
          },
          {
            label: "Pergunta 2",
            title: "Quanto do meu crescimento depende dele?",
            items: ["O que sobra se ele cair?", "Quanto tempo levaria para compensar?"],
          },
        ]}
      />
      <P>
        Um cenário hipotético ajuda a enxergar: duas empresas fecham o mesmo número de contratos no
        mês. Na primeira, quase todos vieram do mesmo portal. Na segunda, vieram de indicação,
        Google, anúncios e clientes antigos. O resultado do mês é igual. O risco não é.
      </P>

      <H2 id="ativos">A empresa precisa construir ativos que permanecem</H2>
      <P>
        Campanha acaba, contrato com plataforma acaba, parceria acaba. Alguns ativos, porém, se
        acumulam com o tempo:
      </P>
      <TagGrid
        label="Ativos de aquisição que se acumulam"
        items={[
          "Marca",
          "Conteúdo",
          "Site",
          "Páginas indexadas",
          "CRM",
          "Base de clientes",
          "Dados",
          "Avaliações",
          "Presença local",
          "Processos",
          "Histórico",
          "Inteligência comercial",
        ]}
      />
      <PullQuote>
        Quanto mais ativos próprios a empresa constrói, menos precisa reiniciar do zero quando um
        fornecedor ou plataforma muda.
      </PullQuote>

      <H2 id="nova-dependencia">O Google também não deveria virar uma nova dependência única</H2>
      <P>
        A saída para a dependência de portal não é depender só de outro canal. Concentrar tudo em
        Google, Meta, SEO, anúncios ou indicação repete o mesmo problema com outro nome.
      </P>
      <P>
        O Google também tem regras próprias. Os resultados locais são definidos pelos critérios do
        Google, e{" "}
        <A href={RANKING_URL} external>
          nenhuma empresa pode comprar ou pedir uma posição melhor
        </A>{" "}
        no Maps. Ninguém controla o ranking, por isso ninguém deveria prometer posição.
      </P>
      <Callout label="Diversificar é montar um sistema">
        <p>
          Diversificação não é ter um pouco de tudo. É ter canais com funções diferentes, conectados
          ao mesmo atendimento e medidos do mesmo jeito.
        </p>
      </Callout>

      <H2 id="portfolio">Uma operação de aquisição parece mais com um portfólio</H2>
      <P>Cada canal cumpre uma função diferente:</P>
      <DataTable
        caption="Função de cada canal num portfólio de aquisição"
        head={["Canal", "Função principal"]}
        rows={[
          ["Indicação", "Confiança"],
          ["Portal", "Distribuição"],
          ["SEO", "Presença orgânica"],
          ["Google Maps", "Descoberta local"],
          ["Tráfego pago", "Distribuição controlável"],
          ["Conteúdo", "Autoridade"],
          ["CRM", "Gestão"],
          ["Base própria", "Relacionamento"],
        ]}
      />
      <P>
        Como num portfólio de investimentos, nenhum item precisa carregar tudo sozinho. Quando um
        canal oscila, os outros seguram parte da operação.
      </P>

      <H2 id="imobiliario">Para o mercado imobiliário, essa questão fica ainda mais evidente</H2>
      <P>
        Uma imobiliária pode continuar usando portal e, ao mesmo tempo, construir uma estrutura
        própria em volta dele:
      </P>
      <FlowRow
        label="Modelo de aquisição para imobiliária"
        joiner="+"
        steps={[
          "Portal",
          "Site próprio",
          "Páginas de bairro",
          "Páginas de imóveis",
          "SEO local",
          "Google",
          "Meta Ads",
          "Google Ads",
          "Remarketing",
          "CRM",
          "Base de interessados",
        ]}
      />
      <P>
        Quem pesquisou um bairro, visitou uma página de imóvel ou deixou contato passa a fazer parte
        da base da imobiliária, e não só da audiência do portal.
      </P>
      <PullQuote>
        O portal continua sendo canal. Deixa apenas de ser a estratégia inteira.
      </PullQuote>

      <H2 id="servicos">O mesmo vale para escritórios e empresas de serviço</H2>
      <DataTable
        caption="Fonte de oportunidades que costuma concentrar a aquisição em cada tipo de negócio"
        head={["Tipo de negócio", "Fonte que costuma concentrar"]}
        rows={[
          ["Advocacia", "Indicação"],
          ["Clínicas", "Médicos parceiros"],
          ["Empresas B2B", "Networking dos sócios"],
          ["Prestadores de serviço", "Marketplaces"],
        ]}
      />
      <P>A pergunta é a mesma para todos:</P>
      <PullQuote>
        Se essa fonte diminuir, existe outra máquina capaz de gerar oportunidades?
      </PullQuote>

      <H2 id="tempo">Construir aquisição própria leva tempo</H2>
      <P>Vale ser honesto sobre isso:</P>
      <List>
        <li>SEO leva tempo;</li>
        <li>conteúdo leva tempo;</li>
        <li>marca leva tempo;</li>
        <li>CRM exige disciplina;</li>
        <li>campanhas exigem teste;</li>
        <li>processo comercial precisa amadurecer.</li>
      </List>
      <P>
        Por isso faz sentido começar enquanto o canal atual ainda funciona. É nesse momento que a
        empresa tem caixa, clientes e calma para testar.
      </P>
      <PullQuote>
        O pior momento para começar a construir aquisição própria é quando o único canal já parou de
        funcionar.
      </PullQuote>

      <H2 id="diagnostico">Faça este diagnóstico</H2>
      <P>
        Pegue as oportunidades dos últimos três meses: contatos, orçamentos ou reuniões, o que a
        sua empresa registrar. Classifique cada uma pela origem:
      </P>
      <Checklist
        label="Origens para classificar as oportunidades"
        items={[
          { q: "Indicação" },
          { q: "Portal" },
          { q: "Google" },
          { q: "Tráfego pago" },
          { q: "Redes sociais" },
          { q: "Parceiros" },
          { q: "Site" },
          { q: "Clientes antigos" },
          { q: "Prospecção" },
          { q: "Outros" },
        ]}
      />
      <P>Depois, faça a pergunta:</P>
      <PullQuote>Se retirarmos o maior canal, o que sobra?</PullQuote>
      <P>
        Esse exercício simples mostra a concentração da aquisição com dados da própria empresa. Se
        muitas oportunidades ficarem sem origem conhecida, isso também é um achado: a empresa ainda
        não registra de onde vêm seus clientes.
      </P>

      <H2 id="shark">Na Shark, canal não deveria ser confundido com estratégia</H2>
      <P>
        Na Shark Digital, acreditamos que portal, indicação, Google, Meta ou qualquer outra fonte
        são canais. A estratégia está acima deles. Ela define:
      </P>
      <List>
        <li>onde existe demanda;</li>
        <li>quais canais fazem sentido;</li>
        <li>como distribuí-los;</li>
        <li>como medir;</li>
        <li>como capturar dados;</li>
        <li>como atender;</li>
        <li>como acompanhar oportunidades;</li>
        <li>como reduzir dependência.</li>
      </List>
      <P>
        Gerar mais oportunidades só resolve parte do problema se elas não forem acompanhadas até a
        decisão. Sobre essa etapa, veja{" "}
        <A href="/blog/follow-up-leads-vendas">o que acontece depois que o lead chega</A>.
      </P>
      <PullQuote>
        <p>Uma empresa não deveria precisar abandonar um canal que funciona.</p>
        <p>Ela deveria evitar ficar refém dele.</p>
      </PullQuote>
      <P>
        <Strong>
          Indicação é valiosa. Portal pode ser valioso. Mas crescimento mais resiliente exige também
          ativos próprios de aquisição.
        </Strong>
      </P>
    </>
  );
}
