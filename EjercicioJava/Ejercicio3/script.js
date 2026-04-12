let iconos = {
    exito: '<span class="material-symbols-outlined">task_alt</span>',
    error: '<span class="material-symbols-outlined">error</span>',
    alerta: '<span class="material-symbols-outlined">warning</span>',
    info: '<span class="material-symbols-outlined">info</span>',
};

const mostrarToast = (
    mensaje = "Mensaje de ejemplo",
    tipoToast = "info",
    duracion = 5000) => {
    
    // Validar si el tipo existe, si no, usar info por defecto
    if (!Object.keys(iconos).includes(tipoToast)) {
        tipoToast = "info";
    }

    let caja = document.createElement("div");
    caja.classList.add("notificacion", `toast-${tipoToast}`);
    
    caja.innerHTML = `
        <div class="envoltura-contenido">
            <div class="icono-toast">${iconos[tipoToast]}</div>
            <div class="mensaje-toast">${mensaje}</div>
            <div class="progreso-toast"></div>
        </div>`;

    caja.querySelector(".progreso-toast").style.animationDuration = `${duracion / 1000}s`;

    // Eliminar toast anterior si existe para no amontonarlos
    let toastExistente = document.body.querySelector(".notificacion");
    if (toastExistente) {
        toastExistente.remove();
    }

    document.body.appendChild(caja);
};

let btnExito = document.querySelector(".boton-exito");
let btnInfo = document.querySelector(".boton-info");
let btnError = document.querySelector(".boton-error");
let btnAlerta = document.querySelector(".boton-alerta");

btnExito.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarToast("Artículo enviado con éxito", "exito", 5000);
});

btnInfo.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarToast("Tienes una nueva notificación informativa", "info", 5000);
});

btnError.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarToast("Error inesperado al procesar", "error", 5000);
});

btnAlerta.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarToast("¡Cuidado! Error en el servidor", "alerta", 5000);
});