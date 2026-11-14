// Interações do site: topo, menu do celular, entrada das seções, carrossel, mapa das unidades,
// agenda on-line embutida, perguntas, visualizador de fotos e botão do WhatsApp.
(function () {
  'use strict';
  var raiz = document.documentElement;
  raiz.classList.add('pronto');
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var calmo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var temIO = 'IntersectionObserver' in window;
  var celular = function () { return window.matchMedia('(max-width: 900px)').matches; };
  var suave = function () { return calmo ? 'auto' : 'smooth'; };

  // ---------- topo: transparente sobre a primeira tela, sólido depois ----------
  var topo = $('#topo');
  function aoRolar() { topo.classList.toggle('rolou', window.scrollY > 40); }
  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();

  // ---------- menu do celular ----------
  var botaoMenu = $('.abre-menu'), menu = $('#menu');
  $$('.menu-links li').forEach(function (li, i) { li.style.setProperty('--i', i); });
  function menuAberto() { return topo.classList.contains('aberto'); }
  function abrirMenu(abrir) {
    topo.classList.toggle('aberto', abrir);
    document.body.classList.toggle('trava', abrir);
    botaoMenu.setAttribute('aria-expanded', abrir);
    botaoMenu.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
    if (abrir) { var primeiro = $('a', menu); if (primeiro) setTimeout(function () { primeiro.focus(); }, 60); }
  }
  botaoMenu.addEventListener('click', function () { abrirMenu(!menuAberto()); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) abrirMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (!menuAberto()) return;
    if (e.key === 'Escape') { abrirMenu(false); botaoMenu.focus(); return; }
    if (e.key !== 'Tab') return;
    // o foco fica dentro do menu enquanto ele está aberto
    var focaveis = [botaoMenu].concat($$('a', menu));
    var i = focaveis.indexOf(document.activeElement);
    var prox = e.shiftKey ? (i <= 0 ? focaveis.length - 1 : i - 1) : (i === focaveis.length - 1 ? 0 : i + 1);
    e.preventDefault();
    focaveis[prox].focus();
  });
  window.addEventListener('resize', function () { if (menuAberto() && !celular()) abrirMenu(false); });

  // ---------- entrada das seções ----------
  var entradas = $$('.rv');
  if (calmo || !temIO) {
    entradas.forEach(function (el) { el.classList.add('vis'); });
  } else {
    var verEntrada = new IntersectionObserver(function (itens) {
      itens.forEach(function (i) { if (i.isIntersecting) { i.target.classList.add('vis'); verEntrada.unobserve(i.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    entradas.forEach(function (el) { verEntrada.observe(el); });
  }

  // ---------- item do menu da seção atual ----------
  var links = $$('.menu-links a');
  if (temIO) {
    var espiao = new IntersectionObserver(function (itens) {
      itens.forEach(function (i) {
        if (!i.isIntersecting) return;
        var alvo = i.target.getAttribute('data-menu') || '';
        links.forEach(function (a) { a.classList.toggle('atual', a.getAttribute('href') === alvo); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main > section').forEach(function (s) { espiao.observe(s); });
  }

  // ---------- carrossel ----------
  (function () {
    var caixa = $('.carrossel');
    if (!caixa) return;
    var janela = $('.car-janela', caixa), trilho = $('.car-trilho', caixa), pausa = $('.car-pausa', caixa);
    var originais = $$('.mito', trilho);
    if (originais.length < 2) return;
    var passo = function () { return originais[1].offsetLeft - originais[0].offsetLeft; };
    var volta = 0;            // largura de uma volta completa (só com as cópias)
    var pos = 0, antes = 0, visivel = false, usuarioPausou = calmo, esperas = 0, arrastando = false;

    if (!calmo) {
      originais.forEach(function (c) {
        var copia = c.cloneNode(true);
        copia.setAttribute('aria-hidden', 'true');
        trilho.appendChild(copia);
      });
      var medir = function () { volta = trilho.children[originais.length].offsetLeft - originais[0].offsetLeft; };
      medir();
      window.addEventListener('resize', medir);
    } else {
      pausa.hidden = true;
    }
    function parado() { return usuarioPausou || esperas > 0 || arrastando || !visivel; }
    function esperar(ms) { esperas++; setTimeout(function () { esperas--; pos = janela.scrollLeft; }, ms); }
    function quadro(agora) {
      var dt = Math.min(64, agora - antes); antes = agora;
      if (!parado() && volta) {
        pos += 36 * dt / 1000;
        if (pos >= volta) pos -= volta;
        janela.scrollLeft = pos;
      }
      requestAnimationFrame(quadro);
    }
    if (!calmo) requestAnimationFrame(function (t) { antes = t; quadro(t); });
    if (temIO) new IntersectionObserver(function (i) { visivel = i[0].isIntersecting; if (visivel) pos = janela.scrollLeft; }).observe(caixa);
    else visivel = true;

    // quem manda é a pessoa: ao passar o mouse, focar, tocar ou arrastar, o movimento para
    var sobre = 0;
    caixa.addEventListener('mouseenter', function () { sobre = 1; esperas++; });
    caixa.addEventListener('mouseleave', function () { if (sobre) { sobre = 0; esperas--; pos = janela.scrollLeft; } });
    caixa.addEventListener('focusin', function () { esperar(600); });
    janela.addEventListener('touchstart', function () { esperar(5000); }, { passive: true });
    janela.addEventListener('wheel', function (e) { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) esperar(2500); }, { passive: true });
    janela.addEventListener('scroll', function () {
      // dá a volta quando a pessoa rola à mão
      if (!volta || !parado()) return;
      if (janela.scrollLeft >= volta) janela.scrollLeft -= volta;
    }, { passive: true });

    // arrastar com o mouse
    var x0 = 0, s0 = 0, moveu = false;
    janela.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      arrastando = true; moveu = false; x0 = e.clientX; s0 = janela.scrollLeft;
      janela.classList.add('arrastando');
      janela.setPointerCapture(e.pointerId);
    });
    janela.addEventListener('pointermove', function (e) {
      if (!arrastando) return;
      var dx = e.clientX - x0;
      if (Math.abs(dx) > 4) moveu = true;
      var alvo = s0 - dx;
      if (volta) { if (alvo < 0) { alvo += volta; s0 += volta; } else if (alvo >= volta) { alvo -= volta; s0 -= volta; } }
      janela.scrollLeft = alvo;
    });
    function soltar() { if (!arrastando) return; arrastando = false; janela.classList.remove('arrastando'); pos = janela.scrollLeft; }
    janela.addEventListener('pointerup', soltar);
    janela.addEventListener('pointercancel', soltar);
    janela.addEventListener('click', function (e) { if (moveu) { e.preventDefault(); moveu = false; } }, true);

    function andar(dir) {
      esperar(1100);
      if (volta && dir < 0 && janela.scrollLeft < passo()) janela.scrollLeft += volta;
      janela.scrollBy({ left: dir * passo(), behavior: suave() });
    }
    $('.car-ant', caixa).addEventListener('click', function () { andar(-1); });
    $('.car-prox', caixa).addEventListener('click', function () { andar(1); });
    janela.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); andar(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); andar(-1); }
    });
    pausa.addEventListener('click', function () {
      usuarioPausou = !usuarioPausou;
      pausa.setAttribute('aria-pressed', usuarioPausou);
      pausa.setAttribute('aria-label', usuarioPausou ? 'Retomar o movimento' : 'Pausar o movimento');
      pos = janela.scrollLeft;
    });
  })();

  // ---------- agenda on-line embutida ----------
  var agenda = (function () {
    var cartao = $('#agendar-online');
    if (!cartao) return null;
    var moldura = $('.agenda-moldura', cartao), quadro = $('iframe', moldura), falha = $('.agenda-falha', moldura);
    var escolha = $('.agenda-escolha', cartao), escolhaTexto = $('.agenda-escolha-t', cartao);
    var base = moldura.getAttribute('data-src'), atual = '', relogio = 0;
    function carregar(url) {
      if (url === atual) return;
      atual = url;
      moldura.classList.remove('pronta', 'falhou');
      falha.hidden = true;
      clearTimeout(relogio);
      relogio = setTimeout(function () { if (!moldura.classList.contains('pronta')) { moldura.classList.add('falhou'); falha.hidden = false; } }, 15000);
      quadro.src = url;
    }
    quadro.addEventListener('load', function () {
      if (!quadro.getAttribute('src')) return;
      clearTimeout(relogio);
      falha.hidden = true;
      moldura.classList.remove('falhou');
      moldura.classList.add('pronta');
    });
    function endereco(cod) {
      if (cod === 'online') return base + '?modalidade=2';
      return cod ? base + '?codUnidade=' + encodeURIComponent(cod) : base;
    }
    function escolher(cod, nome) {
      carregar(endereco(cod));
      var tele = $('.tele', cartao);
      if (tele) tele.hidden = cod !== 'online';
      cartao.classList.toggle('online', cod === 'online');
      if (cod) {
        escolhaTexto.textContent = cod === 'online' ? 'Sessão on-line, por videochamada' : 'Unidade ' + nome;
        escolha.hidden = false;
      } else {
        escolha.hidden = true;
      }
    }
    $('.agenda-limpar', cartao).addEventListener('click', function () { escolher('', ''); });
    // só carrega quando a pessoa se aproxima da agenda
    if (temIO) {
      var ver = new IntersectionObserver(function (i) { if (i[0].isIntersecting) { ver.disconnect(); if (!atual) carregar(base); } }, { rootMargin: '800px 0px' });
      ver.observe(cartao);
    } else {
      carregar(base);
    }
    function mostrar() {
      cartao.scrollIntoView({ behavior: suave(), block: 'start' });
      try { cartao.focus({ preventScroll: true }); } catch (err) { /* navegadores antigos */ }
    }
    document.addEventListener('click', function (e) {
      var a = e.target.closest('[data-agendar]');
      if (a) { e.preventDefault(); escolher(a.getAttribute('data-agendar'), a.getAttribute('data-unidade') || ''); mostrar(); return; }
      var paraAgenda = e.target.closest('a[href="#agendar-online"]');
      if (paraAgenda && !atual) carregar(base);
    });
    return { escolher: escolher, mostrar: mostrar };
  })();

  // ---------- unidades + mapa ----------
  (function () {
    var caixaMapa = $('#mapa');
    var unidades = $$('.un[data-lat]');
    if (!unidades.length) return;
    var lista = $('.loc-lista'), espera = $('.mapa-espera'), mapa = null, marcas = [];

    function ativar(li, origem) {
      unidades.forEach(function (u, i) {
        var on = u === li;
        u.classList.toggle('ativa', on);
        $('.un-sel', u).setAttribute('aria-expanded', on);
        var el = marcas[i] && marcas[i].getElement();
        if (el) el.classList.toggle('ativo', on);
      });
      if (!li) { if (mapa) mapa.closePopup(); return; }
      var i = unidades.indexOf(li);
      if (mapa && origem !== 'pino') {
        mapa.flyTo(marcas[i].getLatLng(), 15, { duration: calmo ? 0 : 0.8 });
        mapa.once('moveend', function () { if (li.classList.contains('ativa')) marcas[i].openPopup(); });
      }
      if (origem === 'pino' && !celular()) {
        // a lista rola sozinha até a unidade
        setTimeout(function () { lista.scrollTo({ top: li.offsetTop - lista.offsetTop - 10, behavior: suave() }); }, 30);
      }
      if (origem === 'pino' && celular()) {
        setTimeout(function () { li.scrollIntoView({ behavior: suave(), block: 'nearest' }); }, 30);
      }
    }
    unidades.forEach(function (li) {
      $('.un-sel', li).addEventListener('click', function () { ativar(li.classList.contains('ativa') ? null : li, 'lista'); });
    });

    function balao(li) {
      var d = li.dataset, caixa = document.createElement('div');
      function por(tag, texto, pai) { var el = document.createElement(tag); if (texto) el.textContent = texto; (pai || caixa).appendChild(el); return el; }
      por('strong', d.nome);
      por('span', d.end);
      por('br');
      por('span', d.bairro);
      var acoes = por('div'); acoes.className = 'balao-acoes';
      if (agenda) {
        var ver = por('a', 'Ver horários', acoes);
        ver.href = '#agendar-online'; ver.setAttribute('data-agendar', d.cod || ''); ver.setAttribute('data-unidade', d.nome);
      }
      var rota = por('a', 'Como chegar', acoes);
      rota.href = d.maps; rota.target = '_blank'; rota.rel = 'noopener';
      return caixa;
    }

    function montar() {
      var L = window.L;
      mapa = L.map(caixaMapa, { scrollWheelZoom: false, dragging: !L.Browser.mobile, tap: false, zoomSnap: 0.5 });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>' }).addTo(mapa);
      var limites = [];
      marcas = unidades.map(function (li) {
        var p = [parseFloat(li.dataset.lat), parseFloat(li.dataset.lng)];
        limites.push(p);
        var m = L.marker(p, {
          title: li.dataset.nome, alt: 'Unidade ' + li.dataset.nome, keyboard: true,
          icon: L.divIcon({ className: 'pino', html: '<span></span>', iconSize: [30, 30], iconAnchor: [15, 36], popupAnchor: [0, -34] })
        }).addTo(mapa).bindPopup(balao(li), { autoPanPaddingTopLeft: [16, 70], autoPanPaddingBottomRight: [16, 16], maxWidth: 260 });
        m.on('click', function () { ativar(li, 'pino'); });
        return m;
      });
      mapa.fitBounds(limites, { padding: [44, 44] });
      caixaMapa.classList.add('pronto');
      espera.hidden = true;
      var ativa = $('.un.ativa');
      if (ativa) ativar(ativa, 'lista');
      window.addEventListener('resize', function () { mapa.invalidateSize(); });
    }
    function baixarMapa() {
      var css = document.createElement('link');
      css.rel = 'stylesheet'; css.href = 'vendor/leaflet/leaflet.css';
      document.head.appendChild(css);
      var js = document.createElement('script');
      js.src = 'vendor/leaflet/leaflet.js';
      js.onload = montar;
      js.onerror = function () { espera.textContent = 'Não foi possível carregar o mapa. Use “Como chegar” em cada unidade da lista.'; };
      document.head.appendChild(js);
    }
    if (temIO) {
      var verMapa = new IntersectionObserver(function (i) { if (i[0].isIntersecting) { verMapa.disconnect(); baixarMapa(); } }, { rootMargin: '600px 0px' });
      verMapa.observe(caixaMapa);
    } else {
      baixarMapa();
    }
  })();

  // ---------- perguntas: abrir e fechar com suavidade ----------
  $$('.faq details').forEach(function (d) {
    var resumo = $('summary', d), corpo = $('.faq-r', d), anim = null;
    if (calmo || !corpo.animate) return;
    resumo.addEventListener('click', function (e) {
      e.preventDefault();
      if (anim) anim.cancel();
      var abrir = !d.open;
      if (abrir) d.open = true;
      var h = corpo.scrollHeight;
      anim = corpo.animate(
        abrir ? [{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }] : [{ height: h + 'px', opacity: 1 }, { height: '0px', opacity: 0 }],
        { duration: 350, easing: 'cubic-bezier(.22,.61,.36,1)' }
      );
      anim.onfinish = function () { if (!abrir) d.open = false; anim = null; };
    });
  });

  // ---------- visualizador de fotos ----------
  (function () {
    var g = $('#galeria');
    if (!g || !g.showModal) return;
    var img = $('img', g), leg = $('.g-leg', g), fotos = [], atual = 0, quemAbriu = null;
    function mostrar(k) {
      atual = (k + fotos.length) % fotos.length;
      var a = fotos[atual];
      img.src = a.href;
      img.alt = a.getAttribute('data-legenda') || '';
      leg.textContent = a.getAttribute('data-galeria') + ' · ' + (atual + 1) + ' de ' + fotos.length;
      var prox = fotos[(atual + 1) % fotos.length];
      if (prox && prox !== a) { var pre = new Image(); pre.src = prox.href; }
      $('.g-ant', g).hidden = $('.g-prox', g).hidden = fotos.length < 2;
    }
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-galeria]');
      if (!a) return;
      e.preventDefault();
      quemAbriu = a;
      var grupo = a.getAttribute('data-galeria');
      fotos = $$('a[data-galeria]').filter(function (x) { return x.getAttribute('data-galeria') === grupo; });
      mostrar(fotos.indexOf(a));
      g.showModal();
    });
    $('.g-fechar', g).addEventListener('click', function () { g.close(); });
    $('.g-ant', g).addEventListener('click', function () { mostrar(atual - 1); });
    $('.g-prox', g).addEventListener('click', function () { mostrar(atual + 1); });
    g.addEventListener('click', function (e) { if (e.target === g) g.close(); });
    g.addEventListener('close', function () { img.removeAttribute('src'); if (quemAbriu) quemAbriu.focus(); });
    g.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') mostrar(atual - 1);
      if (e.key === 'ArrowRight') mostrar(atual + 1);
    });
    var tx = 0;
    g.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
    g.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) mostrar(atual + (dx < 0 ? 1 : -1));
    }, { passive: true });
  })();

  // ---------- botão do WhatsApp: some perto do rodapé e da chamada final ----------
  (function () {
    var zap = $('.zap-flutuante');
    if (!zap || !temIO) return;
    var vistos = new Set();
    var ver = new IntersectionObserver(function (itens) {
      itens.forEach(function (i) { if (i.isIntersecting) vistos.add(i.target); else vistos.delete(i.target); });
      zap.classList.toggle('some', vistos.size > 0);
    });
    $$('.rodape, .cta, .ajuda, .agenda-moldura').forEach(function (el) { ver.observe(el); });
  })();
})();
