import type { ArticleCtaCopy } from "@/components/blog/article-cta";
import { A, DataTable, H2, List, P, Strong } from "@/components/blog/prose";

/*
 * Text supplied by Shark (section C of the editorial package), published as
 * written. No market figures, results or cases. The CFM references are the
 * ones cited in the text; other professions have their own rules.
 */

const GOOGLE_ADS_URL = "https://support.google.com/google-ads/answer/11459091?hl=pt-BR";
const CFM_PORTAL_URL = "https://publicidademedica.cfm.org.br/";
const CFM_NEWS_URL =
  "https://portal.cfm.org.br/noticias/relator-da-resolucao-cfm-no-2-336-23-explica-o-que-pode-e-o-que-nao-deve-ser-feito-na-publicidade-medica/";

export const toc = [
  { id: "o-que-conhecer", label: "O que a agência precisa conhecer" },
  { id: "conteudos-anuncios", label: "Entendimento nos conteúdos e anúncios" },
  { id: "evidencias", label: "Que evidências levar para a reunião" },
  { id: "qualidade-contatos", label: "Como avaliar a qualidade dos contatos" },
  { id: "exclusividade", label: "Agência exclusiva do seu segmento?" },
  { id: "briefing-escopo-fornecedor", label: "Briefing, escopo ou outro fornecedor" },
  { id: "perguntas", label: "O que perguntar antes de contratar" },
];

export const sources = [
  { label: "Google Ads Ajuda: documentação sobre leads qualificados e convertidos", href: GOOGLE_ADS_URL },
  { label: "Conselho Federal de Medicina: Portal de Publicidade Médica", href: CFM_PORTAL_URL },
  {
    label: "Conselho Federal de Medicina: relator da Resolução CFM nº 2.336/23 explica o que pode e o que não deve ser feito na publicidade médica",
    href: CFM_NEWS_URL,
  },
];

export const cta: ArticleCtaCopy = {
  title: "Está avaliando a divulgação da sua empresa?",
  text: "Conte à Shark o objetivo, os serviços já contratados e o que acontece depois que um contato chega. A conversa parte da sua operação, não de um pacote pronto.",
  whatsappText:
    "Olá, Shark! Li o artigo sobre como avaliar se a agência entende meu segmento e quero conversar sobre a divulgação da minha empresa.",
};

export default function Article() {
  return (
    <>
      <p className="text-pretty text-[1.2rem] leading-[1.65] text-fg md:text-[1.3rem]">
        Para avaliar se uma agência entende seu segmento, observe como ela transforma informações
        do negócio em decisões. Peça que explique quem pretende alcançar, qual serviço será
        divulgado, como o contato será atendido e quais dados orientarão os ajustes. Compare essas
        respostas com sua operação e com o escopo contratado.
      </p>
      <P>
        Em uma clínica, esse entendimento aparece em escolhas concretas: especialidades
        prioritárias, disponibilidade da agenda, região atendida, modalidades de atendimento e
        dúvidas recebidas pela recepção. Também envolve conhecer as regras profissionais aplicáveis
        e organizar a aprovação dos conteúdos.
      </P>
      <P>
        Quando essas informações ficam ausentes do planejamento, vale investigar onde ocorreu o
        desalinhamento antes de decidir o próximo passo.
      </P>

      <H2 id="o-que-conhecer">O que a agência precisa conhecer sobre sua clínica?</H2>
      <P>
        A equipe precisa reunir informações suficientes para planejar uma divulgação compatível com
        o atendimento oferecido.
      </P>
      <P>
        Isso inclui os serviços disponíveis, o perfil de público pretendido, a localização, os
        canais de contato e a capacidade de agenda. É necessário saber quais atendimentos a gestão
        quer desenvolver e quais condições econômicas permitem investir na divulgação.
      </P>
      <P>
        Imagine uma clínica que deseja ampliar a procura por uma especialidade em determinados
        horários. Se esse objetivo nunca foi registrado, o planejamento pode continuar distribuindo
        atenção entre todos os serviços. Se a agência recebeu a informação e manteve a mesma
        abordagem sem explicar a escolha, há uma decisão a revisar.
      </P>
      <P>
        O briefing deve registrar prioridades, limitações, responsáveis e informações pendentes.
        Seu valor aparece quando esses dados alteram o trabalho.
      </P>

      <H2 id="conteudos-anuncios">Como perceber esse entendimento nos conteúdos e anúncios?</H2>
      <P>Peça que a agência explique a função de uma publicação ou campanha específica.</P>
      <P>
        Um conteúdo pode esclarecer como funciona o atendimento, apresentar a equipe ou responder a
        uma dúvida recorrente. Um anúncio precisa ter uma oferta coerente com a página de destino e
        com aquilo que a recepção consegue informar.
      </P>
      <P>
        <Strong>Exemplo hipotético:</Strong> a clínica atende exclusivamente de forma particular,
        mas recebe contatos procurando um convênio que não aceita. A investigação deve conferir a
        mensagem do anúncio, a página, as buscas ou públicos utilizados e as informações
        apresentadas antes do contato.
      </P>
      <P>
        Esse padrão pode apontar para uma comunicação incompleta. Ainda assim, a causa precisa ser
        verificada: alguém também pode perguntar sobre convênio mesmo após encontrar a informação
        correta.
      </P>
      <P>
        Pergunte à agência qual hipótese está investigando, quais evidências a sustentam e como
        pretende avaliar o ajuste.
      </P>

      <H2 id="evidencias">Que evidências levar para a reunião?</H2>
      <P>
        Use a tabela abaixo para transformar percepções em uma pauta de trabalho. Ela apresenta
        pontos de investigação, sem atribuir automaticamente a causa a uma das equipes.
      </P>
      <DataTable
        caption="Situações observadas, evidências e perguntas para levar à agência"
        head={[
          "Situação observada",
          "Evidência a conferir",
          "Pergunta para a agência",
          "Próximo ajuste possível",
        ]}
        rows={[
          [
            "Conteúdos parecem distantes da rotina",
            "Pautas, dúvidas recebidas e serviços prioritários",
            "Como esses temas foram escolhidos?",
            "Revisar pauta e fontes de informação",
          ],
          [
            "Contatos procuram serviços indisponíveis",
            "Origem dos contatos, anúncio e página",
            "O que pode estar criando essa expectativa?",
            "Corrigir mensagem, destino ou configuração",
          ],
          [
            "Há contatos, mas poucos agendamentos",
            "Etapas registradas e motivos de perda",
            "Em qual etapa os contatos deixam de avançar?",
            "Investigar campanha, disponibilidade e atendimento",
          ],
          [
            "A divulgação prioriza uma agenda já ocupada",
            "Disponibilidade por serviço e objetivo acordado",
            "Qual capacidade foi considerada?",
            "Rever prioridades e distribuição da verba",
          ],
          [
            "Relatórios trazem números sem decisões",
            "Indicadores, análises anteriores e ações realizadas",
            "O que esses dados mudam no próximo ciclo?",
            "Definir hipóteses, responsáveis e critérios",
          ],
          [
            "As peças voltam com correções técnicas",
            "Histórico de revisão e orientações fornecidas",
            "Como a revisão técnica entra no processo?",
            "Atualizar referências e fluxo de aprovação",
          ],
        ]}
      />
      <P>
        Escolha as situações que realmente aconteceram. Leve exemplos datados, preservando
        informações pessoais dos pacientes.
      </P>

      <H2 id="qualidade-contatos">Como avaliar a qualidade dos contatos?</H2>
      <P>
        Marketing e recepção precisam compartilhar critérios. Defina o que representa um contato
        válido, um pedido de informação, um agendamento e um comparecimento.
      </P>
      <P>
        Uma pessoa da região que procura um atendimento disponível pode ser um contato válido,
        ainda que não marque naquele momento. A ausência de agendamento exige investigar
        disponibilidade, informações recebidas, decisão do interessado e outras condições do
        atendimento.
      </P>
      <P>
        A documentação do Google Ads distingue leads qualificados e convertidos, permitindo
        acompanhar etapas posteriores ao contato quando existe configuração e integração adequadas.
        Isso ilustra por que o registro inicial e o avanço comercial precisam ser analisados
        separadamente.{" "}
        <A href={GOOGLE_ADS_URL} external>
          Documentação do Google Ads
        </A>
      </P>
      <P>
        A clínica pode começar organizando indicadores agregados de contatos, agendamentos,
        comparecimentos e motivos administrativos de perda. O compartilhamento com a agência deve
        respeitar a confidencialidade e se limitar às informações necessárias à análise.
      </P>
      <P>
        Se sua dificuldade principal está entre o contato e a agenda, consulte o{" "}
        <A href="/blog/leads-clinica-nao-agendam">guia sobre leads de clínicas que não agendam</A>.
      </P>

      <H2 id="exclusividade">Uma agência precisa atender exclusivamente seu segmento?</H2>
      <P>
        O histórico no setor é um critério relevante. Ele precisa ser acompanhado de evidências
        sobre a equipe, a execução e o processo de atualização.
      </P>
      <P>
        Peça um exemplo de planejamento e observe o que mudou por causa das particularidades do
        cliente. Em um case, procure contexto, período, investimento, ações e limitações de
        atribuição. Quando não houver experiência comprovada, pergunte como a equipe pretende
        pesquisar, validar informações e envolver os profissionais responsáveis.
      </P>
      <P>
        Na medicina, essa avaliação inclui as referências de publicidade profissional. O CFM
        disponibiliza a Resolução nº 2.336/2023 e o Manual de Publicidade Médica, e voltou a
        orientar sua aplicação em setembro de 2026. Solicite que a agência explique quais fontes
        consulta e como incorpora a revisão ao processo.{" "}
        <A href={CFM_PORTAL_URL} external>
          Portal de Publicidade Médica
        </A>{" "}
        e{" "}
        <A href={CFM_NEWS_URL} external>
          orientação do CFM de setembro de 2026
        </A>
      </P>
      <P>
        O conhecimento regulatório precisa ser conferido conforme a profissão envolvida. Uma
        referência de medicina não substitui as normas de odontologia ou psicologia.
      </P>

      <H2 id="briefing-escopo-fornecedor">
        Quando melhorar o briefing, ajustar o escopo ou avaliar outro fornecedor?
      </H2>
      <P>
        <Strong>Melhore o briefing</Strong> quando informações importantes ficaram dispersas ou
        nunca foram confirmadas. Registre os dados, combine responsáveis e verifique como serão
        incorporados.
      </P>
      <P>
        <Strong>Ajuste o escopo</Strong> quando o resultado esperado depende de atividades que não
        estão contratadas. Produção de conteúdo, mídia paga, páginas, integração de dados e apoio
        ao atendimento exigem responsabilidades claras.
      </P>
      <P>
        <Strong>Avalie outro fornecedor</Strong> quando desalinhamentos relevantes continuam após
        esclarecimentos documentados, a equipe não consegue justificar suas decisões ou informações
        essenciais permanecem inacessíveis. Considere também o histórico das entregas, as condições
        contratuais e a organização da transição.
      </P>
      <P>
        O fechamento depende de variáveis compartilhadas: comunicação, oferta, preço, agenda,
        atendimento e decisão do interessado. A avaliação da agência deve distinguir o que ela
        controla, o que pode influenciar e o que depende da clínica.
      </P>

      <H2 id="perguntas">O que perguntar antes de contratar ou renovar?</H2>
      <P>Leve estas perguntas para a conversa:</P>
      <List>
        <li>Que informações da nossa operação podem mudar sua proposta?</li>
        <li>Qual serviço você priorizaria e por quê?</li>
        <li>Como campanhas, páginas e atendimento serão conectados?</li>
        <li>Que dados precisamos fornecer para avaliar o trabalho?</li>
        <li>Quem executa, revisa e aprova cada entrega?</li>
        <li>Como vocês investigam uma campanha com contatos que não avançam?</li>
        <li>Quais atividades e custos ficam fora do contrato?</li>
      </List>
      <P>
        Procure respostas vinculadas à sua clínica, com condições e informações pendentes
        explicitadas.
      </P>
      <P>
        A Shark organiza sua proposta em <Strong>Atração, Engajamento e Venda</Strong>: campanhas
        para apresentar a oferta, conteúdos e páginas para apoiar a escolha, e acompanhamento dos
        contatos com retorno da equipe comercial. O site apresenta as{" "}
        <A href="/#metodo">etapas desse trabalho</A>.
      </P>
      <P>
        Se você está avaliando sua divulgação,{" "}
        <A href="/#contato">converse com a Shark sobre sua empresa</A>. Compartilhe o objetivo, os
        serviços já contratados e o que acontece depois que um contato chega.
      </P>
    </>
  );
}
