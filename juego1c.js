/* ══════════════════════════════════════════════════
   juego1c.js — Lógica de Ciencias Naturales
   ══════════════════════════════════════════════════ */

const BIOMAS = [
  { 
    nombre:'Bosque', icono:'🌳', subtitulo:'Bioma 1: Del sol al búho en el bosque',
    organismos:[
      {id:'sol', emoji:'☀️', nombre:'Sol', rol:'Energía'},
      {id:'planta', emoji:'🌿', nombre:'Planta', rol:'Productor'},
      {id:'grillo', emoji:'🦗', nombre:'Grillo', rol:'Consumidor 1°'},
      {id:'rana', emoji:'🐸', nombre:'Rana', rol:'Consumidor 2°'},
      {id:'buho', emoji:'🦉', nombre:'Búho', rol:'Superdepredador'}
    ]
  },
  { 
    nombre:'Océano', icono:'🌊', subtitulo:'Bioma 2: La vida bajo el mar azul',
    organismos:[
      {id:'sol_o', emoji:'☀️', nombre:'Sol', rol:'Energía'},
      {id:'alga', emoji:'🌱', nombre:'Alga', rol:'Productor'},
      {id:'pez', emoji:'🐟', nombre:'Pez', rol:'Consumidor 1°'},
      {id:'atun', emoji:'🐟', nombre:'Atún', rol:'Consumidor 2°'},
      {id:'tiburon', emoji:'🦈', nombre:'Tiburón', rol:'Superdepredador'}
    ]
  },
  { 
    nombre:'Desierto', icono:'🌵', subtitulo:'Bioma 3: Sobreviviendo al calor extremo',
    organismos:[
      {id:'sol_d', emoji:'☀️', nombre:'Sol', rol:'Energía'},
      {id:'cactus', emoji:'🌵', nombre:'Cactus', rol:'Productor'},
      {id:'insecto', emoji:'🪲', nombre:'Escarabajo', rol:'Consumidor 1°'},
      {id:'lagarto', emoji:'🦎', nombre:'Lagartija', rol:'Consumidor 2°'},
      {id:'halcon', emoji:'🦅', nombre:'Halcón', rol:'Superdepredador'}
    ]
  },
  { 
    nombre:'Sabana', icono:'🦁', subtitulo:'Bioma 4: La gran llanura africana',
    organismos:[
      {id:'sol_s', emoji:'☀️', nombre:'Sol', rol:'Energía'},
      {id:'pasto', emoji:'🌾', nombre:'Pasto', rol:'Productor'},
      {id:'cebra', emoji:'🦓', nombre:'Cebra', rol:'Consumidor 1°'},
      {id:'leona', emoji:'🦁', nombre:'Leona', rol:'Consumidor 2°'},
      {id:'hiena', emoji:'🐺', nombre:'Hiena', rol:'Superdepredador'}
    ]
  }
];

let currentIdx = 0;
let placedIds = [];
let lockedSlots = [];
let trayIds = [];
let biomasDone = [];
let draggedId = null;

// Referencias
const trayEl = document.getElementById('tray');
const chainRowEl = document.getElementById('chain-row');
const navEl = document.getElementById('biome-nav');
const subtitleEl = document.getElementById('biome-subtitle');

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function startGame() {
  document.getElementById('pantalla-inicio').style.display = 'none';
  document.getElementById('juego-overlay-win').style.display = 'none';
  biomasDone = [];
  loadBiome(0);
}

function loadBiome(idx) {
  currentIdx = idx;
  const bioma = BIOMAS[idx];
  
  placedIds = new Array(5).fill(null);
  lockedSlots = new Array(5).fill(false);
  trayIds = shuffle(bioma.organismos.map(o => o.id));
  
  // Actualización de textos recuperada
  subtitleEl.textContent = bioma.subtitulo;
  
  renderNav();
  render();
}

function renderNav() {
  navEl.innerHTML = BIOMAS.map((b, i) => `
    <span class="biome-chip ${biomasDone.includes(i) ? 'done' : ''} ${i === currentIdx ? 'active' : ''}">
      ${b.icono} ${b.nombre}
    </span>
  `).join('');
}

function render() {
  // Render de bandeja
  trayEl.innerHTML = trayIds.map(id => cardHTML(id)).join('');

  // Render de cadena
  chainRowEl.innerHTML = new Array(5).fill(0).map((_, i) => `
    <div class="slot ${lockedSlots[i] ? 'correct' : ''}" ondragover="onDragOver(event)" ondrop="onDropSlot(event, ${i})">
      ${placedIds[i] ? cardHTML(placedIds[i], lockedSlots[i]) : '<span style="opacity:0.2">?</span>'}
      ${lockedSlots[i] ? `<div class="slot-role">${BIOMAS[currentIdx].organismos[i].rol}</div>` : ''}
    </div>
    ${i < 4 ? '<div style="align-self:center; font-weight:bold; color:#bde0fe">→</div>' : ''}
  `).join('');
}

function cardHTML(id, locked = false) {
  const org = BIOMAS[currentIdx].organismos.find(o => o.id === id);
  return `
    <div class="card" draggable="${!locked}" ondragstart="onDragStart(event, '${id}')">
      <span class="card-emoji">${org.emoji}</span>
      <span class="card-name">${org.nombre}</span>
    </div>
  `;
}

// Funciones de Drag & Drop
function onDragStart(e, id) { draggedId = id; }
function onDragOver(e) { e.preventDefault(); }

function onDropSlot(e, idx) {
  if (lockedSlots[idx]) return;
  const oldId = placedIds[idx];
  if (oldId) trayIds.push(oldId);
  placedIds[idx] = draggedId;
  trayIds = trayIds.filter(id => id !== draggedId);
  render();
}

function onDropTray(e) {
  const oldIdx = placedIds.indexOf(draggedId);
  if (oldIdx !== -1 && !lockedSlots[oldIdx]) {
    placedIds[oldIdx] = null;
    trayIds.push(draggedId);
    render();
  }
}

function validateChain() {
  const bioma = BIOMAS[currentIdx];
  let isLevelComplete = true;

  placedIds.forEach((id, i) => {
    if (id === bioma.organismos[i].id) {
      lockedSlots[i] = true;
    } else {
      isLevelComplete = false;
      if(id) {
         // Animación de error si hay algo puesto pero está mal
         const slots = document.querySelectorAll('.slot');
         slots[i].classList.add('incorrect');
         setTimeout(() => slots[i].classList.remove('incorrect'), 500);
      }
    }
  });

  render();
  if (isLevelComplete) {
    if (!biomasDone.includes(currentIdx)) biomasDone.push(currentIdx);
    document.getElementById('tt-emoji').textContent = bioma.icono;
    document.getElementById('tooltip-overlay').style.display = 'flex';
  }
}

function closeTooltip() {
  document.getElementById('tooltip-overlay').style.display = 'none';
  if (biomasDone.length === BIOMAS.length) {
    document.getElementById('juego-overlay-win').style.display = 'flex';
  } else {
    // Siguiente bioma
    let next = (currentIdx + 1) % BIOMAS.length;
    loadBiome(next);
  }
}

function resetGame() { startGame(); }