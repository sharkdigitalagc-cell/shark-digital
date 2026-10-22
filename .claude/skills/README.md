# Skills do projeto

As pastas aqui dentro são skills do Claude Code que **carregam sozinhas** para quem abrir este
repositório. Não precisa instalar nada, nem copiar arquivo para lugar nenhum: clonou o projeto e
abriu o Claude Code na pasta, a skill já aparece.

É de propósito que elas moram aqui e não na pasta pessoal de cada um (`~/.claude/skills`). Skill
que vive só na máquina de uma pessoa não serve para o time: quem for usar não tem, e quem tem
esquece de atualizar.

## O que existe

| Skill | Para quê |
|---|---|
| `prospeccao-advocacia` | Prospectar escritório de advocacia de ponta a ponta: varre a fonte de leads, tria quem encaixa, diagnostica os canais do prospect, escreve o fluxo de abordagem e lança o lead no CRM |
| `sdr-whatsapp` | Escrever as mensagens de WhatsApp da prospecção na voz do Vinicius: primeiro contato, resposta a objeção, follow-up e pedido de reunião, a partir das conversas que de fato converteram |

## Como usar

Abra o Claude Code na pasta do projeto e peça o que precisa, com suas palavras: "acha advogado
pra prospectar", "analisa esse @ aqui", "bota esses leads no CRM". A skill dispara sozinha.

Se quiser forçar, digite `/prospeccao-advocacia`.

## Se a Claude não usar a skill

Primeiro confira o óbvio: você está com o Claude Code aberto **na pasta do projeto**? Skill de
projeto só vale dentro dele. Se você abriu numa pasta qualquer, ela não existe.

Dá para checar perguntando "quais skills você tem?". Se `prospeccao-advocacia` não aparecer na
lista, é isso.

## Mexendo numa skill

Edite os arquivos e abra PR como em qualquer mudança do repositório. Quem já estiver com o
projeto aberto pega a versão nova na próxima sessão.

O conteúdo de cada skill fica no `SKILL.md`, e o material de apoio em `references/`, que a Claude
lê só quando precisa.
