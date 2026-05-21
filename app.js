let items = [];
let owned = new Set();

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

Promise.all([
  fetch('data.json').then(r => r.json()),
  fetch('uno-collection.json').then(r => r.ok ? r.json() : [])
]).then(([data, ownedList]) => {
  items = data;
  owned = new Set(ownedList);
  render();
});
