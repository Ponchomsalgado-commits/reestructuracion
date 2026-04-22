/* =====================================================
   geografia.js — Banco de preguntas de Geografía
   InkluEdu

   Para editar preguntas: modificar el array `preguntas`.
   Cada objeto tiene:
     texto    → enunciado de la pregunta
     opciones → array de 4 respuestas posibles
     correcta → índice (0-3) de la respuesta correcta
   ===================================================== */

const preguntas = [
  {
    texto:    '¿Cuál es el río más largo del mundo?',
    opciones: ['Amazonas', 'Nilo', 'Yangtsé', 'Misisipi'],
    correcta: 1
  },
  {
    texto:    '¿Cuántos continentes hay en el mundo?',
    opciones: ['5', '6', '7', '8'],
    correcta: 2
  },
  {
    texto:    '¿Cuál es el océano más grande del mundo?',
    opciones: ['Atlántico', 'Índico', 'Ártico', 'Pacífico'],
    correcta: 3
  },
  {
    texto:    '¿Cuál es la montaña más alta del mundo?',
    opciones: ['K2', 'Mont Blanc', 'Everest', 'Kilimanjaro'],
    correcta: 2
  },
  {
    texto:    '¿En qué continente se encuentra México?',
    opciones: ['América del Sur', 'América del Norte', 'América Central', 'Europa'],
    correcta: 1
  },
  {
    texto:    '¿Cuál es la capital de Francia?',
    opciones: ['Londres', 'Berlín', 'Roma', 'París'],
    correcta: 3
  },
  {
    texto:    '¿Qué desierto es el más grande del mundo?',
    opciones: ['Sahara', 'Gobi', 'Antártico', 'Atacama'],
    correcta: 2
  },
  {
    texto:    '¿Cuál es el país más grande del mundo por superficie?',
    opciones: ['China', 'Estados Unidos', 'Canadá', 'Rusia'],
    correcta: 3
  },
  {
    texto:    '¿Qué línea imaginaria divide a la Tierra en hemisferio norte y sur?',
    opciones: ['Trópico de Cáncer', 'Meridiano de Greenwich', 'Ecuador', 'Trópico de Capricornio'],
    correcta: 2
  },
  {
    texto:    '¿Cuál es el estado más grande de México por superficie?',
    opciones: ['Sonora', 'Chihuahua', 'Baja California', 'Coahuila'],
    correcta: 1
  },
];

document.addEventListener('DOMContentLoaded', () => {
  iniciarQuiz(preguntas);
});
