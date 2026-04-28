/* ══════════════════════════════════════════════════════════
   juego1h.js  ·  InkluEdu — Exploradores del Tiempo
   Juego 1 de Historia  |  22 preguntas
   Imágenes: Wikimedia Commons (dominio público / CC)
   ══════════════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────
   BANCO DE PREGUNTAS
   tipo: 'fecha'     → 3 opciones de año/fecha
   tipo: 'monumento' → 4 opciones de nombre
────────────────────────────────────────── */
const PREGUNTAS = [

  /* ════════ FECHAS ════════ */
  {
    tipo: 'fecha',
    pregunta: '¿En qué año fue inaugurada la Torre Eiffel en París?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Tour_Eiffel_Wikimedia_Commons.jpg/600px-Tour_Eiffel_Wikimedia_Commons.jpg',
    caption: 'Torre Eiffel — París, Francia',
    opciones: ['1889', '1901', '1875'],
    correcta: '1889',
  },
  {
    tipo: 'fecha',
    pregunta: '¿En qué año llegó Cristóbal Colón a América por primera vez?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Portrait_of_a_Man%2C_Said_to_be_Christopher_Columbus.jpg/600px-Portrait_of_a_Man%2C_Said_to_be_Christopher_Columbus.jpg',
    caption: 'Retrato atribuido a Cristóbal Colón (s. XVI)',
    opciones: ['1492', '1510', '1488'],
    correcta: '1492',
  },
  {
    tipo: 'fecha',
    pregunta: '¿En qué año comenzó la unificación de la Gran Muralla China bajo la dinastía Qin?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/20090529-great-wall.jpg/600px-20090529-great-wall.jpg',
    caption: 'Gran Muralla China — Patrimonio de la Humanidad',
    opciones: ['221 a.C.', '500 d.C.', '1000 d.C.'],
    correcta: '221 a.C.',
  },
  {
    tipo: 'fecha',
    pregunta: '¿En qué año cayó el Imperio Romano de Occidente?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg/600px-Colosseum_in_Rome%2C_Italy_-_April_2007.jpg',
    caption: 'Coliseo Romano — símbolo del Imperio',
    opciones: ['376 d.C.', '476 d.C.', '590 d.C.'],
    correcta: '476 d.C.',
  },
  {
    tipo: 'fecha',
    pregunta: '¿En qué año estalló la Revolución Francesa con la toma de la Bastilla?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Anonymous_-_Prise_de_la_Bastille.jpg/600px-Anonymous_-_Prise_de_la_Bastille.jpg',
    caption: 'La toma de la Bastilla — 14 de julio de 1789',
    opciones: ['1776', '1789', '1804'],
    correcta: '1789',
  },
  {
    tipo: 'fecha',
    pregunta: '¿En qué año se firmó la Declaración de Independencia de los Estados Unidos?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Declaration_of_Independence_%281823%29_by_William_Stone.jpg/600px-Declaration_of_Independence_%281823%29_by_William_Stone.jpg',
    caption: 'Declaración de Independencia de EE.UU.',
    opciones: ['1776', '1789', '1812'],
    correcta: '1776',
  },
  {
    tipo: 'fecha',
    pregunta: '¿En qué año terminó la Segunda Guerra Mundial con la rendición de Alemania y Japón?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/No-nb_bldsa_5c019.jpg/600px-No-nb_bldsa_5c019.jpg',
    caption: 'Celebraciones del fin de la Segunda Guerra Mundial',
    opciones: ['1943', '1945', '1948'],
    correcta: '1945',
  },
  {
    tipo: 'fecha',
    pregunta: '¿En qué año pisó el ser humano la Luna por primera vez con la misión Apolo 11?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Aldrin_Apollo_11_original.jpg/600px-Aldrin_Apollo_11_original.jpg',
    caption: 'Buzz Aldrin en la superficie lunar — Apolo 11',
    opciones: ['1965', '1969', '1972'],
    correcta: '1969',
  },
  {
    tipo: 'fecha',
    pregunta: '¿En qué año se inició la construcción de la Gran Pirámide de Giza?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/600px-Kheops-Pyramid.jpg',
    caption: 'Pirámide de Keops — Giza, Egipto',
    opciones: ['2560 a.C.', '1200 a.C.', '500 a.C.'],
    correcta: '2560 a.C.',
  },
  {
    tipo: 'fecha',
    pregunta: '¿En qué año Napoleón Bonaparte fue coronado Emperador de los Franceses?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg/600px-Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg',
    caption: 'Napoleón Bonaparte — pintado por Jacques-Louis David',
    opciones: ['1799', '1804', '1812'],
    correcta: '1804',
  },
  {
    tipo: 'fecha',
    pregunta: '¿En qué año se consumó la Independencia de México?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/El_Coloso_de_la_Independencia.jpg/600px-El_Coloso_de_la_Independencia.jpg',
    caption: 'Ángel de la Independencia — Ciudad de México',
    opciones: ['1810', '1821', '1836'],
    correcta: '1821',
  },
  {
    tipo: 'fecha',
    pregunta: '¿En qué año cayó el Muro de Berlín, que dividía Alemania Oriental y Occidental?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/West_and_East_Germans_at_the_Berlin_Wall_1989.jpg/600px-West_and_East_Germans_at_the_Berlin_Wall_1989.jpg',
    caption: 'Ciudadanos en el Muro de Berlín — noviembre de 1989',
    opciones: ['1985', '1989', '1993'],
    correcta: '1989',
  },

  /* ════════ MONUMENTOS ════════ */
  {
    tipo: 'monumento',
    pregunta: '¿Cómo se llama esta pirámide escalonada maya, sede del famoso "efecto de serpiente"?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Chichen_Itza_3.jpg/600px-Chichen_Itza_3.jpg',
    caption: '¿Reconoces esta pirámide en la Península de Yucatán?',
    opciones: ['Machu Picchu', 'Chichén Itzá', 'Teotihuacán', 'Monte Albán'],
    correcta: 'Chichén Itzá',
  },
  {
    tipo: 'monumento',
    pregunta: '¿Cuál es el nombre de este imponente anfiteatro elíptico construido en Roma?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg/600px-Colosseum_in_Rome%2C_Italy_-_April_2007.jpg',
    caption: '¿Cuál es el nombre de este anfiteatro en Roma?',
    opciones: ['Panteón de Roma', 'Foro Romano', 'Coliseo Romano', 'Termas de Caracalla'],
    correcta: 'Coliseo Romano',
  },
  {
    tipo: 'monumento',
    pregunta: '¿Cómo se llama esta ciudadela inca construida a 2 430 metros sobre el nivel del mar en Perú?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Machu_Picchu%2C_Peru.jpg/600px-Machu_Picchu%2C_Peru.jpg',
    caption: '¿Sabes cómo se llama esta ciudad en las nubes?',
    opciones: ['Chichén Itzá', 'Tiwanaku', 'Machu Picchu', 'Chan Chan'],
    correcta: 'Machu Picchu',
  },
  {
    tipo: 'monumento',
    pregunta: '¿Cuál es el nombre de esta pirámide egipcia, la más alta del mundo antiguo?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/600px-Kheops-Pyramid.jpg',
    caption: '¿Cómo se llama esta pirámide en Giza?',
    opciones: ['Pirámide de Kefrén', 'Pirámide de Keops', 'Pirámide de Micerino', 'Pirámide de Saqqara'],
    correcta: 'Pirámide de Keops',
  },
  {
    tipo: 'monumento',
    pregunta: '¿Cómo se llama este famoso palacio-fortaleza árabe en Granada, España?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Alhambra_evening_panorama_Mirador_San_Nicolas_sRGB-1.jpg/600px-Alhambra_evening_panorama_Mirador_San_Nicolas_sRGB-1.jpg',
    caption: '¿Reconoces este palacio nazarí en Andalucía?',
    opciones: ['Alcázar de Sevilla', 'La Alhambra', 'Mezquita de Córdoba', 'El Escorial'],
    correcta: 'La Alhambra',
  },
  {
    tipo: 'monumento',
    pregunta: '¿Cuál es el nombre de este templo griego construido en honor a la diosa Atenea?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/The_Parthenon_in_Athens.jpg/600px-The_Parthenon_in_Athens.jpg',
    caption: '¿Cómo se llama este templo en la Acrópolis de Atenas?',
    opciones: ['Erecteión', 'Partenón', 'Templo de Zeus Olímpico', 'Hefestión'],
    correcta: 'Partenón',
  },
  {
    tipo: 'monumento',
    pregunta: '¿Cómo se llama el mausoleo de mármol blanco construido en India por el Shah Jahan en memoria de su esposa?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/600px-Taj_Mahal_%28Edited%29.jpeg',
    caption: '¿Reconoces este mausoleo en Agra, India?',
    opciones: ['Palacio de Fatehpur Sikri', 'Templo Dorado', 'Taj Mahal', 'Fuerte Rojo'],
    correcta: 'Taj Mahal',
  },
  {
    tipo: 'monumento',
    pregunta: '¿Cuál es el nombre de esta estatua que fue obsequio de Francia a los Estados Unidos?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Statue_of_Liberty_7.jpg/600px-Statue_of_Liberty_7.jpg',
    caption: '¿Cómo se llama esta escultura en Nueva York?',
    opciones: ['Estatua de la Libertad', 'El Pensador', 'Cristo Redentor', 'La Victoria de Samotracia'],
    correcta: 'Estatua de la Libertad',
  },
  {
    tipo: 'monumento',
    pregunta: '¿Cómo se llama esta estatua de Cristo ubicada sobre el cerro Corcovado en Brasil?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Christ_the_Redeemer_-_Cristo_Redentor.jpg/600px-Christ_the_Redeemer_-_Cristo_Redentor.jpg',
    caption: '¿Cuál es el nombre de esta icónica estatua en Río de Janeiro?',
    opciones: ['Cristo de los Andes', 'Cristo Rey', 'Cristo Redentor', 'El Salvador del Mundo'],
    correcta: 'Cristo Redentor',
  },
  {
    tipo: 'monumento',
    pregunta: '¿Cómo se llama el gran templo budista situado en Camboya, el más grande del mundo?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Angkor_Wat_from_the_air.JPG/600px-Angkor_Wat_from_the_air.JPG',
    caption: '¿Reconoces este templo en Camboya?',
    opciones: ['Templo de Borobudur', 'Angkor Wat', 'Templo Dorado', 'Shwedagon'],
    correcta: 'Angkor Wat',
  },
];

/* ──────────────────────────────────────────
   ESTADO DEL JUEGO
────────────────────────────────────────── */
let estado = {
  preguntas:  [],
  indice:     0,
  puntos:     0,
  correctas:  0,
  respondida: false,
  timer:      null,
};

/* ──────────────────────────────────────────
   REFERENCIAS DOM (se asignan en DOMContentLoaded)
────────────────────────────────────────── */
let hudPuntos, hudCorrectas, hudPregunta, hudModo;
let barraProgreso, textoProgreso;
let preguntaEl, imagenEl, captionEl, opcionesEl, feedbackEl;
let overlay, overlayTitulo, overlayScore, overlayDetalle, overlaySub;
let btnSiguiente;

const $ = (id) => document.getElementById(id);

/* ──────────────────────────────────────────
   UTILITARIOS
────────────────────────────────────────── */
function mezclar(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function actualizarHUD() {
  const total = estado.preguntas.length;
  hudPuntos.textContent    = estado.puntos;
  hudCorrectas.textContent = estado.correctas;
  hudPregunta.textContent  = `${Math.min(estado.indice + 1, total)} / ${total}`;
  barraProgreso.style.width = `${(estado.indice / total) * 100}%`;
  textoProgreso.textContent = `${estado.indice} de ${total} respondidas`;
}

function setFeedback(texto, tipo) {
  feedbackEl.textContent = texto;
  feedbackEl.className = 'juego-feedback ' + tipo;
}

function mostrarBtnSiguiente(visible) {
  btnSiguiente.style.display = visible ? 'inline-flex' : 'none';
}

/* ──────────────────────────────────────────
   AVANZAR A SIGUIENTE PREGUNTA
────────────────────────────────────────── */
function avanzar() {
  clearTimeout(estado.timer);
  mostrarBtnSiguiente(false);
  estado.indice++;
  if (estado.indice < estado.preguntas.length) {
    renderPregunta();
  } else {
    mostrarOverlay();
  }
}

/* ──────────────────────────────────────────
   RENDERIZADO DE PREGUNTA
────────────────────────────────────────── */
function renderPregunta() {
  const p = estado.preguntas[estado.indice];
  estado.respondida = false;
  mostrarBtnSiguiente(false);

  hudModo.textContent  = p.tipo === 'fecha' ? '📅 Fecha' : '🏛️ Monumento';
  preguntaEl.textContent = p.pregunta;
  captionEl.textContent  = p.caption;

  // Carga de imagen con fade y fallback
  imagenEl.style.opacity = '0';
  const tmp = new Image();
  tmp.onload = () => { imagenEl.src = tmp.src; imagenEl.style.opacity = '1'; };
  tmp.onerror = () => {
    imagenEl.src = `https://via.placeholder.com/600x280/0077b6/ffffff?text=${encodeURIComponent(p.caption)}`;
    imagenEl.style.opacity = '1';
  };
  tmp.src = p.imagen;

  setFeedback(' ', 'neutral');
  opcionesEl.innerHTML = '';

  p.tipo === 'fecha' ? renderFechas(p) : renderMonumentos(p);
  actualizarHUD();
}

function renderFechas(p) {
  const opciones = mezclar(p.opciones);
  const grid = document.createElement('div');
  grid.className = 'opciones-fechas';
  opciones.forEach((op, i) => {
    const btn = document.createElement('button');
    btn.className = 'btn-fecha';
    btn.textContent = op;
    btn.dataset.valor = op;
    btn.setAttribute('aria-label', `Opción ${i + 1}: ${op}`);
    btn.addEventListener('click', () => elegirRespuesta(btn, op, p.correcta, 'fecha'));
    grid.appendChild(btn);
  });
  opcionesEl.appendChild(grid);
}

function renderMonumentos(p) {
  const opciones = mezclar(p.opciones);
  const lista = document.createElement('div');
  lista.className = 'opciones-monumento';
  opciones.forEach((op, i) => {
    const btn = document.createElement('button');
    btn.className = 'btn-monumento';
    const letra = ['A', 'B', 'C', 'D'][i];
    btn.innerHTML = `<span class="letra-badge">${letra}</span>${op}`;
    btn.dataset.valor = op;
    btn.setAttribute('aria-label', `Opción ${letra}: ${op}`);
    btn.addEventListener('click', () => elegirRespuesta(btn, op, p.correcta, 'monumento'));
    lista.appendChild(btn);
  });
  opcionesEl.appendChild(lista);
}

/* ──────────────────────────────────────────
   LÓGICA DE RESPUESTA
────────────────────────────────────────── */
function elegirRespuesta(btnElegido, valor, correcta, tipo) {
  if (estado.respondida) return;
  estado.respondida = true;

  const clase = tipo === 'fecha' ? 'btn-fecha' : 'btn-monumento';
  opcionesEl.querySelectorAll('.' + clase).forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.valor === correcta) btn.classList.add('correcto');
  });

  if (valor === correcta) {
    estado.puntos    += 10;
    estado.correctas += 1;
    setFeedback('✅ ¡Correcto! +10 puntos', 'ok');
  } else {
    btnElegido.classList.add('incorrecto');
    setFeedback(`❌ Incorrecto. La respuesta era: ${correcta}`, 'error');
  }

  actualizarHUD();
  mostrarBtnSiguiente(true);

  // Auto-avance a los 3 s si el jugador no presiona Siguiente
  clearTimeout(estado.timer);
  estado.timer = setTimeout(avanzar, 3000);
}

/* ──────────────────────────────────────────
   OVERLAY FINAL
────────────────────────────────────────── */
function mostrarOverlay() {
  const total = estado.preguntas.length;
  const pct   = Math.round((estado.correctas / total) * 100);
  const niveles = [
    [100, '🏆', '¡Perfecto! ¡Eres un experto!'],
    [80,  '🥇', '¡Excelente resultado!'],
    [60,  '🥈', '¡Muy bien hecho!'],
    [40,  '🥉', '¡Sigue practicando!'],
    [0,   '😊', '¡Buen intento!'],
  ];
  const [, emoji, titulo] = niveles.find(([min]) => pct >= min);

  overlayTitulo.textContent  = `${emoji} ${titulo}`;
  overlayScore.textContent   = `${estado.puntos} pts`;
  overlayDetalle.textContent = `Respondiste ${estado.correctas} de ${total} preguntas correctamente`;
  overlaySub.textContent     = `${pct}% de aciertos`;
  barraProgreso.style.width  = '100%';
  textoProgreso.textContent  = `${total} de ${total} respondidas`;
  overlay.classList.add('visible');
}

/* ──────────────────────────────────────────
   INICIAR / REINICIAR
────────────────────────────────────────── */
function iniciarJuego() {
  clearTimeout(estado.timer);
  estado = { preguntas: mezclar(PREGUNTAS), indice: 0, puntos: 0, correctas: 0, respondida: false, timer: null };
  overlay.classList.remove('visible');
  mostrarBtnSiguiente(false);
  setFeedback(' ', 'neutral');
  actualizarHUD();
  renderPregunta();
}

/* ──────────────────────────────────────────
   CONTROLES DE TECLADO
────────────────────────────────────────── */
document.addEventListener('keydown', (e) => {
  if (estado.respondida && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    avanzar();
    return;
  }
  if (estado.respondida) return;
  const p = estado.preguntas[estado.indice];
  if (!p) return;
  if (p.tipo === 'fecha') {
    const idx = ['1','2','3'].indexOf(e.key);
    if (idx !== -1) opcionesEl.querySelectorAll('.btn-fecha')[idx]?.click();
  } else {
    const idx = ['a','b','c','d'].indexOf(e.key.toLowerCase());
    if (idx !== -1) opcionesEl.querySelectorAll('.btn-monumento')[idx]?.click();
  }
});

/* ──────────────────────────────────────────
   INIT
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  hudPuntos     = $('hud-puntos');
  hudCorrectas  = $('hud-correctas');
  hudPregunta   = $('hud-pregunta');
  hudModo       = $('hud-modo');
  barraProgreso = $('barra-progreso');
  textoProgreso = $('texto-progreso');
  preguntaEl    = $('juego-pregunta');
  imagenEl      = $('juego-imagen');
  captionEl     = $('juego-caption');
  opcionesEl    = $('opciones-container');
  feedbackEl    = $('juego-feedback');
  overlay       = $('juego-overlay');
  overlayTitulo = $('overlay-titulo');
  overlayScore  = $('overlay-score');
  overlayDetalle= $('overlay-detalle');
  overlaySub    = $('overlay-sub');
  btnSiguiente  = $('btnSiguiente');

  $('btnReiniciar').addEventListener('click', iniciarJuego);
  $('btnJugarDeNuevo').addEventListener('click', iniciarJuego);
  btnSiguiente.addEventListener('click', avanzar);

  iniciarJuego();
});