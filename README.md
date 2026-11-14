# Site · Jéssica Domingos Scarpino, psicóloga

Site de uma página, gerado a partir de notas do Obsidian.

```
conteudo/      ← os textos e fotos (é aqui que se edita; abra no Obsidian)
modelo/        ← o visual: HTML (pagina.js), CSS e interações
gerar.js       ← lê conteudo/ + modelo/ e escreve o site em publico/
```

## Como as mudanças vão para o ar

1. Edita uma nota em `conteudo/` (no Obsidian, ou pedindo ao Claude).
2. O Obsidian Git (ou o Claude) envia a mudança para o `main` no GitHub.
3. O Render roda `node gerar.js` e publica a pasta `publico/` — em 1 a 2 minutos.

O GitHub Actions (`verificar`) também gera o site a cada mudança e avisa se algo
estiver errado numa nota.

## Obsidian

Abra **a pasta do repositório inteira** como cofre (Abrir pasta como cofre). O plugin
Obsidian Git já vem configurado: puxa as mudanças ao abrir e a cada 5 minutos, e salva
e envia as suas a cada 2 minutos. O guia de edição está em `conteudo/LEIA-ME.md`.

## Ver no computador

```bash
node gerar.js        # gera publico/
npx serve publico    # abre em http://localhost:3000
```

Requer Node 22. Sem dependências.

## Publicar pela primeira vez (Render)

1. render.com → **New → Blueprint** → escolha este repositório → **Apply**.
2. O site fica em `https://jessica-scarpino-site.onrender.com`.
3. Domínio próprio: no serviço → **Settings → Custom Domains** → adicione o domínio e crie
   no DNS o registro que o Render mostrar. Depois, ponha o endereço em
   `conteudo/Site.md` → `endereco_site` (Google e compartilhamentos usam).
