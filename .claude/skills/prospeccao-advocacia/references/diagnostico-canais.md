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

### Role até o fim antes de dizer que ninguém alcança ninguém

Em 28/10/2026 eu ia escrever para a Daniela Prado que "nem a melhor peça alcançou quem já te
segue", porque nos 15 reels recentes o pico era 825 contra 1.455 seguidores. Carregando 40 reels,
apareceu um de **2.714**, quase o dobro da base. No Halley a mesma coisa, e pior: o pico dos 15
recentes era 6.830 e o histórico é **13.500**, 4,6x o perfil.

Então meça duas coisas, sempre, e elas dizem coisas diferentes:

| Número | O que é | Para que serve |
|---|---|---|
| Mediana dos 15 mais recentes ÷ seguidores | O índice de alcance | Diz como está entregando **hoje** |
| Pico histórico do perfil ÷ seguidores | O teto já atingido | Diz se a pessoa **sabe** furar a bolha |

A combinação é o melhor argumento que existe, e é muito melhor que o índice sozinho: "vocês já
fizeram um reel de 13,5 mil e os quatro últimos fizeram 496, 112, 253 e 77". Não é crítica, é
constatação de que a capacidade está provada e virou exceção em vez de linha editorial. Dizer
"você não alcança ninguém" para quem já estourou uma vez é errado e a pessoa sabe que é errado.

Olhe também os reels **mais recentes um por um**, não só a mediana. No Halley os quatro últimos
estavam todos abaixo de 500 para uma base de 2.940, muito pior que a mediana de 909. Queda
recente é informação de urgência, e a mediana esconde.

Para carregar o suficiente, role em passos e espere entre eles:

```js
for (let y=1200; y<=6000; y+=1200){ window.scrollTo(0,y); await new Promise(r=>setTimeout(r,2200)); }
[...document.querySelectorAll('a[href*="/reel/"]')].map(a => a.innerText.trim())
```

Se o total carregado for igual ao número de reels do perfil, **não é amostra, é o universo**, e
isso deixa o número muito mais defensável. Foi o caso da Laura Leal: seis reels no perfil, seis
medidos, mediana 2.418 para 2.055 seguidores. Diga isso no relatório com essas palavras.

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

### Medição: olhe o DOM carregado, nunca o HTML inicial

Esta seção existe porque em 28/10/2026 eu quase mandei para o Halley Advogados um diagnóstico
dizendo que o site dele não tinha medição nenhuma. Tem quatro ferramentas instaladas.

O que me enganou: procurei `connect.facebook.net` no HTML, chequei `typeof window.fbq` logo
depois do `navigate` e listei as requisições de rede do painel. Deu tudo vazio, e eu concluí
"nada medindo". O GTM injeta as tags de forma assíncrona e o listador de requisições do painel
só mostrava o documento principal e as imagens.

O jeito que funciona, depois de esperar o carregamento:

```js
const scripts = [...document.querySelectorAll('script')].map(s => s.src).filter(Boolean);
({ scripts, fbq: typeof window.fbq, gtag: typeof window.gtag,
   clarity: typeof window.clarity, dataLayer: (window.dataLayer||[]).length })
```

A lista de `src` já resolvido é a prova: ela mostra o que de fato entrou na página. No Halley
devolveu `googletagmanager.com/gtm.js`, `googletagmanager.com/gtag/js?id=G-…`, `clarity.ms/tag/…`
e `s.tintim.app`. Na Laura Leal, pelo mesmo método, devolveu só arquivos do próprio domínio, e
aí sim a conclusão "não mede conversão" se sustenta.

Dois detalhes que mudam o diagnóstico:

**ID no código não é tag disparando, mas ausência no HTML também não é ausência.** Confira os
dois lados: o `src` resolvido e o `typeof` do objeto global.

**Script de analytics servido como first-party.** No site da Laura havia um
`/<hash>/script.js` no próprio domínio. Baixei com `fetch` e li: é o contador da plataforma de
hospedagem. Isso não é pixel nem GA4, mas também não é "zero medição", e a diferença importa na
redação. Escreva o que a ferramenta faz, não o rótulo: "diz quantas pessoas entraram e nada
sobre quem virou caso".

**Tintim** (`s.tintim.app`) é brasileiro e rastreia conversa de WhatsApp amarrando o clique do
anúncio à conversa. Quando aparece, o escritório está mais maduro do que a média e o furo de
"anuncia sem rastrear" não existe. Vale ainda apontar a falta do pixel da Meta, porque o Tintim
não devolve evento de site para a campanha otimizar.

### O RDAP mascara o CNPJ desde outubro de 2026

A rota "handle do RDAP → BrasilAPI → QSA e telefone declarado", que funcionou na leva de 27/10,
**parou de funcionar**. Conferido em 28/10/2026: o `rdap.registro.br` devolve o identificador do
titular mascarado, assim:

```json
"publicIds": [{ "type": "cpf", "identifier": "***.815.945-**" }]
```

O que ele ainda entrega, e que continua valendo a consulta em todo lead:

| Campo | Para que serve |
|---|---|
| Nome civil do titular, e se é `individual` ou `org` | Titular pessoa física É o advogado. É o que amarra o dono |
| E-mail do registrant | Em titular PF costuma ser o e-mail pessoal (`hcmelojr@hotmail.com`, `lucas89leal@hotmail.com`) |
| **Quem está no contato técnico** | É assim que se descobre agência no meio: `registrobr@zwa.digital`, `richard@nuclearmidia.com` |
| Data de registro | Domínio de um mês atrás indica que investiu em estrutura agora |

Vale consultar vários domínios candidatos de uma vez em vez de adivinhar um por um, porque o
RDAP responde 404 rápido para quem não existe:

```powershell
foreach ($d in @("nome.adv.br","nomeadvogados.com.br")) {
  try { $r = Invoke-RestMethod "https://rdap.registro.br/domain/$d" -TimeoutSec 12 -ErrorAction Stop
    $reg = $r.entities | Where-Object { $_.roles -contains "registrant" } | Select-Object -First 1
    "$d -> $((($reg.vcardArray[1] | Where-Object { $_[0] -eq 'fn' })[3]))"
  } catch { "$d -> nao registrado" }
}
```

**Confira se o titular bate com o nome do escritório antes de usar a pista.** Em 28/10/2026 dois
domínios enganaram: `pulcinelli.adv.br` é de Rafael Ricardo Pulcinelli e o lead era Lucas
Pulcinelli; `gbradvogados.com.br` é de Gino Berrettini Campones do Brasil e o lead era Gabbardo,
Beal & Rodrigues. Sigla igual, dono diferente. Usar isso como prova teria posto nome errado num
PDF.

### DNS: teste o domínio com e sem www

`Resolve-DnsName <dominio> -Type A` e depois `www.<dominio>`. Na Laura Leal, só o `www`
resolvia. O anúncio dela usava a versão certa, então o tráfego pago chegava, mas quem ouvisse o
endereço e digitasse do jeito natural batia em erro. É furo verdadeiro e de conserto trivial,
então entra no relatório com essa ressalva honesta: o pago não está perdendo, o resto está.

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

### Como pesquisar sem perder a viagem

O `?query=` na URL **não pesquisa nada**: ele abre a home da Central e para por aí. É preciso
digitar na caixa, e a resposta útil está no próprio autocomplete, que já traz `Verificado`, o
país e `~N anúncios` por anunciante. Para varrer vários de uma vez, dá para focar o input e
disparar `input` por script, mas **o `focus()` antes de cada troca de valor é obrigatório**: sem
ele o dropdown não reabre e todos os prospects voltam vazios, o que parece zero e não é.

E o mais importante: a Central indexa pelo **nome jurídico do anunciante**, o do cadastro, não
pelo nome fantasia. Buscar "Fulano advocacia" ou "Fulano advogado" devolve vazio mesmo para quem
anuncia; buscar "Fulano" devolve `FULANO DE TAL SOBRENOME`, às vezes com uma segunda conta no
CNPJ. Na varredura de 26/10/2026 isso virou a diferença entre achar e não achar: `Laura Gatto`
devolveu LAURA GATTO IENGO com cinco anúncios, enquanto `Helena Moraes advocacia` devolveu nada.

Um caso que vale guardar como padrão: a Laura Gatto paga anúncio no Google e **não tem link
nenhum na bio do Instagram**. Os dois canais não se conversam, um compra clique e o outro não
oferece saída. Procure essa combinação, porque ela prova que já existe verba e que ela está indo
para o ralo.

### A Biblioteca da Meta mudou de porta

O endpoint `ads/library/async/search_ads/` responde **404**: não existe mais atalho em JSON, é
navegar por busca mesmo. A frase de "não achei" é literalmente `Nenhum anúncio corresponde aos
seus critérios de pesquisa` — procure por ela, porque sem resultado a página também não escreve
a contagem e fica fácil confundir "zero" com "ainda carregando".

Conte `Ativo` e `Inativo` no texto da página e recolha os nomes dos anunciantes antes de dar
qualquer número por bom: `"Lins Advogados"` devolveu ~30 resultados de seis escritórios
diferentes (Freitas Lins, GOMES LINS, Miguel Lins, Fernanda Lins), nenhum deles o prospect.
Nome e sobrenome comuns, como Diego Machado ou Daniela Prado, devolvem centenas de homônimos:
ali o número bruto não significa nada e a ficha vai com **"0 do escritório"** mais a lista de
quem apareceu, nunca com um zero seco.

### Como separar homônimo de prospect, que é o trabalho de verdade

`search_type=page` não existe mais: a Meta reescreve para `keyword_unordered` e devolve a busca
larga. Os links `view_all_page_id` também sumiram do DOM. O que sobrou funciona bem: cada card
traz um link para **`facebook.com/<page_id>`**, o perfil do anunciante. Pegue os ids com

```js
[...document.querySelectorAll('a[href]')]
  .filter(a => /^https:\/\/www\.facebook\.com\/\d+\/?$/.test(a.getAttribute('href')))
```

e abra um por um. A página responde em dois segundos e mata a dúvida, porque mostra categoria,
número de seguidores e contato. Em 26/10/2026 foi assim que dois "a conferir" viraram zero: as
duas páginas que anunciavam como "Matheus Carvalho" eram um **médico** (CRM 81830, Cirurgia
Geral, Ponte Nova/MG) e uma página de **culinária**, e o "Gabriel Ramos" que anunciava era uma
Figura pública com **24 seguidores** e e-mail de Hotmail, enquanto o prospect tem 2.776 no
Instagram. Categoria e tamanho da base resolvem quase todos os casos.

Do lado do Google, quando o anunciante é pessoa física o nome vem com CPF anexado e o criativo
não renderiza nem no navegador limpo, então não dá para ler o anúncio. O que a ficha entrega e
vale ouro é a **Última exibição**: ela diz se a torneira está aberta. `MARIO MARINHO LAGRIMANTE
DE MIRANDA` tinha exibição em 25/10/2026, véspera da varredura, e Lagrimante é sobrenome de
sócio da banca prospectada; `ALANA LUIZA TRENHAGO MISSIO` parou em 1º de maio. Sobrenome raro
que bate com o nome do escritório é indício forte e **não é prova**: registre como indício, com
a data, e pergunte na reunião. Sobrenome comum não é nem indício.

## 5. Busca e ficha local

Pesquise `"Nome do Escritório" cidade` e `"Nome do Sócio" + nicho`.

- Existe resultado orgânico próprio ou só agregador (Jusbrasil, Econodata, Solutudo, ClickDisk)?
- A ficha do Google tem avaliações? Quantas? Concorrente com estrelas no anúncio é argumento forte.
- Nome, endereço e telefone batem entre Instagram, site e Receita Federal?

Para os dados cadastrais, o CNPJ aparece no rodapé do site ou numa busca por nome. Compare com o
que está publicado nos perfis. Divergência de endereço e telefone impede o Google de consolidar a
ficha e é um achado concreto, fácil de mostrar.

### A ficha é a melhor fonte de telefone que existe

Uma busca `google.com/search?q="<nome>" <cidade>&hl=pt-BR&gl=br` já traz o painel local inteiro
no texto da página, sem abrir o Maps. Procure por `Telefone: (NN) NNNNN-NNNN`, por
`Endereço: ...` e por `N,N` seguido de `avaliações`. Note que a nota e a contagem vêm coladas no
innerText: `5,045` é nota 5,0 com 45 avaliações.

É o jeito mais limpo de conseguir o contato, e é o que **amarra** o número à pessoa, que é onde
a busca por nome falha. A Irla Cândida não tinha link nenhum na bio, e a ficha trouxe o telefone
com o endereço idêntico ao que ela publica no perfil: dois dados batendo deixam de ser palpite.
A ficha também serve de terceira fonte para confirmar divergência, como no caso da Fabiola
Baggio, cujo número correto apareceu igual no Linktree e na ficha enquanto o da bio seguia
quebrado.

Repare quando a ficha tem **telefone diferente do que está no link da bio**. Costuma ser o fixo
do escritório contra o WhatsApp do sócio, e os dois valem: um abre conversa, o outro diz que a
operação tem casa.

**Não ter ficha é furo, e dos bons.** Em 27/10/2026, oito dos vinte e sete leads não tinham
painel local nenhum: sem ficha o escritório não aparece no Maps, não entra na busca local da
própria cidade e não acumula avaliação, que é a prova social mais barata que existe no jurídico.
Quem tem ficha boa e não a usa também é achado: a banca Tricotti Campillay tem 45 avaliações
nota 5,0 e não cita isso em lugar nenhum do Instagram.

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

## 6. Quem está por trás: registro de domínio e CNPJ

Quando a bio não tem telefone, ou quando a DM institucional empaca e você precisa chegar em quem
decide, o caminho não é caçar o celular da pessoa. É olhar o que a empresa publica por obrigação.
São escritórios com CNPJ, e dado cadastral de CNPJ é público por desenho.

**Nunca** use base colaborativa de agenda telefônica (Truecaller, Eyecon, Sync.ME) nem base
vazada. São contatos que terceiros entregaram sem o titular saber: além de ilegal sob a LGPD,
entrega número pessoal onde você queria o comercial.

### O registro do domínio (`.com.br`)

```
curl -s -H 'Accept: application/json' https://rdap.registro.br/domain/<dominio>
```

O Registro.br devolve o titular e o contato técnico. Para domínio sob CNPJ o `handle` do
titular **é o próprio CNPJ**. Isso resolve três coisas de uma vez:

| O que aparece no titular | O que significa |
|---|---|
| O nome do próprio advogado | Ele mesmo cuida da casa. O e-mail técnico costuma ser o pessoal dele, e a decisão é dele |
| Uma **agência de publicidade** | **O prospect já tem fornecedor.** Rebaixe na hora: é conversa de troca, e troca vira preço |
| Uma banca com outro nome | O prospect provavelmente é associado, não titular. Quem decide é o dono daquele CNPJ |

Os três apareceram na varredura de 27/10/2026. O Wilson Alves registrou o próprio domínio e
deixou `wilsonalves.jur@gmail.com` como contato. O domínio da Amanda Franco está em nome da
VIRTU ASSESSORIA E MARKETING LTDA, agência de publicidade de João Pessoa, com um e-mail
`gestordetrafego` no técnico, e foi isso que explicou a mídia dela rodando nas duas plataformas:
ela saiu de quente para fria no mesmo dia. E a bio da Jenneffer Paixão aponta para um domínio da
LARISSA MENEZES DALAPOLA SOCIEDADE INDIVIDUAL DE ADVOCACIA, ou seja, o reel de 166 mil
visualizações manda tráfego para a marca de outra pessoa.

### Do CNPJ para o telefone

```
curl -s https://brasilapi.com.br/api/cnpj/v1/<14 digitos>
```

Vem razão social, CNAE, situação cadastral, QSA e o telefone declarado na Receita. Em escritório
pequeno esse telefone costuma ser o do sócio. A situação cadastral também vale: um CNPJ
**BAIXADO** explica por que a conta de anúncio hoje está no nome da pessoa física.

A Central de Transparência do Google entrega a **raiz do CNPJ** no nome de anunciante pessoa
jurídica (`54.778.068 FULANO DE TAL`). Os dígitos verificadores você calcula, e aí consulta a
Receita. Foi assim que a dúvida sobre a Laura Gatto fechou: o CNPJ é de Guarulhos e o LinkedIn
dela diz Guarulhos, então o anunciante é ela mesma.

### `.com` e o que o DNS denuncia

Em `.com` o titular vem oculto por GDPR, mas `rdap.verisign.com/com/v1/domain/<dominio>` ainda
dá **data de registro e nameservers**, e os dois contam história: `DNS-PARKING` é site parado ou
abandonado, Vercel ou Netlify é site recente. Em 27/10/2026 o domínio da Francielli Fernandes
estava em parking e devolvendo 500 até na raiz, e o da banca do Márcio Tricotti tinha menos de
dois meses de registro.

### Cruze o titular do domínio com quem anuncia: é o melhor filtro que existe

Separadamente, "tem domínio próprio" e "está anunciando" são dois dados mornos. **Cruzados, eles
dizem quem é o cliente ideal e quem é perda de tempo**, e a conta é simples:

| Titular do domínio | Está anunciando? | O que significa |
|---|---|---|
| O próprio advogado | **Sim** | **Melhor lead que existe.** Tem verba, tem cultura de investimento e **não tem agência para deslocar**. A conversa é somar, não substituir |
| Uma agência | Sim | Já tem fornecedor. Vira conversa de troca, e troca vira preço. Rebaixe |
| O próprio advogado | Não | Cliente clássico: estrutura própria e nenhuma verba. A conversa é começar |
| Uma agência | Não | Paga alguém que não está entregando. Delicado, mas é brecha |

Em 28/10/2026 a primeira linha apareceu três vezes de uma vez: Halley Advogados anunciando nas
duas plataformas, Laura Leal com nove anúncios na Meta e Cristiane Poli com sete no Google — os
três com o domínio registrado **em nome próprio**. No mesmo levantamento, Amanda Franco caiu de
quente para fria porque o domínio dela estava em nome de uma agência de publicidade.

Um ganho de lado que esse cruzamento entrega: o nome civil do titular do domínio é exatamente o
que a Central de Transparência do Google indexa. Buscar `THIAGO HALLEY BARBOSA` devolve a conta
dele com certeza, enquanto `Halley advogados` não devolveria nada. **O registro do domínio não
dá só o contato do dono, dá a chave de busca do Google.**

E a recíproca: sempre abra a ficha do anunciante antes de dar o ativo por certo. `"Poli
Advocacia"` devolveu quatro anúncios no ar que eram de Paula Ávila Poli, outra advogada de mesmo
sobrenome, e as duas páginas "Thaís Aguiar" que anunciavam eram de Saúde/beleza e de
Bolsas/bagagem.

### Sociedade Individual de Advocacia: o escritório que não tem porteiro

Este é o critério mais útil que apareceu, e ele vem do erro de uma leva inteira. Em 27/10/2026,
de seis escritórios abordados no WhatsApp, **quatro responderam com atendimento**: o robô da
Helena Moraes devolveu o questionário de ludopatia, o do Lins Advogados pediu CPF, a assistente
"Ana Luiza" da Ester Brito recusou em nome dela e a equipe da Vanessa Gonçalves intermediou. O
único dono que respondeu em pessoa foi o Wilson Alves — e o número dele estava amarrado por
registro de domínio em nome próprio.

O padrão não é sorte. Escritório com estrutura tem quem atenda o telefone, e o número público é
o da triagem. Na Receita isso tem nome: quando o CNPJ é **SOCIEDADE INDIVIDUAL DE ADVOCACIA**, o
QSA traz um sócio só, e não existe "número da equipe" — o número é do dono por definição.

Então, para chegar em quem decide, prefira nesta ordem:

| Sinal | O que significa |
|---|---|
| CNPJ é Sociedade Individual, QSA com um nome | Melhor caso. Qualquer contato do escritório é do dono |
| Titular do domínio é o próprio advogado | O e-mail do contato técnico é pessoal dele, quase sempre um Gmail |
| `wa.me` direto na bio do **perfil pessoal** | Advogado individual costuma atender o próprio WhatsApp |
| Telefone **fixo** | É escritório, sempre. Não serve |
| WhatsApp Business que abre com saudação automática | Triagem. Não serve |
| Perfil da banca com várias unidades | Tem recepção. Vá pelo perfil pessoal do sócio |

Dois ganhos de lado que valem tanto quanto o telefone. O primeiro: o e-mail pessoal do titular
do domínio é a porta que **não tem porteiro**, porque ninguém põe robô de triagem no Gmail do
sócio. O segundo: o perfil pessoal de um sócio frequentemente revela que a banca **já está no
funil** com outro card. Em 27/10 apareceram três, todos dizendo "Sócio @x" na bio e usando o
mesmo número de um lead que já existia.

### O resto, e o limite

Para quem não tem domínio, o que sobra é o que a própria pessoa publicou: página de Facebook,
perfil profissional, publicação de tribunal com a OAB. O Gabriel Ramos publica o WhatsApp na
página dele no Facebook de 860 seguidores e não no Instagram de 2.776, e a OAB da Irla Cândida
(42663/CE) saiu numa publicação do TJCE.

E o limite, que é o mais importante: busca por nome devolve homônimo o tempo todo. Na mesma
varredura apareceram dois DDD 88 diferentes para a Irla e um telefone de uma blogueira de
estética para a Francielli. **Número que não está amarrado à pessoa não entra na ficha.**
Escreva "telefone público não encontrado" e siga.

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

## Pare aqui: o lead ainda encaixa?

**Antes de escrever uma linha de diagnóstico**, responda estas três. Se as três forem sim,
**descarte o lead e avise o Vinicius**, não escreva o PDF:

1. Ele **anuncia no Google** agora? (anúncio na Central de Transparência, ou tag `AW-` no site)
2. Ele tem **landing page ou site que converte**, feito por alguém que sabe?
3. Ele tem **medição instalada**? (pixel, GA4 ou GTM carregando de verdade)

Sim nas três significa que ele **já tem exatamente o que a Shark vende**. Qualquer documento que
você escrever vira comparação de preço com quem já está lá dentro, e isso é o pior terreno
possível. Nesse caso o lead sai da carteira: não é "quente com poucos furos", é fora do perfil.

Isso já custou caro duas vezes. Em 28/10/2026 o Halley Advogados foi diagnosticado inteiro antes
de alguém notar que ele tinha GTM, GA4, Clarity, Tintim, ficha 5,0 e anúncio nas duas
plataformas. Em 29/10/2026 aconteceu de novo com o Lucas Leal (pixel, tag de conversão do Google
Ads e GTM) e com o EP Advogados (12 anúncios no Google e landing page própria), e no caso do
Lucas o PDF chegou a ser enviado. A regra de descartar "quem já tem tudo pronto" está na triagem
da skill desde o começo: o erro não foi falta de regra, foi não ter um ponto de parada.

**Duas de três ainda pode servir**, e aí o que se vende é exatamente a que falta. Quem anuncia no
Google e não tem medição compra tráfego no escuro, e isso é um furo real. Mas registre no card
que ele já anuncia, para a decisão de abordar ser consciente.

## Antes de gerar o PDF: releia cada frase contra isto

O diagnóstico vai ser lido por alguém que conhece o próprio negócio melhor que você. Uma frase
exagerada derruba o documento inteiro, porque o leitor passa a duvidar do resto.

| Nunca escreva | Por quê | Escreva assim |
|---|---|---|
| "prova que vocês sabem fazer conteúdo que sai da bolha" | View de reel **não** distingue orgânico de impulsionado | "não dá para saber daqui se foi entrega natural ou impulsionamento, e essa resposta vocês têm aí dentro" |
| "isso é raro", "o maior que eu já vi" | Superlativo que o prospect sabe medir e desmentir | o número puro: "1,18 vez a base" |
| "não virou nada", "dinheiro no chão" | Soa como acusação de incompetência | "o alcance aconteceu e a base não cresceu junto" |
| "você não tem X" repetido cinco vezes | Vira lista de defeitos, não diagnóstico | misture o que falta com o que já está certo |

**O teste:** leia o furo em voz alta imaginando o sócio lendo na frente da equipe dele. Se ele
ficaria constrangido em vez de curioso, está errado. O objetivo é que ele queira conversar, não
que ele se defenda. Um diagnóstico que ofende não fecha, por mais correto que esteja.

E quando o prospect roda mídia, **toda afirmação sobre alcance vira hipótese**, nunca constatação:
ele pode ter impulsionado qualquer peça. Isso vale inclusive para elogio, e elogiar alcance pago
achando que é orgânico é o jeito mais rápido de mostrar que você não entende do assunto.
