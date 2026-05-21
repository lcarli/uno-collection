// Itens possuídos — hard coded. Para marcar um item como possuído,
// adicione o ID dele a esta lista e faça commit.
const OWNED_IDS = [
  "uno-spinoffs-uno-teams-2024",
  "uno-spinoffs-uno-golf-2025",
  "uno-spinoffs-car-go-uno-2004",
  "standard-uno-cards-uno-platinum-edition-2023",
  "standard-uno-cards-uno-minimalista-2020",
  "other-uno-cards-uno-vintage-1978-1978",
  "uno-spinoffs-uno-flip-2019",
  "other-uno-cards-mattel-80th-anniversary-uno-2025",
  "standard-uno-cards-uno-deluxe-house-rules-1998",
  "standard-uno-cards-uno",
  "uno-spinoffs-uno-all-wild-2022",
  "uno-spinoffs-uno-flex-2022",
  "other-uno-cards-o-no-99",
  "uno-spinoffs-uno-show-em-no-mercy-uno-2023",
  "other-uno-cards-disney-100-uno-2023",
  "uno-spinoffs-uno-show-em-no-mercy-expansion-pack-2024",
  "standard-uno-cards-world-s-smallest-uno-2018",
  "uno-spinoffs-uno-express-2017",
  "uno-spinoffs-liar-s-uno-2025",
  "uno-spinoffs-uno-party-2022",
  "uno-spinoffs-uno-showdown-2020",
  "uno-spinoffs-uno-triple-play-2021",
  "uno-spinoffs-uno-attack-2021",
  "uno-spinoffs-uno-mod-2009",
  "standard-uno-cards-50th-anniversary-edition-uno-premium-set-2021",
  "standard-uno-cards-uno-add-on-packs-billie-eilish-2025",
  "standard-uno-cards-uno-add-on-packs-reverse-pack-2025",
  "standard-uno-cards-uno-add-on-packs-speed-pack-2025",
  "standard-uno-cards-uno-add-on-packs-stack-pack-2025",
  "standard-uno-cards-uno-add-on-packs-swap-pack-2025",
  "standard-uno-cards-uno-gold-edition-2025",
  "standard-uno-cards-world-s-smallest-uno-retro-2021",
  "other-uno-cards-thank-you-heroes-uno-2020",
  "other-uno-cards-uno-travel-handheld-mga-825",
  "other-uno-cards-uno-prestige",
  "standard-uno-cards-30th-anniversary-edition-uno-2001",
  "uno-spinoffs-uno-spin-2024",
  "other-uno-cards-uno-party-pink-edition"
];

let items = [];
const owned = new Set(OWNED_IDS);

function updateStats() {
  const total = items.length;
  const own = items.filter(i => owned.has(i.id)).length;
  document.getElementById('stat-owned').textContent = own;
  document.getElementById('stat-total').textContent = total;
  const pct = total ? Math.round(own / total * 100) : 0;
  document.getElementById('stat-pct').textContent = pct + '%';
  document.getElementById('progress-bar').style.width = pct + '%';
}

function render() {
  const grid = document.getElementById('grid');
  const q = document.getElementById('search').value.toLowerCase().trim();
  const sec = document.getElementById('filter-section').value;
  const ownFilter = document.getElementById('filter-owned').value;
  grid.innerHTML = '';

  const sections = {};
  items.forEach(it => {
    if (sec && it.section !== sec) return;
    if (ownFilter === 'owned' && !owned.has(it.id)) return;
    if (ownFilter === 'missing' && owned.has(it.id)) return;
    if (q && !(it.name.toLowerCase().includes(q) || (it.year || '').includes(q))) return;
    (sections[it.section] = sections[it.section] || []).push(it);
  });

  Object.keys(sections).forEach(s => {
    const h = document.createElement('h2');
    h.className = 'section-header';
    h.textContent = `${s} (${sections[s].filter(i => owned.has(i.id)).length} / ${sections[s].length})`;
    grid.appendChild(h);
    sections[s].forEach(it => grid.appendChild(makeCard(it)));
  });

  updateStats();
}

function makeCard(it) {
  const el = document.createElement('div');
  el.className = 'card' + (owned.has(it.id) ? ' owned' : '');
  el.innerHTML = `
    <div class="img-wrap">${it.image
      ? `<img loading="lazy" src="${it.image}" alt="${escapeHtml(it.name)}" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'no-img',textContent:'🎴'}))">`
      : `<div class="no-img">🎴</div>`}</div>
    <div class="info">
      <div class="name">${escapeHtml(it.name)}</div>
      <div class="year">${escapeHtml(it.year || '—')}</div>
    </div>`;
  return el;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

document.getElementById('search').addEventListener('input', render);
document.getElementById('filter-section').addEventListener('change', render);
document.getElementById('filter-owned').addEventListener('change', render);

fetch('data.json').then(r => r.json()).then(data => {
  items = data;
  render();
});
