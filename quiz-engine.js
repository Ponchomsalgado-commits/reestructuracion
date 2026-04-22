/* =====================================================
   quiz-engine.js — Motor compartido para todos los quiz
   InkluEdu · Mobile-First

   USO: cada JS de materia llama a `iniciarQuiz(preguntas)`
   al final del archivo, después de definir su banco.
   ===================================================== */

// Circunferencia del SVG (r=42, viewBox 100x100)
const CIRCUNFERENCIA = 263.9;

/* ── Estado ── */
let _preguntas     = [];
let _indice        = 0;
let _correctas     = 0;
let _respondidas   = 0;
let _bloqueado     = false;   // evita doble-click mientras hay feedback

/* ── Referencias DOM (se obtienen una vez al arrancar) ── */
let _elPregunta, _elOpciones, _elResultado, _elProgreso,
    _elNumActual, _elNumTotal, _elPorcentaje, _elAvance,
    _btnSiguiente, _btnSaltar, _btnReiniciar;

/* ── Entrada pública ─────────────────────────────────── */

/**
 * Iniciar el quiz con un banco de preguntas.
 * @param {Array} preguntas  Array de objetos { texto, opciones, correcta }
 */
function iniciarQuiz(preguntas) {
  _preguntas = preguntas.slice(); // copia para no mutar el original

  // Obtener referencias al DOM
  _elPregunta   = document.getElementById('pregunta');
  _elOpciones   = document.getElementById('opciones');
  _elResultado  = document.getElementById('resultado');
  _elProgreso   = document.getElementById('progreso');
  _elNumActual  = document.getElementById('numActual');
  _elNumTotal   = document.getElementById('numTotal');
  _elPorcentaje = document.getElementById('progreso-porcentaje');
  _elAvance     = document.querySelector('.avance');
  _btnSiguiente = document.getElementById('btnSiguiente');
  _btnSaltar    = document.getElementById('btnSaltar');
  _btnReiniciar = document.getElementById('btnReiniciar');

  // Asignar el reinicio al botón del HTML
  _btnReiniciar.onclick = reiniciarQuiz;

  _resetEstado();
  _mostrarPregunta();
}

/* ── Funciones públicas (llamadas desde botones HTML) ── */

function siguientePregunta() {
  _indice++;
  if (_indice >= _preguntas.length) {
    _mostrarResultadoFinal();
  } else {
    _mostrarPregunta();
  }
}

function saltarPregunta() {
  _respondidas++;
  _indice++;
  if (_indice >= _preguntas.length) {
    _mostrarResultadoFinal();
  } else {
    _mostrarPregunta();
  }
}

function reiniciarQuiz() {
  _resetEstado();
  _mostrarPregunta();
}

/* ── Funciones internas ──────────────────────────────── */

function _resetEstado() {
  _indice      = 0;
  _correctas   = 0;
  _respondidos = 0;
  _bloqueado   = false;

  _elResultado.textContent  = '';
  _elResultado.style.color  = '';
  _btnSiguiente.style.display = 'none';
  _btnSaltar.style.display    = 'block';
  _btnReiniciar.style.display = 'none';

  _actualizarProgreso(0, _preguntas.length, 0);
}

function _mostrarPregunta() {
  _bloqueado = false;
  const p = _preguntas[_indice];

  _elPregunta.textContent = p.texto;
  _elOpciones.innerHTML   = '';
  _elResultado.textContent = '';

  _btnSiguiente.style.display = 'none';
  _btnSaltar.style.display    = 'block';

  _actualizarProgreso(_indice, _preguntas.length, _correctas);

  // Crear botones de opciones
  p.opciones.forEach((texto, i) => {
    const btn = document.createElement('button');
    btn.className   = 'opcion';
    btn.textContent = texto;
    btn.onclick     = () => _responder(btn, i, p.correcta);
    _elOpciones.appendChild(btn);
  });
}

function _responder(btnElegido, indiceElegido, indiceCorrector) {
  if (_bloqueado) return;
  _bloqueado  = true;
  _respondidos++;

  const opciones = _elOpciones.querySelectorAll('.opcion');
  const esCorrecta = indiceElegido === indiceCorrector;

  // Colorear todas las opciones
  opciones.forEach((btn, i) => {
    btn.disabled = true;
    if (i === indiceCorrector) {
      btn.style.backgroundColor = '#06d6a0';
      btn.style.color = '#fff';
    } else if (i === indiceElegido && !esCorrecta) {
      btn.style.backgroundColor = '#ef476f';
      btn.style.color = '#fff';
    }
  });

  if (esCorrecta) {
    _correctas++;
    _elResultado.textContent = '✅ ¡Correcto!';
    _elResultado.style.color = '#049e78';
    // Animación de rebote en el botón correcto
    btnElegido.style.animation = 'opcionCorrecta 0.45s ease forwards';
  } else {
    _elResultado.textContent = '❌ Incorrecto. La respuesta era: ' + _preguntas[_indice].opciones[indiceCorrector];
    _elResultado.style.color = '#d9534f';
    btnElegido.style.animation = 'opcionIncorrecta 0.45s ease forwards';
  }

  _actualizarProgreso(_indice + 1, _preguntas.length, _correctas);

  // Mostrar botón siguiente o reiniciar
  if (_indice + 1 >= _preguntas.length) {
    setTimeout(_mostrarResultadoFinal, 900);
  } else {
    _btnSaltar.style.display    = 'none';
    _btnSiguiente.style.display = 'block';
  }
}

function _mostrarResultadoFinal() {
  const pct = Math.round((_correctas / _preguntas.length) * 100);

  _elPregunta.textContent  = '¡Quiz terminado! 🎉';
  _elOpciones.innerHTML    = '';
  _elResultado.textContent = `Obtuviste ${_correctas} de ${_preguntas.length} correctas (${pct}%)`;
  _elResultado.style.color = pct >= 60 ? '#049e78' : '#d9534f';

  _btnSiguiente.style.display = 'none';
  _btnSaltar.style.display    = 'none';
  _btnReiniciar.style.display = 'block';

  _actualizarProgreso(_preguntas.length, _preguntas.length, _correctas);
}

function _actualizarProgreso(actual, total, correctas) {
  const pct = total > 0 ? Math.round((actual / total) * 100) : 0;

  // Barra lineal
  const barraFill = document.getElementById('progreso');
  if (barraFill) barraFill.style.width = pct + '%';

  // Contador de preguntas
  if (_elNumActual) _elNumActual.textContent = actual;
  if (_elNumTotal)  _elNumTotal.textContent  = total;

  // Círculo SVG
  if (_elAvance) {
    const offset = CIRCUNFERENCIA - (pct / 100) * CIRCUNFERENCIA;
    _elAvance.style.strokeDashoffset = offset;
  }

  // Texto de porcentaje
  if (_elPorcentaje) _elPorcentaje.textContent = pct + '%';
}
