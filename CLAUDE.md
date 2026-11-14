# Site da Jéssica Domingos Scarpino (psicóloga)

Site estático de uma página. Conteúdo em notas do Obsidian (`conteudo/`), visual em
`modelo/`, gerador sem dependências em `gerar.js` → `publico/` (fora do git).
Publicação: push no `main` → GitHub Actions (`.github/workflows/publicar.yml`) gera e publica no GitHub Pages.

## Regras
- **Texto muda nas notas, nunca no modelo.** Se um texto novo não cabe em nenhuma nota,
  crie o campo/nota e leia-o em `modelo/pagina.js`.
- Formato das notas: campos no topo entre `---` (YAML simples: `chave: valor` e listas
  `  - item`); cada `## Título` no corpo vira um item; `icone: nome` logo abaixo do `##`.
  `==texto==` = realce dourado. Imagens como `[[arquivo.webp]]`, procuradas em
  `conteudo/Imagens/`. Documentação para a dona: `conteudo/LEIA-ME.md` — mantenha em dia.
- A dona edita pelo Obsidian (plugin Git faz commit/push no `main`): antes de mexer,
  `git pull`; não reescreva notas inteiras dela sem pedir.
- Fotos novas: converter para WebP, até 1200 px de largura (Pillow), em `conteudo/Imagens/`.
- Depois de mudar algo: `node gerar.js` tem de passar; confira a página em 1366 px e 390 px.
- Ética do CFP (Código de Ética, art. 20): sempre nome + CRP; **sem depoimentos de
  pacientes, sem promessa de resultado e sem preço como propaganda**. Não ponha valores
  na página.
- Identidade: cacau/champanhe/dourado; Cinzel (selos), Cormorant Garamond (títulos),
  Jost (texto). Logo JS em `conteudo/Imagens/logo.*`.
- Não citar a rede de coworking (Livance) no site (o dono, 14/11/2026); as fotos das salas vêm do Drive dela.
- Escreva em português do Brasil, com acentos.
- Registre cada pedido em uma linha de `Registro.md` (data, o que mudou), para o dono ler no Obsidian.
