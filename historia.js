/* =====================================================
   historia.js — Banco de preguntas de Historia
   InkluEdu

   Para editar preguntas: modificar el array `preguntas`.
   Cada objeto tiene:
     texto    → enunciado de la pregunta
     opciones → array de 4 respuestas posibles
     correcta → índice (0-3) de la respuesta correcta
   ===================================================== */

const preguntas = [
  {
    texto:    '¿En qué año llegó Cristóbal Colón a América?',
    opciones: ['1492', '1776', '1521', '1810'],
    correcta: 0
  },
  {
    texto:    '¿Quién fue el primer presidente de México?',
    opciones: ['Benito Juárez', 'Miguel Hidalgo', 'Guadalupe Victoria', 'Porfirio Díaz'],
    correcta: 2
  },
  {
    texto:    '¿Qué civilización construyó el Templo Mayor en Tenochtitlán?',
    opciones: ['Maya', 'Azteca', 'Olmeca', 'Inca'],
    correcta: 1
  },
  {
    texto:    '¿En qué año inició la Independencia de México?',
    opciones: ['1810', '1821', '1910', '1876'],
    correcta: 0
  },
  {
    texto:    '¿Quién dio el Grito de Independencia de México?',
    opciones: ['José María Morelos', 'Ignacio Allende', 'Miguel Hidalgo', 'Vicente Guerrero'],
    correcta: 2
  },
  {
    texto:    '¿Qué fue la Revolución Francesa?',
    opciones: [
      'Una guerra entre Francia y Alemania',
      'Un movimiento para derrocar al rey y cambiar el sistema de gobierno',
      'La invasión de Francia por España',
      'Una revolución industrial en París'
    ],
    correcta: 1
  },
  {
    texto:    '¿En qué año terminó la Segunda Guerra Mundial?',
    opciones: ['1939', '1942', '1945', '1950'],
    correcta: 2
  },
  {
    texto:    '¿Qué fue el Imperio Romano?',
    opciones: [
      'Un reino ubicado en África del Norte',
      'Una civilización que controló gran parte de Europa, África y Asia',
      'Un grupo de ciudades-estado griegas',
      'El primer reino de América'
    ],
    correcta: 1
  },
  {
    texto:    '¿Qué civilización construyó las pirámides de Egipto?',
    opciones: ['Los griegos', 'Los romanos', 'Los egipcios', 'Los persas'],
    correcta: 2
  },
  {
    texto:    '¿En qué año inició la Revolución Mexicana?',
    opciones: ['1821', '1876', '1910', '1917'],
    correcta: 2
  },
];

document.addEventListener('DOMContentLoaded', () => {
  iniciarQuiz(preguntas);
});
