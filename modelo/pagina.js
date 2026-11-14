// O HTML da página. Os textos vêm das notas em conteudo/; aqui fica só a estrutura.

const ICONES = {
  coracao: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>',
  livro: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
  hospital: '<path d="M12 6v4M14 14h-4M14 18h-4M14 8h-4"/><path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"/><path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18"/>',
  pessoas: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  onda: '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
  nuvem: '<path d="M17.5 19H9a7 7 0 1 1 6.7-9h1.8a4.5 4.5 0 1 1 0 9Z"/>',
  brilho: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>',
  maleta: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  folha: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12"/>',
  mensagem: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>',
  alvo: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  casa: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .7-1.5l7-6a2 2 0 0 1 2.6 0l7 6a2 2 0 0 1 .7 1.5v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  pergunta: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
  cerebro: '<path d="M12 5a3 3 0 1 0-6 .1 4 4 0 0 0-2.5 5.8 4 4 0 0 0 .6 6.6A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 6 .1 4 4 0 0 1 2.5 5.8 4 4 0 0 1-.6 6.6A4 4 0 1 1 12 18Z"/><path d="M12 5v13"/>',
  // de uso interno
  whatsapp: '<path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  email: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  local: '<path d="M20 10c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  agenda: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  video: '<path d="m16 13 5.2 3.5a.5.5 0 0 0 .8-.4V7.9a.5.5 0 0 0-.8-.4L16 11"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  seta: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  baixo: '<path d="M12 5v14M19 12l-7 7-7-7"/>',
  certo: '<path d="M20 6 9 17l-5-5"/>',
  mapa: '<path d="M14.1 4.6 9.9 2.4a2 2 0 0 0-1.8 0L3.6 4.7A1 1 0 0 0 3 5.6v14.8a1 1 0 0 0 1.4.9l3.7-1.9a2 2 0 0 1 1.8 0l4.2 2.1a2 2 0 0 0 1.8 0l4.5-2.2a1 1 0 0 0 .6-.9V3.6a1 1 0 0 0-1.4-.9l-3.7 1.9a2 2 0 0 1-1.8 0Z"/><path d="M15 5.8v15M9 3.2v15"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
};

const icone = (nome, classe = 'ic') =>
  `<svg class="${classe}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES[nome] || ICONES.brilho}</svg>`;

const ZAP = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4M12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 0 1 12 2.2a9.8 9.8 0 0 1 9.8 9.8c0 5.4-4.4 9.8-9.8 9.8m8.4-18.2A11.8 11.8 0 0 0 12 .1C5.5.1.1 5.4.1 12c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.6a11.9 11.9 0 0 0 5.7 1.4c6.5 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.4"/></svg>';

export function pagina(d, { inline, escapar }) {
  const s = d.site;
  const zap = (msg = s.mensagem_whatsapp) => `https://wa.me/${s.whatsapp}?text=${encodeURIComponent(msg || '')}`;
  const tel = s.whatsapp.replace(/^55(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');
  const insta = s.instagram ? `https://instagram.com/${s.instagram.replace(/^@/, '')}` : '';
  const e = escapar;
  const selo = (t, centro) => (t ? `<p class="selo${centro ? ' centro' : ''}">${e(t)}</p>` : '');
  const num = (i) => String(i + 1).padStart(2, '0');
  const mapsBusca = (end) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(end)}`;
  const mapsEmbed = (end) => `https://maps.google.com/maps?q=${encodeURIComponent(end)}&z=16&output=embed`;
  const waze = (end) => `https://waze.com/ul?q=${encodeURIComponent(end)}&navigate=yes`;

  const nav = [
    ['#sobre', 'Sobre'],
    ['#atendimentos', 'Atendimentos'],
    ['#como-funciona', 'Como funciona'],
    ['#formacao', 'Formação'],
    ['#agendamento', 'Agendamento'],
    ['#duvidas', 'Dúvidas'],
  ];

  const i = d.inicio.campos, so = d.sobre.campos, ag = d.agendamento.campos;
  const primeiraUnidade = d.unidades[0];

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${s.nome} · ${s.profissao}`,
    description: s.descricao_google,
    url: s.endereco_site || undefined,
    image: s.endereco_site ? `${s.endereco_site.replace(/\/$/, '')}/${i.foto}` : undefined,
    telephone: `+${s.whatsapp}`,
    areaServed: 'São Paulo',
    founder: { '@type': 'Person', name: s.nome, jobTitle: s.profissao, identifier: `CRP ${s.crp}` },
    address: d.unidades.map((u) => ({ '@type': 'PostalAddress', streetAddress: u.campos.endereco, addressLocality: 'São Paulo', addressRegion: 'SP', addressCountry: 'BR' })),
  };

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(s.nome_curto || s.nome)} · ${e(s.profissao)} em São Paulo | CRP ${e(s.crp)}</title>
<meta name="description" content="${e(s.descricao_google)}">
<meta name="theme-color" content="#2F241B">
${s.endereco_site ? `<link rel="canonical" href="${e(s.endereco_site)}">` : ''}
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${e(s.nome)} · ${e(s.profissao)}">
<meta property="og:description" content="${e(s.descricao_google)}">
${s.endereco_site ? `<meta property="og:image" content="${e(s.endereco_site.replace(/\/$/, ''))}/${i.foto}">` : ''}
<link rel="icon" href="imagens/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="estilo.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<a class="pular" href="#conteudo">Pular para o conteúdo</a>

<header class="topo" id="topo">
  <div class="wrap topo-in">
    <a class="marca" href="#inicio" aria-label="${e(s.nome)}, início">
      <img src="imagens/logo.webp" alt="" width="70" height="45">
      <span><strong>${e(s.nome_curto || s.nome)}</strong><small>${e(s.profissao)} · CRP ${e(s.crp)}</small></span>
    </a>
    <nav class="menu" id="menu" aria-label="Seções">
      ${nav.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}
      <a class="menu-agendar" href="${zap()}" target="_blank" rel="noopener">${ZAP} Agendar</a>
    </nav>
    <div class="topo-icones">
      ${insta ? `<a class="redondo" href="${insta}" target="_blank" rel="noopener" aria-label="Instagram">${icone('instagram')}</a>` : ''}
      <a class="redondo" href="${zap()}" target="_blank" rel="noopener" aria-label="WhatsApp">${ZAP}</a>
      <button class="redondo abre-menu" type="button" aria-controls="menu" aria-expanded="false" aria-label="Abrir menu">${icone('menu')}</button>
    </div>
  </div>
</header>

<main id="conteudo">

<section class="hero" id="inicio">
  <div class="hero-foto"><img src="${i.foto}" alt="${e(s.nome)}, ${e(s.profissao)}" fetchpriority="high"></div>
  <div class="wrap hero-in">
    <div class="hero-texto">
      ${selo(i.selo)}
      <h1>${inline(i.titulo)}</h1>
      <p class="hero-sub">${inline(i.subtitulo)}</p>
      <div class="botoes">
        <a class="botao ouro" href="#agendamento">${icone('agenda')} ${e(i.botao_principal || 'Agendar consulta')}</a>
        <a class="botao contorno" href="#atendimentos">${e(i.botao_secundario || 'Conhecer os atendimentos')} ${icone('baixo')}</a>
      </div>
      <p class="hero-rodape"><span class="ponto"></span>${e(s.nome_curto || s.nome)} <i>|</i> CRP ${e(s.crp)} <i>|</i> Presencial em São Paulo e on-line</p>
    </div>
  </div>
</section>

<section class="secao creme" id="sobre">
  <div class="wrap sobre">
    <figure class="sobre-foto revela">
      <img src="${so.foto}" alt="${e(s.nome)}" loading="lazy">
      <figcaption class="cracha"><span class="cracha-ic">${icone('cerebro')}</span><span><strong>CRP ${e(s.crp)}</strong><small>${e(s.profissao)}</small></span></figcaption>
    </figure>
    <div class="sobre-texto revela">
      ${selo(so.selo)}
      <h2>${inline(so.titulo)}</h2>
      ${so.destaque ? `<blockquote class="destaque">${inline(so.destaque)}</blockquote>` : ''}
      ${d.sobre.intro}
    </div>
  </div>
  <div class="wrap grade g4">
    ${d.sobre.itens.map((c) => `<article class="cartao revela"><span class="cartao-ic">${icone(c.icone)}</span><h3>${inline(c.titulo)}</h3>${c.html}</article>`).join('')}
  </div>
</section>

<section class="secao branco" id="comecar">
  <div class="wrap">
    <header class="cabeca">${selo(d.comecar.campos.selo, true)}<h2>${inline(d.comecar.campos.titulo)}</h2></header>
    <div class="grade g3 motivos">
      ${d.comecar.itens.map((c, k) => `<article class="motivo revela"><span class="motivo-n">${num(k)}</span>${icone(c.icone)}<h3>${inline(c.titulo)}</h3>${c.html}</article>`).join('')}
    </div>
    ${d.comecar.campos.fechamento ? `<p class="fecho revela">${inline(d.comecar.campos.fechamento)}</p>` : ''}
  </div>
</section>

<section class="secao escuro" id="atendimentos">
  <div class="wrap">
    <header class="cabeca">${selo('Atendimentos', true)}<h2>Como posso ajudar</h2><p>Cada atendimento parte da compreensão do que está acontecendo com você, da sua história e dos seus objetivos.</p></header>
    <div class="grade g${Math.min(d.atendimentos.length, 4) === 4 ? '4' : '3'} servicos">
      ${d.atendimentos.map((a) => `<article class="servico revela">
        <span class="servico-ic">${icone(a.campos.icone)}</span>
        <h3>${inline(a.campos.titulo)}</h3>
        ${a.introTexto}
        ${a.campos.citacao ? `<blockquote>${inline(a.campos.citacao)}</blockquote>` : ''}
        ${a.introLista.length ? `<p class="mini">Pode ser indicada para</p><ul class="checks">${a.introLista.map((l) => `<li>${icone('certo')}${l}</li>`).join('')}</ul>` : ''}
        <a class="saiba" href="${zap(`Olá, Jéssica! Vim pelo site e gostaria de saber mais sobre: ${a.campos.titulo}.`)}" target="_blank" rel="noopener">Quero saber mais ${icone('seta')}</a>
      </article>`).join('')}
    </div>
    <div class="ajuda revela">
      <span class="ajuda-ic">${icone('pergunta')}</span>
      <div><strong>Não sabe qual atendimento procurar? Tudo bem.</strong><p>Me conte brevemente o que está acontecendo e eu te oriento sobre o primeiro passo.</p></div>
      <a class="botao ouro" href="${zap()}" target="_blank" rel="noopener">${ZAP} Fale comigo pelo WhatsApp</a>
    </div>
  </div>
</section>

<section class="secao creme" id="abordagem">
  <div class="wrap abordagem">
    <div class="revela">
      ${selo(d.abordagem.campos.selo)}
      <h2>${inline(d.abordagem.campos.titulo)}</h2>
      ${d.abordagem.intro}
    </div>
    <div class="ciclo revela" role="img" aria-label="${d.abordagem.itens.map((x) => e(x.titulo)).join(', ')} se influenciam mutuamente">
      <svg viewBox="0 0 400 360" aria-hidden="true">
        <defs><marker id="pt" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="currentColor"/></marker></defs>
        <g fill="none" stroke="currentColor" stroke-width="1.2" marker-start="url(#pt)" marker-end="url(#pt)">
          <path d="M168 92 104 214"/><path d="M232 92 296 214"/><path d="M128 270h144"/>
        </g>
        <text x="200" y="182" class="psi">Ψ</text>
      </svg>
      ${d.abordagem.itens.slice(0, 3).map((x, k) => `<div class="no no${k}"><strong>${inline(x.titulo)}</strong><span>${x.html.replace(/<\/?p>/g, '')}</span></div>`).join('')}
    </div>
  </div>
</section>

<section class="secao branco" id="como-funciona">
  <div class="wrap">
    <header class="cabeca">${selo(d.como.campos.selo, true)}<h2>${inline(d.como.campos.titulo)}</h2>${d.como.campos.subtitulo ? `<p>${inline(d.como.campos.subtitulo)}</p>` : ''}</header>
    <ol class="passos">
      ${d.como.itens.map((p, k) => `<li class="revela"><span class="passo-n">${k + 1}</span><h3>${inline(p.titulo)}</h3>${p.html}</li>`).join('')}
    </ol>
  </div>
</section>

<section class="frase" style="--foto:url('${d.frase.campos.foto}')">
  <div class="wrap revela">
    <p class="frase-t">${inline(d.frase.campos.frase)}</p>
    ${d.frase.campos.complemento ? `<p class="selo centro claro">${e(d.frase.campos.complemento)}</p>` : ''}
  </div>
</section>

<section class="secao creme" id="formacao">
  <div class="wrap">
    <header class="cabeca">${selo(d.formacao.campos.selo, true)}<h2>${inline(d.formacao.campos.titulo)}</h2></header>
    <div class="grade g4">
      ${d.formacao.itens.map((f) => `<article class="formacao revela"><span class="cartao-ic">${icone('livro')}</span><h3>${inline(f.titulo)}</h3>${f.html}</article>`).join('')}
    </div>
  </div>
</section>

<section class="secao branco" id="agendamento">
  <div class="wrap">
    <header class="cabeca">${selo(ag.selo, true)}<h2>${inline(ag.titulo)}</h2>${ag.subtitulo ? `<p>${inline(ag.subtitulo)}</p>` : ''}</header>
    <ul class="resumo revela">
      <li>${icone('agenda')}<span><strong>Sessões de ${e(s.duracao || '50 minutos')}</strong>Psicoterapia individual</span></li>
      <li>${icone('local')}<span><strong>${d.unidades.length} unidades em São Paulo</strong>e consultório virtual</span></li>
      <li>${icone('certo')}<span><strong>Pagamento</strong>${e(s.pagamento || '')}</span></li>
    </ul>
    <div class="agenda">
      <div class="unidades">
        ${d.unidades.map((u, k) => `<article class="unidade revela${k === 0 ? ' ativa' : ''}" data-mapa="${e(mapsEmbed(u.campos.endereco))}" data-nome="${e(u.campos.nome)}">
          <button type="button" class="unidade-cab" aria-pressed="${k === 0}">
            <span class="unidade-n">${num(k)}</span>
            <span><strong>${inline(u.campos.nome)}</strong><small>${inline(u.campos.endereco)}</small></span>
            ${icone('mapa')}
          </button>
          ${u.campos.fotos.length ? `<div class="fotos">${u.campos.fotos.map((f, j) => `<a href="${f}" class="foto" data-galeria="${e(u.campos.nome)}"><img src="${f}" alt="Espaço de atendimento ${e(u.campos.nome)}, foto ${j + 1}" loading="lazy"></a>`).join('')}</div>` : ''}
          <div class="unidade-acoes">
            <a href="${mapsBusca(u.campos.endereco)}" target="_blank" rel="noopener">${icone('local')} Google Maps</a>
            <a href="${waze(u.campos.endereco)}" target="_blank" rel="noopener">${icone('seta')} Waze</a>
            <a class="forte" href="${zap(`Olá, Jéssica! Vim pelo site e gostaria de agendar na unidade ${u.campos.nome}.`)}" target="_blank" rel="noopener">${ZAP} Agendar nesta unidade</a>
          </div>
        </article>`).join('')}
        <article class="unidade online revela">
          <div class="unidade-cab"><span class="unidade-n">${icone('video')}</span><span><strong>${e(ag.online_titulo || 'On-line')}</strong><small>${inline(ag.online_texto || '')}</small></span></div>
          <div class="unidade-acoes"><a class="forte" href="${zap('Olá, Jéssica! Vim pelo site e gostaria de agendar uma sessão on-line.')}" target="_blank" rel="noopener">${ZAP} Agendar on-line</a></div>
        </article>
      </div>
      <aside class="mapa-caixa revela">
        <div class="mapa"><iframe id="mapa" title="Mapa da unidade ${e(primeiraUnidade?.campos.nome || '')}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${primeiraUnidade ? e(mapsEmbed(primeiraUnidade.campos.endereco)) : ''}"></iframe></div>
        <div class="agenda-on">
          <p><strong>Prefere escolher o horário sozinho?</strong> A agenda on-line mostra os horários livres em cada unidade.</p>
          <div class="botoes">
            ${s.oneliv ? `<a class="botao ouro" href="${e(s.oneliv)}" target="_blank" rel="noopener">${icone('agenda')} Ver agenda on-line</a>` : ''}
            <a class="botao contorno escuro-t" href="${zap()}" target="_blank" rel="noopener">${ZAP} Conversar antes</a>
          </div>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="secao creme" id="duvidas">
  <div class="wrap estreito">
    <header class="cabeca">${selo(d.faq.campos.selo, true)}<h2>${inline(d.faq.campos.titulo)}</h2></header>
    <div class="faq">
      ${d.faq.itens.map((q) => `<details class="revela"><summary>${inline(q.titulo)}<span aria-hidden="true">+</span></summary><div>${q.html}</div></details>`).join('')}
    </div>
  </div>
</section>

<section class="chamada">
  <div class="wrap chamada-in revela">
    <img src="imagens/logo.webp" alt="" width="120" height="77">
    <h2>Vamos conversar?</h2>
    <p>Prefere conversar antes de agendar? Me conte brevemente o que está acontecendo e eu te oriento sobre o primeiro passo.</p>
    <a class="botao ouro" href="${zap()}" target="_blank" rel="noopener">${ZAP} Fale comigo pelo WhatsApp</a>
  </div>
</section>

</main>

<footer class="rodape">
  <div class="wrap rodape-grade">
    <div>
      <img class="rodape-logo" src="imagens/logo.webp" alt="" width="110" height="71">
      <p><strong>${e(s.nome)}</strong><br>${e(s.profissao)} · CRP ${e(s.crp)}</p>
      <div class="sociais">
        ${insta ? `<a class="redondo" href="${insta}" target="_blank" rel="noopener" aria-label="Instagram">${icone('instagram')}</a>` : ''}
        <a class="redondo" href="${zap()}" target="_blank" rel="noopener" aria-label="WhatsApp">${ZAP}</a>
      </div>
    </div>
    <div>
      <p class="rodape-t">Navegação</p>
      <ul>${[['#inicio', 'Início'], ...nav].map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul>
    </div>
    <div>
      <p class="rodape-t">Atendimentos</p>
      <ul>${d.atendimentos.map((a) => `<li><a href="#atendimentos">${inline(a.campos.titulo)}</a></li>`).join('')}</ul>
    </div>
    <div>
      <p class="rodape-t">Contato</p>
      <ul class="contatos">
        <li><a href="${zap()}" target="_blank" rel="noopener">${ZAP} ${tel}</a></li>
        ${s.email ? `<li><a href="mailto:${e(s.email)}">${icone('email')} ${e(s.email)}</a></li>` : ''}
        ${insta ? `<li><a href="${insta}" target="_blank" rel="noopener">${icone('instagram')} @${e(s.instagram.replace(/^@/, ''))}</a></li>` : ''}
        <li><a href="#agendamento">${icone('local')} ${d.unidades.length} unidades em São Paulo e on-line</a></li>
        ${s.oneliv ? `<li><a href="${e(s.oneliv)}" target="_blank" rel="noopener">${icone('agenda')} Agenda on-line pela OneLiv</a></li>` : ''}
      </ul>
    </div>
  </div>
  <div class="wrap rodape-fim">
    <span>© ${new Date().getFullYear()} ${e(s.nome)}. Todos os direitos reservados.</span>
    <span>Atendimento conforme o Código de Ética Profissional do Psicólogo · CRP ${e(s.crp)}</span>
  </div>
</footer>

<a class="zap-flutuante" href="${zap()}" target="_blank" rel="noopener" aria-label="Conversar pelo WhatsApp">${ZAP}</a>

<dialog class="galeria" id="galeria" aria-label="Fotos da unidade">
  <button type="button" class="g-fechar" aria-label="Fechar">×</button>
  <button type="button" class="g-ant" aria-label="Foto anterior">‹</button>
  <img alt="">
  <button type="button" class="g-prox" aria-label="Próxima foto">›</button>
  <p class="g-leg"></p>
</dialog>

<script src="site.js" defer></script>
</body>
</html>
`;
}
