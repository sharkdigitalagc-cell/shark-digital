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

Dois cuidados que evitam erro grosseiro:

- **Reel em colaboração aparece nos dois perfis com a mesma contagem.** Se o sócio e o escritório
  publicam juntos, compare só os reels exclusivos de cada um, senão os dois índices ficam iguais
  e a comparação perde sentido.
- **Um viral distorce a média.** Se um reel fez 1,9 milhão e os outros fazem 4 mil, registre o
  viral como achado separado e use a mediana para o índice. Média com outlier engana.

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

**Google.** Quando o escritório **tem domínio**, vá direto a
`adstransparency.google.com/?region=BR&domain=<dominio>`. Essa URL devolve a contagem exata
("0 anúncio", "2 anúncios") e revela anúncios veiculados por anunciante com outro nome, que é o
caso mais comum em escritório, onde a conta está no CPF de um sócio. Teste **todos** os domínios
que o escritório tiver, um a um: já apareceu banca com três domínios em que só um recebia
anúncio, e era o que estava vazio.

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

## Checklist final

Antes de fechar o diagnóstico, confirme que você tem:

- [ ] Todos os perfis, com seguidores e índice de alcance de cada um
- [ ] O reel de maior alcance e o que ele tem de diferente
- [ ] O link da bio testado, com o resultado do teste
- [ ] Situação do site e se ele fala do mesmo serviço do conteúdo
- [ ] Anúncios ativos no Meta e no Google, com número e com o destino de cada um
- [ ] Quantos concorrentes anunciam no termo genérico do nicho
- [ ] Nome, endereço, telefone e CNPJ, com as divergências anotadas
- [ ] Cidade, para saber se dá reunião presencial
- [ ] De 4 a 6 pontos de ruptura e de 4 a 5 forças

Se faltar algo que você não conseguiu checar, registre como não checado na ficha em vez de
chutar. O campo de anúncios do CRM distingue "não checado" de "zero", e essa diferença importa
na hora da conversa.
