// Gera o site a partir das notas do Obsidian (pasta conteudo/) para a pasta publico/.
// Sem dependências: node gerar.js
import { readFileSync, readdirSync, statSync, mkdirSync, rmSync, cpSync, writeFileSync, existsSync } from 'node:fs';
import { join, basename, relative } from 'node:path';
import { pagina } from './modelo/pagina.js';

const RAIZ = import.meta.dirname;
const CONTEUDO = join(RAIZ, 'conteudo');
const SAIDA = join(RAIZ, 'publico');

// ---------- leitura das notas ----------

function lerNota(caminho) {
  const bruto = readFileSync(join(CONTEUDO, caminho), 'utf8').replace(/\r\n/g, '\n');
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
    const item = linha.match(/^\s+-\s+(.*)$/);
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
  const intro = partes.shift();
  const itens = partes.map((p) => {
    const [titulo, ...resto] = p.split('\n');
    const linhas = [...resto];
    const extra = {};
    while (linhas.length && /^\s*$/.test(linhas[0])) linhas.shift();
    while (linhas.length && /^(icone|ícone):\s*/i.test(linhas[0])) {
      extra.icone = linhas.shift().replace(/^(icone|ícone):\s*/i, '').trim();
    }
    const texto = linhas.join('\n');
    return { titulo: titulo.trim(), ...extra, html: markdown(texto), lista: listaDe(texto), paragrafos: markdown(semLista(texto)) };
  });
  return { intro: markdown(semCabecalho(intro)), introLista: listaDe(intro), introTexto: markdown(semLista(semCabecalho(intro))), itens };
}
const semCabecalho = (t) => t.replace(/^# .*$/m, '');
const listaDe = (t) => t.split('\n').filter((l) => /^\s*[-*] /.test(l)).map((l) => inline(l.replace(/^\s*[-*] /, '')));
const semLista = (t) => t.split('\n').filter((l) => !/^\s*[-*] /.test(l)).join('\n');

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
}

export function markdown(t = '') {
  const blocos = t.trim().split(/\n{2,}/).filter(Boolean);
  return blocos.map((b) => {
    const linhas = b.split('\n');
    if (linhas.every((l) => /^\s*[-*] /.test(l))) return `<ul>${linhas.map((l) => `<li>${inline(l.replace(/^\s*[-*] /, ''))}</li>`).join('')}</ul>`;
    if (linhas.every((l) => /^>/.test(l))) return `<blockquote>${inline(linhas.map((l) => l.replace(/^>\s?/, '')).join(' '))}</blockquote>`;
    const h = b.match(/^(#{3,4}) (.*)$/);
    if (h) return `<h4>${inline(h[2])}</h4>`;
    if (/^\|/.test(b)) return '';
    return `<p>${inline(linhas.join(' '))}</p>`;
  }).join('\n');
}

// ---------- imagens ----------

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

function imagem(ref, onde) {
  if (!ref) return '';
  const nome = String(ref).replace(/^!?\[\[|\]\]$/g, '').split('|')[0].replace(/^Imagens\//, '').trim();
  const achada = imagens.get(nome);
  if (!achada) throw new Error(`${onde}: a imagem "${nome}" não está na pasta conteudo/Imagens`);
  return 'imagens/' + achada.split('/').map(encodeURIComponent).join('/');
}

// ---------- montagem ----------

const n = (c) => lerNota(c);
const dados = {
  site: n('Site.md').campos,
  inicio: n('Início.md'),
  sobre: n('Sobre.md'),
  comecar: n('Por onde começar.md'),
  atendimentos: lerPasta('Atendimentos'),
  abordagem: n('Abordagem.md'),
  como: n('Como funciona.md'),
  frase: n('Frase.md'),
  formacao: n('Formação.md'),
  faq: n('Perguntas frequentes.md'),
  agendamento: n('Agendamento.md'),
  unidades: lerPasta('Unidades'),
};

for (const obrigatorio of ['nome', 'crp', 'whatsapp']) {
  if (!dados.site[obrigatorio]) throw new Error(`Site.md: o campo "${obrigatorio}" está vazio`);
}
if (!/^\d{12,13}$/.test(dados.site.whatsapp)) throw new Error('Site.md: o whatsapp deve ter só números, com 55 + DDD (ex.: 5511999998888)');

dados.inicio.campos.foto = imagem(dados.inicio.campos.foto, 'Início.md');
dados.sobre.campos.foto = imagem(dados.sobre.campos.foto, 'Sobre.md');
dados.frase.campos.foto = imagem(dados.frase.campos.foto, 'Frase.md');
for (const u of dados.unidades) {
  const f = u.campos.fotos;
  u.campos.fotos = (Array.isArray(f) ? f : f ? [f] : []).map((x) => imagem(x, u.arquivo));
}

rmSync(SAIDA, { recursive: true, force: true });
mkdirSync(SAIDA, { recursive: true });
cpSync(join(CONTEUDO, 'Imagens'), join(SAIDA, 'imagens'), { recursive: true });
cpSync(join(RAIZ, 'modelo', 'estilo.css'), join(SAIDA, 'estilo.css'));
cpSync(join(RAIZ, 'modelo', 'site.js'), join(SAIDA, 'site.js'));
writeFileSync(join(SAIDA, 'index.html'), pagina(dados, { inline, markdown, escapar }));

const dominio = (dados.site.endereco_site || '').replace(/\/$/, '');
writeFileSync(join(SAIDA, 'robots.txt'), `User-agent: *\nAllow: /\n${dominio ? `Sitemap: ${dominio}/sitemap.xml\n` : ''}`);
if (dominio) writeFileSync(join(SAIDA, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${dominio}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url></urlset>\n`);
if (existsSync(join(RAIZ, 'CNAME'))) cpSync(join(RAIZ, 'CNAME'), join(SAIDA, 'CNAME'));

console.log(`Site gerado em publico/ (${dados.atendimentos.length} atendimentos, ${dados.unidades.length} unidades).`);
