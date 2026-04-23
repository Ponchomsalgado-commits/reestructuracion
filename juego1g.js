// ══════════════════════════════════════════
//  Datos — países con código ISO para flagcdn.com
// ══════════════════════════════════════════
const COUNTRIES = [
  {name:"México",         code:"mx"},
  {name:"España",         code:"es"},
  {name:"Francia",        code:"fr"},
  {name:"Alemania",       code:"de"},
  {name:"Italia",         code:"it"},
  {name:"Japón",          code:"jp"},
  {name:"Brasil",         code:"br"},
  {name:"Argentina",      code:"ar"},
  {name:"Estados Unidos", code:"us"},
  {name:"Canadá",         code:"ca"},
  {name:"China",          code:"cn"},
  {name:"Rusia",          code:"ru"},
  {name:"India",          code:"in"},
  {name:"Australia",      code:"au"},
  {name:"Sudáfrica",      code:"za"},
  {name:"Egipto",         code:"eg"},
  {name:"Nigeria",        code:"ng"},
  {name:"Corea del Sur",  code:"kr"},
  {name:"Colombia",       code:"co"},
  {name:"Chile",          code:"cl"},
  {name:"Perú",           code:"pe"},
  {name:"Venezuela",      code:"ve"},
  {name:"Cuba",           code:"cu"},
  {name:"Portugal",       code:"pt"},
  {name:"Grecia",         code:"gr"},
  {name:"Turquía",        code:"tr"},
  {name:"Arabia Saudita", code:"sa"},
  {name:"Suecia",         code:"se"},
  {name:"Noruega",        code:"no"},
  {name:"Países Bajos",   code:"nl"},
  {name:"Polonia",        code:"pl"},
  {name:"Ucrania",        code:"ua"},
  {name:"Tailandia",      code:"th"},
  {name:"Vietnam",        code:"vn"},
  {name:"Indonesia",      code:"id"},
  {name:"Filipinas",      code:"ph"},
  {name:"Marruecos",      code:"ma"},
  {name:"Kenya",          code:"ke"},
  {name:"Etiopía",        code:"et"},
  {name:"Israel",         code:"il"},
];

function flagUrl(code) {
  return `https://flagcdn.com/w160/${code}.png`;
}

// ══════════════════════════════════════════
//  Estado
// ══════════════════════════════════════════
const TOTAL = 10;
let mode     = 'name';
let score    = 0;
let streak   = 0;
let qIndex   = 0;
let answered = false;
let questions = [];

// ══════════════════════════════════════════
//  Utilidades
// ══════════════════════════════════════════
function shuffle(arr) {
  let a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ══════════════════════════════════════════
//  Modo de juego
// ══════════════════════════════════════════
function setMode(m) {
  mode = m;
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('btn-' + m).classList.add('active');
  restart();
}

// ══════════════════════════════════════════
//  Construir preguntas
// ══════════════════════════════════════════
function buildQuestions() {
  const pool = shuffle(COUNTRIES).slice(0, TOTAL);
  questions = pool.map(correct => {
    const wrong = shuffle(COUNTRIES.filter(c => c.code !== correct.code)).slice(0, 3);
    const opts  = shuffle([correct, ...wrong]);
    const qMode = mode === 'mix' ? (Math.random() > .5 ? 'name' : 'flag') : mode;
    return { correct, opts, qMode };
  });
}

// ══════════════════════════════════════════
//  Renderizar pregunta
// ══════════════════════════════════════════
function render() {
  answered = false;
  const q = questions[qIndex];

  document.getElementById('qnum').textContent  = (qIndex + 1) + '/' + TOTAL;
  document.getElementById('prog').style.width  = (qIndex / TOTAL * 100) + '%';
  document.getElementById('feedback').className    = 'feedback fb-hidden';
  document.getElementById('feedback').textContent  = '';

  const nextBtn = document.getElementById('next-btn');
  nextBtn.classList.remove('visible');
  nextBtn.textContent = qIndex >= TOTAL - 1 ? '¡Ver resultados! 🏁' : 'Siguiente ➜';

  document.getElementById('streak-banner').textContent =
    streak >= 3 ? '🔥 ¡Racha de ' + streak + '! +bonus' : '';

  const qImg   = document.getElementById('q-flag-img');
  const qText  = document.getElementById('q-text');
  const qLabel = document.getElementById('q-label');

  if (q.qMode === 'flag') {
    // Modo: ver bandera → elegir nombre del país
    qLabel.textContent  = '¿A qué país pertenece esta bandera?';
    qImg.src            = flagUrl(q.correct.code);
    qImg.alt            = 'Bandera desconocida';
    qImg.style.display  = 'block';
    qText.style.display = 'none';
  } else {
    // Modo: ver nombre → elegir bandera correcta (SIN nombre bajo las imágenes)
    qLabel.textContent  = '¿Cuál es la bandera de...';
    qText.textContent   = q.correct.name;
    qText.style.display = 'block';
    qImg.style.display  = 'none';
  }

  const container = document.getElementById('answers');
  container.innerHTML = '';

  q.opts.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'ans-btn';

    if (q.qMode === 'flag') {
      // Bandera → Nombre: solo el nombre del país
      btn.innerHTML = `<span class="country-name">${opt.name}</span>`;
    } else {
      // Nombre → Bandera: solo la imagen, sin nombre debajo
      btn.innerHTML = `
        <img src="${flagUrl(opt.code)}" alt="Opción ${idx + 1}" loading="lazy">
      `;
    }

    btn.addEventListener('click', () => pick(btn, opt, q));
    container.appendChild(btn);
  });
}

// ══════════════════════════════════════════
//  Responder
// ══════════════════════════════════════════
function pick(btn, chosen, q) {
  if (answered) return;
  answered = true;

  const isCorrect = chosen.code === q.correct.code;
  const fb = document.getElementById('feedback');
  document.querySelectorAll('.ans-btn').forEach(b => { b.disabled = true; });

  if (isCorrect) {
    streak++;
    const bonus = streak >= 3 ? 15 : 10;
    score += bonus;
    btn.classList.add('correct');
    fb.className    = 'feedback fb-correct';
    fb.textContent  = streak >= 3
      ? `🎉 ¡Correcto! +${bonus} puntos (racha ×${streak}!)`
      : '✅ ¡Correcto! +10 puntos';
    spawnParticles(btn);
  } else {
    streak = 0;
    btn.classList.add('wrong');
    fb.className   = 'feedback fb-wrong';
    fb.textContent = `❌ Era ${q.correct.name}`;

    // Revelar la opción correcta
    document.querySelectorAll('.ans-btn').forEach(b => {
      const nameEl = b.querySelector('.country-name');
      const imgEl  = b.querySelector('img');
      if (q.qMode === 'flag') {
        if (nameEl && nameEl.textContent === q.correct.name) b.classList.add('reveal');
      } else {
        if (imgEl && imgEl.src.includes('/' + q.correct.code + '.')) b.classList.add('reveal');
      }
    });
  }

  document.getElementById('pts').textContent        = score;
  document.getElementById('streak-num').textContent = streak;
  const sp = document.getElementById('streak-pill');
  streak >= 3 ? sp.classList.add('hot') : sp.classList.remove('hot');
  document.getElementById('streak-banner').textContent =
    streak >= 3 ? '🔥 ¡Racha de ' + streak + '! +bonus' : '';

  document.getElementById('next-btn').classList.add('visible');
}

// ══════════════════════════════════════════
//  Partículas de confeti
// ══════════════════════════════════════════
function spawnParticles(btn) {
  const colors = [
    'var(--yellow)', 'var(--blue-mid)', 'var(--green)',
    'var(--blue-dark)', 'var(--yellow-dark)'
  ];
  const rect = btn.getBoundingClientRect();
  for (let i = 0; i < 8; i++) {
    const p       = document.createElement('div');
    p.className   = 'particle';
    p.style.left  = (rect.left + rect.width  / 2 + (Math.random() - .5) * 60) + 'px';
    p.style.top   = (rect.top  + rect.height / 2) + 'px';
    p.style.background    = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDelay = (Math.random() * 0.2) + 's';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1200);
  }
}

// ══════════════════════════════════════════
//  Siguiente pregunta
// ══════════════════════════════════════════
function nextQ() {
  qIndex++;
  if (qIndex >= TOTAL) {
    showEnd();
  } else {
    render();
  }
}

// ══════════════════════════════════════════
//  Pantalla de fin (.juego-overlay)
// ══════════════════════════════════════════
function showEnd() {
  document.getElementById('question-card').style.display = 'none';
  document.getElementById('answers').closest('div').style.display = 'none';
  document.getElementById('next-btn').classList.remove('visible');
  document.getElementById('prog').style.width = '100%';

  const max = TOTAL * 15;
  const pct = score / max;
  let emoji = '🌱', title = '¡Apenas empezando!', msg = 'La práctica hace al maestro.';
  if      (pct >= .9) { emoji='🏆'; title='¡Eres un experto!';   msg='Nivel: Embajador Mundial 🌍'; }
  else if (pct >= .7) { emoji='🌟'; title='¡Muy bien!';          msg='¡Casi perfecto! Sigue así.'; }
  else if (pct >= .5) { emoji='👍'; title='¡Buen intento!';      msg='Estás aprendiendo rápido.'; }
  else if (pct >= .3) { emoji='📚'; title='¡Sigue estudiando!';  msg='Cada quiz te hace mejor.'; }

  document.getElementById('end-emoji').textContent = emoji;
  document.getElementById('end-title').textContent = title;
  document.getElementById('end-msg').textContent   = msg;
  document.getElementById('end-score').innerHTML   = `${score} <span>/ ${max}</span>`;

  document.getElementById('end-screen').classList.add('visible');
}

// ══════════════════════════════════════════
//  Reiniciar
// ══════════════════════════════════════════
function restart() {
  score = 0; streak = 0; qIndex = 0; answered = false;
  document.getElementById('pts').textContent        = '0';
  document.getElementById('streak-num').textContent = '0';
  document.getElementById('streak-pill').classList.remove('hot');
  document.getElementById('end-screen').classList.remove('visible');
  document.getElementById('question-card').style.display = '';
  document.getElementById('answers').closest('div').style.display = '';
  buildQuestions();
  render();
}

// ══════════════════════════════════════════
//  Atajos de teclado (1–4)
// ══════════════════════════════════════════
document.addEventListener('keydown', (e) => {
  const num = parseInt(e.key);
  if (num >= 1 && num <= 4) {
    const btns = document.querySelectorAll('.ans-btn:not(:disabled)');
    if (btns[num - 1]) btns[num - 1].click();
  }
});

// ══════════════════════════════════════════
//  Arranque
// ══════════════════════════════════════════
buildQuestions();
render();