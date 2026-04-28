'use strict';

const BIOMAS = [
  { 
    id:'bosque', nombre:'Bosque', icono:'🌳', subtitulo:'Del sol al búho: cada eslabón importa',
    organismos:[
      {id:'sol', emoji:'☀️', nombre:'Sol', rol:'Energía'},
      {id:'planta', emoji:'🌿', nombre:'Planta', rol:'Productor'},
      {id:'grillo', emoji:'🦗', nombre:'Grillo', rol:'Consumidor 1°'},
      {id:'rana', emoji:'🐸', nombre:'Rana', rol:'Consumidor 2°'},
      {id:'buho', emoji:'🦉', nombre:'Búho', rol:'Superdepredador'}
    ]
  },
  { 
    id:'oceano', nombre:'Océano', icono:'🌊', subtitulo:'El mar profundo empieza con luz',
    organismos:[
      {id:'sol_o', emoji:'☀️', nombre:'Sol', rol:'Energía'},
      {id:'alga', emoji:'🌱', nombre:'Alga', rol:'Productor'},
      {id:'pez_c', emoji:'🐠', nombre:'Pez Pequeño', rol:'Consumidor 1°'}, /* 👇 ¡Cambiado a pez tropical! 👇 */
      {id:'atun', emoji:'🐟', nombre:'Atún', rol:'Consumidor 2°'},
      {id:'tiburon', emoji:'🦈', nombre:'Tiburón', rol:'Superdepredador'}
    ]
  },
  { 
    id:'desierto', nombre:'Desierto', icono:'🌵', subtitulo:'Vida extrema bajo el sol',
    organismos:[
      {id:'sol_d', emoji:'☀️', nombre:'Sol', rol:'Energía'},
      {id:'cactus', emoji:'🌵', nombre:'Cactus', rol:'Productor'},
      {id:'escarabajo', emoji:'🪲', nombre:'Escarabajo', rol:'Consumidor 1°'},
      {id:'lagarto', emoji:'🦎', nombre:'Lagartija', rol:'Consumidor 2°'},
      {id:'halcon', emoji:'🦅', nombre:'Halcón', rol:'Superdepredador'}
    ]
  },
  { 
    id:'sabana', nombre:'Sabana', icono:'🦁', subtitulo:'La gran llanura africana',
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

const trayEl = document.getElementById('tray');
const chainRowEl = document.getElementById('chain-row');
const navEl = document.getElementById('biome-nav');
const overlayWin = document.getElementById('juego-overlay-win');
const tooltipEl = document.getElementById('tooltip-overlay');
const startEl = document.getElementById('pantalla-inicio');
const subtitleEl = document.getElementById('biome-subtitle');

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function startGame() {
  startEl.style.display = 'none';
  overlayWin.style.display = 'none';
  biomasDone = [];
  buildNav();
  loadBiome(0);
}

function resetGame() {
  startGame();
}

function buildNav() {
  navEl.innerHTML = BIOMAS.map((b, i) => `
    <span class="biome-chip ${biomasDone.includes(i) ? 'done' : ''} ${i === currentIdx ? 'active' : ''}" id="chip-${i}">
      ${b.icono} ${b.nombre}
    </span>
  `).join('');
}

function loadBiome(idx) {
  currentIdx = idx;
  const bioma = BIOMAS[idx];
  placedIds = new Array(5).fill(null);
  lockedSlots = new Array(5).fill(false);
  trayIds = shuffle(bioma.organismos.map(o => o.id));
  
  subtitleEl.textContent = bioma.subtitulo;
  buildNav();
  render();
}

function render() {
  trayEl.innerHTML = trayIds.map(id => cardHTML(id)).join('');
  
  chainRowEl.innerHTML = new Array(5).fill(0).map((_, i) => `
    <div class="slot ${lockedSlots[i] ? 'correct' : ''}" ondragover="onDragOver(event)" ondrop="onDropSlot(event, ${i})">
      ${placedIds[i] ? cardHTML(placedIds[i], lockedSlots[i]) : '<span style="opacity:0.2; font-size:1.5rem; color: var(--azul-claro);">?</span>'}
      ${lockedSlots[i] ? `<div class="slot-role">${BIOMAS[currentIdx].organismos[i].rol}</div>` : ''}
    </div>
    ${i < 4 ? '<div style="display:flex; align-items:center; color: var(--azul-claro); font-weight:bold; font-size:1.5rem; margin: 0 2px;">→</div>' : ''}
  `).join('');

  const errorMsgEl = document.getElementById('error-msg');
  if(errorMsgEl) errorMsgEl.style.display = 'none';
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

function onDragStart(e, id) { draggedId = id; }
function onDragOver(e) { e.preventDefault(); }

function onDropSlot(e, idx) {
  if (lockedSlots[idx]) return;

  const originIdx = placedIds.indexOf(draggedId); 
  const itemInDest = placedIds[idx]; 

  if (originIdx !== -1) {
    placedIds[originIdx] = itemInDest;
    placedIds[idx] = draggedId;
  } else {
    if (itemInDest) {
      trayIds.push(itemInDest);
    }
    placedIds[idx] = draggedId;
    trayIds = trayIds.filter(id => id !== draggedId);
  }
  
  render();
}

function onDropTray(e) {
  const findIdx = placedIds.indexOf(draggedId);
  if (findIdx !== -1 && !lockedSlots[findIdx]) {
    placedIds[findIdx] = null;
    trayIds.push(draggedId);
  }
  render();
}

function validateChain() {
  const bioma = BIOMAS[currentIdx];
  let complete = true;
  let hasErrors = false;
  let hasMissing = false;
  
  placedIds.forEach((id, i) => {
    if (id === bioma.organismos[i].id) {
      lockedSlots[i] = true;
    } else {
      complete = false;
      if (id) {
        hasErrors = true;
      } else {
        hasMissing = true;
      }
    }
  });
  
  render();
  
  if (complete) {
    if (!biomasDone.includes(currentIdx)) biomasDone.push(currentIdx);
    buildNav();
    setTimeout(showTooltip, 300);
  } else {
    const errorMsgEl = document.getElementById('error-msg');
    const slots = document.querySelectorAll('.slot');
    
    if (hasErrors) {
      placedIds.forEach((id, i) => {
        if (id && id !== bioma.organismos[i].id && !lockedSlots[i]) {
          slots[i].classList.add('incorrect');
        }
      });
      errorMsgEl.textContent = "¡Ups! Revisa los cuadros rojos.";
      errorMsgEl.style.display = 'block';
    } 
    else if (hasMissing) {
      errorMsgEl.textContent = "¡Te faltan organismos por colocar!";
      errorMsgEl.style.display = 'block';
    }
  }
}

function showTooltip() {
  tooltipEl.style.display = 'flex';
  document.getElementById('tt-emoji').textContent = BIOMAS[currentIdx].icono;
}

function closeTooltip() {
  tooltipEl.style.display = 'none';
  if (biomasDone.length === BIOMAS.length) {
    overlayWin.style.display = 'flex';
  } else {
    let next = (currentIdx + 1) % BIOMAS.length;
    while (biomasDone.includes(next)) { 
        next = (next + 1) % BIOMAS.length; 
    }
    loadBiome(next);
  }
}