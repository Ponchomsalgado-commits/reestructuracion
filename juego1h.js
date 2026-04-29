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
    imagen: 'https://www.proarquitectura.es/wp-content/uploads/2023/01/22eiffel-tower-g0c73a4cd3_1920.jpg',
    caption: 'Torre Eiffel — París, Francia',
    opciones: ['1889', '1901', '1875'],
    correcta: '1889',
  },
  {
    tipo: 'fecha',
    pregunta: '¿En qué año llegó Cristóbal Colón a América por primera vez?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Desembarco_de_Col%C3%B3n_de_Di%C3%B3scoro_Puebla.jpg',
    caption: 'Retrato atribuido a Cristóbal Colón (s. XVI)',
    opciones: ['1492', '1510', '1488'],
    correcta: '1492',
  },
  {
    tipo: 'fecha',
    pregunta: '¿En qué año comenzó la unificación de la Gran Muralla China bajo la dinastía Qin?',
    imagen: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgfDWWImP4M6dmFPxbiqAmMruIAt5_s5qe9TqZHfHJmAfDi6fEv8j1xugsqdFfKrf6r5T3Fnb4-b-381OO0I2N7HDtAhJVZqcD9-XSyYDJSft3wrd95uYvYVWS8Rj16HJrv8EghnYuky7od/s1600/dinast%C3%ADa+qin+muralla+china.jpg',
    caption: 'Gran Muralla China — Patrimonio de la Humanidad',
    opciones: ['221 a.C.', '500 d.C.', '1000 d.C.'],
    correcta: '221 a.C.',
  },
  {
    tipo: 'fecha',
    pregunta: '¿En qué año cayó el Imperio Romano de Occidente?',
    imagen: 'https://www.romaimperial.com/imagenes/Caida-del-Imperio-Romano.jpg',
    caption: 'Coliseo Romano — símbolo del Imperio',
    opciones: ['376 d.C.', '476 d.C.', '590 d.C.'],
    correcta: '476 d.C.',
  },
  {
    tipo: 'fecha',
    pregunta: '¿En qué año estalló la Revolución Francesa con la toma de la Bastilla?',
    imagen: 'https://content-historia.nationalgeographic.com.es/medio/2022/11/30/la-vision-de-perrault-sobre-la-toma-de-la-bastilla_00000000_221130080709_800x535.jpg',
    caption: 'La toma de la Bastilla — 14 de julio de 1789',
    opciones: ['1776', '1789', '1804'],
    correcta: '1789',
  },
  {
    tipo: 'fecha',
    pregunta: '¿En qué año se firmó la Declaración de Independencia de los Estados Unidos?',
    imagen: 'https://usadesconocido.com/wp-content/uploads/2025/06/John_after_Trumbull_-_Signature_of_the_United_States_Declaration_of_Independence_in_1776_Engraving_aft_-_MeisterDrucke-971066.jpg',
    caption: 'Declaración de Independencia de EE.UU.',
    opciones: ['1776', '1789', '1812'],
    correcta: '1776',
  },
  {
    tipo: 'fecha',
    pregunta: '¿En qué año terminó la Segunda Guerra Mundial con la rendición de Alemania y Japón?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Mamoru_Shigemitsu_signs_the_Instrument_of_Surrender%2C_officially_ending_the_Second_World_War_-_Alt.jpg',
    caption: 'Celebraciones del fin de la Segunda Guerra Mundial',
    opciones: ['1943', '1945', '1948'],
    correcta: '1945',
  },
  {
    tipo: 'fecha',
    pregunta: '¿En qué año pisó el ser humano la Luna por primera vez con la misión Apolo 11?',
    imagen: 'https://content.nationalgeographic.com.es/medio/2016/07/20/apolo-bandera-astronautas_2701a04d.jpg',
    caption: 'Buzz Aldrin en la superficie lunar — Apolo 11',
    opciones: ['1965', '1969', '1972'],
    correcta: '1969',
  },
  {
    tipo: 'fecha',
    pregunta: '¿En qué año se inició la construcción de la Gran Pirámide de Giza?',
    imagen: 'https://curiosfera-historia.com/wp-content/uploads/Extracci%C3%B3n-y-transporte-de-los-bloques.jpg',
    caption: 'Pirámide de Keops — Giza, Egipto',
    opciones: ['2560 a.C.', '1200 a.C.', '500 a.C.'],
    correcta: '2560 a.C.',
  },
  {
    tipo: 'fecha',
    pregunta: '¿En qué año Napoleón Bonaparte fue coronado Emperador de los Franceses?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Jacques-Louis_David_-_The_Coronation_of_Napoleon_%281805-1807%29.jpg',
    caption: 'Napoleón Bonaparte — pintado por Jacques-Louis David',
    opciones: ['1799', '1804', '1812'],
    correcta: '1804',
  },
  {
    tipo: 'fecha',
    pregunta: '¿En qué año se consumó la Independencia de México?',
    imagen: 'https://sanangel.edu.mx/wp-content/uploads/2024/07/27-de-septiembre-de-1821.webp',
    caption: 'Ángel de la Independencia — Ciudad de México',
    opciones: ['1810', '1821', '1836'],
    correcta: '1821',
  },
  {
    tipo: 'fecha',
    pregunta: '¿En qué año cayó el Muro de Berlín, que dividía Alemania Oriental y Occidental?',
    imagen: 'https://capitandenim.com/cdn/shop/articles/lg-b-muro_20berl_C3_ADn_e61075ad-7f7d-49f5-8993-3fb01eec58f5.jpg?v=1764009106',
    caption: 'Ciudadanos en el Muro de Berlín — noviembre de 1989',
    opciones: ['1985', '1989', '1993'],
    correcta: '1989',
  },

  /* ════════ MONUMENTOS ════════ */
  {
    tipo: 'monumento',
    pregunta: '¿Cómo se llama esta pirámide escalonada maya, sede del famoso "efecto de serpiente"?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Chichen_Itza_3.jpg',
    caption: '¿Reconoces esta pirámide en la Península de Yucatán?',
    opciones: ['Machu Picchu', 'Chichén Itzá', 'Teotihuacán', 'Monte Albán'],
    correcta: 'Chichén Itzá',
  },
  {
    tipo: 'monumento',
    pregunta: '¿Cuál es el nombre de este imponente anfiteatro elíptico construido en Roma?',
    imagen: 'https://content-historia.nationalgeographic.com.es/medio/2024/01/31/el-coliseo_10c4d6e4_240131154133_2000x1212.jpg',
    caption: '¿Cuál es el nombre de este anfiteatro en Roma?',
    opciones: ['Panteón de Roma', 'Foro Romano', 'Coliseo Romano', 'Termas de Caracalla'],
    correcta: 'Coliseo Romano',
  },
  {
    tipo: 'monumento',
    pregunta: '¿Cómo se llama esta ciudadela inca construida a 2 430 metros sobre el nivel del mar en Perú?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Machu_Picchu%2C_Peru_%282018%29.jpg',
    caption: '¿Sabes cómo se llama esta ciudad en las nubes?',
    opciones: ['Chichén Itzá', 'Tiwanaku', 'Machu Picchu', 'Chan Chan'],
    correcta: 'Machu Picchu',
  },
  {
    tipo: 'monumento',
    pregunta: '¿Cuál es el nombre de esta pirámide egipcia, la más alta del mundo antiguo?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/1280px-Kheops-Pyramid.jpg',
    caption: '¿Cómo se llama esta pirámide en Giza?',
    opciones: ['Pirámide de Kefrén', 'Pirámide de Keops', 'Pirámide de Micerino', 'Pirámide de Saqqara'],
    correcta: 'Pirámide de Keops',
  },
  {
    tipo: 'monumento',
    pregunta: '¿Cómo se llama este famoso palacio-fortaleza árabe en Granada, España?',
    imagen: 'https://www.castlesintheworld.com/es/wp-content/uploads/alhambra-granada.jpg',
    caption: '¿Reconoces este palacio nazarí en Andalucía?',
    opciones: ['Alcázar de Sevilla', 'La Alhambra', 'Mezquita de Córdoba', 'El Escorial'],
    correcta: 'La Alhambra',
  },
  {
    tipo: 'monumento',
    pregunta: '¿Cuál es el nombre de este templo griego construido en honor a la diosa Atenea?',
    imagen: 'https://mymodernmet.com/wp/wp-content/uploads/2019/09/parthenon-facts-thumbnail.jpg',
    caption: '¿Cómo se llama este templo en la Acrópolis de Atenas?',
    opciones: ['Erecteión', 'Partenón', 'Templo de Zeus Olímpico', 'Hefestión'],
    correcta: 'Partenón',
  },
  {
    tipo: 'monumento',
    pregunta: '¿Cómo se llama el mausoleo de mármol blanco construido en India por el Shah Jahan en memoria de su esposa?',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Taj_Mahal_%28Edited%29.jpeg',
    caption: '¿Reconoces este mausoleo en Agra, India?',
    opciones: ['Palacio de Fatehpur Sikri', 'Templo Dorado', 'Taj Mahal', 'Fuerte Rojo'],
    correcta: 'Taj Mahal',
  },
  {
    tipo: 'monumento',
    pregunta: '¿Cuál es el nombre de esta estatua que fue obsequio de Francia a los Estados Unidos?',
    imagen: 'https://www.prensaescuela.es/wp-content/uploads/2020/10/AF20201028.jpg',
    caption: '¿Cómo se llama esta escultura en Nueva York?',
    opciones: ['Estatua de la Libertad', 'El Pensador', 'Cristo Redentor', 'La Victoria de Samotracia'],
    correcta: 'Estatua de la Libertad',
  },
  {
    tipo: 'monumento',
    pregunta: '¿Cómo se llama esta estatua de Cristo ubicada sobre el cerro Corcovado en Brasil?',
    imagen: 'https://dynamic-media.tacdn.com/media/photo-o/30/33/90/d9/caption.jpg?w=700&h=500&s=1',
    caption: '¿Cuál es el nombre de esta icónica estatua en Río de Janeiro?',
    opciones: ['Cristo de los Andes', 'Cristo Rey', 'Cristo Redentor', 'El Salvador del Mundo'],
    correcta: 'Cristo Redentor',
  },
  {
    tipo: 'monumento',
    pregunta: '¿Cómo se llama el gran templo budista situado en Camboya, el más grande del mundo?',
    imagen: 'https://viajesacamboyaenespanol.b-cdn.net/wp-content/uploads/2022/04/como-visitar-Angkor-Wat.jpg',
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

  // ── SOLUCIÓN: Carga de imagen directa y segura ──
  imagenEl.style.opacity = '0'; // Ocultar para el efecto de transición
  
  // Asignamos la imagen directamente al elemento HTML
  imagenEl.src = p.imagen;

  // Si la imagen carga correctamente, la mostramos
  imagenEl.onload = () => { 
    imagenEl.style.opacity = '1'; 
  };
  
  // Si la imagen falla (red lenta o bloqueo), usamos el logo de InkluEdu como respaldo local
  imagenEl.onerror = () => {
    imagenEl.src = 'img/InkluEdu.svg';
    imagenEl.style.opacity = '1';
  };

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