const WORDS = [
  { word: 'canción',   syllables: ['can','ción'],         tonic: 1, hasTilde: true,  category: 'aguda',     hint: 'AGUDA' },
  { word: 'árbol',     syllables: ['ár','bol'],             tonic: 0, hasTilde: true,  category: 'llana',     hint: 'LLANA' },
  { word: 'música',    syllables: ['mú','si','ca'],         tonic: 0, hasTilde: true,  category: 'esdrujula', hint: 'ESDRÚJULA' },
  { word: 'perro',     syllables: ['pe','rro'],             tonic: 0, hasTilde: false, category: 'sin-tilde', hint: 'SIN TILDE' },
  { word: 'mesa',      syllables: ['me','sa'],              tonic: 0, hasTilde: false, category: 'sin-tilde', hint: 'SIN TILDE' },
  { word: 'café',      syllables: ['ca','fé'],              tonic: 1, hasTilde: true,  category: 'aguda',     hint: 'AGUDA' },
  { word: 'teléfono',  syllables: ['te','lé','fo','no'],   tonic: 1, hasTilde: true,  category: 'esdrujula', hint: 'ESDRÚJULA' },
  { word: 'libro',     syllables: ['li','bro'],             tonic: 0, hasTilde: false, category: 'sin-tilde', hint: 'SIN TILDE' },
  { word: 'ciudad',    syllables: ['ciu','dad'],            tonic: 1, hasTilde: false, category: 'sin-tilde', hint: 'SIN TILDE' },
  { word: 'mamá',      syllables: ['ma','má'],              tonic: 1, hasTilde: true,  category: 'aguda',     hint: 'AGUDA' },
  { word: 'fácil',     syllables: ['fá','cil'],             tonic: 0, hasTilde: true,  category: 'llana',     hint: 'LLANA' },
  { word: 'médico',    syllables: ['mé','di','co'],         tonic: 0, hasTilde: true,  category: 'esdrujula', hint: 'ESDRÚJULA' },
  { word: 'animal',    syllables: ['a','ni','mal'],         tonic: 2, hasTilde: false, category: 'sin-tilde', hint: 'SIN TILDE' },
  { word: 'número',    syllables: ['nú','me','ro'],         tonic: 0, hasTilde: true,  category: 'esdrujula', hint: 'ESDRÚJULA' },
  { word: 'hotel',     syllables: ['ho','tel'],             tonic: 1, hasTilde: false, category: 'sin-tilde', hint: 'SIN TILDE' },
  { word: 'miércoles', syllables: ['miér','co','les'],      tonic: 0, hasTilde: true,  category: 'esdrujula', hint: 'ESDRÚJULA' },
  { word: 'hablar',    syllables: ['ha','blar'],            tonic: 1, hasTilde: false, category: 'sin-tilde', hint: 'SIN TILDE' },
  { word: 'jóvenes',   syllables: ['jó','ve','nes'],       tonic: 0, hasTilde: true,  category: 'esdrujula', hint: 'ESDRÚJULA' }
];

const QS = 10;
let state = {}, answering = false;
let token = null;

// Funciones globales necesarias para el HTML
window.showScreen = function(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
};

window.startGame = function() {
  const shuffled = [...WORDS].sort(() => Math.random() - 0.5).slice(0, QS);
  state = { words: shuffled, index: 0, hits: 0 };
  showScreen('game-screen');
  initDragEvents();
  loadWord();
};

function loadWord() {
  if (state.index >= QS) { endGame(); return; }
  const w = state.words[state.index];
  answering = false;
  resetToken();
  
  // Actualizar Barra de Progreso
  document.getElementById('current-q').textContent = state.index + 1;
  const fillPercentage = (state.index / QS) * 100;
  document.getElementById('progress-fill').style.width = fillPercentage + '%';

  const badge = document.getElementById('rule-badge');
  badge.textContent = w.hint;

  const display = document.getElementById('word-display');
  display.innerHTML = w.syllables.map(s => `<span>${strip(s)}</span>`).join('<span style="font-size:0.45em; color:rgba(144,224,239,0.4); margin: 0 10px;">·</span>');

  buildDropZones(w);
}

function buildDropZones(w) {
  const g = document.getElementById('drop-grid');
  g.innerHTML = '';
  w.syllables.forEach((s, i) => {
    const d = document.createElement('div');
    d.className = 'dropzone';
    d.setAttribute('data-index', i);
    d.textContent = strip(s);
    g.appendChild(d);
  });
  
  document.getElementById('no-tilde-zone').className = 'dropzone no-tilde-zone';
}

function strip(str) { return str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }

/* EVENTOS DE DRAG & DROP */
function initDragEvents() {
  token = document.getElementById('drag-token');
  if(!token) return; // Prevención de errores si no existe el token
  token.setAttribute('draggable', 'false');
  token.onpointerdown = handleDragStart;
  document.onpointermove = handleDragMove;
  document.onpointerup = handleDragEnd;
  document.onpointercancel = handleDragEnd;
}

let isDragging = false;

function handleDragStart(e) {
  if (answering) return;
  isDragging = true;
  token.classList.add('dragging');
  positionToken(e.clientX, e.clientY);
}

function handleDragMove(e) {
  if (!isDragging) return;
  positionToken(e.clientX, e.clientY);
  document.querySelectorAll('.dropzone').forEach(dz => dz.classList.remove('hover-target'));
  const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
  if (elemBelow && elemBelow.closest('.dropzone')) {
    elemBelow.closest('.dropzone').classList.add('hover-target');
  }
}

function handleDragEnd(e) {
  if (!isDragging) return;
  isDragging = false;
  token.classList.remove('dragging');
  document.querySelectorAll('.dropzone').forEach(dz => dz.classList.remove('hover-target'));

  const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
  const dropzone = elemBelow ? elemBelow.closest('.dropzone') : null;
  
  if (dropzone) {
    const index = parseInt(dropzone.getAttribute('data-index'));
    const rect = dropzone.getBoundingClientRect();
    token.style.position = 'fixed';
    token.style.left = (rect.left + rect.width / 2 - token.offsetWidth / 2) + 'px';
    token.style.top = (rect.top + rect.height / 2 - token.offsetHeight / 2) + 'px';
    handleAnswer(index);
  } else {
    resetToken();
  }
}

function positionToken(clientX, clientY) {
  token.style.left = (clientX - token.offsetWidth / 2) + 'px';
  token.style.top = (clientY - token.offsetHeight / 2) + 'px';
}

function resetToken() {
  if (!token) return;
  token.style.position = '';
  token.style.left = '';
  token.style.top = '';
  token.classList.remove('dragging');
}

/* RESPUESTA */
function handleAnswer(chosen) {
  answering = true;
  const w = state.words[state.index];
  const correct = w.hasTilde ? (chosen === w.tonic) : (chosen === -1);
  
  const chosenDz = document.querySelector(`.dropzone[data-index="${chosen}"]`);
  const correctIdx = w.hasTilde ? w.tonic : -1;
  const correctDz = document.querySelector(`.dropzone[data-index="${correctIdx}"]`);

  if (correct) {
    if(chosenDz) chosenDz.classList.add('correct');
    state.hits++;
  } else {
    if(chosenDz) chosenDz.classList.add('wrong');
    if(correctDz) correctDz.classList.add('correct');
    resetToken();
  }

  // Revelar la palabra correcta en la tarjeta
  const display = document.getElementById('word-display');
  display.innerHTML = w.syllables.map((s, i) => 
    `<span style="${i === w.tonic && w.hasTilde ? 'color:var(--green);' : 'color:rgba(255,255,255,0.9);'}">${s}</span>`
  ).join('<span style="font-size:0.45em; color:rgba(144,224,239,0.4); margin: 0 10px;">·</span>');

  setTimeout(() => { state.index++; loadWord(); }, 1400);
}

function endGame() {
  showScreen('over-screen');
  document.getElementById('final-hits').textContent = state.hits + '/' + QS;
}