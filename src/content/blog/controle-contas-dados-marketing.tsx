import type { ArticleCtaCopy } from "@/components/blog/article-cta";
import {
  A,
  Callout,
  CompareColumns,
  DataTable,
  FlowRow,
  H2,
  List,
  P,
  PullQuote,
  StepChain,
  Strong,
  TagGrid,
} from "@/components/blog/prose";

/*
 * Brief and structure supplied by Shark. Platform statements come only from
 * the Google help pages listed in `sources` (checked on 2026-10-07). This is
 * operational governance, not legal advice: no claims about legal ownership
 * of data, no statistics, cases or results.
 */

const GTM_URL = "https://support.google.com/tagmanager/answer/6107011?hl=pt-br";
const ADS_URL = "https://support.google.com/google-ads/answer/9978556?hl=pt-BR";
const GA_USERS_URL = "https://support.google.com/analytics/answer/9305788?hl=pt-BR";
const GA_ROLES_URL = "https://support.google.com/analytics/answer/9305587?hl=pt-BR";

export const toc = [
  { id: "pergunta-antes-de-contratar", label: "A pergunta antes de contratar" },
  { id: "ativos-digitais", label: "Quais são os ativos digitais" },
  { id: "operar-e-possuir", label: "Operar uma conta e ser dono dela" },
  { id: "teste-da-troca", label: "O teste da troca de agência" },
  { id: "dados-patrimonio", label: "Dados como patrimônio operacional" },
  { id: "historico", label: "O histórico não deveria recomeçar" },
  { id: "unico-administrador", label: "O risco do único administrador" },
  { id: "estrutura-madura", label: "Como funciona uma estrutura madura" },
  { id: "inventario", label: "Inventário dos ativos" },
  { id: "governanca-performance", label: "Governança e performance" },
  { id: "papel-da-agencia", label: "O papel de uma agência" },
  { id: "na-shark", label: "Na Shark, acesso não é posse" },
];

export const sources = [
  {
    label: "Ajuda do Gerenciador de tags: como gerenciar usuários e permissões",
    href: GTM_URL,
  },
  { label: "Ajuda do Google Ads: sobre os níveis de acesso na sua conta", href: ADS_URL },
  {
    label: "Ajuda do Google Analytics: adicionar, editar e excluir usuários e grupos de usuários",
    href: GA_USERS_URL,
  },
  {
    label: "Ajuda do Google Analytics: gerenciamento de restrição de dados e acesso",
    href: GA_ROLES_URL,
  },
];

export const cta: ArticleCtaCopy = {
  title: "Sua operação depende demais do fornecedor atual?",
  text: "Antes de aumentar o investimento em anúncios, entenda como estão organizadas suas contas, dados, mensuração e estrutura de aquisição.",
  buttonLabel: "Falar com a Shark",
  whatsappText:
    "Olá, Shark! Li o artigo sobre controle de contas e dados de marketing e quero entender como está organizada a estrutura da minha empresa.",
};

export default function Article() {
  return (
    <>
      <p className="text-pretty text-[1.2rem] leading-[1.65] text-fg md:text-[1.3rem]">
        Sua empresa investe em marketing há meses. Existem campanhas rodando, públicos
        construídos, conversões configuradas, dados acumulados e decisões sendo tomadas a partir
        dessas informações. Então você decide trocar de agência. E descobre um problema: a conta
        não está no seu nome.
      </p>
      <P>A partir daí, outras descobertas costumam aparecer:</P>
      <List>
        <li>o acesso administrativo pertence ao fornecedor;</li>
        <li>ninguém sabe quem criou o Google Analytics;</li>
        <li>o Google Tag Manager está no e-mail de um ex-funcionário;</li>
        <li>o pixel foi configurado em uma estrutura externa;</li>
        <li>o domínio não tem documentação;</li>
        <li>o CRM tem usuários que ninguém reconhece.</li>
      </List>
      <P>
        Esse problema costuma permanecer invisível enquanto tudo está funcionando. Ele aparece
        justamente quando a empresa mais precisa ter controle.
      </P>

      <H2 id="pergunta-antes-de-contratar">
        A pergunta que poucas empresas fazem antes de contratar marketing
      </H2>
      <P>Na hora de contratar uma agência ou um gestor de tráfego, as perguntas mais comuns são:</P>
      <List>
        <li>Quanto vamos investir?</li>
        <li>Quantos anúncios serão criados?</li>
        <li>Qual será o CPL?</li>
        <li>Quando começaremos?</li>
      </List>
      <P>Todas são legítimas. Mas falta uma:</P>
      <PullQuote>
        <p>Quem será o proprietário das contas e dos dados?</p>
      </PullQuote>
      <P>
        Essa resposta vai além da rotina operacional. Ela define quem decide sobre usuários, quem
        guarda o histórico e quem consegue continuar o trabalho se a relação mudar. Isso é{" "}
        <Strong>governança de marketing</Strong>.
      </P>

      <H2 id="ativos-digitais">Quais são os ativos digitais envolvidos</H2>
      <P>
        Uma operação de aquisição costuma se apoiar em várias contas, ferramentas e configurações.
        Cada uma guarda uma parte do trabalho já feito:
      </P>
      <TagGrid
        label="Ativos digitais de marketing"
        items={[
          "Google Ads",
          "Meta Ads",
          "Google Analytics",
          "Google Tag Manager",
          "Pixels",
          "Eventos",
          "Conversões",
          "Públicos",
          "Domínio",
          "Hospedagem",
          "CRM",
          "Landing pages",
          "Search Console",
          "Dashboards",
          "Histórico de campanhas",
        ]}
      />
      <P>
        Nem toda empresa usa todos esses itens. O importante é saber quais existem na sua operação
        e em nome de quem cada um está.
      </P>

      <H2 id="operar-e-possuir">A diferença entre operar uma conta e ser dono dela</H2>
      <P>
        Operar e possuir são papéis diferentes. Uma agência ou um gestor opera: recebe acesso,
        executa, analisa e otimiza. A empresa possui: mantém o controle administrativo e decide
        quem entra e quem sai.
      </P>
      <CompareColumns
        label="Comparação entre operar e possuir uma conta de marketing"
        columns={[
          {
            eyebrow: "Operar",
            title: "Agência ou gestor",
            steps: ["Recebe acesso", "Executa campanhas", "Analisa dados", "Otimiza"],
          },
          {
            eyebrow: "Possuir",
            title: "Empresa",
            steps: [
              "Mantém controle administrativo",
              "Mantém histórico",
              "Controla usuários",
              "Preserva ativos",
            ],
            tone: "accent",
          },
        ]}
      />
      <PullQuote>
        <p>Uma agência precisa de acesso. Isso é diferente de precisar ser proprietária de tudo.</p>
      </PullQuote>
      <P>
        Haverá casos em que o fornecedor precisa de acesso administrativo para configurar algo. Isso
        é normal. O problema aparece quando a empresa não tem controle administrativo sobre os
        próprios ativos.
      </P>
      <P>
        As próprias plataformas separam esses papéis. No Google Ads, por exemplo, o nível Padrão
        permite editar campanhas, mas não gerenciar usuários; conceder acesso, alterar níveis e
        cancelar convites fica com o nível Admin.{" "}
        <A href={ADS_URL} external>
          Níveis de acesso do Google Ads
        </A>
      </P>
      <P>Dois cenários ajudam a enxergar a diferença:</P>
      <CompareColumns
        label="Delegação e dependência"
        columns={[
          {
            eyebrow: "Cenário A",
            title: "“Minha agência possui acesso à minha conta.”",
            steps: ["A conta é da empresa", "A agência recebe permissão"],
            result: "Delegação",
            tone: "accent",
          },
          {
            eyebrow: "Cenário B",
            title: "“Minha agência possui a conta à qual eu tenho acesso.”",
            steps: ["A conta é do fornecedor", "A empresa recebe permissão"],
            result: "Dependência",
          },
        ]}
      />
      <P>
        Essa distinção é um princípio de governança operacional. Ela não é uma regra jurídica, e
        questões contratuais ou de propriedade de dados devem ser avaliadas com assessoria
        especializada.
      </P>

      <H2 id="teste-da-troca">O teste da troca de agência</H2>
      <PullQuote>
        <p>Se sua agência desaparecesse amanhã, sua empresa conseguiria continuar operando?</p>
      </PullQuote>
      <P>
        Continuar operando não significa manter exatamente a mesma performance. Significa
        conseguir acessar:
      </P>
      <TagGrid
        label="O que a empresa precisa conseguir acessar"
        items={[
          "Campanhas",
          "Históricos",
          "Públicos",
          "Analytics",
          "Conversões",
          "Tag Manager",
          "Domínio",
          "CRM",
          "Site",
          "Dashboards",
          "Integrações",
        ]}
      />
      <P>
        E conseguir adicionar um novo fornecedor sem depender da autorização do antigo.
      </P>
      <Callout label="Se a resposta for “não sei”">
        <p>Existe uma questão de governança que precisa ser investigada.</p>
      </Callout>

      <H2 id="dados-patrimonio">Dados também são patrimônio operacional</H2>
      <P>Cada ativo guarda uma parte da inteligência que a empresa construiu:</P>
      <DataTable
        caption="O que cada ativo costuma guardar"
        head={["Ativo", "O que guarda"]}
        rows={[
          ["Conta de anúncios", "Histórico de campanhas"],
          ["Analytics", "Comportamento e mensuração"],
          ["CRM", "Jornada comercial"],
          ["Tag Manager", "Arquitetura de eventos e conversões"],
          ["Pixels", "Sinais e audiências, conforme plataforma e configuração"],
          ["Dashboards", "Inteligência acumulada"],
        ]}
      />
      <PullQuote>
        <p>Quando uma empresa perde acesso, não perde apenas uma senha.</p>
        <p>Pode perder continuidade.</p>
      </PullQuote>

      <H2 id="historico">O histórico não deveria recomeçar a cada fornecedor</H2>
      <P>
        Quando cada fornecedor monta a própria estrutura, cada troca recomeça o trabalho:
      </P>
      <FlowRow
        label="Cada troca de agência recomeça a estrutura"
        steps={[
          "Agência A · estrutura própria",
          "Agência B · nova estrutura",
          "Agência C · começa de novo",
        ]}
      />
      <P>O resultado tende a ser:</P>
      <List>
        <li>contas fragmentadas;</li>
        <li>históricos espalhados;</li>
        <li>pixels diferentes;</li>
        <li>tags duplicadas;</li>
        <li>dashboards desconectados;</li>
        <li>dados difíceis de comparar;</li>
        <li>responsabilidades indefinidas.</li>
      </List>
      <P>O modelo mais saudável coloca a infraestrutura no centro, sob controle da empresa:</P>
      <StepChain
        label="A infraestrutura da empresa permanece enquanto os fornecedores mudam"
        steps={[
          { title: "Empresa" },
          { title: "Infraestrutura central", text: "Contas, dados, mensuração e histórico" },
          { title: "Agência A, depois B, depois C", text: "Cada uma recebe acesso à mesma base" },
        ]}
      />
      <P>Os fornecedores mudam. A infraestrutura permanece.</P>
      <PullQuote>
        <p>
          Cada fornecedor deveria melhorar uma estrutura que continua pertencendo à empresa.
        </p>
      </PullQuote>

      <H2 id="unico-administrador">Existe também o risco do único administrador</H2>
      <P>O problema não acontece apenas com agências. Um roteiro comum:</P>
      <StepChain
        label="Como uma empresa perde acesso pelo único administrador"
        steps={[
          { title: "Um funcionário cria as contas" },
          { title: "Usa o próprio e-mail" },
          { title: "Torna-se o único administrador" },
          { title: "Sai da empresa" },
          { title: "Ninguém sabe recuperar determinados acessos" },
        ]}
      />
      <P>
        A documentação do Google Tag Manager trata exatamente desse risco. Ela avisa que é possível
        perder o acesso à conta se o único administrador mudar e orienta planejar para que existam
        sempre pelo menos duas contas de administrador ativas.
      </P>
      <P>
        A mesma página recomenda confirmar que a conta é gerenciada por alguém da própria
        organização, e não por uma agência externa, e configurar vários administradores com contas
        de usuário reais em vez de logins compartilhados. Ela também explica que, se uma conta ou
        um contêiner ficar sem administrador, ele é excluído automaticamente, e quem tem acesso de
        leitura tem 30 dias para exportá-lo.{" "}
        <A href={GTM_URL} external>
          Ajuda do Gerenciador de tags
        </A>
      </P>
      <P>
        No Google Analytics, só quem tem o papel de administrador consegue adicionar ou alterar
        usuários, e o último administrador não pode se autoexcluir.{" "}
        <A href={GA_USERS_URL} external>
          Ajuda do Google Analytics
        </A>
      </P>

      <H2 id="estrutura-madura">Como deveria funcionar uma estrutura mais madura</H2>
      <P>Cinco etapas organizam a gestão de acessos sem travar o trabalho do fornecedor:</P>
      <StepChain
        label="Cinco etapas de uma estrutura de governança de marketing"
        steps={[
          {
            title: "A empresa mantém o controle principal",
            text: "A organização tem contas administrativas próprias quando a plataforma permitir, de preferência contas corporativas.",
          },
          {
            title: "A agência recebe acesso",
            text: "Fornecedores recebem as permissões necessárias para executar o trabalho.",
          },
          {
            title: "As funções são separadas",
            text: "Nem todos precisam ser administradores. Cada pessoa recebe o nível de acesso adequado.",
          },
          {
            title: "Os acessos são documentados",
            text: "Usuário, plataforma, nível, responsabilidade, motivo do acesso, data e status.",
          },
          {
            title: "Existe processo de offboarding",
            text: "Quando alguém sai: revisar acessos, remover permissões, transferir responsabilidades, conferir ativos e documentar mudanças.",
          },
        ]}
      />
      <P>
        As plataformas oferecem níveis para isso. No Google Analytics existem os papéis
        Administrador, Editor, Profissional de marketing, Analista e Leitor, e apenas o
        Administrador gerencia usuários.{" "}
        <A href={GA_ROLES_URL} external>
          Papéis do Google Analytics
        </A>
      </P>
      <P>
        No Tag Manager, as permissões de contêiner vão de Leitura até Publicação, e só a
        Publicação permite publicar alterações no site.{" "}
        <A href={GTM_URL} external>
          Permissões do Tag Manager
        </A>
      </P>

      <H2 id="inventario">Faça um inventário dos ativos de marketing</H2>
      <P>
        A tabela abaixo é um modelo conceitual para começar a conversa. Ela não é uma estrutura
        obrigatória para todas as empresas: cada operação tem seus próprios ativos e acordos.
      </P>
      <DataTable
        caption="Exemplo de inventário de ativos de marketing (modelo conceitual)"
        head={["Ativo", "Proprietário", "Admin interno", "Agência", "Status"]}
        rows={[
          ["Google Ads", "Empresa", "✓", "✓", "OK"],
          ["Meta Ads", "Empresa", "✓", "✓", "OK"],
          ["Analytics", "Empresa", "✓", "✓", "OK"],
          ["Tag Manager", "Empresa", "✓", "✓", "OK"],
          ["Domínio", "Empresa", "✓", "—", "OK"],
          ["CRM", "Empresa", "✓", "✓", "OK"],
          ["Site", "Empresa", "✓", "✓", "OK"],
        ]}
      />
      <PullQuote>
        <p>A questão não é seguir exatamente essa tabela.</p>
        <p>A questão é: alguém na sua empresa consegue preenchê-la?</p>
      </PullQuote>

      <H2 id="governanca-performance">Governança também faz parte da performance</H2>
      <P>O modelo tradicional de performance olha para a camada visível:</P>
      <FlowRow
        label="Camada visível da performance"
        steps={["Criativos", "Campanhas", "Segmentação", "CPL", "Conversão"]}
      />
      <P>Abaixo dela existe outra camada, a infraestrutura:</P>
      <TagGrid
        label="Camada de infraestrutura"
        items={["Contas", "Dados", "Acessos", "Mensuração", "Histórico", "Documentação"]}
      />
      <P>
        Campanhas podem performar bem enquanto a infraestrutura continua frágil. O problema só
        aparece quando algo muda: um fornecedor sai, um funcionário deixa a empresa ou alguém
        precisa comparar resultados de períodos diferentes.
      </P>
      <PullQuote>
        <p>Performance sem governança cria dependência.</p>
        <p>Performance com governança constrói patrimônio operacional.</p>
      </PullQuote>
      <P>
        Para entender como medir o caminho do anúncio até a venda, veja também o{" "}
        <A href="/blog/leads-clinica-nao-agendam">guia sobre leads que não agendam</A>.
      </P>

      <H2 id="papel-da-agencia">O papel de uma agência não deveria ser criar dependência</H2>
      <P>
        Uma estrutura pode ficar no nome do fornecedor por motivos simples, como pressa no início
        do projeto ou falta de alguém interno para criar as contas. Seja qual for o motivo, o
        efeito para a empresa é a dependência.
      </P>
      <P>
        Uma parceria deveria ser mantida pelo valor entregue, e não pela dificuldade operacional
        de substituir o fornecedor.
      </P>
      <PullQuote>
        <p>
          Uma boa relação entre empresa e agência não precisa ser sustentada pela dificuldade de
          sair.
        </p>
        <p>Precisa ser sustentada pelo valor de permanecer.</p>
      </PullQuote>
      <P>
        Se você está avaliando a parceria atual, o artigo{" "}
        <A href="/blog/agencia-nao-entende-meu-segmento">
          como avaliar se a agência entende seu segmento
        </A>{" "}
        traz perguntas para levar à reunião.
      </P>

      <H2 id="na-shark">Na Shark, acesso não deveria significar posse</H2>
      <P>
        Aquisição envolve mais do que anúncios. Existe uma infraestrutura por trás: contas, dados,
        mensuração, permissões, processos e histórico.
      </P>
      <P>
        Por isso, uma operação madura precisa ser construída pensando também no que acontece daqui
        a um, dois ou três anos.
      </P>
      <P>
        A agência pode mudar. O gestor pode mudar. A equipe interna pode mudar. O patrimônio
        digital construído pela empresa precisa continuar com ela.
      </P>
      <P>
        A Shark organiza o trabalho em <Strong>Atração, Engajamento e Venda</Strong>, e o site
        apresenta as <A href="/#metodo">etapas desse método</A> e os{" "}
        <A href="/clientes">projetos e entregas</A> já realizados.
      </P>
      <PullQuote>
        <p>Antes de investir mais em mídia, talvez exista uma pergunta mais importante:</p>
        <p>sua empresa realmente controla aquilo que já construiu?</p>
      </PullQuote>
    </>
  );
}
