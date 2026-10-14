# Shark Digital — site institucional

Site institucional da Shark Digital: página única, responsiva, em português.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion (via `LazyMotion`) · Lucide Icons · fonte Geist (`next/font`, auto-hospedada no build).

## Desenvolvimento

Requisitos: Node.js 20.9+ e npm.

```bash
npm install
cp .env.example .env.local   # opcional, veja "Formulário de contato"
npm run dev                  # http://localhost:3000
```

## Qualidade e build

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript (tsc --noEmit)
npm run build       # build de produção
npm start           # serve o build em http://localhost:3000
```

## Versão estática (sem servidor)

Para hospedagens que só servem arquivos (Netlify Drop, GitHub Pages etc.):

```bash
mv src/app/api /tmp/api-backup        # a rota de contato precisa de servidor
STATIC_EXPORT=1 npm run build         # gera a pasta out/
mv /tmp/api-backup src/app/api
```

Nessa versão o formulário mostra "O envio ainda não está disponível. Seus dados
não foram enviados." até existir um destino real.

## Estrutura

```
src/
  app/
    layout.tsx            metadados (SEO, OpenGraph), fontes, idioma pt-BR
    page.tsx              ordem das seções
    globals.css           tokens de cor (paleta da marca) e animações do diagrama
    api/contact/route.ts  encaminhamento do formulário para o endpoint real
    icon.png, apple-icon.png, favicon.ico, opengraph-image.png
  components/
    site-header.tsx       navbar (transparente → sólida ao rolar, menu mobile)
    site-footer.tsx
    logo.tsx              logo oficial (variações horizontal e empilhada)
    hero-diagram.tsx      diagrama SVG/CSS do hero (sem JS)
    contact-form.tsx      formulário com validação e estados
    reveal.tsx            animação de entrada (Framer Motion)
    ui.tsx                Container, Section, SectionHeader, ButtonLink, Card
    sections/             uma seção por arquivo
  lib/contact.ts          validação compartilhada entre cliente e servidor
public/
  logo-shark-digital.png             logo empilhada (rodapé)
  logo-shark-digital-horizontal.png  logo horizontal (cabeçalho)
```

## Formulário de contato

O formulário envia para `POST /api/contact`, que valida os dados e os encaminha
para o destino configurado. Por padrão, porém, os contatos vão direto do navegador do visitante para o e-mail da Shark
(sharkdigital.agc@gmail.com) via [FormSubmit](https://formsubmit.co), configurado em
`src/lib/contact-email.ts` (o FormSubmit recusa envios feitos por servidor). No primeiro
envio, o FormSubmit manda um e-mail de ativação para essa caixa, e até o link ser
clicado os envios aparecem como não enviados. Deixe `CONTACT_EMAIL` vazio nesse
arquivo para usar a rota `/api/contact` com `CONTACT_FORM_ENDPOINT`. Depois do envio, o visitante é
levado ao WhatsApp da Shark com os dados já escritos (número em
`src/lib/whatsapp.ts`). **Não existe envio simulado**: sem destino
configurado, ou se o destino não confirmar o recebimento, o visitante vê que os
dados não foram enviados.

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `CONTACT_FORM_ENDPOINT` | só sem e-mail | URL que recebe um `POST` JSON (webhook do CRM, n8n/Make/Zapier), usada quando `CONTACT_EMAIL` está vazio. |
| `CONTACT_FORM_TOKEN` | não | Enviado como `Authorization: Bearer <token>`. |
| `NEXT_PUBLIC_SITE_URL` | recomendado | URL pública do site, usada em canonical e OpenGraph. |

Corpo enviado ao destino:

```json
{
  "nome": "…",
  "empresa": "…",
  "email": "…",
  "whatsapp": "…",
  "desafio": "…",
  "origem": "site-shark-digital",
  "enviadoEm": "2026-01-01T12:00:00.000Z"
}
```

Respostas da API: `200 { ok: true }` quando o destino responde 2xx;
`503 { code: "not_configured" }` sem `CONTACT_FORM_ENDPOINT` (mensagem exibida:
"O envio ainda não está disponível. Seus dados não foram enviados.");
`422 { code: "invalid", errors }` para dados inválidos;
`502 { code: "upstream_error" }` quando o destino falha.

Pendências marcadas com `TODO(contato)` em `src/app/api/contact/route.ts`:

- definir o destino real e ajustar o formato do corpo, se necessário;
- reforçar a validação no servidor conforme as regras do CRM;
- proteção contra abuso: rate limit por IP e verificação anti-bot (ex.: Turnstile).
  Hoje há apenas um campo honeypot.

> A rota `/api/contact` precisa de um runtime de servidor (ex.: Vercel ou `npm start`).
> Exportação estática (`output: "export"`) não é compatível com ela.

## CRM (/crm)

CRM comercial da agência em `/crm`, com login pelo Google (só e-mails liberados) e uma planilha
do Google Sheets como banco de dados. Configuração, segurança e uso em
[docs/crm/README.md](docs/crm/README.md).

## Conteúdo pendente

- **Cases** — `src/components/sections/cases.tsx` (`TODO(cases)`): preencher a lista
  `CASES` apenas com cases verificados e autorizados. Enquanto vazia, a seção mostra
  a estrutura com placeholders explícitos.
- Não há telefone, e-mail, endereço, CNPJ ou redes sociais no site: adicionar quando
  houver dados oficiais.

## Logo

Os arquivos em `public/` foram gerados a partir do PNG oficial enviado pelo
cliente (fundo já transparente). Foram removidos apenas resíduos quase invisíveis
do recorte original (pixels com opacidade muito baixa fora do desenho), sem alterar
o tubarão, as letras ou os sublinhados. A versão horizontal reposiciona os mesmos
elementos (tubarão ao lado do nome) para caber no cabeçalho; se houver uma versão
horizontal oficial, substitua `logo-shark-digital-horizontal.png` mantendo a
proporção ou ajuste `width`/`height` em `src/components/logo.tsx`.

## Acessibilidade e movimento

- HTML semântico (`header`, `nav`, `main`, `section`, `footer`), link "Pular para o conteúdo" e foco visível.
- Menu mobile com `aria-expanded`, fecha com Escape (devolvendo o foco ao botão) e ao escolher um link.
- `prefers-reduced-motion` desativa as animações; sem JavaScript o conteúdo continua visível.
