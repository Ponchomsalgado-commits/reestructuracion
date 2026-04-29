const wordsData = [
    { word: "CANCION", syllables: ["CAN", "CION"], correctIdx: 1, type: "AGUDA" },
    { word: "ARBOL", syllables: ["AR", "BOL"], correctIdx: 0, type: "GRAVE" },
    { word: "MUSICA", syllables: ["MU", "SI", "CA"], correctIdx: 0, type: "ESDRÚJULA" },
    { word: "MESA", syllables: ["ME", "SA"], correctIdx: -1, type: "GRAVE" },
    { word: "CORAZON", syllables: ["CO", "RA", "ZON"], correctIdx: 2, type: "AGUDA" },
    { word: "RELOJ", syllables: ["RE", "LOJ"], correctIdx: -1, type: "AGUDA" },
    { word: "PLATANO", syllables: ["PLA", "TA", "NO"], correctIdx: 0, type: "ESDRÚJULA" },
    { word: "AZUCAR", syllables: ["A", "ZU", "CAR"], correctIdx: 1, type: "GRAVE" },
    { word: "FELIZ", syllables: ["FE", "LIZ"], correctIdx: -1, type: "AGUDA" },
    { word: "PÁJARO", syllables: ["PA", "JA", "RO"], correctIdx: 0, type: "ESDRÚJULA" }
];

let currentLevel = 0;
let score = 0;
let isDragging = false;
const dragToken = document.getElementById('drag-token');

function startGame() {
    currentLevel = 0;
    score = 0;
    
    // Ocultar los overlays de InkluEdu
    document.getElementById('pantalla-inicio').style.display = 'none';
    document.getElementById('juego-overlay-win').style.display = 'none';
    
    loadLevel();
}

function loadLevel() {
    const data = wordsData[currentLevel];
    
    // Actualizar Interfaz (HUD)
    document.getElementById('current-q').textContent = currentLevel + 1;
    document.getElementById('progress-fill').style.width = `${(currentLevel / wordsData.length) * 100}%`;
    document.getElementById('rule-badge').textContent = data.type;
    document.getElementById('word-display').textContent = data.word;
    
    // Limpiar clases de estado
    const noTildeZone = document.getElementById('no-tilde-zone');
    noTildeZone.classList.remove('correct', 'wrong', 'correct-answer-hint');

    // Generar zonas de soltado
    const grid = document.getElementById('drop-grid');
    grid.innerHTML = '';
    
    data.syllables.forEach((syl, index) => {
        const zone = document.createElement('div');
        zone.className = 'dropzone';
        zone.textContent = syl;
        zone.dataset.index = index;
        grid.appendChild(zone);
    });

    // Resetear posición de la ficha
    dragToken.style.position = 'static';
    dragToken.style.transform = 'none';
}

// Lógica de Arrastre (Drag & Drop)
function moveToken(e) {
    const x = e.clientX || (e.touches ? e.touches[0].clientX : 0);
    const y = e.clientY || (e.touches ? e.touches[0].clientY : 0);
    dragToken.style.left = `${x - 32}px`;
    dragToken.style.top = `${y - 32}px`;
}

dragToken.addEventListener('pointerdown', (e) => {
    isDragging = true;
    dragToken.classList.add('dragging');
    dragToken.style.position = 'fixed';
    moveToken(e);
});

document.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    moveToken(e);
    
    const x = e.clientX || (e.touches ? e.touches[0].clientX : 0);
    const y = e.clientY || (e.touches ? e.touches[0].clientY : 0);
    
    document.querySelectorAll('.dropzone').forEach(zone => {
        const rect = zone.getBoundingClientRect();
        if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
            zone.classList.add('hover-target');
        } else {
            zone.classList.remove('hover-target');
        }
    });
});

document.addEventListener('pointerup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    dragToken.classList.remove('dragging');
    
    const x = e.clientX || (e.changedTouches ? e.changedTouches[0].clientX : 0);
    const y = e.clientY || (e.changedTouches ? e.changedTouches[0].clientY : 0);
    
    let droppedOn = null;
    document.querySelectorAll('.dropzone').forEach(zone => {
        const rect = zone.getBoundingClientRect();
        if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
            droppedOn = zone;
        }
        zone.classList.remove('hover-target'); // Limpiar hover
    });

    if (droppedOn) {
        checkAnswer(parseInt(droppedOn.dataset.index), droppedOn);
    } else {
        dragToken.style.position = 'static';
    }
});

function checkAnswer(selectedIndex, element) {
    const data = wordsData[currentLevel];
    const correctIdx = data.correctIdx;

    if (selectedIndex === correctIdx) {
        element.classList.add('correct');
        score++;
    } else {
        element.classList.add('wrong');
        
        // Pista de la respuesta correcta (Borde y resplandor verde)
        if (correctIdx === -1) {
            document.getElementById('no-tilde-zone').classList.add('correct-answer-hint');
        } else {
            document.querySelectorAll(`.drop-grid .dropzone[data-index="${correctIdx}"]`).forEach(zone => {
                zone.classList.add('correct-answer-hint');
            });
        }
    }

    setTimeout(() => {
        currentLevel++;
        if (currentLevel < wordsData.length) {
            loadLevel();
        } else {
            showGameOver();
        }
    }, 1500); 
}

function showGameOver() {
    // Mostrar overlay de victoria 
    document.getElementById('progress-fill').style.width = `100%`;
    document.getElementById('juego-overlay-win').style.display = 'flex';
    document.getElementById('final-hits').textContent = `${score}/${wordsData.length}`;
}