const datos = [
    { p: "¿Región del juego?", o: ["Teselia", "Kanto", "Sinnoh", "Johto"], r: "Teselia" },
    { p: "¿Líder Equipo Plasma?", o: ["Ghechis", "N", "Acromo", "Giovanni"], r: "N" },
    { p: "¿Inicial tipo Fuego?", o: ["Tepig", "Snivy", "Oshawott", "Charmander"], r: "Tepig" },
    { p: "¿Legendario que no es de la región?", o: ["Reshiram", "Zekrom", "Kyurem", "Mewtwo"], r: "Mewtwo" }
];

let actual = 0;
let puntos = 0;
let tiempo = 30;
let reloj;

const txtTiempo = document.getElementById('tiempo');
const txtPregunta = document.querySelector('.pregunta');
const divOpciones = document.querySelector('.opciones');
const divResultado = document.querySelector('.resultado');
const txtPuntos = document.getElementById('puntaje');
const btnReset = document.querySelector('.boton-reiniciar');

function iniciar() {
    if (actual >= datos.length) {
        finalizar();
        return;
    }
    clearInterval(reloj);
    tiempo = 30;
    txtTiempo.textContent = tiempo;
    
    reloj = setInterval(() => {
        tiempo--;
        txtTiempo.textContent = tiempo;
        if (tiempo <= 0) finalizar();
    }, 1000);

    const item = datos[actual];
    txtPregunta.textContent = item.p;
    divOpciones.innerHTML = '';
    
    item.o.forEach(opt => {
        const btn = document.createElement('button');
        btn.classList.add('opcion');
        btn.textContent = opt;
        btn.onclick = () => {
            if (opt === item.r) puntos++;
            actual++;
            iniciar();
        };
        divOpciones.appendChild(btn);
    });
}

function finalizar() {
    clearInterval(reloj);
    txtPregunta.style.display = 'none';
    divOpciones.style.display = 'none';
    divResultado.style.display = 'block';
    txtPuntos.textContent = puntos;
    btnReset.style.display = 'block';
}

btnReset.onclick = () => {
    actual = 0;
    puntos = 0;
    txtPregunta.style.display = 'block';
    divOpciones.style.display = 'grid';
    divResultado.style.display = 'none';
    btnReset.style.display = 'none';
    iniciar();
};

iniciar();