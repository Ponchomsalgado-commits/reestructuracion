/* =====================================================
   espanol.js — Banco de preguntas de Español
   InkluEdu

   Para editar preguntas: modificar el array `preguntas`.
   Cada objeto tiene:
     texto    → enunciado de la pregunta
     opciones → array de 4 respuestas posibles
     correcta → índice (0-3) de la respuesta correcta
   ===================================================== */

const preguntas = [
  {
    texto:    '¿Cuál de las siguientes palabras es un sustantivo?',
    opciones: ['Correr', 'Casa', 'Rápido', 'Brillantemente'],
    correcta: 1
  },
  {
    texto:    '¿Qué tipo de palabra es "hermoso"?',
    opciones: ['Sustantivo', 'Verbo', 'Adjetivo', 'Adverbio'],
    correcta: 2
  },
  {
    texto:    '¿Cuál de estas oraciones está escrita correctamente?',
    opciones: [
      'El niño corre rapido.',
      'El niño córre rápido.',
      'El niño corre rápido.',
      'el niño corre Rápido.'
    ],
    correcta: 2
  },
  {
    texto:    '¿Qué es un sinónimo?',
    opciones: [
      'Una palabra con significado opuesto',
      'Una palabra con significado similar',
      'Una palabra que describe una acción',
      'Una palabra inventada'
    ],
    correcta: 1
  },
  {
    texto:    '¿Cuántas sílabas tiene la palabra "mariposa"?',
    opciones: ['3', '4', '5', '2'],
    correcta: 1
  },
  {
    texto:    '¿Cuál es el antónimo de "frío"?',
    opciones: ['Helado', 'Tibio', 'Caliente', 'Nublado'],
    correcta: 2
  },
  {
    texto:    '¿Qué signo de puntuación se usa al final de una pregunta?',
    opciones: ['Punto', 'Coma', 'Signo de interrogación', 'Dos puntos'],
    correcta: 2
  },
  {
    texto:    '¿Cuál de estas palabras lleva acento ortográfico?',
    opciones: ['Mesa', 'Camion', 'Árbol', 'Libro'],
    correcta: 2
  },
  {
    texto:    '"El Sol salió brillante por la mañana." ¿Cuál es el sujeto de esta oración?',
    opciones: ['Brillante', 'Por la mañana', 'El Sol', 'Salió'],
    correcta: 2
  },
  {
    texto:    '¿Qué es una metáfora?',
    opciones: [
      'Comparar dos cosas usando "como" o "cual"',
      'Decir que algo es otra cosa para describirlo',
      'Repetir el mismo sonido al inicio de palabras',
      'Usar palabras en orden inverso'
    ],
    correcta: 1
  },
];

// Cargar el motor de quiz cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  iniciarQuiz(preguntas);
});
