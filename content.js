
function ocultarTitulos() {
    document.querySelectorAll('a.playable-card-mini-static__title-link--NcI2h').forEach(link => {
        let title = link.textContent;
        let [firstPart, secondPart] = title.split(' - ');
        if (secondPart) {
            secondPart = secondPart.replace(/[a-zA-Z0-9]/g, '*');

            link.textContent = (firstPart + ' - ' + secondPart)
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[ñÑ]/g, 'n')
                .replace(/[!¡¿?]/g, '');
        }
    });
}

function ocultarSegundaImagen() {
    document.querySelectorAll(".erc-episode-scrollable-list, .erc-prev-next-episode.episode").forEach(container => {
        container.querySelectorAll(".progressive-image-loading--rwH3R").forEach(div => {
            let pictures = div.querySelectorAll("picture");
            if (pictures.length > 1) {
                pictures[1].style.display = "none";
            }
        });
    });
}

// Crear el observer, pero no activarlo todavía
const observer = new MutationObserver(() => {
    // Detener observer antes de modificar el DOM
    observer.disconnect();

    ocultarTitulos();
    ocultarSegundaImagen();

    // Reactivar observer después de los cambios
    observer.observe(document.body, { childList: true, subtree: true });
});

// Ejecutar al cargar la página
ocultarTitulos();
ocultarSegundaImagen();

// Activar observer
observer.observe(document.body, { childList: true, subtree: true });
