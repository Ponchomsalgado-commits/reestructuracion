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
    showScreen('game-screen');
    loadLevel();
}

function loadLevel() {
    const data = wordsData[currentLevel];
    
    // Actualizar Interfaz
    document.getElementById('current-q').textContent = currentLevel + 1;
    document.getElementById('progress-fill').style.width = `${(currentLevel / wordsData.length) * 100}%`;
    document.getElementById('rule-badge').textContent = data.type;
    document.getElementById('word-display').textContent = data.word;
    
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
}

// Lógica de Arrastre (Drag & Drop)
function moveToken(e) {
    const x = e.clientX || e.touches[0].clientX;
    const y = e.clientY || e.touches[0].clientY;
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
    
    // Feedback visual (hover)
    const x = e.clientX || e.touches[0].clientX;
    const y = e.clientY || e.touches[0].clientY;
    
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
    });

    if (droppedOn) {
        checkAnswer(parseInt(droppedOn.dataset.index), droppedOn);
    } else {
        dragToken.style.position = 'static';
    }
});

function checkAnswer(selectedIndex, element) {
    const correctIdx = wordsData[currentLevel].correctIdx;
    
    if (selectedIndex === correctIdx) {
        element.classList.add('correct');
        score++;
    } else {
        element.classList.add('wrong');
    }

    // Esperar un momento antes del siguiente nivel
    setTimeout(() => {
        currentLevel++;
        if (currentLevel < wordsData.length) {
            loadLevel();
        } else {
            showGameOver();
        }
    }, 800);
}

function showGameOver() {
    showScreen('over-screen');
    document.getElementById('final-hits').textContent = `${score}/${wordsData.length}`;
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}