const contenedorEntradas = document.getElementById("entradas");
const todasLasEntradas = document.querySelectorAll(".entrada");

contenedorEntradas.addEventListener("input", function (e) {
    const objetivo = e.target;
    const valor = objetivo.value;

    if (isNaN(valor)) {
        objetivo.value = "";
        return;
    }

    if (valor !== "") {
        const siguiente = objetivo.nextElementSibling;
        if (siguiente) {
            siguiente.focus();
        }
    }

    // Comprobar si el código es 2005
    verificarCodigo();
});

contenedorEntradas.addEventListener("keyup", function (e) {
    const objetivo = e.target;
    const tecla = e.key.toLowerCase();

    if (tecla === "backspace" || tecla === "delete") {
        objetivo.value = "";
        const anterior = objetivo.previousElementSibling;
        if (anterior) {
            anterior.focus();
        }
    }
});

function verificarCodigo() {
    // Unimos los valores de los 4 inputs
    let codigoCompleto = "";
    todasLasEntradas.forEach(input => {
        codigoCompleto += input.value;
    });

    // Si el código tiene 4 dígitos y es 2005
    if (codigoCompleto.length === 4) {
        if (codigoCompleto === "2005") {
            alert("Has iniciado sesión con éxito");
        } else {
            console.log("Código incorrecto");
        }
    }
}