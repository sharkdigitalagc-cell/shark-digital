# CRM Shark Digital

CRM comercial da agência em `SEU-DOMINIO/crm`: funil com arrastar e soltar, lista de leads,
retornos, painel e ajustes. Login com Google, liberado só para os e-mails admin. Os dados
ficam numa planilha do Google Sheets.

```
public/crm/index.html          a tela do CRM (um arquivo só)
src/app/api/crm/               login, sessão e dados (servidor do site)
src/lib/crm/                   regras de acesso, leitura e gravação na planilha
docs/crm/CRM Shark Digital - Banco de Dados.xlsx   modelo da planilha
```

## Como funciona a segurança

- **Login com Google.** Só entra quem estiver em `CRM_ADMIN_EMAILS`. Não existe senha do CRM.
- **Sessão assinada.** Depois do login o navegador guarda um cookie `httpOnly` (o JavaScript da
  página não lê), assinado com `CRM_SESSION_SECRET` e válido por 7 dias.
- **Toda chamada confere de novo.** Cada leitura e gravação valida o cookie e se o e-mail
  continua na lista. Tirou o e-mail do Vercel e fez redeploy, a pessoa perde o acesso na hora.
- **A planilha não fica pública.** Só o servidor do site fala com ela, por uma conta de serviço do
  Google. A chave dessa conta fica nas variáveis do Vercel e nunca vai para o navegador.
- **Gravações só a partir do próprio CRM** (cabeçalho próprio + mesma origem), o que bloqueia
  ataques vindos de outros sites.
- **Texto nunca vira fórmula** na planilha (gravação em modo bruto).
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

### 2. Google Cloud (console.cloud.google.com)

Use a conta Google da agência.

1. **Criar projeto**: “CRM Shark Digital”.
2. **APIs e serviços → Biblioteca** → procure **Google Sheets API** → **Ativar**.
3. **Google Auth Platform** (ou “Tela de permissão OAuth”):
   - Tipo de usuário **Externo**; nome do app “CRM Shark Digital”; e-mail de suporte da agência.
   - Em **Público**, clique em **Publicar app**. Como o CRM só pede nome e e-mail, o Google
     não exige verificação. (Se preferir deixar em “Teste”, adicione os e-mails admin como
     usuários de teste.)
4. **Clientes → Criar cliente → Aplicativo da Web**:
   - Origens JavaScript autorizadas: `https://SEU-DOMINIO`
   - URIs de redirecionamento autorizados: `https://SEU-DOMINIO/api/crm/auth/callback`
     (para testar no computador, adicione também `http://localhost:3000/api/crm/auth/callback`)
   - Guarde o **ID do cliente** e a **chave secreta do cliente**.
5. **IAM e administrador → Contas de serviço → Criar conta de serviço**: nome `crm-planilha`,
   sem papéis. Abra a conta criada → **Chaves → Adicionar chave → JSON**. Um arquivo .json é
   baixado. Guarde em lugar seguro: ele é a chave da planilha.
6. Copie o e-mail da conta de serviço (termina em `iam.gserviceaccount.com`) e, na planilha,
   **Compartilhar** com esse e-mail como **Editor**.

### 3. Vercel

No projeto do site: **Settings → Environment Variables**, para Production (e Preview, se quiser
testar nas prévias):

| Variável | Valor |
| --- | --- |
| `CRM_ADMIN_EMAILS` | e-mails Google liberados, separados por vírgula (ex.: o seu e o do seu sócio) |
| `CRM_SESSION_SECRET` | texto aleatório com 32+ caracteres (veja abaixo) |
| `CRM_GOOGLE_CLIENT_ID` | ID do cliente OAuth (passo 2.4) |
| `CRM_GOOGLE_CLIENT_SECRET` | chave secreta do cliente OAuth (passo 2.4) |
| `CRM_SHEET_ID` | ID da planilha (passo 1.3) |
| `CRM_SERVICE_ACCOUNT_JSON` | conteúdo inteiro do arquivo .json da conta de serviço (passo 2.5) |

Para gerar o `CRM_SESSION_SECRET` no computador:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

Depois de salvar as variáveis, faça um **Redeploy** e abra `https://SEU-DOMINIO/crm`.

> O login com Google só funciona nos endereços cadastrados no passo 2.4. Nas prévias do
> Vercel (`*.vercel.app`) ele recusa, a não ser que você cadastre também esse endereço.

Se faltar alguma variável, a tela de login do CRM mostra o nome dela.

## Dia a dia

- **Incluir ou tirar alguém:** edite `CRM_ADMIN_EMAILS` no Vercel e faça redeploy.
- **Editar direto na planilha:** pode. O CRM puxa as mudanças em até 20 segundos. Não renomeie
  os títulos da linha 1 nem as abas `Leads` e `Listas do CRM`. Linhas novas digitadas na mão
  ganham ID automaticamente.
- **Colunas que começam com `_`** (ocultas) são do sistema: id, ordem dos cards, datas internas
  e histórico.
- **Backup:** em Ajustes, “Backup .json” ou “Exportar Excel”. A planilha também tem o histórico
  de versões do Google (Arquivo → Histórico de versões).

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
