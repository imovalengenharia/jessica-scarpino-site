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
3. O GitHub (Actions → `publicar`) roda `node gerar.js` e publica a pasta `publico/` no
   GitHub Pages — em 1 a 2 minutos. Se uma nota tiver erro, ele avisa por e-mail e o
   site no ar continua o anterior.

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

## Domínio próprio (quando houver)

1. GitHub → repositório → **Settings → Pages → Custom domain** → digite o domínio.
2. No DNS do domínio, crie os registros que o GitHub mostrar (A para o domínio, CNAME para o www).
3. Crie na raiz um arquivo `CNAME` com o domínio (o gerador copia) e ponha o endereço em
   `conteudo/Site.md` → `endereco_site`.
