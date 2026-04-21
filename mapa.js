let mapa = L.map('mapa').setView([32.627, -115.454], 12)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);

L.marker([32.65399974740721, -115.43899427116466]).addTo(mapa).bindPopup('<b>CEPI (Centro de Entrenamiento Psicológico Infantil)</b><p>Avenida Ignacio Allende 602, Prohogar, 21240 Mexicali, B.C.</p>');
L.marker([32.65880982581581, -115.42371566434687]).addTo(mapa).bindPopup('<b>CONCENTRA: Especialistas en TDAH y Problemas de Aprendizaje</b><p>Calz. Cuauhtémoc 1362-local 13, Vista Hermosa, 21240 Mexicali, B.C.</p>');
L.marker([32.64438784183456, -115.43569309133534]).addTo(mapa).bindPopup('<b>CRIIE (Centro de Recursos e Información para la Integración Educativa)</b><p>Rio Sinaloa, Av. Sindicato de INEA, Cuarta Sección, Fovissste, 21078 Mexicali, B.C.</p>');
L.marker([32.630407496118785, -115.42552442017143]).addTo(mapa).bindPopup('<b>Inclúyeme: Centro de Atención a la Necesidad Educativa Especial</b><p>Av. Alhóndiga de Granaditas 1198, Independencia, 21290 Mexicali, B.C.</p>');
L.marker([32.599985967522244, -115.3848110471608]).addTo(mapa).bindPopup('<b>IPEBC (Instituto de Psiquiatria del Estado de Baja California)</b><p>Calle 11 1753, Villa Verde, 21396 Mexicali, B.C.</p>');

function mover(lat, lng, zoom) {
    mapa.flyTo([lat, lng], zoom);
}

function cambiarVista(tipo) {
    const layout = document.querySelector('.insti-layout');
    const btnL = document.getElementById('btn-lista');
    const btnM = document.getElementById('btn-mapa');

    if (tipo === 'mapa') {
        layout.classList.add('mostrar-mapa');
        btnM.classList.add('activo');
        btnL.classList.remove('activo');

        setTimeout(function() {
            mapa.invalidateSize();
        }, 100);

    } else {
        layout.classList.remove('mostrar-mapa');
        btnL.classList.add('activo');
        btnM.classList.remove('activo');
    }
}

function mover(lat, lon, zoom) {
    if (window.innerWidth <= 768) {
        cambiarVista('mapa');
    }

    mapa.flyTo([lat, lon], zoom);

}