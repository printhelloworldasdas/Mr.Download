// Esperar a que cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('aceptar-terminos');
    const botonDescarga = document.getElementById('boton-descarga');

    // Deshabilitar botón al inicio
    botonDescarga.setAttribute('disabled', 'true');

    // Habilitar botón si acepta los términos
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            botonDescarga.removeAttribute('disabled');
        } else {
            botonDescarga.setAttribute('disabled', 'true');
        }
    });
});
