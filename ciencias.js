const ejercicios = [
    // BIOLOGÍA
    { p: "¿Qué órgano es responsable de bombear sangre por todo el cuerpo?", o: ["Cerebro","Pulmones","Corazón","Hígado"], c: 2 },
    { p: "¿Cuál es el órgano más grande del cuerpo humano?", o: ["Piel","Hígado","Corazón","Cerebro"], c: 0 },
    { p: "¿Qué gas necesitamos para respirar?", o: ["Oxígeno","Nitrógeno","Dióxido de carbono","Hidrógeno"], c: 0 },
    { p: "¿Cómo se llama el proceso por el cual las plantas producen su alimento?", o: ["Germinación","Fotosíntesis","Fermentación","Digestión"], c: 1 },
    { p: "¿Cuál es el principal recurso que las plantas absorben del suelo?", o: ["Oxígeno","Agua","Luz","Viento"], c: 1 },
    { p: "¿Cómo se llama el conjunto de huesos del cuerpo humano?", o: ["Musculatura","Circulación","Esqueleto","Tejido óseo"], c: 2 },
    { p: "¿Qué animal es un mamífero?", o: ["Tiburón","Gallina","Delfín","Salmón"], c: 2 },
    { p: "¿Qué tipo de animal es una rana?", o: ["Reptil","Anfibio","Ave","Mamífero"], c: 1 },
    { p: "¿Cuál es la función principal del sistema respiratorio?", o: ["Mover la sangre","Obtener oxígeno","Digestionar alimentos","Enviar señales"], c: 1 },
    { p: "¿En qué parte del cuerpo ocurre la digestión principal?", o: ["Pulmones","Estómago","Corazón","Riñones"], c: 1 },

    // ECOLOGÍA
    { p: "¿Cuál es la principal causa del calentamiento global?", o: ["Rayos solares","Gases de efecto invernadero","Tormentas","Agua contaminada"], c: 1 },
    { p: "¿Qué recurso natural es renovable?", o: ["Petróleo","Carbón","Energía solar","Gas natural"], c: 2 },
    { p: "¿Qué contamina más el aire?", o: ["Árboles","Fábricas","Montañas","Nubes"], c: 1 },
    { p: "¿Cómo se llama el proceso de separar basura según su tipo?", o: ["Contaminación","Reciclaje","Deforestación","Filtración"], c: 1 },
    { p: "¿Qué ser vivo produce oxígeno?", o: ["Animales","Hongos","Plantas","Bacterias"], c: 2 },
    { p: "¿Cómo se llama cuando un ecosistema pierde muchos árboles?", o: ["Reforestación","Deforestación","Evaporación","Transpiración"], c: 1 },
    { p: "¿Qué animal está en peligro por la contaminación de los mares?", o: ["León","Tortuga marina","Águila","Caballo"], c: 1 },
    { p: "¿Qué debemos ahorrar para evitar escasez futura?", o: ["Juguetes","Ropa","Agua","Aire"], c: 2 },
    { p: "¿Qué elemento es esencial para la vida en la Tierra?", o: ["Diamantes","Agua","Cobre","Petróleo"], c: 1 },
    { p: "¿Qué capa protege la Tierra de los rayos ultravioleta?", o: ["Manto","Núcleo","Ozono","Corteza"], c: 2 },

    // FÍSICA
    { p: "¿Qué fuerza hace que los objetos caigan al suelo?", o: ["Magnetismo","Gravedad","Electricidad","Inercia"], c: 1 },
    { p: "La energía que produce el Sol se llama:", o: ["Eólica","Nuclear","Solar","Cinética"], c: 2 },
    { p: "¿Qué instrumento mide la temperatura?", o: ["Regla","Termómetro","Balanza","Cronómetro"], c: 1 },
    { p: "¿Qué material conduce mejor la electricidad?", o: ["Plástico","Madera","Metal","Cartón"], c: 2 },
    { p: "¿Qué tipo de energía usa un ventilador?", o: ["Mecánica","Eólica","Eléctrica","Térmica"], c: 2 },
    { p: "¿Cuál es el estado del agua al congelarse?", o: ["Líquido","Gas","Sólido","Plasma"], c: 2 },
    { p: "¿Qué ocurre cuando el agua hierve?", o: ["Se congela","Se evapora","Se pudre","Se oxida"], c: 1 },
    { p: "¿Qué objeto atrae el imán?", o: ["Papel","Madera","Hierro","Plástico"], c: 2 },
    { p: "¿Qué tipo de energía produce una pila?", o: ["Térmica","Eléctrica","Luminosa","Nuclear"], c: 1 },
    { p: "¿Cuál es la unidad de medida de la energía?", o: ["Litro","Metro","Joule","Newton"], c: 2 },

    // QUÍMICA
    { p: "El agua está formada por:", o: ["H y O","C y O","N y H","He y O"], c: 0 },
    { p: "¿Qué estado de la materia no tiene forma ni volumen definidos?", o: ["Sólido","Líquido","Gas","Cristal"], c: 2 },
    { p: "¿Cuál es el pH del agua pura?", o: ["0","7","14","10"], c: 1 },
    { p: "¿Qué sucede cuando mezclas agua y aceite?", o: ["Se disuelven","Cambian color","Se separan","Evaporan"], c: 2 },
    { p: "¿Qué es un átomo?", o: ["Un planeta","La unidad básica de la materia","Un mineral","Un gas"], c: 1 },
    { p: "¿Qué elemento es necesario para que haya combustión?", o: ["Helio","Cloro","Oxígeno","Neón"], c: 2 },
    { p: "¿Cuál es un ejemplo de mezcla homogénea?", o: ["Agua con arena","Agua con sal","Piedras y tierra","Aceite y agua"], c: 1 },
    { p: "¿Qué es una reacción química?", o: ["Un cambio de clima","Un cambio de color solamente","Formación de nuevas sustancias","Cambio de tamaño"], c: 2 },
    { p: "¿El hielo es…?", o: ["Agua líquida","Agua sólida","Vapor","Hidrógeno puro"], c: 1 },
    { p: "¿Qué se forma cuando el agua se congela?", o: ["Cristales","Vapor","Lava","Nubes"], c: 0 }
];

// ======================
//   CONSTANTES SVG
//   r="42" en el HTML  →  2π×42 ≈ 263.9
// ======================
const SVG_RADIO = 42;
const SVG_CIRC  = 2 * Math.PI * SVG_RADIO; // 263.9

const TOTAL_PREGUNTAS = 20;
let ejerciciosCiencias = [];
let indice   = 0;
let correctas = 0;

// Referencias a elementos
const optCont  = document.getElementById("opciones");
const resultEl = document.getElementById("resultado");
const btnSig   = document.getElementById("btnSiguiente");
const btnRein  = document.getElementById("btnReiniciar");
const btnSltr  = document.getElementById("btnSaltar");
const progCirc = document.querySelector(".avance");
const progTxt  = document.getElementById("progreso-porcentaje");

function cargarPregunta() {
    const total = ejerciciosCiencias.length;

    if (indice >= total) {
        terminarQuiz();
        return;
    }

    const q = ejerciciosCiencias[indice];
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

    const respCorr = ejerciciosCiencias[indice].c;

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

    if (indice < ejerciciosCiencias.length - 1) {
        if (btnSig) btnSig.style.display = 'block';
    } else {
        terminarQuiz();
    }
}

function saltarPregunta() {
    indice++;
    if (indice < ejerciciosCiencias.length) {
        cargarPregunta();
    } else {
        terminarQuiz();
    }
}

function siguientePregunta() {
    indice++;
    if (indice < ejerciciosCiencias.length) {
        cargarPregunta();
    } else {
        terminarQuiz();
    }
}

function terminarQuiz() {
    document.getElementById("pregunta").innerText = "🎉 ¡Quiz Terminado! 🎉";
    optCont.innerHTML = "";

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
    ejerciciosCiencias = ejercicios.slice(0, TOTAL_PREGUNTAS);

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
    ejerciciosCiencias = ejercicios.slice(0, TOTAL_PREGUNTAS);

    if (btnSig)  btnSig.onclick  = siguientePregunta;
    if (btnSltr) btnSltr.onclick = saltarPregunta;

    document.getElementById("numTotal").innerText = TOTAL_PREGUNTAS;

    cargarPregunta();
};