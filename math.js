const ejercicios = [
    // SUMAS
    { p: "¿Cuánto es 45 + 32?", o: ["75","77","87","72"], c: 1 },
    { p: "Tienes 12 lápices y compras un paquete de 24. ¿Cuántos tienes ahora?", o: ["34","36","38","32"], c: 1 },
    { p: "¿Cuál es el resultado de 150 + 250?", o: ["350","400","450","300"], c: 1 },
    { p: "En un hormiguero hay 58 hormigas y entran 12 más. ¿Cuántas hay?", o: ["60","70","80","68"], c: 1 },
    { p: "Si sumas 135 + 15, ¿qué número obtienes?", o: ["140","150","160","145"], c: 1 },
    { p: "Un tren lleva 85 pasajeros y suben 15 más. ¿Cuántos lleva en total?", o: ["90","100","110","95"], c: 1 },
    { p: "¿Cuánto es 77 + 23?", o: ["90","100","110","101"], c: 1 },
    { p: "En tu mochila hay 14 canicas verdes y 16 azules. ¿Cuántas hay en total?", o: ["28","30","32","26"], c: 1 },
    { p: "Si tienes 200 pesos y te regalan 50 más, ¿cuánto dinero tienes?", o: ["220","250","300","240"], c: 1 },
    { p: "¿Cuál es el resultado de 12 + 13 + 10?", o: ["25","35","45","30"], c: 1 },

    // RESTAS
    { p: "¿Cuánto es 98 - 45?", o: ["50","53","43","55"], c: 1 },
    { p: "Tienes 50 caramelos y repartes 15. ¿Cuántos te quedan?", o: ["40","35","25","30"], c: 1 },
    { p: "A 120 le quitas 40. ¿Cuál es el resultado?", o: ["70","80","90","60"], c: 1 },
    { p: "En un árbol había 24 pájaros y se volaron 9. ¿Cuántos quedan?", o: ["13","15","17","14"], c: 1 },
    { p: "Si a 100 le restas 25, ¿cuánto queda?", o: ["85","75","65","80"], c: 1 },
    { p: "Teníamos 18 galletas y nos comimos 12. ¿Cuántas sobran?", o: ["4","6","8","5"], c: 1 },
    { p: "¿Cuál es el resultado de 500 - 200?", o: ["250","300","350","400"], c: 1 },
    { p: "Un libro tiene 60 páginas y ya leíste 45. ¿Cuántas te faltan?", o: ["20","15","10","25"], c: 1 },
    { p: "Si tienes 80 pesos y gastas 35, ¿cuánto te sobra?", o: ["50","45","55","40"], c: 1 },
    { p: "A 15 le quitas 7. ¿Cuál es el resultado?", o: ["9","8","7","6"], c: 1 },

    // MULTIPLICACIONES
    { p: "¿Cuánto es 6 x 4?", o: ["20","24","28","18"], c: 1 },
    { p: "Tienes 3 bolsas con 8 dulces cada una. ¿Cuántos dulces hay?", o: ["22","24","26","20"], c: 1 },
    { p: "Si cada pizza tiene 6 rebanadas y compras 5 pizzas, ¿cuántas rebanadas tienes?", o: ["25","30","35","20"], c: 1 },
    { p: "¿Cuál es el resultado de 9 x 3?", o: ["24","27","30","21"], c: 1 },
    { p: "Un gato tiene 4 patas. ¿Cuántas patas tienen 8 gatos?", o: ["28","32","36","30"], c: 1 },
    { p: "Si ahorras 10 pesos cada día por 7 días, ¿cuánto dinero tienes?", o: ["60","70","80","77"], c: 1 },
    { p: "¿Cuánto es 5 x 5?", o: ["20","25","30","15"], c: 1 },
    { p: "En una caja hay 2 filas de 6 huevos. ¿Cuántos hay en total?", o: ["10","12","14","8"], c: 1 },
    { p: "Si multiplicas 7 x 2, ¿qué obtienes?", o: ["12","14","16","10"], c: 1 },
    { p: "Tienes 4 estantes y en cada uno hay 10 libros. ¿Cuántos hay?", o: ["30","40","50","44"], c: 1 }
];

// ======================
//   CONSTANTES SVG
//   r="42" en el HTML  →  2π×42 ≈ 263.9
// ======================
const SVG_RADIO = 42;
const SVG_CIRC  = 2 * Math.PI * SVG_RADIO; // 263.9

const TOTAL_PREGUNTAS = 20;
let ejerciciosMath = [];
let indice    = 0;
let correctas = 0;

// Referencias a elementos
const optCont  = document.getElementById("opciones");
const resultEl = document.getElementById("resultado");
const btnSig   = document.getElementById("btnSiguiente");
const btnRein  = document.getElementById("btnReiniciar");
const btnSltr  = document.getElementById("btnSaltar");
const progCirc = document.querySelector(".avance");
const progTxt  = document.getElementById("progreso-porcentaje");

// Referencia al canvas (se resuelve después del defer)
function getCanvas() {
    return document.querySelector('#lienzo canvas');
}

function limpiarCanvas() {
    const c = getCanvas();
    if (c) c.getContext('2d').clearRect(0, 0, c.width, c.height);
}

function cargarPregunta() {
    const total = ejerciciosMath.length;

    document.getElementById("lienzo").style.display = "block";
    limpiarCanvas();

    if (indice >= total) {
        terminarQuiz();
        return;
    }

    const q = ejerciciosMath[indice];
    document.getElementById("pregunta").innerText = q.p;
    optCont.innerHTML  = "";
    resultEl.innerText = "";

    if (btnSig)  btnSig.style.display  = 'none';
    if (btnRein) btnRein.style.display = 'none';
    if (btnSltr) btnSltr.style.display = 'block';

    document.getElementById("numActual").innerText = indice + 1;
    document.getElementById("numTotal").innerText  = total;

    const progreso = (indice / total) * 100;
    document.getElementById("progreso").style.width = progreso + "%";

    // ── Progreso circular (r=42, circ=263.9) ──
    const offset = SVG_CIRC - (progreso / 100) * SVG_CIRC;
    progCirc.style.strokeDashoffset = offset;
    progTxt.innerText = `${Math.round(progreso)}%`;

    q.o.forEach((opcion, i) => {
        const btn = document.createElement("button");
        btn.className = "opcion";
        btn.innerText = opcion;
        btn.onclick = () => verificar(i, btn);
        optCont.appendChild(btn);
    });
}

function verificar(i, botonSeleccionado) {
    Array.from(optCont.children).forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.7';
    });

    if (btnSltr) btnSltr.style.display = 'none';
    document.getElementById("lienzo").style.display = "none";

    const respCorr = ejerciciosMath[indice].c;

    if (i === respCorr) {
        correctas++;
        botonSeleccionado.style.backgroundColor = '#0da748';
        resultEl.innerText = "¡Correcto! ✅";
        resultEl.style.color = '#04691a';
    } else {
        botonSeleccionado.style.backgroundColor = '#bd0e37';
        resultEl.innerText = "Incorrecto. ❌";
        resultEl.style.color = '#7e0b26';
        Array.from(optCont.children)[respCorr].style.backgroundColor = '#06d6a0';
    }

    if (indice < ejerciciosMath.length - 1) {
        if (btnSig) btnSig.style.display = 'block';
    } else {
        terminarQuiz();
    }
}

function saltarPregunta() {
    indice++;
    if (indice < ejerciciosMath.length) {
        cargarPregunta();
    } else {
        terminarQuiz();
    }
}

function siguientePregunta() {
    indice++;
    if (indice < ejerciciosMath.length) {
        cargarPregunta();
    } else {
        terminarQuiz();
    }
}

function terminarQuiz() {
    document.getElementById("pregunta").innerText = "🎉 ¡Quiz Terminado! 🎉";
    optCont.innerHTML = "";
    document.getElementById("lienzo").style.display = "none";

    // Progreso 100%
    document.getElementById("progreso").style.width = '100%';
    progCirc.style.strokeDashoffset = '0';
    progTxt.innerText = '100%';

    const porcentaje = ((correctas / TOTAL_PREGUNTAS) * 100).toFixed(0);
    resultEl.innerHTML = `Tu score es ${correctas} de ${TOTAL_PREGUNTAS} correctas.<br>(${porcentaje}%)`;
    resultEl.style.color = '#0077b6';

    if (btnSig)  btnSig.style.display  = 'none';
    if (btnSltr) btnSltr.style.display = 'none';
    if (btnRein) {
        btnRein.style.display = 'block';
        btnRein.onclick = reiniciarQuiz;
    }
}

function reiniciarQuiz() {
    indice    = 0;
    correctas = 0;

    ejercicios.sort(() => Math.random() - 0.5);
    ejerciciosMath = ejercicios.slice(0, TOTAL_PREGUNTAS);

    document.getElementById("numActual").innerText = 0;
    document.getElementById("progreso").style.width = '0%';
    // ✅ Usar SVG_CIRC en lugar de '314' hardcodeado
    progCirc.style.strokeDashoffset = SVG_CIRC;
    progTxt.innerText = '0%';

    cargarPregunta();
}

// Inicialización
window.onload = () => {
    ejercicios.sort(() => Math.random() - 0.5);
    ejerciciosMath = ejercicios.slice(0, TOTAL_PREGUNTAS);

    if (btnSig)  btnSig.onclick  = siguientePregunta;
    if (btnSltr) btnSltr.onclick = saltarPregunta;

    document.getElementById("numTotal").innerText = TOTAL_PREGUNTAS;

    cargarPregunta();
};