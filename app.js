const STORAGE_KEY = 'uno-collection-owned-v1';
let items = [];
let owned = new Set();

function loadOwned() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) owned = new Set(JSON.parse(raw));
  } catch (e) { console.warn(e); }
}
function saveOwned() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...owned]));
}

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
  el.addEventListener('click', () => {
    if (owned.has(it.id)) owned.delete(it.id); else owned.add(it.id);
    saveOwned();
    el.classList.toggle('owned');
    updateStats();
    // refresh section counter
    const hdr = el.previousElementSibling;
  });
  return el;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

document.getElementById('search').addEventListener('input', render);
document.getElementById('filter-section').addEventListener('change', render);
document.getElementById('filter-owned').addEventListener('change', render);

document.getElementById('export-btn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify([...owned], null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'uno-collection.json'; a.click();
  URL.revokeObjectURL(url);
});
document.getElementById('import-btn').addEventListener('click', () => document.getElementById('import-file').click());
document.getElementById('import-file').addEventListener('change', e => {
  const f = e.target.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      const arr = JSON.parse(r.target.result);
      owned = new Set(arr);
      saveOwned(); render();
    } catch (err) { alert('JSON inválido: ' + err.message); }
  };
  r.readAsText(f);
});

fetch('data.json').then(r => r.json()).then(data => {
  items = data;
  loadOwned();
  render();
});
