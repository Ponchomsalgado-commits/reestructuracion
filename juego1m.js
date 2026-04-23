/* ══════════════════════════════════════════════════
   juego1m.js — Rana Saltarina (Matemáticas)
   InkluEdu · Juego 1 de Matemáticas
   ══════════════════════════════════════════════════ */

'use strict';

/* ── Niveles ── */
const LEVELS = [
  { op: () => { const a=rnd(2,9),  b=rnd(1,6);  return { q:`${a} + ${b}`,    ans: a+b    }; } },
  { op: () => { const a=rnd(6,15), b=rnd(1,a-1);return { q:`${a} - ${b}`,    ans: a-b    }; } },
  { op: () => { const a=rnd(2,5),  b=rnd(2,4);  return { q:`${a} × ${b}`,    ans: a*b    }; } },
  { op: () => { const b=rnd(2,4),  ans=rnd(2,6);return { q:`${b*ans} ÷ ${b}`,ans         }; } },
  { op: () => { const a=rnd(3,9),  b=rnd(1,a-1);return { q:`${a*a} − ${b*b}`,ans:a*a-b*b}; } },
];

/* ── Colores de hojas (usando variables InkluEdu donde sea posible) ── */
const LEAF_COLORS = ['#27b060', '#1e9e52', '#2d9e5a'];

/* ── Estado global ── */
let level   = 0;
let score   = 0;
let busy    = false;
let leafEls = [];    // referencias a los 3 nodos .leaf actuales

/* ── Referencias al DOM ── */
const arena      = document.getElementById('juego-area');
const frogEl     = document.getElementById('frog');
const opEl       = document.getElementById('op-bubble');
const overlayEl  = document.getElementById('juego-overlay');
const inicioEl   = document.getElementById('pantalla-inicio');
const lvlTxt     = document.getElementById('lvl-txt');
const scoreTxt   = document.getElementById('score-txt');

/* ══ Utilidades ══ */
function rnd(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function leafSVG(col) {
  return `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="32" rx="46" ry="26" fill="${col}" opacity="0.97"/>
    <ellipse cx="50" cy="30" rx="42" ry="22" fill="${col}"/>
    <line x1="50" y1="10" x2="50" y2="54" stroke="rgba(0,0,0,0.18)" stroke-width="1.5"/>
    <line x1="50" y1="30" x2="22" y2="20" stroke="rgba(0,0,0,0.12)" stroke-width="1"/>
    <line x1="50" y1="30" x2="78" y2="20" stroke="rgba(0,0,0,0.12)" stroke-width="1"/>
  </svg>`;
}

function makeWrongAnswers(ans, count = 2) {
  const wrongs = new Set();
  let tries = 0;
  while (wrongs.size < count && tries < 100) {
    tries++;
    let v = ans + rnd(-6, 6);
    if (v !== ans && v >= 0 && !wrongs.has(v)) wrongs.add(v);
  }
  return [...wrongs];
}

/* ══ Limpiar hojas, splashes y mensajes del arena ══ */
function clearLeaves() {
  document.querySelectorAll('.leaf, .splash, .msg-ok').forEach(el => el.remove());
  leafEls = [];
}

/* ══ Posicionar la rana ══ */
function placeFrog(x, y, animated = true) {
  frogEl.style.transition = animated
    ? 'left 0.5s cubic-bezier(.4,2,.6,1), top 0.5s cubic-bezier(.4,2,.6,1)'
    : 'none';
  frogEl.style.left = x + 'px';
  frogEl.style.top  = y + 'px';
}

/* ══ Actualizar HUD ══ */
function updateHUD() {
  lvlTxt.textContent  = 'Nivel ' + (level + 1);
  scoreTxt.textContent = 'Puntos: ' + score;
}

/* ══ Marcar estrella ══ */
function earnStar(idx) {
  const star = document.getElementById('s' + (idx + 1));
  if (star) star.classList.add('earned');
}

/* ══ Mensaje flotante ══ */
function showMsg(text, isError) {
  const el = document.createElement('div');
  el.className = 'msg-ok' + (isError ? ' msg-err' : '');
  el.textContent = text;
  arena.appendChild(el);
}

/* ══ Iniciar / reiniciar juego ══ */
function startGame() {
  level = 0;
  score = 0;
  busy  = false;
  updateHUD();

  // Ocultar overlays
  inicioEl.style.display  = 'none';
  overlayEl.style.display = 'none';

  // Resetear estrellas
  document.querySelectorAll('.star').forEach(s => s.classList.remove('earned'));

  showLevel();
}

/* ══ Mostrar un nivel ══ */
function showLevel() {
  if (level >= 5) { showWin(); return; }

  clearLeaves();
  busy = false;
  updateHUD();

  const data    = LEVELS[level].op();
  opEl.textContent = `¿Cuánto es ${data.q}?`;

  const wrongs  = makeWrongAnswers(data.ans, 2);
  const options = [
    { val: data.ans,  correct: true  },
    { val: wrongs[0], correct: false },
    { val: wrongs[1], correct: false },
  ].sort(() => Math.random() - 0.5);

  const W = arena.offsetWidth  || 420;
  const H = arena.offsetHeight || 380;

  const positions = [
    { x: W * 0.15, y: H * 0.55 },
    { x: W * 0.46, y: H * 0.72 },
    { x: W * 0.73, y: H * 0.52 },
  ].sort(() => Math.random() - 0.5);

  options.forEach((opt, i) => {
    const leaf = document.createElement('div');
    leaf.className = 'leaf bounce-in';
    leaf.style.left = (positions[i].x - 50) + 'px';
    leaf.style.top  = (positions[i].y - 30) + 'px';
    leaf.innerHTML  = leafSVG(LEAF_COLORS[i]);

    const num = document.createElement('div');
    num.className   = 'leaf-num';
    num.textContent = opt.val;
    leaf.appendChild(num);

    // Click / tap
    leaf.addEventListener('click', () => onLeafClick(leaf, opt, positions[i]));

    arena.appendChild(leaf);
    leafEls.push(leaf);
  });

  // Rana vuelve a posición inicial
  placeFrog(W * 0.5 - 18, H * 0.18, false);
}

/* ══ Lógica al elegir una hoja ══ */
function onLeafClick(leaf, opt, pos) {
  if (busy) return;
  busy = true;

  placeFrog(pos.x - 18, pos.y - 48, true);

  setTimeout(() => {
    if (opt.correct) {
      score += 10;
      updateHUD();
      earnStar(level);
      showMsg('¡Correcto! +10 🎉', false);
      setTimeout(() => {
        level++;
        showLevel();
      }, 1100);
    } else {
      // Hoja incorrecta se hunde
      leaf.classList.add('sink');
      showMsg('¡Ups! Inténtalo de nuevo 😅', true);

      // Splash
      const splashEl = document.createElement('div');
      splashEl.className    = 'splash';
      splashEl.style.left   = (pos.x - 20) + 'px';
      splashEl.style.top    = pos.y + 'px';
      splashEl.textContent  = '💧';
      arena.appendChild(splashEl);

      setTimeout(() => {
        const W = arena.offsetWidth  || 420;
        const H = arena.offsetHeight || 380;
        placeFrog(W * 0.5 - 18, H * 0.18, true);
        setTimeout(() => showLevel(), 600);
      }, 900);
    }
  }, 520);
}

/* ══ Overlay de victoria ══ */
function showWin() {
  document.getElementById('overlay-emoji').textContent  = '🏆';
  document.getElementById('overlay-titulo').textContent = '¡Ganaste!';
  document.getElementById('overlay-msg').textContent    =
    `Completaste los 5 niveles con ${score} puntos. ¡Excelente trabajo!`;
  overlayEl.style.display = 'flex';
}

/* ══ Teclado (teclas 1-2-3 eligen hoja) ══ */
document.addEventListener('keydown', (e) => {
  const idx = ['1','2','3'].indexOf(e.key);
  if (idx !== -1 && leafEls[idx] && !busy) {
    leafEls[idx].click();
  }
});