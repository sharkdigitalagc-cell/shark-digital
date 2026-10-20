# Lançar o lead no CRM

O CRM da Shark é o do próprio site: **https://www.agcsharkdigital.com.br/crm**

Entra com a conta Google da agência (só os e-mails liberados). Os dados ficam no **Supabase**, e
o código vive neste repositório em `public/crm/index.html` e `src/lib/crm/`. O rodapé da tela diz
qual banco está ativo. O Google Sheets continua no código como reserva e só entra se as variáveis
do Supabase faltarem (`crmStore()` é `supabaseStore() ?? sheetStore()`).

Nada disso muda como você grava: a API é a mesma dos dois jeitos.

> Existe um CRM antigo como artifact do claude.ai. Ele virou rascunho e **não deve mais ser
> usado**. Se alguma instrução mandar gravar com `ArtifactData`, está desatualizada.

## Jeito 1: pela tela (o normal)

Abra o CRM, clique em **Novo lead**, preencha e depois abra o card para completar o diagnóstico.
A seção **Diagnóstico de canais** tem os perfis com seguidores e views, e o índice de alcance é
calculado sozinho. Abaixo dela, **Abordagem** guarda as mensagens.

É o caminho certo quando é um lead só.

## Jeito 2: em lote, pela API

Para vários leads de uma vez, use a API do próprio CRM com a sessão já logada no navegador. Abra
o CRM, e no console da página:

```js
await fetch('/api/crm/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-crm-request': '1' },
  body: JSON.stringify({ action: 'create', leads: [ /* ... */ ] })
}).then(r => r.json());
// → {"ok":true,"created":12,"skipped":0}
```

Dois detalhes que fazem a chamada falhar se faltarem: o cabeçalho **`x-crm-request: 1`** (sem ele
vem `403 forbidden`) e a sessão logada no mesmo domínio.

## Jeito 3: importar arquivo

**Ajustes → Importar planilha** aceita `.xlsx`, `.csv` e o `.json` de backup do CRM. O backup tem
o formato `{ app: 'crm-shark-digital', version: 1, leads: [...] }`. O CRM mostra uma prévia antes
de confirmar e não apaga o que já existe.

Bom quando o diagnóstico foi montado fora e precisa entrar de uma vez.

## Antes de gravar

Leia o que já existe para não duplicar lead nem repetir número:

```js
await fetch('/api/crm/data', { headers: { 'x-crm-request': '1' } }).then(r => r.json());
```

Pegue o maior `num` e o menor `order`. Lead novo entra com o `num` seguinte e `order` abaixo do
menor (mais negativo), porque `order` menor sobe o card no topo da coluna.

## Campos

### Identificação e contato

| Campo | Observação |
|---|---|
| `num` | Sequencial, o próximo livre |
| `empresa` | Nome do escritório. Se for advogado solo, a banca que ele cita na bio |
| `contato` | Quem você vai abordar |
| `whats` | Formato `(45) 99999-9999`. Vazio se o contato está atrás de encurtador |
| `e164` | `+55` com DDD e número, sem símbolo |
| `foneAviso` | Avisos sobre o telefone: "o link deles usa número sem o 9º dígito", "contato atrás do Linktree" |
| `email`, `cidade` | Cidade importa: define se dá reunião presencial |
| `insta` | O `@` do perfil de abordagem. Vira botão no CRM |
| `nicho` | "Advocacia" |
| `canal`, `origem` | "Prospecção ativa" nos dois |

### Oportunidade

| Campo | Observação |
|---|---|
| `servicos` | Lista. Use os nomes exatos da tabela de preços, senão o orçamento não soma |
| `demanda` | Três a cinco linhas: o que o escritório faz, o número que chama atenção, onde está o gargalo |
| `fee`, `setup`, `verba` | Números |
| `temp` | `frio`, `morno` ou `quente` |
| `stage` | `novo` |
| `order` | Menor que o menor existente |
| `prox` | Próximo retorno, normalmente o dia seguinte |
| `resp` | Quem cuida do lead |
| `criado` | `AAAA-MM-DD` |
| `createdAt`, `updatedAt`, `stageAt`, `diagAt` | Timestamp em milissegundos |
| `obs` | O que não cabe nos outros campos: CNPJ, OAB, divergências, ponte de indicação, risco de qualificação, raciocínio do preço |

### Diagnóstico

| Campo | Observação |
|---|---|
| `perfis` | Lista de `{h, s, v}`: handle, seguidores, views médias. O CRM calcula o alcance sozinho e colore |
| `site` | Domínio, ou os dois separados por "e" quando houver mais de um |
| `siteNota` | Uma frase sobre a situação do site |
| `adsMeta`, `adsGoogle` | String. `"0"` quando checou e não tem, `""` quando não checou. A diferença importa |
| `achados` | 4 a 6 frases completas, uma por ponto de ruptura. Vira lista numerada |
| `forcas` | 4 a 5 frases do que já funciona |
| `abordagem` | As 4 mensagens com os rótulos `[1]` a `[4]` |
| `hist` | Comece com `{t, k:"create"}` e uma nota registrando a data do diagnóstico e as fontes |

Escreva `achados` e `forcas` como frases que se sustentam sozinhas, porque é o que a pessoa lê
antes da call sem reabrir nada. "Link da bio quebrado" não ajuda. "O link da bio aponta para um
domínio sem registro no registro.br, então todo clique morre em erro de DNS e o domínio está
livre para qualquer um comprar" ajuda.

## Precificação

O CRM tem **Montar orçamento**, que usa a tabela de preços de Ajustes (cada serviço com setup e
fee) e ajusta por nicho e escopo. Use ele em vez de inventar número, e ajuste pelo diagnóstico:

- **Já gasta com mídia**: tem verba e cultura de investimento. Fee maior, setup menor. A conversa
  é sobre aproveitar melhor o que já gasta.
- **Nunca gastou**: fee mais enxuto e setup maior, porque a primeira entrega é estrutura.
- **Muitos furos estruturais** (site, domínio, medição): cobre o setup à parte em vez de diluir.
- **Problema é consolidar, não construir** (dois sites no ar, audiência partida): fee e setup
  acima da média, porque desfazer dá mais trabalho que fazer do zero.

Landing page e site são setup. Tráfego, social media e automação são fee mensal.

## Temperatura

Não é otimismo, é probabilidade de fechar:

- **quente**: tem ponte real (evento em comum, cliente que indica, proximidade que permite café).
- **morno**: já investe em mídia ou tem operação evidente, então tem caixa e urgência.
- **frio**: prospecção pura, operação pequena, ou acabou de gastar com outra coisa.

## Follow-up

Para lead que já está em conversa, o CRM tem **Follow-up**, que monta a mensagem por etapa do
funil e abre o WhatsApp com ela pronta. O campo `abordagem` é só o primeiro contato.

## Depois de gravar

Abra um card e confira. O selo dourado com a contagem de furos aparece no funil, e o índice de
alcance colorido aparece no painel do lead. Se o orçamento vier zerado, o nome em `servicos` não
bate com a tabela de preços.
