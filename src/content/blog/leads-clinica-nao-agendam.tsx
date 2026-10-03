import { RevenueLeakDiagnostic } from "@/components/blog/revenue-leak-diagnostic";
import {
  A,
  Callout,
  DiagnosisTable,
  FlowRow,
  Formula,
  H2,
  List,
  P,
  StepChain,
  Strong,
} from "@/components/blog/prose";

/*
 * Editorial rules for this post: no market benchmarks or statistics (none
 * found with a reliable primary source), no Shark results or cases. External
 * claims are limited to official sources listed in SOURCES.
 */

export const toc = [
  { id: "onde-param", label: "Onde os leads estão parando" },
  { id: "leads-ruins", label: "1. Os leads realmente são ruins?" },
  { id: "tempo-resposta", label: "2. Tempo de resposta" },
  { id: "preco", label: "3. Perguntou o preço e sumiu" },
  { id: "conduzir", label: "4. Responder ou conduzir" },
  { id: "follow-up", label: "5. Follow-up" },
  { id: "whatsapp-crm", label: "6. WhatsApp como CRM" },
  { id: "agenda", label: "7. A própria agenda" },
  { id: "comparecimento", label: "8. Agendamento não é paciente" },
  { id: "atribuicao", label: "9. Atribuição" },
  { id: "marketing-ou-atendimento", label: "10. Marketing ou atendimento?" },
  { id: "metricas", label: "Métricas que vão até a receita" },
  { id: "diagnostico", label: "Diagnóstico de vazamento" },
  { id: "publicidade-medica", label: "Cuidados com publicidade médica" },
  { id: "por-onde-comecar", label: "Por onde começar" },
];

export const sources = [
  {
    label: "CFM: “CFM moderniza resolução da publicidade médica” (12/09/2023)",
    href: "https://portal.cfm.org.br/noticias/cfm-atualiza-resolucao-da-publicidade-medica/",
  },
  {
    label: "CFM: portal Publicidade Médica, com a Resolução nº 2.336/2023 e perguntas frequentes",
    href: "https://publicidademedica.cfm.org.br/",
  },
  {
    label: "Google Ads Ajuda: perguntas frequentes sobre importação de conversões offline",
    href: "https://support.google.com/google-ads/answer/10029210?hl=pt",
  },
  {
    label: "Google Ads Ajuda: configurar conversões offline",
    href: "https://support.google.com/google-ads/answer/16563287?hl=pt",
  },
  {
    label: "Meta for Developers: Conversions API",
    href: "https://developers.facebook.com/docs/marketing-api/conversions-api",
  },
  {
    label: "Lei nº 13.709/2018 (LGPD), art. 5º, II e art. 11",
    href: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
  },
];

const ACQUISITION_PATH = [
  "Mídia",
  "Página ou site",
  "Lead",
  "WhatsApp",
  "Qualificação",
  "Agendamento",
  "Comparecimento",
  "Paciente",
  "Receita",
];

export default function Article() {
  return (
    <>
      <p className="text-pretty text-[1.2rem] leading-[1.65] text-fg md:text-[1.3rem]">
        Receber contatos e ver poucos agendamentos é um sintoma, não um diagnóstico. Isso não
        prova que o tráfego está ruim, nem que a recepção está falhando. Prova apenas que, em algum
        ponto entre o anúncio e a consulta, potenciais pacientes estão ficando pelo caminho. A
        decisão certa (mexer na campanha, no atendimento, na agenda ou na mensuração) depende de
        saber <Strong>em qual etapa</Strong> isso acontece.
      </p>
      <P>
        Este guia mostra como localizar essa etapa com os dados que a clínica já tem ou consegue
        começar a registrar. No meio dele há uma{" "}
        <A href="#diagnostico">calculadora de diagnóstico</A> que aponta onde está a maior perda
        proporcional nos seus números.
      </P>

      <H2 id="onde-param">Antes de culpar os leads, descubra onde eles estão parando</H2>
      <P>
        O caminho de um paciente que chega pelo marketing é mais longo do que parece em relatórios
        de mídia:
      </P>
      <FlowRow steps={ACQUISITION_PATH} label="Caminho de aquisição de um paciente" />
      <P>
        O relatório do Google Ads ou do Meta costuma terminar no lead. A agenda mostra quem marcou.
        O financeiro mostra quem pagou. Quase ninguém olha o caminho inteiro de uma vez, e é por
        isso que a discussão vira “os leads são ruins” contra “a recepção não converte”. Para sair
        da opinião, divida o caminho em etapas que possam ser contadas:
      </P>
      <StepChain
        label="Etapas do funil para diagnóstico"
        steps={[
          { title: "Investimento", text: "Quanto foi gasto em mídia no período." },
          { title: "Clique ou visita", text: "Pessoas que chegaram à página ou ao perfil." },
          { title: "Lead", text: "Todo contato recebido: formulário, WhatsApp, ligação." },
          { title: "Lead válido", text: "Pessoa real, na região, buscando algo que a clínica oferece." },
          { title: "Respondido", text: "Recebeu uma primeira resposta útil." },
          { title: "Qualificado", text: "Tem necessidade, interesse e condição de seguir." },
          { title: "Agendado", text: "Saiu da conversa com data e horário." },
          { title: "Compareceu", text: "Foi à consulta ou avaliação." },
          { title: "Paciente", text: "Iniciou tratamento ou contratou o serviço." },
          { title: "Receita", text: "Valor efetivamente gerado por esses pacientes." },
        ]}
      />
      <P>
        Perdas em etapas diferentes apontam para investigações diferentes. Poucos leads levam a
        olhar demanda, mídia, segmentação, oferta e página. Muitos leads inválidos levam a termos
        de pesquisa, público, região, mensagem e formulário. Leads válidos sem resposta apontam para
        processo de atendimento. Agendamentos com muitas faltas apontam para confirmação e
        pré-consulta. Nenhuma dessas relações é automática: são{" "}
        <Strong>pontos de partida para investigar</Strong>, não veredictos.
      </P>

      <H2 id="leads-ruins">1. Os leads realmente são ruins?</H2>
      <P>
        “Lead ruim” costuma ser uma impressão formada pelas últimas conversas difíceis. Para
        transformar impressão em evidência, cada lead que não avançou precisa de um{" "}
        <Strong>motivo de perda registrado</Strong>, escolhido de uma lista fechada:
      </P>
      <List>
        <li>Contato inválido (número errado, spam, duplicado)</li>
        <li>Fora da região atendida</li>
        <li>Procura um serviço que a clínica não oferece</li>
        <li>Só pesquisando, sem intenção de marcar agora</li>
        <li>Parou de responder</li>
        <li>Preço ou forma de pagamento</li>
        <li>Não havia horário compatível</li>
        <li>Escolheu outra clínica</li>
        <li>Outro (com uma frase explicando)</li>
      </List>
      <P>
        Com algumas semanas de registro, a pergunta muda de “os leads são ruins?” para “qual
        proporção é inválida, e de onde ela vem?”. Se os inválidos se concentram em uma campanha, o
        problema provavelmente está ali. Se estão espalhados, vale olhar o formulário e a mensagem
        do anúncio. E se a maioria dos perdidos é válida, a conversa sobre qualidade de lead
        deixa de explicar o resultado.
      </P>
      <P>
        Defina por escrito o que é um lead válido e o que é um lead qualificado. Sem critério
        comum, marketing e recepção contam coisas diferentes e os números nunca batem.
      </P>

      <H2 id="tempo-resposta">2. Quanto tempo sua clínica demora para responder?</H2>
      <P>
        Muitos conteúdos citam um tempo ideal de resposta, quase sempre sem fonte verificável. Mais
        útil do que perseguir o número de outra pessoa é medir o da sua clínica. Para cada lead,
        registre três coisas:
      </P>
      <Formula>horário de chegada → horário da primeira resposta útil → resultado da conversa</Formula>
      <P>
        “Resposta útil” é a que faz a conversa andar. Uma mensagem automática de boas-vindas não
        conta. Com algumas semanas de dados, compare o resultado dos leads respondidos rápido com
        o dos respondidos tarde, e dos que chegaram dentro e fora do horário de atendimento. Se
        houver diferença consistente, você terá um argumento concreto para mudar escala, horário ou
        processo. Se não houver, o gargalo está em outro lugar.
      </P>

      <H2 id="preco">3. O paciente pergunta o preço e desaparece?</H2>
      <P>
        “Sumiu depois do preço” descreve a ordem dos acontecimentos, não a causa. A última mensagem
        antes do silêncio foi o valor, mas a pessoa pode ter sumido porque comparava várias
        clínicas, porque não entendeu o que estava incluído, porque o horário não servia ou porque
        nunca teve intenção de marcar.
      </P>
      <P>Para separar as situações, registre de forma diferente:</P>
      <List>
        <li>
          <Strong>Disse que achou caro</Strong> ou pediu desconto: objeção de preço declarada.
        </li>
        <li>
          <Strong>Perguntou sobre pagamento ou convênio</Strong> e não seguiu: possível barreira de
          forma de pagamento.
        </li>
        <li>
          <Strong>Parou de responder depois do valor</Strong>, sem comentar: motivo desconhecido,
          que só um retorno posterior pode esclarecer.
        </li>
      </List>
      <P>
        Também vale olhar como o preço foi apresentado. Um valor solto, sem explicar o que a
        consulta inclui e qual é o próximo passo, deixa o paciente sem base para comparar a não ser
        o número.
      </P>

      <H2 id="conduzir">4. Sua recepção responde ou conduz?</H2>
      <P>
        Responder é tirar a dúvida que a pessoa trouxe. Conduzir é, depois de responder, propor
        uma próxima ação concreta: oferecer dois ou três horários, explicar como funciona a
        primeira consulta, dizer o que levar. Uma recepção pode ser rápida e educada e ainda assim
        terminar a maioria das conversas sem nenhum próximo passo combinado.
      </P>
      <P>
        Leia uma amostra de conversas que não viraram agendamento e marque: houve proposta de
        horário? Houve uma pergunta que levasse à decisão? Ou a conversa terminou na resposta?
      </P>
      <Callout label="Limite importante" tone="neutral">
        <p>
          Conduzir é um papel administrativo. Perguntas sobre sintomas, indicação de tratamento ou
          resultado esperado são do profissional de saúde, na consulta. A recepção acolhe, informa
          como funciona o atendimento e leva à avaliação, sem orientar clinicamente.
        </p>
      </Callout>

      <H2 id="follow-up">5. Quantos leads recebem follow-up?</H2>
      <Callout label="A pergunta central">
        <p>
          Dos leads que não agendaram na primeira conversa, quantos têm uma próxima ação
          registrada, com data?
        </p>
      </Callout>
      <P>
        Se a resposta é “não sei”, o follow-up depende da memória de quem atende. Parte dos leads
        que não decidem na primeira conversa estava apenas sem tempo, esperando falar com alguém da
        família ou comparando opções. Sem uma próxima ação registrada, essas pessoas são
        esquecidas.
      </P>
      <P>
        O indicador é simples: leads não agendados com próxima ação registrada ÷ total de leads não
        agendados. O retorno precisa ser respeitoso e ter um limite de tentativas. Insistência
        demais incomoda e não melhora a decisão.
      </P>

      <H2 id="whatsapp-crm">6. Seu WhatsApp virou seu CRM?</H2>
      <P>
        Para muitas clínicas, o WhatsApp é onde tudo acontece, e a lista de conversas acaba
        funcionando como sistema de gestão. Isso funciona até certo ponto. Alguns sinais de que a
        organização manual perdeu a confiabilidade:
      </P>
      <List>
        <li>Mais de uma pessoa atende, ou há mais de um número ou aparelho.</li>
        <li>
          Ninguém consegue responder em poucos minutos quantos leads do mês passado ficaram sem
          retorno.
        </li>
        <li>O histórico some quando alguém sai da equipe ou troca de aparelho.</li>
        <li>Não há como saber de qual campanha veio cada contato.</li>
      </List>
      <P>
        O primeiro passo não precisa ser um software. Uma planilha com data, origem, etapa, motivo
        de perda e próxima ação, atualizada todo dia, já responde às perguntas deste guia. Um CRM
        passa a fazer sentido quando o volume ou o tamanho da equipe tornam a planilha difícil de
        manter. Em qualquer caso, desenhe o processo antes de escolher a ferramenta.
      </P>
      <P>
        Um cuidado: conversas com potenciais pacientes podem conter informações de saúde, que a
        LGPD classifica como dados pessoais sensíveis. Registre apenas o necessário para o
        atendimento comercial e limite quem tem acesso.
      </P>

      <H2 id="agenda">7. O problema pode estar na própria agenda</H2>
      <P>
        Às vezes o lead é bom, a conversa é bem conduzida e mesmo assim não há agendamento, porque
        o horário que a pessoa quer não existe. Isso aparece pouco nos relatórios, porque fica
        registrado (quando fica) como “não agendou”.
      </P>
      <P>Algumas perguntas para investigar:</P>
      <List>
        <li>Quantos dias, em média, entre o primeiro contato e a primeira vaga oferecida?</li>
        <li>Os horários pedidos (fim de tarde, sábado) existem na agenda?</li>
        <li>Os leads pedem um profissional específico que está sem vagas?</li>
        <li>Quantas perdas foram registradas como “não havia horário compatível”?</li>
      </List>
      <P>
        Se a agenda é o gargalo, aumentar a mídia só gera mais contatos que não cabem nela.
      </P>

      <H2 id="comparecimento">8. Agendamento não significa paciente</H2>
      <P>Depois do agendamento, ainda há duas passagens que podem esconder perdas:</P>
      <FlowRow
        steps={["Lead", "Agendamento", "Comparecimento", "Paciente"]}
        label="Do lead ao paciente"
      />
      <P>
        Uma clínica que mede só até o agendamento pode achar que o problema está resolvido enquanto
        uma parte relevante dos agendados falta. Outra pode ter bom comparecimento e perder na
        consulta, quando o plano ou orçamento é apresentado e o paciente leva para pensar.
      </P>
      <P>
        Faltas levam a investigar confirmação, facilidade de remarcar, intervalo entre a marcação
        e a consulta e as orientações enviadas antes dela. Comparecimento sem contratação leva a
        olhar como a proposta é apresentada e se existe acompanhamento de quem saiu com orçamento.
      </P>

      <H2 id="atribuicao">9. O marketing sabe quais leads viraram pacientes?</H2>
      <P>
        O Google Ads e o Meta registram conversões como envio de formulário ou clique para o
        WhatsApp. Isso é um lead, não um paciente. Se a informação sobre quem compareceu e contratou
        nunca volta para a mídia, as campanhas são avaliadas e otimizadas pelo volume de contatos,
        e não pela qualidade deles.
      </P>
      <P>
        As próprias plataformas preveem esse retorno. A ajuda do Google Ads descreve a importação de
        conversões offline para informar quais leads gerados pelos anúncios foram qualificados ou
        fecharam negócio no CRM, e observa que uma planilha do Google Sheets também pode servir de
        origem. A Conversions API do Meta permite enviar eventos do CRM e conversões offline para a
        plataforma. A configuração tem prazos e requisitos técnicos (estão nas{" "}
        <A href="#fontes">fontes</A> ao final).
      </P>
      <P>
        Antes disso, há um passo básico: saber a origem de cada lead. Links com parâmetros de
        campanha nas páginas, um campo de origem no formulário e mensagens pré-preenchidas
        diferentes nos botões de WhatsApp de cada canal ajudam mais do que perguntar ao paciente
        “como nos conheceu?”.
      </P>

      <H2 id="marketing-ou-atendimento">10. Como descobrir se o problema está no marketing ou no atendimento</H2>
      <P>
        Com as etapas contadas, a tabela abaixo ajuda a decidir por onde começar. Ela indica onde
        investigar primeiro, não a causa.
      </P>
      <DiagnosisTable
        caption="Sintoma observado nos números e primeiro lugar a investigar"
        head={["Sintoma", "Onde investigar primeiro"]}
        rows={[
          ["Poucos contatos", "Demanda na região, orçamento e alcance da mídia, segmentação, oferta e página de destino"],
          ["Muitos contatos inválidos", "Termos de pesquisa, público e região, promessa do anúncio, campos do formulário"],
          ["Leads válidos sem resposta", "Processo de atendimento: horários, volume por pessoa, canais monitorados"],
          ["Respondidos que não avançam", "Intenção de quem chega, primeira abordagem, coerência entre anúncio e conversa"],
          ["Qualificados que não agendam", "Horários disponíveis, apresentação do preço, próximo passo proposto, follow-up"],
          ["Agendam e faltam", "Confirmação, remarcação, intervalo até a consulta, orientações pré-consulta"],
          ["Comparecem e não contratam", "Apresentação do plano ou orçamento, acompanhamento após a consulta"],
          ["Há pacientes, mas o marketing não sabe de onde vieram", "Registro de origem, CRM ou planilha, importação de conversões para as plataformas"],
        ]}
      />
      <P>
        Note que só a primeira e a segunda linhas começam pela mídia. As outras começam pela
        operação, e a última pela mensuração. É comum que haja mais de um gargalo; resolva primeiro
        o que perde mais.
      </P>

      <H2 id="metricas">Métricas que vão até a receita</H2>
      <P>
        Custo por lead é a métrica mais visível e a menos conclusiva. Uma campanha com lead barato
        pode trazer mais inválidos; outra, com lead caro, pode trazer mais pacientes. Por isso vale
        subir a escada:
      </P>
      <StepChain
        label="Escada de métricas"
        steps={[
          { title: "Custo por lead" },
          { title: "Custo por lead válido" },
          { title: "Custo por agendamento" },
          { title: "Custo por comparecimento" },
          { title: "Custo por paciente adquirido" },
        ]}
      />
      <P>As fórmulas são simples:</P>
      <Formula>Custo por agendamento = investimento atribuível ÷ agendamentos atribuíveis</Formula>
      <Formula>Custo por paciente adquirido = investimento atribuível ÷ novos pacientes atribuíveis</Formula>
      <P>
        A palavra que pede cuidado é <Strong>atribuível</Strong>. Se parte dos agendamentos veio de
        indicação ou de pacientes antigos e entra na conta da mídia, o custo parece menor do que é.
        Se leads de mídia não são identificados, parece maior.
      </P>
      <P>
        Outro cuidado é o tempo. Um lead de um mês pode virar paciente no mês seguinte. Em vez de
        comparar leads de setembro com pacientes de setembro, acompanhe os leads de setembro até o
        fim do caminho e veja quantos viraram pacientes, mesmo que isso tenha acontecido em
        outubro.
      </P>

      <RevenueLeakDiagnostic id="diagnostico" />
      <P>
        Uma etapa com taxa baixa nem sempre é um erro: algumas perdas são esperadas. O valor da
        ferramenta está em acompanhar os mesmos números mês a mês e ver se a etapa que você ajustou
        melhorou sem piorar as outras.
      </P>

      <H2 id="publicidade-medica">Cuidados com publicidade médica</H2>
      <P>
        Se a investigação levar a mudanças nos anúncios ou nas páginas, as regras do Conselho
        Federal de Medicina valem para clínicas médicas. A Resolução CFM nº 2.336/2023, em vigor
        desde 11 de março de 2024, é a norma atual. Segundo o CFM, ela permite divulgar preços de
        consultas e campanhas promocionais, mas proíbe promoções casadas. Também exige que
        depoimentos não induzam promessa de resultado, veda o sensacionalismo e determina que
        anúncios de clínicas tragam o nome do diretor técnico-médico e o número de inscrição no
        CRM.
      </P>
      <P>
        Na prática, a mensagem que atrai o lead certo é a que descreve o atendimento com precisão,
        sem prometer resultado clínico. Esta seção resume pontos do material oficial e não
        substitui a leitura da resolução nem a orientação do CRM do seu estado. Clínicas
        odontológicas seguem as regras do Conselho Federal de Odontologia.
      </P>

      <H2 id="por-onde-comecar">Por onde começar</H2>
      <List ordered>
        <li>Escreva o critério de lead válido, qualificado e paciente, e combine com a equipe.</li>
        <li>
          Separe os leads dos últimos 30 dias e classifique cada um na última etapa que alcançou,
          com o motivo de perda.
        </li>
        <li>Coloque os totais na calculadora e identifique a passagem com maior perda.</li>
        <li>
          Investigue essa etapa antes de mudar orçamento, campanha ou equipe. Depois de ajustar,
          meça de novo no mesmo formato.
        </li>
      </List>
      <P>
        Se a perda maior estiver antes do lead, o trabalho é de{" "}
        <A href="/#solucoes">mídia, oferta e página</A>. Se estiver
        depois, mais investimento em mídia tende a ampliar o vazamento em vez de resolvê-lo.
      </P>
    </>
  );
}
