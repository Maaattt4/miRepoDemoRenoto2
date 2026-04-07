// 1. Selección de elementos (Asegúrate de que las clases coincidan con tu HTML)
const barraProgreso = document.querySelector(".barra-desplazamiento .progreso-slider");
const inputsRango = document.querySelectorAll(".entrada-rango input");
const inputsPrecio = document.querySelectorAll(".entrada-precios input");

let diferenciaMinima = 500;

// 2. La función que mueve la barra verde
const actualizarBarraVisual = () => {
    let minVal = parseInt(inputsPrecio[0].value);
    let maxVal = parseInt(inputsPrecio[1].value);
    let maxRango = inputsRango[0].max;

    barraProgreso.style.left = `${(minVal / maxRango) * 100}%`;
    barraProgreso.style.right = `${100 - (maxVal / maxRango) * 100}%`;
};

// 3. Eventos para cuando escribes en los cuadros de texto
inputsPrecio.forEach((input) => {
    input.addEventListener("input", e => {
        let precioMin = parseInt(inputsPrecio[0].value);
        let precioMax = parseInt(inputsPrecio[1].value);

        if (precioMin < 0) { inputsPrecio[0].value = 0; precioMin = 0; }
        if (precioMax > 10000) { inputsPrecio[1].value = 10000; precioMax = 10000; }

        if ((precioMax - precioMin >= diferenciaMinima)) {
            if (e.target.className === "input-minimo") {
                inputsRango[0].value = precioMin;
            } else {
                inputsRango[1].value = precioMax;
            }
            actualizarBarraVisual();
        }
    });
});

// 4. Eventos para cuando mueves las bolitas (sliders)
inputsRango.forEach((input) => {
    input.addEventListener("input", e => {
        let valMin = parseInt(inputsRango[0].value);
        let valMax = parseInt(inputsRango[1].value);

        if (valMax - valMin < diferenciaMinima) {
            if (e.target.className === "rango-min") {
                inputsRango[0].value = valMax - diferenciaMinima;
            } else {
                inputsRango[1].value = valMin + diferenciaMinima;
            }
        } else {
            inputsPrecio[0].value = valMin;
            inputsPrecio[1].value = valMax;
            actualizarBarraVisual();
        }
    });
});

// 5. El arranque inicial
actualizarBarraVisual();