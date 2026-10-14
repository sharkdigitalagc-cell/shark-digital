import type { ArticleCtaCopy } from "@/components/blog/article-cta";
import {
  A,
  Callout,
  Checklist,
  CompareColumns,
  DataTable,
  FlowRow,
  H2,
  List,
  P,
  PullQuote,
  Strong,
  TagGrid,
  Versus,
} from "@/components/blog/prose";

/*
 * Brief and structure supplied by Shark. Legal statements are limited to the
 * text of Código Civil arts. 421 and 421-A as given by Lei 13.874/2019 on
 * planalto.gov.br (read on 2026-10-07). The compiled Código Civil page could
 * not be read past art. 244 from here, so no other article, limit or
 * percentage is cited. No case law, statistics, cases or results.
 */

const CC_URL = "https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm";
const LEI_13874_URL = "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13874.htm";

export const toc = [
  { id: "reduzir-incerteza", label: "O contrato deveria reduzir incerteza" },
  { id: "prazo-e-fidelidade", label: "Prazo contratual e fidelidade" },
  { id: "doze-meses", label: "“12 meses é obrigatório?”" },
  { id: "prazo-e-operacao", label: "O prazo e a operação" },
  { id: "multa", label: "Uma multa não deveria ser surpresa" },
  { id: "cancelamento-processo", label: "Cancelamento também é processo" },
  { id: "teste-do-cancelamento", label: "O teste do cancelamento" },
  { id: "retencao-aprisionamento", label: "Retenção e aprisionamento" },
  { id: "contrato-e-confianca", label: "Contrato não substitui confiança" },
  { id: "dois-lados", label: "Proteção dos dois lados" },
  { id: "antes-de-assinar", label: "Antes de assinar" },
  { id: "experiencia-do-cliente", label: "Contrato e experiência do cliente" },
  { id: "na-shark", label: "Na Shark, permanência é consequência" },
];

export const sources = [
  { label: "Código Civil, Lei nº 10.406/2002 (texto compilado, Planalto)", href: CC_URL },
  {
    label: "Lei nº 13.874/2019, art. 7º: redação dos arts. 421 e 421-A do Código Civil (Planalto)",
    href: LEI_13874_URL,
  },
];

export const cta: ArticleCtaCopy = {
  title: "Você sabe exatamente o que está assinando com sua agência?",
  text: "Antes de contratar ou renovar uma operação de marketing, vale entender não apenas preço e entregas, mas também prazo, cancelamento, acessos, dados e responsabilidades.",
  buttonLabel: "Falar com a Shark",
  whatsappText:
    "Olá, Shark! Li o artigo sobre contrato com agência de marketing e quero entender como funciona a contratação, o prazo e o encerramento com vocês.",
};

export default function Article() {
  return (
    <>
      <p className="text-pretty text-[1.2rem] leading-[1.65] text-fg md:text-[1.3rem]">
        A proposta foi bem recebida. A estratégia faz sentido, o escopo está claro e o preço cabe
        no orçamento. Mesmo assim, a decisão trava numa pergunta: “E se eu quiser cancelar
        depois?”
      </p>
      <P>
        Nem sempre a objeção está no preço, na estratégia ou na qualidade do trabalho. Muitas
        vezes ela está no medo do que vem junto com a assinatura:
      </P>
      <List>
        <li>um contrato longo;</li>
        <li>uma multa que ninguém explicou direito;</li>
        <li>um aviso prévio extenso;</li>
        <li>uma renovação automática esquecida;</li>
        <li>um cancelamento confuso;</li>
        <li>ativos presos ao fornecedor;</li>
        <li>contas de anúncios e dados sob controle de terceiros.</li>
      </List>
      <P>
        Quem já passou por uma experiência ruim com fornecedor conhece esse receio. E quem nunca
        passou costuma ter ouvido alguma história parecida.
      </P>
      <PullQuote>
        <p>Quando isso acontece, o contrato deixa de ser percebido como proteção.</p>
        <p>Passa a ser percebido como risco.</p>
      </PullQuote>

      <H2 id="reduzir-incerteza">O contrato deveria reduzir incerteza, não criar medo</H2>
      <P>
        Um <Strong>contrato com agência de marketing</Strong> existe para deixar claro o que foi
        combinado. Bem escrito, ele organiza a relação antes que surjam dúvidas:
      </P>
      <TagGrid
        label="O que um contrato de prestação de serviços de marketing pode organizar"
        items={[
          "Escopo",
          "Responsabilidades",
          "Preço",
          "Prazo",
          "Entregas",
          "Acessos",
          "Confidencialidade",
          "Propriedade de ativos",
          "Cancelamento",
          "Encerramento",
        ]}
      />
      <P>
        A maior parte das negociações se concentra nos primeiros itens. Os últimos costumam ficar
        para depois, e é justamente neles que aparecem as surpresas.
      </P>
      <PullQuote>
        <p>Uma boa negociação não deveria responder apenas “quanto custa?”.</p>
        <p>Deveria responder também “como essa relação termina se deixar de fazer sentido?”.</p>
      </PullQuote>

      <H2 id="prazo-e-fidelidade">Prazo contratual e fidelidade não são exatamente a mesma coisa</H2>
      <P>
        No uso comercial, as duas palavras costumam ser misturadas. Mas a sensação que provocam é
        diferente. Prazo descreve por quanto tempo as partes planejam trabalhar juntas.
        Fidelidade, na percepção de muitos clientes, soa como a obrigação de ficar mesmo quando a
        relação deixou de funcionar.
      </P>
      <P>
        Períodos mínimos podem ter lógica operacional. Uma operação de marketing costuma exigir
        trabalho antes de produzir sinais confiáveis:
      </P>
      <FlowRow
        label="Etapas iniciais de uma operação de marketing"
        steps={[
          "Setup",
          "Configuração",
          "Mensuração",
          "Campanhas",
          "Testes",
          "Coleta de dados",
          "Otimização",
        ]}
      />
      <P>A pergunta útil, então, é outra: por que esse prazo existe?</P>
      <P>Algumas justificativas são legítimas:</P>
      <List>
        <li>
          <Strong>estruturação inicial:</Strong> contas, rastreamento e páginas precisam ser
          montados;
        </li>
        <li>
          <Strong>investimento operacional:</Strong> as primeiras semanas costumam concentrar mais
          horas de trabalho;
        </li>
        <li>
          <Strong>condição comercial:</Strong> um valor mensal menor em troca de um período maior;
        </li>
        <li>
          <Strong>capacidade reservada:</Strong> a equipe é alocada para aquele cliente;
        </li>
        <li>
          <Strong>previsibilidade:</Strong> os dois lados planejam com mais segurança.
        </li>
      </List>
      <P>
        Prazo mínimo não é errado por definição. O que pesa é ele ter motivo conhecido, estar
        escrito com clareza e ser compatível com o que será entregue.
      </P>

      <H2 id="doze-meses">“Contrato de 12 meses é obrigatório?”</H2>
      <P>
        Não. Não existe uma regra universal que determine um prazo mínimo ou máximo único para
        toda contratação de agência de marketing. Regras de outros setores, como as de
        telecomunicações, não se aplicam automaticamente a contratos de marketing entre empresas.
      </P>
      <P>
        A referência principal para esse tipo de contrato é o{" "}
        <A href={CC_URL} external>
          Código Civil (Lei nº 10.406/2002)
        </A>
        . Na redação dada pela{" "}
        <A href={LEI_13874_URL} external>
          Lei nº 13.874/2019
        </A>
        , ele estabelece que a liberdade contratual é exercida nos limites da função social do
        contrato (art. 421) e que contratos civis e empresariais se presumem paritários e
        simétricos, salvo elementos concretos que justifiquem afastar essa presunção (art. 421-A).
      </P>
      <P>
        O mesmo art. 421-A diz que as partes podem estabelecer parâmetros objetivos para
        interpretar as cláusulas e seus pressupostos de revisão ou de resolução, e que a alocação
        de riscos definida por elas deve ser respeitada.
      </P>
      <Callout label="Na prática">
        <p>
          Entre empresas, prazo, multa e regras de saída são, em grande parte, aquilo que as
          partes combinaram. Por isso é tão importante entender o contrato antes de assinar, e não
          depois.
        </p>
        <p>
          Os efeitos concretos de cada cláusula dependem do contrato, das partes e do contexto.
        </p>
      </Callout>

      <H2 id="prazo-e-operacao">O prazo precisa conversar com a operação</H2>
      <P>
        Marketing pode exigir tempo. Antes de uma campanha ser avaliada com segurança, costuma ser
        preciso passar por:
      </P>
      <TagGrid
        label="O que costuma exigir tempo numa operação de marketing"
        items={[
          "Setup",
          "Tracking",
          "Criativos",
          "Campanhas",
          "Landing pages",
          "Testes",
          "Dados",
          "Ajustes",
        ]}
      />
      <P>
        O problema aparece quando prazo e entrega não conversam: um período longo sem plano de
        trabalho, sem marcos e sem momentos de revisão.
      </P>
      <Versus
        label="Prazo sem plano e prazo com justificativa"
        joiner="versus"
        highlight="second"
        sides={[
          {
            label: "Prazo sem plano",
            title: "Parece aprisionamento",
            items: ["Ninguém sabe por que existe", "Não há marcos", "Não há revisão"],
          },
          {
            label: "Prazo com justificativa",
            title: "Pode criar previsibilidade",
            items: ["Motivo conhecido", "Etapas e entregas definidas", "Pontos de revisão"],
          },
        ]}
      />

      <H2 id="multa">Uma multa não deveria ser uma surpresa</H2>
      <P>
        O Código Civil admite que as partes prevejam no contrato uma cláusula penal, isto é, uma
        multa para determinadas situações, como o descumprimento do que foi combinado. O que ela
        cobre e como é calculada depende do que estiver escrito.
      </P>
      <P>
        Isso não significa que toda multa seja válida, nem que toda multa seja abusiva. A validade
        e o valor de uma cláusula dependem do contrato e do caso concreto, e essa análise cabe a um
        profissional habilitado.
      </P>
      <P>Para quem está decidindo, a pergunta prática é mais simples:</P>
      <PullQuote>
        <p>
          “Eu sei exatamente qual é a consequência financeira se eu encerrar este contrato antes
          do prazo?”
        </p>
      </PullQuote>
      <P>
        Se a resposta exige procurar a cláusula, interpretar uma fórmula ou perguntar à agência,
        vale esclarecer antes de assinar. Uma <Strong>multa rescisória</Strong> que só fica clara
        na hora de sair costuma virar conflito.
      </P>

      <H2 id="cancelamento-processo">Cancelamento também precisa ter processo</H2>
      <P>
        Cancelar um contrato de marketing não é apenas parar a cobrança. Uma operação ativa deixa
        coisas em andamento e ativos espalhados:
      </P>
      <TagGrid
        label="O que pode estar envolvido no encerramento de um contrato de marketing"
        items={[
          "Contas",
          "Acessos",
          "Anúncios",
          "Criativos",
          "Landing pages",
          "Site",
          "Analytics",
          "Tag Manager",
          "Dashboards",
          "CRM",
          "Integrações",
          "Arquivos",
          "Dados",
          "Permissões",
        ]}
      />
      <P>
        Se as contas e os dados estiverem no nome do fornecedor, a saída fica bem mais difícil. O
        artigo{" "}
        <A href="/blog/controle-contas-dados-marketing">
          sobre o controle de contas e dados de marketing
        </A>{" "}
        mostra como organizar acessos para que a empresa continue dona do que construiu.
      </P>
      <PullQuote>
        <p>Um contrato não deveria explicar apenas como entrar.</p>
        <p>Deveria explicar também como sair.</p>
      </PullQuote>

      <H2 id="teste-do-cancelamento">O teste do cancelamento</H2>
      <P>Antes de assinar, faça uma pergunta simples à agência e a você mesmo:</P>
      <Callout label="A pergunta central">
        <p>“Se daqui a seis meses decidirmos encerrar a parceria, exatamente o que acontece?”</p>
      </Callout>
      <P>Uma resposta completa cobre pelo menos estes pontos:</P>
      <DataTable
        caption="O teste do cancelamento"
        head={["Tema", "O que perguntar"]}
        rows={[
          ["Aviso", "Existe aviso prévio? De quanto tempo?"],
          ["Financeiro", "Existe multa? Como ela é calculada?"],
          ["Acessos", "Quem remove as permissões, e quando?"],
          ["Ativos", "Quem fica com o quê: contas, criativos, páginas, site?"],
          ["Dados", "Como o histórico e as informações são preservados?"],
          ["Entregas em andamento", "O que acontece com o que já começou?"],
          ["Transição", "Existe passagem organizada para outra equipe?"],
        ]}
      />
      <P>
        Se a agência responde com clareza, é um bom sinal. Se a resposta for vaga, vale pedir que
        ela fique registrada no contrato.
      </P>

      <H2 id="retencao-aprisionamento">
        A empresa não deveria precisar ficar porque sair é difícil
      </H2>
      <P>Clientes podem permanecer com um fornecedor por dois motivos bem diferentes:</P>
      <Versus
        label="Retenção e aprisionamento"
        joiner="versus"
        sides={[
          {
            label: "Retenção",
            title: "O cliente permanece porque percebe valor",
          },
          {
            label: "Aprisionamento",
            title: "O cliente permanece porque sair parece caro, confuso ou arriscado",
          },
        ]}
      />
      <P>Alguns sinais indicam dependência:</P>
      <List>
        <li>contas de anúncios e de mensuração sob controle do fornecedor;</li>
        <li>site preso a uma estrutura que a empresa não acessa;</li>
        <li>multa obscura ou difícil de calcular;</li>
        <li>falta de documentação sobre o que foi configurado;</li>
        <li>dados difíceis de recuperar;</li>
        <li>nenhum processo de transição previsto.</li>
      </List>
      <PullQuote>
        <p>
          Uma boa relação entre empresa e agência deveria ser sustentada por resultado percebido,
          confiança, processo e valor.
        </p>
      </PullQuote>

      <H2 id="contrato-e-confianca">Contrato não deveria substituir confiança</H2>
      <P>
        Pedir um contrato claro não é sinal de desconfiança. O contrato registra expectativas e
        ajuda a evitar que cada lado se lembre de um acordo diferente.
      </P>
      <P>
        Isso importa porque as relações mudam. Ao longo de uma parceria podem mudar o orçamento, a
        equipe, a estratégia, as prioridades, os resultados e o próprio contexto da empresa. Um
        contrato que já prevê revisão e saída acompanha essas mudanças sem que tudo vire
        negociação de emergência.
      </P>

      <H2 id="dois-lados">O contrato deveria proteger os dois lados</H2>
      <P>
        Cancelamento sem nenhuma regra também não é saudável. A agência assume riscos quando
        aceita um cliente: reserva equipe, inicia o setup, contrata ferramentas, recusa outros
        projetos e investe horas antes de o trabalho dar retorno.
      </P>
      <CompareColumns
        label="O que protege cada lado do contrato"
        columns={[
          {
            eyebrow: "Cliente",
            title: "O que protege o cliente?",
            steps: [
              "Escopo e entregas claros",
              "Regras de saída conhecidas",
              "Contas e dados em nome da empresa",
              "Transição prevista",
            ],
            result: "Relação equilibrada",
            tone: "accent",
          },
          {
            eyebrow: "Fornecedor",
            title: "O que protege o fornecedor?",
            steps: [
              "Prazo coerente com o setup",
              "Aviso prévio para realocar a equipe",
              "Pagamento pelo trabalho realizado",
              "Responsabilidades do cliente definidas",
            ],
            result: "Relação equilibrada",
            tone: "accent",
          },
        ]}
      />

      <H2 id="antes-de-assinar">Antes de assinar, procure estas respostas</H2>
      <Checklist
        label="Checklist antes de assinar um contrato com agência de marketing"
        items={[
          { q: "Qual é o prazo?" },
          { q: "Existe período mínimo?", look: "Se existe, por quê?" },
          { q: "Existe renovação automática?" },
          { q: "Como cancelar?", look: "Existe aviso prévio?" },
          { q: "Existe multa?", look: "Como ela é calculada?" },
          { q: "O que acontece em caso de descumprimento, de qualquer um dos lados?" },
          { q: "Quem é dono das contas?" },
          { q: "Quem é dono dos dados?" },
          { q: "Quem é dono dos criativos?" },
          { q: "Quem controla o site?" },
          { q: "Como funciona a transição?" },
          { q: "Quais ativos são entregues no encerramento?" },
        ]}
      />
      <Callout label="Se não estiver claro">
        <p>Se essas respostas não estão claras antes da assinatura, deveriam estar.</p>
      </Callout>

      <H2 id="experiencia-do-cliente">Contrato é parte da experiência do cliente</H2>
      <P>
        O contrato é um dos primeiros documentos que o cliente lê com atenção. Ele comunica,
        antes de qualquer campanha:
      </P>
      <TagGrid
        label="O que um contrato comunica"
        items={["Previsibilidade", "Maturidade", "Governança", "Organização", "Responsabilidade"]}
      />
      <P>
        Um contrato confuso pode desgastar a confiança antes de a operação começar. Um contrato
        claro faz o contrário: mostra que a agência pensou também no que acontece quando as coisas
        mudam.
      </P>
      <P>
        Se você está avaliando a parceria atual, o artigo{" "}
        <A href="/blog/agencia-nao-entende-meu-segmento">
          como avaliar se a agência entende seu segmento
        </A>{" "}
        traz perguntas para levar à próxima reunião.
      </P>

      <H2 id="na-shark">Na Shark, permanência deveria ser consequência de valor</H2>
      <P>
        Na Shark Digital, acreditamos que uma relação entre agência e cliente não deveria depender
        de cláusulas que o cliente só entende quando tenta sair.
      </P>
      <P>
        O contrato precisa estabelecer regras. Precisa proteger a operação. Precisa definir
        responsabilidades. Mas também precisa permitir que ambas as partes saibam, desde o início:
      </P>
      <List>
        <li>como a parceria funciona;</li>
        <li>o que cada lado precisa entregar;</li>
        <li>o que acontece se houver problemas;</li>
        <li>como funciona o encerramento;</li>
        <li>e o que permanece com a empresa depois dele.</li>
      </List>
      <P>
        O trabalho da Shark é organizado em <Strong>Atração, Engajamento e Venda</Strong>. Você
        pode ver as <A href="/#metodo">etapas desse método</A> e os{" "}
        <A href="/portfolio">projetos e entregas</A> já realizados.
      </P>
      <PullQuote>
        <p>Uma parceria comercial saudável não deveria partir da pergunta:</p>
        <p>“Como impedimos esse cliente de cancelar?”</p>
        <p>Mas de outra:</p>
        <p>“Como construímos uma operação que ele queira continuar?”</p>
      </PullQuote>
      <p className="mt-12 border-t border-line pt-5 text-sm leading-relaxed text-muted">
        Este conteúdo possui caráter informativo e discute governança e relações comerciais em
        serviços de marketing. Não constitui parecer ou orientação jurídica. A validade e os
        efeitos de cláusulas contratuais dependem do instrumento, das partes, do contexto e da
        legislação aplicável. Para análise de contrato específico, consulte profissional
        habilitado.
      </p>
    </>
  );
}
