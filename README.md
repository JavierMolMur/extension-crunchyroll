# Censura de títulos y ocultación de imágenes en Crunchyroll

Este proyecto contiene un script JavaScript para modificar la página de Crunchyroll, con las siguientes funciones:

- **Censurar títulos de episodios**: reemplaza las letras y números del título por asteriscos, manteniendo espacios y signos de puntuación.
- **Ocultar la segunda imagen** en los episodios (por ejemplo, la imagen no pixelada), dejando visible solo la primera (pixelada).

---

## Cómo funciona

- Usa un `MutationObserver` para detectar cambios dinámicos en la página.
- Modifica los textos de los títulos de episodios para censurarlos evitando spoilers.
- Oculta las imágenes con spoilers manteniendo la estructura visual original.

---

## Ejemplo de código

```js
function ocultarTitulos() {
    document.querySelectorAll('a.playable-card-mini-static__title-link--NcI2h').forEach(link => {
        let title = link.textContent;
        let [firstPart, secondPart] = title.split(' - ');
        if (secondPart) {
            // Reemplaza letras y números por '*', pero mantiene espacios y signos
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

const observer = new MutationObserver(() => {
    observer.disconnect();
    ocultarTitulos();
    ocultarSegundaImagen();
    observer.observe(document.body, { childList: true, subtree: true });
});

ocultarTitulos();
ocultarSegundaImagen();
observer.observe(document.body, { childList: true, subtree: true });
