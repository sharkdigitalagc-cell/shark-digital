# CRM Shark Digital

CRM comercial da agência em `SEU-DOMINIO/crm`: funil com arrastar e soltar, lista de leads,
retornos, painel e ajustes. Login com Google, liberado só para os e-mails admin. Os dados
ficam numa planilha do Google Sheets.

```
public/crm/index.html          a tela do CRM (um arquivo só)
src/app/api/crm/               login, sessão e dados (servidor do site)
src/lib/crm/                   regras de acesso, leitura e gravação na planilha
docs/crm/CRM Shark Digital - Banco de Dados.xlsx   modelo da planilha
docs/crm/apps-script.gs        ponte entre o site e a planilha (colar no Apps Script)
```

## Como funciona a segurança

- **Login com Google.** Só entra quem estiver em `CRM_ADMIN_EMAILS`. Não existe senha do CRM.
- **Sessão assinada.** Depois do login o navegador guarda um cookie `httpOnly` (o JavaScript da
  página não lê), assinado no servidor e válido por 7 dias.
- **Toda chamada confere de novo.** Cada leitura e gravação valida o cookie e se o e-mail
  continua na lista. Tirou o e-mail do Vercel e fez redeploy, a pessoa perde o acesso na hora.
- **A planilha não fica pública.** Só o servidor do site fala com ela, pelo Apps Script da própria
  planilha, usando uma chave que fica nas variáveis do Vercel e nunca vai para o navegador. Sem a
  chave, o Apps Script recusa qualquer pedido.
- **Gravações só a partir do próprio CRM** (cabeçalho próprio + mesma origem), o que bloqueia
  ataques vindos de outros sites.
- **Texto nunca vira fórmula** na planilha (todo texto é gravado como texto puro).
- `/crm` e `/api/` ficam fora do Google (`robots.txt` e `X-Robots-Tag: noindex`), e a página do
  CRM não pode ser embutida em outro site.

## Configuração (uma vez só)

### 1. Planilha

1. No Google Drive: **Novo → Upload de arquivo** → `CRM Shark Digital - Banco de Dados.xlsx`.
2. Abra o arquivo e use **Arquivo → Salvar como Planilhas Google**. Use essa versão (a .xlsx
   pode ser apagada).
3. Copie o ID da planilha: é o trecho do link entre `/d/` e `/edit`.

As 8 primeiras linhas são leads de exemplo. Depois de testar, apague pelo botão
“Apagar exemplos” no CRM.

### 2. Apps Script (a ponte com a planilha)

1. Na planilha: **Extensões → Apps Script**. Apague o que estiver no editor, cole o conteúdo de
   `docs/crm/apps-script.gs` e salve.
2. Escolha a função **gerarChave** na barra de cima e clique em **Executar**. Autorize com a conta
   dona da planilha (o Google avisa que o app não é verificado: **Avançado → Acessar**). A chave
   aparece no **Registro de execução**: ela vai no Vercel em `CRM_APPS_SCRIPT_SECRET`.
3. **Implantar → Nova implantação** → tipo **App da Web**: executar como **Eu**, quem pode acessar
   **Qualquer pessoa** → **Implantar**. Copie a URL que termina em `/exec`: ela vai no Vercel em
   `CRM_APPS_SCRIPT_URL`.

“Qualquer pessoa” só deixa o endereço acessível; sem a chave, o Apps Script não lê nem grava nada.
Se mudar o código depois, use **Implantar → Gerenciar implantações → Editar → Nova versão** para
manter a mesma URL.

### 3. Google Cloud (console.cloud.google.com): login com Google

Use a conta Google da agência.

1. Selecione (ou crie) um projeto.
2. **Google Auth Platform** (ou “Tela de permissão OAuth”):
   - Tipo de usuário **Externo**; nome do app “CRM Shark Digital”; e-mail de suporte da agência.
   - Em **Público**, clique em **Publicar app**. Como o CRM só pede nome e e-mail, o Google
     não exige verificação. (Se preferir deixar em “Teste”, adicione os e-mails admin como
     usuários de teste.)
3. **Clientes → Criar cliente → Aplicativo da Web**:
   - Origens JavaScript autorizadas: `https://SEU-DOMINIO`
   - URIs de redirecionamento autorizados: `https://SEU-DOMINIO/api/crm/auth/callback`
     (para testar no computador, adicione também `http://localhost:3000/api/crm/auth/callback`)
   - Guarde o **ID do cliente** e a **chave secreta do cliente**.
### 4. Vercel

No projeto do site: **Settings → Environment Variables**, para Production (e Preview, se quiser
testar nas prévias):

| Variável | Valor |
| --- | --- |
| `CRM_ADMIN_EMAILS` | e-mails Google liberados, separados por vírgula (ex.: o seu e o do seu sócio) |
| `CRM_GOOGLE_CLIENT_ID` | ID do cliente OAuth (passo 3.3) |
| `CRM_GOOGLE_CLIENT_SECRET` | chave secreta do cliente OAuth (passo 3.3) |
| `CRM_SHEET_ID` | ID da planilha (passo 1.3) |
| `CRM_APPS_SCRIPT_URL` | URL do app da Web do Apps Script, terminando em `/exec` (passo 2.3) |
| `CRM_APPS_SCRIPT_SECRET` | chave gerada pela função gerarChave (passo 2.2) |

Opcional: `CRM_SESSION_SECRET` (texto aleatório com 32+ caracteres) assina os cookies de sessão. Sem ela,
o CRM usa uma chave derivada da chave secreta do cliente OAuth.

Depois de salvar as variáveis, faça um **Redeploy** e abra `https://SEU-DOMINIO/crm`.

> O login com Google só funciona nos endereços cadastrados no passo 3.3. Nas prévias do
> Vercel (`*.vercel.app`) ele recusa, a não ser que você cadastre também esse endereço.

Se faltar alguma variável, a tela de login do CRM mostra o nome dela.

**Alternativa ao Apps Script:** uma conta de serviço do Google Cloud com a Google Sheets API
ativada, a planilha compartilhada com ela como Editor e o arquivo .json da chave inteiro em
`CRM_SERVICE_ACCOUNT_JSON` (nesse caso as duas variáveis do Apps Script não são necessárias).
Muitas organizações novas do Google Cloud bloqueiam a criação dessas chaves por padrão.

## Dia a dia

- **Incluir ou tirar alguém:** edite `CRM_ADMIN_EMAILS` no Vercel e faça redeploy.
- **Editar direto na planilha:** pode. O CRM puxa as mudanças em até 20 segundos. Não renomeie
  os títulos da linha 1 nem as abas `Leads` e `Listas do CRM`. Linhas novas digitadas na mão
  ganham ID automaticamente.
- **Colunas que começam com `_`** (ocultas) são do sistema: id, ordem dos cards, datas internas
  e histórico.
- **Backup:** em Ajustes, “Backup .json” ou “Exportar Excel”. A planilha também tem o histórico
  de versões do Google (Arquivo → Histórico de versões).
- **Orçamento:** botão no topo do CRM e “Montar orçamento” dentro de cada lead. Escolha nicho,
  escopo (Enxuto −15%, Padrão, Completo +30%) e serviços; os valores saem da tabela em
  Ajustes → Tabela de preços (preço base por serviço + ajuste % por nicho) e podem ser editados
  à mão no próprio orçamento. Dá para copiar o texto para o WhatsApp, gerar PDF ou salvar no
  lead (preenche fee, setup, verba e serviços, registra no histórico e move para Proposta
  enviada). A tabela fica salva na aba `Listas do CRM`, nas colunas “Tabela de preços” e
  “Ajuste por nicho”, no formato `Serviço | implantação | mensal` e `Nicho | %`.

## Testar no computador

```bash
npm install
CRM_DEV_LOGIN=1 CRM_ADMIN_EMAILS=voce@exemplo.com npm run dev
```

No PowerShell do Windows:

```powershell
$env:CRM_DEV_LOGIN="1"; $env:CRM_ADMIN_EMAILS="voce@exemplo.com"; npm run dev
```

Abra `http://localhost:3000/crm`. Com `CRM_DEV_LOGIN=1` o botão “Entrar com Google” entra direto
e, sem `CRM_SHEET_ID`, os dados ficam em `.crm-dev.json` (no mesmo formato da planilha). Esse
modo nunca funciona em produção.

## Editar a tela do CRM

`public/crm/index.html` é a página inteira (HTML, CSS e JavaScript, sem build). Ela também roda
fora do site: aberta direto no navegador, salva no próprio navegador.
