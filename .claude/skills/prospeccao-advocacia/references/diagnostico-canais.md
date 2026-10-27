# Checklist de diagnóstico de canais

Tudo aqui sai de fonte pública. Nunca entre em conta do prospect, não peça acesso e não envie
mensagem durante o diagnóstico. O levantamento é externo e a ficha do CRM registra isso.

## 1. Instagram

### Perfis

Liste **todos**: o pessoal, o do escritório e os abandonados. Pesquise o nome do escritório no
Google e no próprio Instagram, porque quase sempre existe um perfil antigo que ninguém lembra.

De cada um anote seguidores, seguindo, número de publicações, bio completa e link.

**Seguindo perto ou acima de seguidores** é sinal de crescimento por follow e unfollow. Parte da
base não é público real, o que derruba a entrega e explica alcance baixo. Vale anotar porque
muda a conversa: o problema não é o conteúdo, é a audiência.

### Alcance

Abra `instagram.com/<handle>/reels/` no Chrome logado, role e anote as views dos 10 a 15 reels
mais recentes. Views aparecem no canto de cada miniatura.

```
índice de alcance = média das views ÷ seguidores
```

Três cuidados que evitam erro grosseiro:

- **Reel em colaboração aparece nos dois perfis com a mesma contagem.** Se o sócio e o escritório
  publicam juntos, compare só os reels exclusivos de cada um, senão os dois índices ficam iguais
  e a comparação perde sentido.
- **Um viral distorce a média.** Se um reel fez 1,9 milhão e os outros fazem 4 mil, registre o
  viral como achado separado e use a mediana para o índice. Média com outlier engana.
- **Isto mede distribuição, não distribuição orgânica.** View de reel não distingue entrega
  natural de impulsionamento, e impulsionamento some da Biblioteca quando para. Então o índice é
  um fato, mas "o alcance é orgânico" é uma conclusão que o dado não sustenta. Fica tudo em
  `4. Mídia paga`.

Anote também qual reel fez mais e o que ele tem de diferente. Esse é o formato que já funciona,
e apontar isso vale mais que qualquer crítica.

### Destaques

Conte quantos são de serviço e quantos são pessoais. Destaque é a primeira coisa que alguém olha
depois de assistir um reel e decidir se chama. Um perfil que vende inventário e tem onze
destaques de viagem está perdendo gente exatamente ali.

## 2. Link da bio

Clique. Sempre. Metade dos achados bons está aqui.

| Verificação | Como | O que procurar |
|---|---|---|
| Domínio existe? | `Resolve-DnsName <dominio>` e `https://rdap.registro.br/domain/<dominio>` | 404 no RDAP significa que o domínio está livre, qualquer um pode comprar o nome do escritório |
| wa.me válido? | Conte os dígitos depois do 55 | Celular brasileiro tem 11 (DDD + 9 + 8 dígitos). Com 10 o link não abre conversa |
| URL bem formada? | Olhe a query string | `%25` no lugar de `%` é codificação dupla, a mensagem pré-pronta chega quebrada |
| Encurtador? | lnk.bio, bit.ly, linktr.ee, bio.site, contate.me | Clique a mais, sem rastreio, e o Linktree ainda exibe outros perfis na mesma tela |
| Linktree com um botão? | Abra e conte | Se tem um link só, o Linktree é puro atrito |

Abrir `wa.me` não envia mensagem nenhuma, só mostra a página de encaminhamento. É seguro. O que
não pode é clicar em "continuar para o WhatsApp Web" e seguir para a conversa.

## 3. Site

Se não achou link na bio, procure no Google pelo nome do escritório e do sócio.

- O site existe e está linkado em algum canal?
- Ele fala do **mesmo serviço** que o Instagram e os anúncios vendem? O desalinhamento é o
  achado mais forte que existe e aparece com frequência.
- Tem prova social, caso, número, depoimento? Ou é template genérico?
- Rodapé com ano antigo, página órfã indexada, mais de um domínio no ar?
- E-mail de contato em domínio próprio ou @hotmail/@gmail?

Quando o domínio do e-mail não abre página, não conclua que ele não existe. Rode
`Resolve-DnsName <dominio> -Type MX`: se vier MX (Zoho, Google) sem registro A, o domínio está
pago e serve só o e-mail. É achado, e é comum em escritório que trocou de site e esqueceu o
domínio antigo.

Procure também o site em plataforma de terceiros (`<nome>.escritorio-online.com` e parecidos).
Escritório que não tem domínio próprio às vezes tem o site completo num subdomínio assim, e ele
não aparece em busca por domínio nenhuma.

Para ver o conteúdo real, `get_page_text` no Chrome costuma funcionar melhor que WebFetch em
site feito com construtor visual.

## 4. Mídia paga

**Meta.** `facebook.com/ads/library/?active_status=active&ad_type=all&country=BR&q=<termo>&search_type=keyword_unordered&media_type=all`

Busque pelo nome do escritório, pela razão social e pelo nome dos sócios. Razão social costuma
ser o nome do anunciante, então vale consultar o CNPJ antes. Depois busque o **termo genérico do
nicho** ("advocacia tributária", "advogado INSS") para dimensionar quantos concorrentes estão
ativos agora. Esse número é ótimo na conversa.

Dos anúncios ativos, anote: quantos, desde quando, para onde levam (WhatsApp, formulário, site)
e se o criativo termina em CTA de conversão ou em pergunta de engajamento.

Use `search_type=keyword_exact_phrase` com o nome entre aspas (`q="Nome do Escritório"`). A busca
sem aspas devolve qualquer anúncio que tenha uma das palavras e enche a tela de lixo.

Confira o **destino** de cada anúncio, que aparece no rodapé do card. Quando diz INSTAGRAM.COM o
anúncio leva para o perfil, não para uma página: o clique chega e ninguém mede o que acontece
depois. E repare se vários cards repetem o mesmo texto, variando só o vídeo.

Duas armadilhas da Biblioteca, e as duas me fizeram escrever bobagem num relatório:

**"Zero anúncios ativos" não quer dizer "nunca anunciou".** `active_status=active` mostra só o que
está no ar neste minuto, e a maior parte do mercado não está. Troque para `active_status=all` e
compare: para a frase exata "advogado criminalista" no Brasil deram ~1.000 ativos e ~5.300
contando os parados. Quatro em cada cinco anúncios do nicho estavam desligados. **Rode sempre as
duas buscas.** A diferença entre elas é o número honesto do nicho, e é melhor na conversa do que o
ativo sozinho, porque mostra quanta gente já testou e quanta continua.

**As duas buscas enxergam coisas diferentes, e nenhuma sozinha resolve.** Isto foi testado nos
dois caminhos no mesmo escritório, e o resultado foi o oposto do que eu supunha:

| Caminho | O que ele mostra |
|---|---|
| `q="Nome"` + `search_type=keyword_exact_phrase` + `active_status=all` | **É o único que devolve histórico.** No Teixeira & Góis achou um anúncio de 6 a 20 de julho. Limite: só lê o **texto do criativo**, então anúncio que não escreveu o nome do escritório no corpo não aparece |
| Ficha do anunciante (`view_all_page_id`) | **Só o que está no ar agora**, mesmo com `active_status=all`. No mesmo escritório, com o mesmo anúncio existindo, respondeu "No momento, esse anunciante não está veiculando anúncios". Serve para confirmar ativo e para pegar o `page_id`, não para histórico |

Então rode as duas: a frase exata com `all` para o histórico, e a ficha do anunciante para o que
está no ar. Para chegar à ficha, digite o @ do perfil no campo de busca da Biblioteca e escolha
embaixo de **Anunciantes** — é lá também que aparecem os homônimos e os perfis irmãos do
escritório, que a busca por texto não revela.

E mesmo com tudo isso, **um zero não prova que nunca anunciou**. Escreva "nada no ar hoje".

**Quando achar um anúncio arquivado, o card vale ouro.** Anúncio que a Meta classificou como tema
social vem com **verba, impressões e tamanho de público estimado** na própria ficha. Um escritório
apareceu com "R$100 a R$199" e "25 mil a 30 mil impressões" em quatorze dias: dá para conversar
sobre o que aconteceu com números que ele reconhece. Abra o card ampliado para ler, porque na
grade os dados ficam ilegíveis.

E leia a linha miúda embaixo do anunciante. **"Este anúncio foi veiculado sem um rótulo
obrigatório"** quer dizer que a Meta classificou o conteúdo como tema social e a declaração não
foi feita, ou seja, o anúncio foi **derrubado, não encerrado**. É achado forte e muito concreto:
não foi falta de verba nem desistência, foi um detalhe de configuração que ninguém explicou para
eles. Direito previdenciário, assédio, violência doméstica e direito do consumidor caem nessa
classificação com frequência.

**E cuidado com a conclusão que vem de graça disso:** view de reel **não** é prova de alcance
orgânico. Qualquer reel pode ter sido impulsionado, e impulsionamento some da vista quando para.
O índice de alcance mede distribuição total, não distribuição orgânica. Nunca escreva "o alcance
sai da base sozinho, sem mídia paga" a partir de view de reel. Pico isolado no meio de uma base
estável é justamente o desenho de quem botou verba numa peça e parou. Quando o padrão aparecer,
trate como hipótese explícita no relatório, do tipo "o cenário mais provável é que tenha havido
impulsionamento e a torneira tenha sido fechada", e use isso a favor: quem já gastou e parou tem
conta criada, cartão cadastrado e uma frustração para contar.

E não superlative o índice. Perfil pequeno entrega múltiplo alto da base com facilidade, porque a
base é pequena. "4x os seguidores" é bom e é verdade; "isso é raro" é exagero que o prospect
desmonta sozinho.

**Google.** Quando o escritório **tem domínio**, vá direto a
`adstransparency.google.com/?region=BR&domain=<dominio>`. Essa URL devolve a contagem exata
("0 anúncio", "2 anúncios") e revela anúncios veiculados por anunciante com outro nome, que é o
caso mais comum em escritório, onde a conta está no CPF de um sócio. Teste **todos** os domínios
que o escritório tiver, um a um: já apareceu banca com três domínios em que só um recebia
anúncio, e era o que estava vazio.

Duas armadilhas da Central, e as duas já me fizeram gravar dado errado:

**A contagem inclui anúncio arquivado.** Ao contrário da Biblioteca da Meta filtrada por ativo, a
Central mostra criativo que parou de rodar faz meses. "2 anúncios" não quer dizer dois anúncios no
ar. **Abra o criativo e leia a linha "Última exibição"** antes de gravar qualquer coisa. Em três
leads seguidos a contagem apareceu como ativa e as datas eram de maio, junho e julho: nenhum deles
anunciava no Google. Abordar alguém dizendo que ele investe em busca quando ele desligou a conta há
meses derruba a sua credibilidade na primeira resposta.

**Deslogado o resultado muda.** A mesma URL que devolve "2 anúncios" num Chrome logado na conta
Google devolve "Nenhum anúncio foi encontrado" num navegador sem sessão. Faça a consulta sempre no
navegador logado, e se o usuário disser que não encontrou o que você achou, confira primeiro se ele
está logado antes de duvidar do dado.

Quando o anúncio for antigo, isso não é um zero qualquer: um escritório que anunciou e parou tem
conta criada, cartão cadastrado e, quase sempre, uma frustração para contar. Pergunte como foi.

Quando **não tem domínio**, só resta a caixa de busca por nome em
`adstransparency.google.com/?region=BR`. Aí vale um cuidado: se aparecerem só homônimos
verificados com nome completo diferente, você não provou que o prospect não anuncia, provou que
não achou. Registre a ressalva na ficha em vez de dar o zero por conclusivo.

## 5. Busca e ficha local

Pesquise `"Nome do Escritório" cidade` e `"Nome do Sócio" + nicho`.

- Existe resultado orgânico próprio ou só agregador (Jusbrasil, Econodata, Solutudo, ClickDisk)?
- A ficha do Google tem avaliações? Quantas? Concorrente com estrelas no anúncio é argumento forte.
- Nome, endereço e telefone batem entre Instagram, site e Receita Federal?

Para os dados cadastrais, o CNPJ aparece no rodapé do site ou numa busca por nome. Compare com o
que está publicado nos perfis. Divergência de endereço e telefone impede o Google de consolidar a
ficha e é um achado concreto, fácil de mostrar.

### O site existir não quer dizer que ele preste

"Tem site" não é força, e escrever isso num relatório queima credibilidade na hora, porque o dono
sabe melhor que ninguém o estado do site dele. Abra e colete estes quatro dados, que separam site
institucional de site que gera cliente:

```js
// no console da página
JSON.stringify({
  metaDesc: (document.querySelector('meta[name=description]')||{}).content || 'AUSENTE',
  h1: [...document.querySelectorAll('h1')].map(e => e.innerText.trim()),
  forms: document.querySelectorAll('form').length,
  inputs: document.querySelectorAll('input:not([type=hidden])').length,
  temGA: !!(window.gtag || window.dataLayer),
  temPixel: !!window.fbq,
})
```

- **Nenhum formulário** significa que só quem quer puxar conversa agora vira contato. Quem está no
  trabalho, de madrugada ou só pesquisando, vai embora sem deixar rastro.
- **Sem Analytics e sem pixel** é o achado mais pesado: o escritório não sabe quantas pessoas
  visitam, de onde vêm, e não pode falar de novo com quem já esteve lá. Todo mês recomeça do zero.
- **Meta description ausente** deixa o Google escrever o resumo sozinho, e **mais de um `<h1>`**
  confunde o buscador sobre qual é o tema da página.

### Presença no Google: três perguntas, sempre

Buscar o nome do escritório é obrigatório, não opcional, e tem três respostas que importam:

1. **O site aparece quando se busca o nome do próprio escritório?** Já apareceu banca cujo site
   não vinha nem assim, perdendo para Instagram, Facebook e agregador de CNPJ.
2. **A ficha do Google foi reivindicada?** Se a página ainda mostra "É proprietário desta
   empresa?" ou "Adicionar website", a ficha não está sob controle deles. Isso é grave quando a
   ficha tem avaliação boa: a reputação existe e não leva a lugar nenhum.
3. **Os concorrentes que aparecem no mapa têm site na ficha?** Comparar os três primeiros com o
   prospect transforma uma observação técnica em desvantagem concreta.

### Meça a concorrência onde dá para medir

Conte quantos anunciam no termo genérico do nicho **na Biblioteca de Anúncios da Meta**, que é
fonte oficial, lista os criativos e dá para conferir um a um. Esse número é sólido e é ótimo na
conversa: "há 87 anúncios ativos agora para advogado de INSS na sua cidade e nenhum é seu" dá
noção de tamanho na hora.

Dê o par, não só o ativo: rode a mesma busca com `active_status=active` e com `active_status=all`
e cite os dois. "Mil no ar agora e mais de cinco mil contando os que já pararam" diz duas coisas
de uma vez, que o nicho é disputado e que a maioria não aguenta o ritmo, e é o tipo de número que
faz o prospect perguntar por quê.

**Não conte anúncio do Google pela página de busca.** Contar blocos "Patrocinado" não funciona em
navegador automatizado: a busca por "advogado INSS", um dos termos mais disputados do país,
devolveu zero patrocinado em três consultas seguidas, o que é impossível. O Google simplesmente
não entrega anúncio nesse contexto, e um bloqueador no perfil do navegador piora. Eu já escrevi
"nenhum anunciante no Google" em dois relatórios a partir dessa medição, e os dois estavam errados.

O que **é** confiável sobre o Google:

- **Se o próprio prospect anuncia**, pela Central de Transparência, buscando o domínio dele ou o
  nome do anunciante, sempre abrindo o criativo para ler a data da última exibição.
- **A presença orgânica dele**: se o site aparece na busca pelo nome, se a ficha está reivindicada
  e se ela tem o site cadastrado.

Para dimensionar a concorrência paga no Google de verdade, o caminho é o Planejador de
Palavras-chave dentro de uma conta de anúncios, com volume e faixa de lance. Sem isso, não afirme
número: diga que não foi medido.

## Checklist final

Antes de fechar o diagnóstico, confirme que você tem:

- [ ] Todos os perfis, com seguidores e índice de alcance de cada um
- [ ] O reel de maior alcance e o que ele tem de diferente
- [ ] O link da bio testado, com o resultado do teste
- [ ] Situação do site: tem formulário? tem Analytics e pixel? meta description? quantos h1?
- [ ] Se o site fala do mesmo serviço que o conteúdo vende
- [ ] Anúncios do prospect no Meta pelos **dois** caminhos (frase exata com `active_status=all` para o histórico, ficha do anunciante para o que está no ar) e no Google pela Central, com o destino de cada um
- [ ] Se achou anúncio arquivado: verba, impressões e se a ficha diz "sem um rótulo obrigatório"
- [ ] Quantos concorrentes anunciam no termo genérico **na Biblioteca da Meta**, nos dois filtros (no Google, só pelo Planejador de Palavras-chave; a busca não serve)
- [ ] O site aparece na busca pelo nome do escritório? A ficha do Google foi reivindicada? Tem site nela?
- [ ] Nome, endereço, telefone e CNPJ, com as divergências anotadas
- [ ] Cidade, para saber se dá reunião presencial
- [ ] De 4 a 6 pontos de ruptura e de 4 a 5 forças

Se faltar algo que você não conseguiu checar, registre como não checado na ficha em vez de
chutar. O campo de anúncios do CRM distingue "não checado" de "zero", e essa diferença importa
na hora da conversa.
