// Interações: topo ao rolar, menu no celular, seção atual, revelar ao rolar, mapa das unidades e galeria.
document.documentElement.classList.add('js');

const topo = document.getElementById('topo');
const aoRolar = () => topo.classList.toggle('rolou', scrollY > 40);
aoRolar();
addEventListener('scroll', aoRolar, { passive: true });

// menu no celular
const menu = document.getElementById('menu');
const abre = document.querySelector('.abre-menu');
abre?.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  abre.setAttribute('aria-expanded', aberto);
});
menu.addEventListener('click', (e) => {
  if (e.target.closest('a')) { menu.classList.remove('aberto'); abre?.setAttribute('aria-expanded', 'false'); }
});

// revelar ao rolar + seção atual no menu
const revelar = new IntersectionObserver((itens) => {
  for (const i of itens) if (i.isIntersecting) { i.target.classList.add('visivel'); revelar.unobserve(i.target); }
}, { rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.revela').forEach((el) => revelar.observe(el));

const links = new Map([...menu.querySelectorAll('a[href^="#"]')].map((a) => [a.getAttribute('href').slice(1), a]));
const secoes = new IntersectionObserver((itens) => {
  for (const i of itens) if (i.isIntersecting) {
    links.forEach((a) => a.classList.remove('atual'));
    links.get(i.target.id)?.classList.add('atual');
  }
}, { rootMargin: '-45% 0px -50% 0px' });
links.forEach((_, id) => { const s = document.getElementById(id); if (s) secoes.observe(s); });

// unidade → mapa
const mapa = document.getElementById('mapa');
document.querySelectorAll('.unidade[data-mapa]').forEach((u) => {
  u.querySelector('.unidade-cab').addEventListener('click', () => {
    document.querySelectorAll('.unidade[data-mapa]').forEach((x) => {
      x.classList.toggle('ativa', x === u);
      x.querySelector('.unidade-cab').setAttribute('aria-pressed', x === u);
    });
    mapa.src = u.dataset.mapa;
    mapa.title = 'Mapa da unidade ' + u.dataset.nome;
    if (innerWidth < 1100) mapa.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

// galeria das fotos
const g = document.getElementById('galeria');
const gImg = g.querySelector('img');
const gLeg = g.querySelector('.g-leg');
let fotos = [], atual = 0;
const mostrar = (k) => {
  atual = (k + fotos.length) % fotos.length;
  const a = fotos[atual];
  gImg.src = a.href;
  gImg.alt = a.querySelector('img').alt;
  gLeg.textContent = `${a.dataset.galeria} · ${atual + 1} de ${fotos.length}`;
};
document.querySelectorAll('a.foto').forEach((a) => a.addEventListener('click', (e) => {
  e.preventDefault();
  fotos = [...document.querySelectorAll(`a.foto[data-galeria="${CSS.escape(a.dataset.galeria)}"]`)];
  mostrar(fotos.indexOf(a));
  g.showModal();
}));
g.querySelector('.g-fechar').onclick = () => g.close();
g.querySelector('.g-ant').onclick = () => mostrar(atual - 1);
g.querySelector('.g-prox').onclick = () => mostrar(atual + 1);
g.addEventListener('click', (e) => { if (e.target === g) g.close(); });
g.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') mostrar(atual - 1);
  if (e.key === 'ArrowRight') mostrar(atual + 1);
});
