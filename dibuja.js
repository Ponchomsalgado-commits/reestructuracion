// Seleccionamos el canvas que está dentro del div 'lienzo'
const canvas   = document.querySelector('#lienzo canvas');
const contexto = canvas.getContext('2d');

// Configuración de dimensiones y estilo
canvas.width  = 500;
canvas.height = 300;

let pintando = false;

// ── Helpers de posición ────────────────────────────────────────────────────
// Escala la posición del puntero al espacio interno del canvas,
// necesario cuando el CSS redimensiona el elemento (<canvas> estirado).

function getPosRaton(e) {
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top)  * scaleY
    };
}

function getPosTouch(e) {
    e.preventDefault(); // evita scroll mientras se dibuja
    const rect   = canvas.getBoundingClientRect();
    const touch  = e.touches[0];
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top)  * scaleY
    };
}

// ── Funciones de dibujo ───────────────────────────────────────────────────

function iniciarTrazo(x, y) {
    pintando = true;
    contexto.beginPath();
    contexto.moveTo(x, y);
}

function continuarTrazo(x, y) {
    if (!pintando) return;
    contexto.lineWidth   = 2;
    contexto.lineCap     = 'round';
    contexto.strokeStyle = '#000';
    contexto.lineTo(x, y);
    contexto.stroke();
}

function detenerTrazo() {
    pintando = false;
    contexto.beginPath(); // evita línea fantasma en el siguiente inicio
}

// ── Eventos de ratón ─────────────────────────────────────────────────────

canvas.addEventListener('mousedown', (e) => {
    const { x, y } = getPosRaton(e);
    iniciarTrazo(x, y);
});

canvas.addEventListener('mousemove', (e) => {
    const { x, y } = getPosRaton(e);
    continuarTrazo(x, y);
});

canvas.addEventListener('mouseup',    detenerTrazo);
canvas.addEventListener('mouseleave', detenerTrazo);

// ── Eventos táctiles ─────────────────────────────────────────────────────

canvas.addEventListener('touchstart', (e) => {
    const { x, y } = getPosTouch(e);
    iniciarTrazo(x, y);
}, { passive: false });

canvas.addEventListener('touchmove', (e) => {
    const { x, y } = getPosTouch(e);
    continuarTrazo(x, y);
}, { passive: false });

canvas.addEventListener('touchend',    detenerTrazo);
canvas.addEventListener('touchcancel', detenerTrazo);