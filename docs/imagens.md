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

## Projetos (/clientes e home)

Os cards de projeto usam uma capa tipográfica (nome + entregas confirmadas)
em `src/components/project-cover.tsx`. Quando houver imagens reais e
autorizadas do trabalho (telas do site da Colen, do sistema da Arthemi,
criativos aprovados etc.), elas podem substituir a capa. Não usar capturas
fictícias.
