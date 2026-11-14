// Gera o site a partir das notas do Obsidian (pasta conteudo/) para a pasta publico/.
// Sem dependências: node gerar.js
import { readFileSync, readdirSync, statSync, mkdirSync, rmSync, cpSync, writeFileSync, existsSync } from 'node:fs';
import { join, basename, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { pagina } from './modelo/pagina.js';

const RAIZ = import.meta.dirname;
const CONTEUDO = join(RAIZ, 'conteudo');
const SAIDA = join(RAIZ, 'publico');

// ---------- leitura das notas ----------

function lerNota(caminho) {
  const inteiro = join(CONTEUDO, caminho);
  if (!existsSync(inteiro)) throw new Error(`Falta a nota conteudo/${caminho}`);
  const bruto = readFileSync(inteiro, 'utf8').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  const m = bruto.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const campos = m ? lerCampos(m[1], caminho) : {};
  const corpo = m ? m[2] : bruto;
  return { campos, ...dividirSecoes(corpo), arquivo: caminho };
}

// YAML simples: "chave: valor" e listas "  - item"
function lerCampos(texto, caminho) {
  const campos = {};
  let lista = null;
  for (const linha of texto.split('\n')) {
    if (!linha.trim() || linha.trim().startsWith('#')) continue;
    const item = linha.match(/^\s*-\s+(.*)$/);
    if (item && lista) { campos[lista].push(semAspas(item[1])); continue; }
    const par = linha.match(/^([\wÀ-ÿ_-]+):\s*(.*)$/);
    if (!par) throw new Error(`${caminho}: não entendi a linha "${linha}" nos campos do topo`);
    if (par[2] === '') { campos[par[1]] = []; lista = par[1]; }
    else { campos[par[1]] = semAspas(par[2]); lista = null; }
  }
  for (const k in campos) if (Array.isArray(campos[k]) && !campos[k].length) campos[k] = '';
  return campos;
}
const semAspas = (v) => v.trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');

// O texto antes do primeiro "## " é a introdução; cada "## Título" vira um item.
function dividirSecoes(corpo) {
  const partes = corpo.split(/^## +/m);
  const intro = semCabecalho(partes.shift());
  const itens = partes.map((p) => {
    const [titulo, ...resto] = p.split('\n');
    const linhas = [...resto];
    const extra = {};
    while (linhas.length && /^\s*$/.test(linhas[0])) linhas.shift();
    while (linhas.length && /^(icone|ícone):\s*/i.test(linhas[0])) {
      extra.icone = linhas.shift().replace(/^(icone|ícone):\s*/i, '').trim();
    }
    const texto = linhas.join('\n');
    return { titulo: titulo.trim(), ...extra, html: markdown(texto), lista: listaDe(texto), paragrafos: paragrafosDe(texto) };
  });
  return { intro: markdown(intro), introLista: listaDe(intro), introParagrafos: paragrafosDe(intro), itens };
}
const semCabecalho = (t) => t.replace(/^# .*$/m, '');
const ehItem = (l) => /^\s*[-*] /.test(l);
const listaDe = (t) => t.split('\n').filter(ehItem).map((l) => inline(l.replace(/^\s*[-*] /, '')));
// parágrafos de texto corrido (sem listas), já em HTML de linha
const paragrafosDe = (t) => t.split('\n').filter((l) => !ehItem(l)).join('\n').trim().split(/\n{2,}/).map((b) => b.trim()).filter(Boolean).map((b) => inline(b.split('\n').join(' ')));

function lerPasta(pasta) {
  const dir = join(CONTEUDO, pasta);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => lerNota(join(pasta, f)))
    .sort((a, b) => (Number(a.campos.ordem) || 99) - (Number(b.campos.ordem) || 99) || a.arquivo.localeCompare(b.arquivo, 'pt'));
}

// ---------- markdown mínimo ----------

export function escapar(t = '') {
  return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function inline(t = '') {
  return escapar(t)
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+|mailto:[^)\s]+|#[^)\s]*)\)/g, '<a href="$2">$1</a>')
    .replace(/==([^=]+)==/g, '<em class="realce">$1</em>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(/\bon-line\b/g, '<span class="nq">on-line</span>');
}

export function markdown(t = '') {
  const blocos = t.trim().split(/\n{2,}/).filter(Boolean);
  return blocos.map((b) => {
    const linhas = b.split('\n');
    if (linhas.every(ehItem)) return `<ul>${linhas.map((l) => `<li>${inline(l.replace(/^\s*[-*] /, ''))}</li>`).join('')}</ul>`;
    if (linhas.every((l) => /^>/.test(l))) return `<blockquote>${inline(linhas.map((l) => l.replace(/^>\s?/, '')).join(' '))}</blockquote>`;
    const h = b.match(/^(#{3,4}) (.*)$/);
    if (h) return `<h4>${inline(h[2])}</h4>`;
    if (/^\|/.test(b)) return '';
    return `<p>${inline(linhas.join(' '))}</p>`;
  }).join('\n');
}

// ---------- imagens ----------

// largura e altura sem dependências (WebP, PNG, JPEG) — evita que a página "pule" ao carregar
function medidas(arquivo) {
  const b = readFileSync(arquivo);
  if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    const tipo = b.toString('ascii', 12, 16);
    if (tipo === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
    if (tipo === 'VP8L') { const n = b.readUInt32LE(21); return [(n & 0x3fff) + 1, ((n >> 14) & 0x3fff) + 1]; }
    if (tipo === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
  }
  if (b.readUInt32BE(0) === 0x89504e47) return [b.readUInt32BE(16), b.readUInt32BE(20)];
  if (b.readUInt16BE(0) === 0xffd8) {
    let i = 2;
    while (i < b.length) {
      const marca = b.readUInt16BE(i), tam = b.readUInt16BE(i + 2);
      if (marca >= 0xffc0 && marca <= 0xffcf && ![0xffc4, 0xffc8, 0xffcc].includes(marca)) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
      i += 2 + tam;
    }
  }
  return [0, 0];
}

const imagens = new Map();
(function indexar(dir) {
  for (const f of readdirSync(dir)) {
    const c = join(dir, f);
    if (statSync(c).isDirectory()) indexar(c);
    else if (/\.(webp|jpe?g|png|svg|gif|avif)$/i.test(f)) {
      const rel = relative(join(CONTEUDO, 'Imagens'), c).split('\\').join('/');
      imagens.set(rel, rel);
      if (!imagens.has(basename(f))) imagens.set(basename(f), rel);
    }
  }
})(join(CONTEUDO, 'Imagens'));

const limpaRef = (ref) => String(ref).replace(/^!?\[\[|\]\]$/g, '').split('|')[0].replace(/^Imagens\//, '').trim();

// devolve { src, w, h, mini } — "mini" é a miniatura <nome>-p.webp, se existir
function imagem(ref, onde) {
  if (!ref) throw new Error(`${onde}: falta a foto`);
  const nome = limpaRef(ref);
  const achada = imagens.get(nome);
  if (!achada) throw new Error(`${onde}: a imagem "${nome}" não está na pasta conteudo/Imagens`);
  const url = (rel) => 'imagens/' + rel.split('/').map(encodeURIComponent).join('/');
  const [w, h] = medidas(join(CONTEUDO, 'Imagens', achada));
  const mini = imagens.get(achada.replace(/\.(\w+)$/, '-p.$1'));
  return { src: url(achada), w, h, mini: mini ? url(mini) : url(achada), chave: achada };
}

// ---------- montagem ----------

const n = (c) => lerNota(c);
const dados = {
  site: n('Site.md').campos,
  inicio: n('Início.md'),
  sobre: n('Sobre.md'),
  paraQuem: n('Para quem.md'),
  atendimentosSecao: n('Atendimentos.md'),
  atendimentos: lerPasta('Atendimentos'),
  abordagem: n('Abordagem.md'),
  como: n('Como funciona.md'),
  frase: n('Frase.md'),
  formacao: n('Formação.md'),
  mitos: n('Terapia sem mitos.md'),
  espaco: n('Espaço.md'),
  agendamento: n('Agendamento.md'),
  unidades: lerPasta('Unidades'),
  faq: n('Perguntas frequentes.md'),
};

const exigir = (nota, campos, arquivo) => { for (const c of campos) if (!nota[c]) throw new Error(`${arquivo}: o campo "${c}" está vazio`); };
exigir(dados.site, ['nome', 'crp', 'whatsapp', 'profissao'], 'Site.md');
if (!/^\d{12,13}$/.test(dados.site.whatsapp)) throw new Error('Site.md: o whatsapp deve ter só números, com 55 + DDD (ex.: 5511999998888)');
if (dados.site.agenda && !/^https:\/\//.test(dados.site.agenda)) throw new Error('Site.md: o campo "agenda" deve ser um endereço que começa com https://');
exigir(dados.inicio.campos, ['titulo', 'foto'], 'Início.md');
if (dados.abordagem.itens.length !== 3) throw new Error('Abordagem.md: são esperados exatamente 3 itens (## Pensamentos, ## Emoções, ## Comportamentos)');
if (!dados.unidades.length) throw new Error('Unidades/: não há nenhuma unidade');
if (!dados.atendimentos.length) throw new Error('Atendimentos/: não há nenhum atendimento');

// textos alternativos das fotos (opcional): conteudo/Imagens/descricoes.json
const descricoesArq = join(CONTEUDO, 'Imagens', 'descricoes.json');
const descricoes = existsSync(descricoesArq) ? JSON.parse(readFileSync(descricoesArq, 'utf8')) : {};
const comAlt = (img, padrao) => ({ ...img, alt: descricoes[img.chave] || padrao });

dados.inicio.campos.foto = imagem(dados.inicio.campos.foto, 'Início.md');
dados.sobre.campos.foto = imagem(dados.sobre.campos.foto, 'Sobre.md');
dados.frase.campos.foto = imagem(dados.frase.campos.foto, 'Frase.md');
dados.formacao.campos.foto = comAlt(imagem(dados.formacao.campos.foto, 'Formação.md'), 'Sala de atendimento');
const lista = (v) => (Array.isArray(v) ? v : v ? [v] : []);
dados.espaco.campos.fotos = lista(dados.espaco.campos.fotos).map((x, i) => comAlt(imagem(x, 'Espaço.md'), `Espaço de atendimento, foto ${i + 1}`));
if (dados.espaco.campos.fotos.length !== 4) throw new Error('Espaço.md: o campo "fotos" deve ter exatamente 4 fotos');
dados.inicio.campos.credenciais = lista(dados.inicio.campos.credenciais);

for (const u of dados.unidades) {
  const c = u.campos;
  exigir(c, ['nome', 'endereco', 'lat', 'lng'], u.arquivo);
  c.lat = Number(String(c.lat).replace(',', '.'));
  c.lng = Number(String(c.lng).replace(',', '.'));
  if (!Number.isFinite(c.lat) || !Number.isFinite(c.lng)) throw new Error(`${u.arquivo}: lat e lng devem ser números (ex.: -23.5582918)`);
  c.fotos = lista(c.fotos).map((x, i) => comAlt(imagem(x, u.arquivo), `Unidade ${c.nome}, foto ${i + 1}`));
  c.id = c.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  c.cidade = c.cidade || 'São Paulo';
}

rmSync(SAIDA, { recursive: true, force: true });
mkdirSync(SAIDA, { recursive: true });
cpSync(join(CONTEUDO, 'Imagens'), join(SAIDA, 'imagens'), { recursive: true, filter: (f) => !f.endsWith('descricoes.json') });
cpSync(join(RAIZ, 'modelo', 'vendor'), join(SAIDA, 'vendor'), { recursive: true });

// CSS e JS ganham um carimbo no nome do arquivo: o navegador nunca usa versão velha
const carimbo = (arq) => createHash('sha1').update(readFileSync(arq)).digest('hex').slice(0, 8);
const css = join(RAIZ, 'modelo', 'estilo.css'), js = join(RAIZ, 'modelo', 'site.js');
const arquivos = { css: `estilo.${carimbo(css)}.css`, js: `site.${carimbo(js)}.js` };
cpSync(css, join(SAIDA, arquivos.css));
cpSync(js, join(SAIDA, arquivos.js));

writeFileSync(join(SAIDA, 'index.html'), pagina(dados, { inline, markdown, escapar, arquivos }));

const dominio = (dados.site.endereco_site || '').replace(/\/$/, '');
writeFileSync(join(SAIDA, 'robots.txt'), `User-agent: *\nAllow: /\n${dominio ? `Sitemap: ${dominio}/sitemap.xml\n` : ''}`);
if (dominio) writeFileSync(join(SAIDA, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${dominio}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url></urlset>\n`);
if (existsSync(join(RAIZ, 'CNAME'))) cpSync(join(RAIZ, 'CNAME'), join(SAIDA, 'CNAME'));
writeFileSync(join(SAIDA, '.nojekyll'), '');

console.log(`Site gerado em publico/ (${dados.atendimentos.length} atendimentos, ${dados.unidades.length} unidades).`);
