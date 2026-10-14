# Imagens do site

Hoje o site não usa fotos: as composições visuais são feitas em SVG/CSS.
Se a Shark quiser trocar por fotografia, use fotos próprias ou com licença
verificada, nesta direção: objetos pretos foscos, fundo escuro, luz lateral
discreta (laranja da logo ou verde), sem pessoas, apertos de mão ou tubarões.

| Onde | Tema sugerido | Substitui |
| --- | --- | --- |
| Seção "Quatro perguntas antes de anunciar" | Peça de xadrez preta, luz lateral laranja | `StrategyPiece` em `src/components/still-life.tsx` |
| Seção "Quem somos" | Animação: bloco "Shark" conectado a "Sua empresa", com atração, engajamento e venda | `SharkConnection` em `src/components/shark-connection.tsx` (manter a animação mesmo com foto) |
| Seção "Pauta da primeira conversa" | Caderno ou agenda preta fechada, luz verde | `Planner` em `src/components/still-life.tsx` |

Formato: JPG ou WebP, ~1600 px no lado maior, até ~250 KB, 4:5.

## Portfólio (/portfolio e home)

O portfólio usa imagens reais do trabalho de cada cliente: capturas dos
sites no ar e as peças entregues (posts, carrosséis, anúncios, logos). Não
usar capturas fictícias, fotos do cliente como se fossem trabalho nosso,
marcas criadas por terceiros nem personagens licenciados.

- Textos e lista de peças: `src/lib/portfolio.ts`. A ordem do array é a
  ordem da página; `featured: true` coloca o projeto na home e na faixa
  "Empresas atendidas".
- Imagens: `src/content/portfolio/<slug>/`, em WebP. Depois de adicionar,
  trocar ou remover arquivos, rode `npm run portfolio:manifest` para
  atualizar `src/content/portfolio/images.ts` (não edite esse arquivo à mão).

| Arquivo | Formato |
| --- | --- |
| `capa.webp` | 1600×1000. Site: notebook + celular; redes: três peças lado a lado |
| `og.jpg` | 1200×750, a capa em JPG para a prévia de links (WhatsApp e redes) |
| `site-desktop.webp`, `site-celular.webp` | primeira tela em 1440×900 e celular com 600 px de largura |
| `site-pagina.webp` | página inteira com 1200 px de largura (até ~5600 px de altura) |
| `post-NN.webp`, `marca-NN.webp` | até 900 px de largura (posts) ou 1200–1600 px (marcas, peças largas) |
