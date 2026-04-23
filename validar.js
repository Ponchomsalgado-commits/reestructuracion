const urlParams   = new URLSearchParams(window.location.search);
let primerNombre  = urlParams.get('n');
let edadUsuario   = parseInt(urlParams.get('e'));

// Comprueba la URL para almacenar en sessionStorage
if (primerNombre && !isNaN(edadUsuario)) {
    sessionStorage.setItem('nombreRegistrado', primerNombre);
    sessionStorage.setItem('edadRegistrada',   edadUsuario);
} else {
    // Si no están en la URL, los busca en sessionStorage
    primerNombre = sessionStorage.getItem('nombreRegistrado');
    edadUsuario  = parseInt(sessionStorage.getItem('edadRegistrada'));
}

const titulo             = document.getElementById('titulo-saludo');
const mensajeAdvertencia = document.getElementById('mensaje-advertencia');

// ✅ Edad mínima definida una sola vez, sin off-by-one
const EDAD_MINIMA_DOCENTE = 21;

if (primerNombre && titulo) {
    titulo.textContent = `¡Bienvenido(a), ${decodeURIComponent(primerNombre)}!`;
}

function comprobarEdadDocente() {
    if (mensajeAdvertencia) {
        mensajeAdvertencia.textContent = '';
    }

    // ✅ >= en lugar de > para que exactamente 21 también pueda entrar
    if (edadUsuario >= EDAD_MINIMA_DOCENTE) {
        window.location.href = 'maestro.html';
    } else {
        if (mensajeAdvertencia) {
            mensajeAdvertencia.innerHTML =
                `🚫 La edad mínima requerida para el rol de Docente es de ${EDAD_MINIMA_DOCENTE} años.<br>` +
                `Tu edad registrada es ${edadUsuario} años.`;
        }
    }
}

function Invitado() {
    sessionStorage.setItem('nombreRegistrado', 'Invitado');
    sessionStorage.setItem('edadRegistrada',   '25');
    window.location.href = 'menu.html';
}