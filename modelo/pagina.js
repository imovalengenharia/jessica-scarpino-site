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
  agenda: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  relogio: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  cartao: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  local: '<path d="M20 10c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  video: '<path d="m16 13 5.2 3.5a.5.5 0 0 0 .8-.4V7.9a.5.5 0 0 0-.8-.4L16 11"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  escudo: '<path d="M20 13c0 5-3.5 7.5-7.7 8.9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  sofa: '<path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"/><path d="M4 18v2M20 18v2"/>',
  bussola: '<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z"/>',
  capelo: '<path d="M21.4 10.9a1 1 0 0 0 0-1.8l-8.6-3.9a2 2 0 0 0-1.6 0L2.6 9.1a1 1 0 0 0 0 1.8l8.6 3.9a2 2 0 0 0 1.6 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
  lampada: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6M10 22h4"/>',
  mao: '<path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 15 6 6"/>',
  chave: '<path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/>',
  balanca: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
  espelho: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
  ampulheta: '<path d="M5 22h14M5 2h14M17 22v-4.2a2 2 0 0 0-.6-1.4L12 12l-4.4 4.4a2 2 0 0 0-.6 1.4V22M7 2v4.2a2 2 0 0 0 .6 1.4L12 12l4.4-4.4a2 2 0 0 0 .6-1.4V2"/>',
  caminho: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
  // de uso interno
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  email: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  seta: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  baixo: '<path d="M12 5v14M19 12l-7 7-7-7"/>',
  certo: '<path d="M20 6 9 17l-5-5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  fechar: '<path d="M18 6 6 18M6 6l12 12"/>',
  anterior: '<path d="m15 18-6-6 6-6"/>',
  proximo: '<path d="m9 18 6-6-6-6"/>',
  pausa: '<path d="M9 5v14M15 5v14"/>',
  tocar: '<path d="m7 4 13 8-13 8z"/>',
  externo: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  rota: '<path d="m3 11 19-9-9 19-2-8z"/>',
  mais: '<path d="M5 12h14M12 5v14"/>',
  ampliar: '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
};

const icone = (nome, classe = 'ic') =>
  `<svg class="${classe}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONES[nome] || ICONES.brilho}</svg>`;

const ZAP = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4M12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 0 1 12 2.2a9.8 9.8 0 0 1 9.8 9.8c0 5.4-4.4 9.8-9.8 9.8m8.4-18.2A11.8 11.8 0 0 0 12 .1C5.5.1.1 5.4.1 12c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.6a11.9 11.9 0 0 0 5.7 1.4c6.5 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.4"/></svg>';

export function pagina(d, { inline, escapar, arquivos }) {
  const s = d.site;
  const e = escapar;
  const zap = (msg = s.mensagem_whatsapp) => `https://wa.me/${s.whatsapp}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`;
  const tel = s.whatsapp.replace(/^55(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');
  const insta = s.instagram ? `https://instagram.com/${String(s.instagram).replace(/^@/, '')}` : '';
  const dominio = (s.endereco_site || '').replace(/\/$/, '');
  const curto = s.nome_curto || s.nome;
  const primeiroNome = s.nome.split(' ')[0];
  const num = (i) => String(i + 1).padStart(2, '0');
  const mapsBusca = (t) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t)}`;
  const waze = (t) => `https://waze.com/ul?q=${encodeURIComponent(t)}&navigate=yes`;
  const rv = (n = 0, extra = '') => `class="rv${extra ? ' ' + extra : ''}" style="--d:${n}"`;
  const foto = (f, { alt = '', cls = '', lazy = true, sizes = '' } = {}) =>
    `<img src="${f.src}" alt="${e(alt)}"${f.w ? ` width="${f.w}" height="${f.h}"` : ''}${cls ? ` class="${cls}"` : ''}${lazy ? ' loading="lazy" decoding="async"' : ' fetchpriority="high" decoding="async"'}${sizes ? ` sizes="${sizes}"` : ''}>`;

  // cabeçalho padrão de seção: selo + título + lead
  const cabeca = (c, { centro = true, h = 'h2', id = '' } = {}) => `
    <header class="cabeca${centro ? ' centro' : ''}">
      ${c.selo ? `<p ${rv(0, 'selo')}>${e(c.selo)}</p>` : ''}
      <${h} ${rv(1, 'titulo')}${id ? ` id="${id}"` : ''}>${inline(c.titulo || '')}</${h}>
      ${c.lead || c.subtitulo ? `<p ${rv(2, 'lead')}>${inline(c.lead || c.subtitulo)}</p>` : ''}
    </header>`;

  const nav = [
    ['#sobre', 'Sobre'],
    ['#atendimentos', 'Atendimentos'],
    ['#como-funciona', 'Como funciona'],
    ['#formacao', 'Formação'],
    ['#agendamento', 'Agendamento'],
    ['#duvidas', 'Dúvidas'],
  ];

  const i = d.inicio.campos, so = d.sobre.campos, pq = d.paraQuem.campos, at = d.atendimentosSecao.campos;
  const ab = d.abordagem.campos, co = d.como.campos, fr = d.frase.campos, fo = d.formacao.campos;
  const mi = d.mitos.campos, es = d.espaco.campos, ag = d.agendamento.campos, fq = d.faq.campos;

  const msgUnidade = (u) => `Olá, ${primeiroNome}! Vim pelo site e gostaria de agendar na unidade ${u}.`;
  const msgOnline = `Olá, ${primeiroNome}! Vim pelo site e gostaria de agendar um atendimento on-line.`;
  const enderecoCompleto = (c) => [c.endereco, c.complemento, c.bairro, `${c.cidade}${c.cidade === 'São Paulo' || c.cidade === 'Santo André' ? ' SP' : ''}`].filter(Boolean).join(', ');
  const cidades = [...new Set(d.unidades.map((u) => u.campos.cidade))];

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      dominio && { '@type': 'WebSite', '@id': `${dominio}/#site`, url: `${dominio}/`, name: `${s.nome} | ${s.profissao}`, inLanguage: 'pt-BR' },
      {
        '@type': 'MedicalBusiness',
        '@id': `${dominio}/#consultorio`,
        name: `${s.nome} | ${s.profissao}`,
        description: s.descricao_google,
        url: dominio ? `${dominio}/` : undefined,
        image: dominio ? `${dominio}/${i.foto.src}` : undefined,
        logo: dominio ? `${dominio}/imagens/logo.png` : undefined,
        telephone: `+${s.whatsapp}`,
        email: s.email || undefined,
        medicalSpecialty: 'Psychiatric',
        areaServed: cidades.map((c) => ({ '@type': 'City', name: c })),
        availableLanguage: 'pt-BR',
        paymentAccepted: s.pagamento || undefined,
        founder: { '@id': `${dominio}/#pessoa` },
        sameAs: [insta, s.agenda_pagina].filter(Boolean),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Atendimentos',
          itemListElement: d.atendimentos.map((a) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: a.campos.titulo } })),
        },
        location: d.unidades.map((u) => ({
          '@type': 'Place',
          name: `Unidade ${u.campos.nome}`,
          address: { '@type': 'PostalAddress', streetAddress: [u.campos.endereco, u.campos.complemento].filter(Boolean).join(', '), addressLocality: u.campos.cidade, addressRegion: 'SP', postalCode: u.campos.cep || undefined, addressCountry: 'BR' },
          geo: { '@type': 'GeoCoordinates', latitude: u.campos.lat, longitude: u.campos.lng },
        })),
      },
      {
        '@type': 'Person',
        '@id': `${dominio}/#pessoa`,
        name: s.nome,
        jobTitle: s.profissao,
        image: dominio ? `${dominio}/${i.foto.src}` : undefined,
        hasCredential: { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Registro profissional', name: `CRP ${s.crp}` },
      },
      {
        '@type': 'FAQPage',
        mainEntity: d.faq.itens.map((q) => ({ '@type': 'Question', name: q.titulo, acceptedAnswer: { '@type': 'Answer', text: q.html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() } })),
      },
    ].filter(Boolean),
  };

  const tituloAba = s.titulo_aba || `${curto} · ${s.profissao} em São Paulo | CRP ${s.crp}`;
  const redes = (cls = '') => `
      ${insta ? `<a class="redondo ${cls}" href="${insta}" target="_blank" rel="noopener" aria-label="Instagram">${icone('instagram')}</a>` : ''}
      <a class="redondo ${cls}" href="${zap()}" target="_blank" rel="noopener" aria-label="Conversar pelo WhatsApp">${ZAP}</a>`;

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(tituloAba)}</title>
<meta name="description" content="${e(s.descricao_google || '')}">
<meta name="theme-color" content="#2F241B">
${dominio ? `<link rel="canonical" href="${e(dominio)}/">` : ''}
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${e(s.nome)}">
<meta property="og:title" content="${e(s.nome)} · ${e(s.profissao)}">
<meta property="og:description" content="${e(s.descricao_google || '')}">
${dominio ? `<meta property="og:url" content="${e(dominio)}/">\n<meta property="og:image" content="${e(dominio)}/${i.foto.src}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="imagens/logo.png">
<link rel="apple-touch-icon" href="imagens/logo.png">
<script>document.documentElement.classList.add('js');setTimeout(function(){var r=document.documentElement;if(!r.classList.contains('pronto'))r.classList.remove('js')},4000)</script>
<link rel="preload" as="image" href="${i.foto.src}" fetchpriority="high">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@1,400;1,500&family=Jost:wght@400;500;600&family=Marcellus&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${arquivos.css}">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<a class="pular" href="#conteudo">Pular para o conteúdo</a>

<header class="topo" id="topo">
  <div class="wrap topo-in">
    <a class="marca" href="#inicio" aria-label="${e(s.nome)}, início">
      <img src="imagens/logo.webp" alt="" width="700" height="450">
      <span><strong>${e(curto)}</strong><small>${e(s.profissao)}</small></span>
    </a>
    <nav class="menu" id="menu" aria-label="Menu principal">
      <ul class="menu-links">
        ${nav.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}
      </ul>
      <div class="menu-redes">${redes()}</div>
    </nav>
    <a class="botao pequeno ouro topo-cta" href="#agendar-online">${icone('agenda')} Agendar</a>
    <button class="redondo abre-menu" type="button" aria-controls="menu" aria-expanded="false" aria-label="Abrir menu">${icone('menu', 'ic i-abre')}${icone('fechar', 'ic i-fecha')}</button>
  </div>
</header>

<main id="conteudo">

<section class="hero" id="inicio" aria-labelledby="titulo-hero">
  <svg class="hero-curva" viewBox="0 0 300 220" fill="none" aria-hidden="true"><path d="M2 218c40-70 110-40 150-90S230 20 298 2" stroke="currentColor" stroke-width="1.2"/></svg>
  <div class="wrap hero-in">
    <div class="hero-texto">
      <h1 id="titulo-hero">${i.selo ? `<span ${rv(0, 'selo')}>${e(i.selo)}</span>` : ''}<span ${rv(1, 'hero-titulo')}>${inline(i.titulo)}</span></h1>
      <p ${rv(2, 'hero-sub')}>${inline(i.subtitulo || '')}</p>
      <div ${rv(3, 'botoes')}>
        <a class="botao ouro" href="#agendar-online">${icone('agenda')} ${e(i.botao_principal || 'Agendar consulta')}</a>
        <a class="botao contorno" href="#atendimentos">${e(i.botao_secundario || 'Conhecer os atendimentos')} ${icone('baixo')}</a>
      </div>
      ${i.credenciais.length ? `<ul ${rv(4, 'hero-cred')}><li class="ponto" aria-hidden="true"></li>${i.credenciais.map((c) => `<li>${inline(c)}</li>`).join('')}</ul>` : ''}
    </div>
    <div ${rv(2, 'hero-retrato')}>
      <span class="hero-anel" aria-hidden="true"></span>
      <span class="hero-arco" aria-hidden="true"></span>
      <div class="hero-foto">${foto(i.foto, { alt: `${s.nome}, ${s.profissao}`, lazy: false })}</div>
      <div class="cracha"><span class="cracha-ic">${icone('cerebro')}</span><span><strong>CRP ${e(s.crp)}</strong><small>${e(s.profissao)}</small></span></div>
    </div>
  </div>
</section>

<section class="secao f-creme" id="sobre" data-menu="#sobre" aria-labelledby="t-sobre">
  <div class="wrap">
    <div class="duas">
      <figure ${rv(0, 'moldura m-bloco')}>
        ${foto(so.foto, { alt: s.nome })}
        ${so.cracha_titulo ? `<figcaption class="cracha"><span class="cracha-ic">${icone('capelo')}</span><span><strong>${inline(so.cracha_titulo)}</strong><small>${inline(so.cracha_texto || '')}</small></span></figcaption>` : ''}
      </figure>
      <div class="duas-texto">
        <p ${rv(0, 'selo')}>${e(so.selo || 'Sobre mim')}</p>
        <h2 ${rv(1, 'titulo')} id="t-sobre">${inline(so.titulo)}</h2>
        <div ${rv(2, 'prosa')}>
          ${d.sobre.introParagrafos.slice(0, 1).map((p) => `<p>${p}</p>`).join('')}
          ${so.destaque ? `<p class="destaque">${inline(so.destaque)}</p>` : ''}
          ${d.sobre.introParagrafos.slice(1).map((p) => `<p>${p}</p>`).join('')}
        </div>
      </div>
    </div>
    <ul class="grade g4 principios">
      ${d.sobre.itens.map((c, k) => `<li ${rv(k, 'cartao')}><span class="q-ic">${icone(c.icone)}</span><h3>${inline(c.titulo)}</h3>${c.html}</li>`).join('')}
    </ul>
  </div>
</section>

<section class="secao f-marfim" id="para-quem" data-menu="#sobre" aria-labelledby="t-para-quem">
  <div class="wrap">
    ${cabeca(pq, { id: 't-para-quem' })}
    <ul class="motivos">
      ${d.paraQuem.itens.map((c, k) => `<li ${rv(k % 3, 'motivo')}><span class="motivo-topo">${icone(c.icone)}<span class="motivo-n" aria-hidden="true">${num(k)}</span></span><h3>${inline(c.titulo)}</h3>${c.html}</li>`).join('')}
    </ul>
    ${pq.fechamento ? `<p ${rv(0, 'fecho')}>${inline(pq.fechamento)}</p>` : ''}
  </div>
</section>

<section class="secao f-cacau" id="atendimentos" data-menu="#atendimentos" aria-labelledby="t-atendimentos">
  <div class="wrap">
    ${cabeca(at, { id: 't-atendimentos' })}
    <ul class="servicos n${d.atendimentos.length}">
      ${d.atendimentos.map((a, k) => `<li ${rv(k % 2, 'servico')}>
        <div class="servico-cab"><span class="servico-ic">${icone(a.campos.icone)}</span><h3>${inline(a.campos.titulo)}</h3></div>
        ${a.introParagrafos.map((p) => `<p>${p}</p>`).join('')}
        ${a.campos.citacao ? `<p class="citacao">${inline(a.campos.citacao)}</p>` : ''}
        ${a.introLista.length ? `<p class="mini">${e(at.indicada_rotulo || 'Pode ser indicada para')}</p><ul class="checks">${a.introLista.map((l) => `<li>${icone('certo')}<span>${l}</span></li>`).join('')}</ul>` : ''}
        <a class="saiba" href="${zap(a.campos.mensagem_whatsapp || `Olá, ${primeiroNome}! Vim pelo site e gostaria de saber mais sobre: ${a.campos.titulo}.`)}" target="_blank" rel="noopener">${e(at.saiba_mais || 'Quero saber mais')} ${icone('seta')}</a>
      </li>`).join('')}
    </ul>
    ${at.ajuda_titulo ? `<div ${rv(0, 'ajuda')}>
      <span class="ajuda-ic">${icone('pergunta')}</span>
      <div><h3>${inline(at.ajuda_titulo)}</h3><p>${inline(at.ajuda_texto || '')}</p></div>
      <a class="botao ouro" href="${zap()}" target="_blank" rel="noopener">${ZAP} ${e(at.ajuda_botao || 'Conversar pelo WhatsApp')}</a>
    </div>` : ''}
  </div>
</section>

<section class="secao f-creme" id="abordagem" data-menu="#atendimentos" aria-labelledby="t-abordagem">
  <div class="wrap duas inv">
    <div class="duas-texto">
      <p ${rv(0, 'selo')}>${e(ab.selo || 'Abordagem')}</p>
      <h2 ${rv(1, 'titulo')} id="t-abordagem">${inline(ab.titulo)}</h2>
      <div ${rv(2, 'prosa')}>${d.abordagem.intro}</div>
    </div>
    <figure ${rv(1, 'ciclo')} aria-label="${d.abordagem.itens.map((x) => e(x.titulo)).join(', ')}: os três se influenciam">
      <svg viewBox="0 0 400 360" aria-hidden="true">
        <defs><marker id="ponta" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="currentColor"/></marker></defs>
        <g fill="none" stroke="currentColor" stroke-width="1.3" marker-start="url(#ponta)" marker-end="url(#ponta)">
          <path class="aresta" pathLength="1" d="M166 100 102 208"/><path class="aresta" pathLength="1" d="M234 100 298 208"/><path class="aresta" pathLength="1" d="M130 270h140"/>
        </g>
        <text x="200" y="186" class="psi">Ψ</text>
      </svg>
      ${d.abordagem.itens.map((x, k) => `<div class="no no${k}"><strong>${inline(x.titulo)}</strong><span>${x.paragrafos[0] || ''}</span></div>`).join('')}
      ${ab.legenda ? `<figcaption>${inline(ab.legenda)}</figcaption>` : ''}
    </figure>
  </div>
</section>

<section class="secao f-marfim" id="como-funciona" data-menu="#como-funciona" aria-labelledby="t-como">
  <div class="wrap">
    ${cabeca(co, { id: 't-como' })}
    <ol class="passos">
      ${d.como.itens.map((p, k) => `<li ${rv(k)}><span class="passo-n" aria-hidden="true">${k + 1}</span><div><h3>${inline(p.titulo)}</h3>${p.html}</div></li>`).join('')}
    </ol>
  </div>
</section>

<section class="faixa" aria-label="Frase de destaque" data-menu="#como-funciona">
  <div class="faixa-foto">${foto(fr.foto, { alt: '' })}</div>
  <div class="wrap">
    <p ${rv(0, 'faixa-frase')}>${inline(fr.frase || '')}</p>
    ${fr.apoio ? `<p ${rv(1, 'selo claro centro')}>${e(fr.apoio)}</p>` : ''}
  </div>
</section>

<section class="secao f-marfim" id="formacao" data-menu="#formacao" aria-labelledby="t-formacao">
  <div class="wrap duas">
    <figure ${rv(0, 'moldura m-formas')}>
      ${foto(fo.foto, { alt: fo.foto.alt })}
    </figure>
    <div class="duas-texto">
      <p ${rv(0, 'selo')}>${e(fo.selo || 'Formação')}</p>
      <h2 ${rv(1, 'titulo menor')} id="t-formacao">${inline(fo.titulo)}</h2>
      <ul class="cursos">
        ${d.formacao.itens.map((f, k) => `<li ${rv(k % 2 + 2, 'curso')}><span class="q-ic escuro">${icone(f.icone || 'capelo')}</span><div><h3>${inline(f.titulo)}</h3>${f.html}</div></li>`).join('')}
      </ul>
      ${fo.assinatura ? `<p ${rv(3, 'assinatura')}>${inline(fo.assinatura)}</p>` : ''}
    </div>
  </div>
</section>

<section class="secao f-creme" id="mitos" data-menu="#formacao" aria-labelledby="t-mitos">
  <div class="wrap">${cabeca(mi, { id: 't-mitos' })}</div>
  <div ${rv(0, 'carrossel')} role="group" aria-roledescription="carrossel" aria-labelledby="t-mitos">
    <div class="car-janela" tabindex="0">
      <ul class="car-trilho">
        ${d.mitos.itens.map((c) => `<li class="mito"><h3>${inline(c.titulo)}</h3>${c.html}</li>`).join('')}
      </ul>
    </div>
    <div class="wrap car-controles">
      <button type="button" class="redondo claro car-ant" aria-label="Cartão anterior">${icone('anterior')}</button>
      <button type="button" class="redondo claro car-pausa" aria-label="Pausar o movimento" aria-pressed="false">${icone('pausa', 'ic i-pausa')}${icone('tocar', 'ic i-tocar')}</button>
      <button type="button" class="redondo claro car-prox" aria-label="Próximo cartão">${icone('proximo')}</button>
    </div>
  </div>
</section>

<section class="secao f-marfim" id="espaco" data-menu="#agendamento" aria-labelledby="t-espaco">
  <div class="wrap">
    <header class="cabeca lado">
      <div><p ${rv(0, 'selo')}>${e(es.selo || 'O espaço')}</p><h2 ${rv(1, 'titulo')} id="t-espaco">${inline(es.titulo)}</h2></div>
      ${es.texto ? `<p ${rv(2, 'lead')}>${inline(es.texto)}</p>` : ''}
    </header>
    <div class="mosaico">
      ${es.fotos.map((f, k) => `<a ${rv(k, `foto t${k}`)} href="${f.src}" data-galeria="O espaço" data-legenda="${e(f.alt)}">${foto(f, { alt: f.alt })}<span class="foto-lupa" aria-hidden="true">${icone('ampliar')}</span></a>`).join('')}
    </div>
  </div>
</section>

<section class="secao f-creme" id="agendamento" data-menu="#agendamento" aria-labelledby="t-agendamento">
  <div class="wrap">
    ${cabeca(ag, { id: 't-agendamento' })}
    <ul class="resumo">
      ${d.agendamento.itens.map((r, k) => `<li ${rv(k)}><span class="q-ic">${icone(r.icone || 'agenda')}</span><div><span class="resumo-r">${inline(r.titulo)}</span><strong>${r.paragrafos[0] || ''}</strong>${r.paragrafos[1] ? `<small>${r.paragrafos[1]}</small>` : ''}</div></li>`).join('')}
    </ul>

    <div ${rv(0, 'localizador')}>
      <div class="loc-lista">
        <h3 class="loc-titulo">${e(ag.lista_titulo || 'Onde atendo')}</h3>
        <ul class="unidades">
          ${d.unidades.map((u, k) => {
            const c = u.campos, end = enderecoCompleto(c);
            return `<li class="un" id="un-${c.id}" data-id="${c.id}" data-nome="${e(c.nome)}" data-lat="${c.lat}" data-lng="${c.lng}" data-cod="${e(c.agenda_codigo || '')}" data-end="${e([c.endereco, c.complemento].filter(Boolean).join(', '))}" data-bairro="${e([c.bairro, c.cidade].filter(Boolean).join(', '))}" data-maps="${e(mapsBusca(end))}">
            <button type="button" class="un-sel" aria-expanded="false" aria-controls="un-mais-${c.id}">
              <span class="un-pin">${icone('local')}</span>
              <span class="un-txt"><strong>${inline(c.nome)}</strong><small>${inline([c.endereco, c.complemento].filter(Boolean).join(', '))}<br>${inline([c.bairro, c.cidade].filter(Boolean).join(', '))}</small></span>
              <span class="un-seta">${icone('proximo')}</span>
            </button>
            <div class="un-mais" id="un-mais-${c.id}"><div class="un-mais-in">
              ${c.como_chegar ? `<p class="un-como">${inline(c.como_chegar)}</p>` : ''}
              ${c.fotos.length ? `<div class="un-fotos">${c.fotos.map((f) => `<a class="foto" href="${f.src}" data-galeria="${e(c.nome)}" data-legenda="${e(f.alt)}"><img src="${f.mini}" alt="${e(f.alt)}" width="480" height="480" loading="lazy" decoding="async"></a>`).join('')}</div>` : ''}
              <div class="un-acoes">
                ${s.agenda ? `<a class="botao pequeno escuro" href="#agendar-online" data-agendar="${e(c.agenda_codigo || '')}" data-unidade="${e(c.nome)}">${icone('agenda')} ${e(ag.ver_horarios || 'Ver horários')}</a>` : ''}
                <a class="link-acao" href="${mapsBusca(end)}" target="_blank" rel="noopener">${icone('rota')} ${e(ag.como_chegar || 'Como chegar')}</a>
                <a class="link-acao" href="${zap(msgUnidade(c.nome))}" target="_blank" rel="noopener">${ZAP} ${e(ag.whatsapp_unidade || 'WhatsApp')}</a>
              </div>
            </div></div>
          </li>`;
          }).join('')}
          <li class="un un-online">
            <div class="un-sel">
              <span class="un-pin escuro">${icone('video')}</span>
              <span class="un-txt"><strong>${inline(ag.online_titulo || 'Consultório virtual')}</strong><small>${inline(ag.online_texto || '')}</small></span>
            </div>
            <div class="un-acoes">
              ${s.agenda ? `<a class="botao pequeno escuro" href="#agendar-online" data-agendar="online">${icone('agenda')} ${e(ag.online_botao || 'Ver horários on-line')}</a>` : ''}
              <a class="link-acao" href="${zap(msgOnline)}" target="_blank" rel="noopener">${ZAP} ${e(ag.whatsapp_unidade || 'WhatsApp')}</a>
            </div>
          </li>
        </ul>
      </div>
      <div class="loc-mapa">
        <div id="mapa" class="mapa" role="application" aria-label="Mapa das unidades de atendimento"></div>
        <p class="mapa-espera">Carregando o mapa das unidades…</p>
        <noscript><p class="mapa-espera">O mapa precisa de JavaScript. Use “${e(ag.como_chegar || 'Como chegar')}” em cada unidade da lista.</p></noscript>
      </div>
    </div>

    ${s.agenda ? `<div ${rv(0, 'agenda')} id="agendar-online" tabindex="-1">
      <div class="agenda-cab">
        <span class="q-ic">${icone('agenda')}</span>
        <div><h3>${inline(ag.agenda_titulo || 'Agende seu horário on-line')}</h3><p>${inline(ag.agenda_texto || '')}</p></div>
        ${s.agenda_pagina ? `<a class="link-acao agenda-fora" href="${e(s.agenda_pagina)}" target="_blank" rel="noopener">${e(ag.agenda_nova_aba || 'Abrir em nova aba')} ${icone('externo')}</a>` : ''}
      </div>
      <p class="agenda-escolha" hidden><span>${icone('local')} <span class="agenda-escolha-t"></span></span><button type="button" class="link-acao agenda-limpar">Ver todas as unidades</button></p>
      <div class="agenda-moldura" data-src="${e(s.agenda)}">
        <iframe id="agenda" title="Agenda on-line de ${e(s.nome)}" referrerpolicy="strict-origin-when-cross-origin" allow="clipboard-write"></iframe>
        <p class="agenda-espera"><span class="girando" aria-hidden="true"></span>${e(ag.agenda_carregando || 'Carregando a agenda…')}</p>
        <div class="agenda-falha" hidden>
          <p>${inline(ag.agenda_falha || 'A agenda está demorando para abrir. Você pode abri-la em outra aba ou falar comigo pelo WhatsApp.')}</p>
          <div class="botoes">
            ${s.agenda_pagina ? `<a class="botao pequeno escuro" href="${e(s.agenda_pagina)}" target="_blank" rel="noopener">${icone('externo')} ${e(ag.agenda_nova_aba || 'Abrir em nova aba')}</a>` : ''}
            <a class="botao pequeno contorno-escuro" href="${zap()}" target="_blank" rel="noopener">${ZAP} WhatsApp</a>
          </div>
        </div>
      </div>
      <noscript><p class="agenda-sem-js">Para escolher o horário, <a href="${e(s.agenda_pagina || s.agenda)}">abra a agenda on-line</a> ou <a href="${zap()}">fale pelo WhatsApp</a>.</p></noscript>
    </div>` : ''}

    <div ${rv(0, 'cta')}>
      <div><h3>${inline(ag.cta_titulo || 'Prefere conversar primeiro?')}</h3><p>${inline(ag.cta_texto || '')}</p></div>
      <a class="botao ouro" href="${zap()}" target="_blank" rel="noopener">${ZAP} ${e(ag.cta_botao || 'Conversar pelo WhatsApp')}</a>
    </div>
  </div>
</section>

<section class="secao f-marfim" id="duvidas" data-menu="#duvidas" aria-labelledby="t-duvidas">
  <div class="wrap estreito">
    ${cabeca(fq, { id: 't-duvidas' })}
    <div class="faq">
      ${d.faq.itens.map((q, k) => `<details ${rv(Math.min(k, 3))}><summary><span>${inline(q.titulo)}</span><span class="faq-mais" aria-hidden="true">${icone('mais')}</span></summary><div class="faq-r"><div>${q.html}</div></div></details>`).join('')}
    </div>
  </div>
</section>

</main>

<footer class="rodape" id="contato">
  <div class="wrap rodape-grade">
    <div class="rodape-marca">
      <img src="imagens/logo.webp" alt="" width="700" height="450" loading="lazy">
      <p><strong>${e(s.nome)}</strong><br>${e(s.profissao)} · CRP ${e(s.crp)}</p>
      ${s.rodape_texto ? `<p class="rodape-nota">${inline(s.rodape_texto)}</p>` : ''}
      <div class="sociais">${redes()}</div>
    </div>
    <nav aria-label="Navegação do rodapé">
      <h2 class="rodape-t">Navegação</h2>
      <ul>${[['#inicio', 'Início'], ...nav].map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul>
    </nav>
    <div>
      <h2 class="rodape-t">Atendimentos</h2>
      <ul>${d.atendimentos.map((a) => `<li><a href="#atendimentos">${inline(a.campos.titulo)}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h2 class="rodape-t">Contato</h2>
      <ul class="contatos">
        <li><a href="${zap()}" target="_blank" rel="noopener">${ZAP} ${tel}</a></li>
        ${s.email ? `<li><a href="mailto:${e(s.email)}">${icone('email')} ${e(s.email)}</a></li>` : ''}
        ${insta ? `<li><a href="${insta}" target="_blank" rel="noopener">${icone('instagram')} @${e(String(s.instagram).replace(/^@/, ''))}</a></li>` : ''}
        <li><a href="#agendamento">${icone('local')} ${inline(s.onde || `${d.unidades.length} unidades e on-line`)}</a></li>
        ${s.agenda ? `<li><a href="#agendar-online">${icone('agenda')} Agenda on-line</a></li>` : ''}
      </ul>
    </div>
  </div>
  <div class="wrap rodape-fim">
    <span>© ${new Date().getFullYear()} ${e(s.nome)}. Todos os direitos reservados.</span>
    <span>${e(s.profissao)} · CRP ${e(s.crp)}</span>
  </div>
</footer>

<a class="zap-flutuante" href="${zap()}" target="_blank" rel="noopener" aria-label="Conversar pelo WhatsApp">${ZAP}</a>

<dialog class="galeria" id="galeria" aria-label="Fotos">
  <button type="button" class="g-botao g-fechar" aria-label="Fechar">${icone('fechar')}</button>
  <button type="button" class="g-botao g-ant" aria-label="Foto anterior">${icone('anterior')}</button>
  <figure><img alt=""><figcaption class="g-leg"></figcaption></figure>
  <button type="button" class="g-botao g-prox" aria-label="Próxima foto">${icone('proximo')}</button>
</dialog>

<script src="${arquivos.js}" defer></script>
</body>
</html>
`;
}
