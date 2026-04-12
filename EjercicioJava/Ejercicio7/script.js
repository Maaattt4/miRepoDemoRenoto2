let indiceEdicion = -1;
const tablaRef = document.getElementById("tabla");

const banderasOrden = { nombre: false, categoria: false, anio: false };
let datos = [
    { nombre: "HTML", categoria: "Web", anio: "1993" },
    { nombre: "Java", categoria: "Programación", anio: "1995" },
    { nombre: "JavaScript", categoria: "Web", anio: "1995" },
    { nombre: "MongoDB", categoria: "Base de datos", anio: "2007" },
    { nombre: "Python", categoria: "Programación", anio: "1991" },
];

const alternarModoEdicion = () => {
    document.getElementById("enviarElemento").style.display = "none";
    document.getElementById("editarElemento").style.display = "";
};

const alternarModoAgregar = () => {
    document.getElementById("enviarElemento").style.display = "";
    document.getElementById("editarElemento").style.display = "none";
};

function insertarFila(item, i) {
    let fila = tablaRef.insertRow(i + 1);
    let c0 = fila.insertCell(0);
    let c1 = fila.insertCell(1);
    let c2 = fila.insertCell(2);
    let c3 = fila.insertCell(3);
    let c4 = fila.insertCell(4);
    let c5 = fila.insertCell(5);

    c0.innerText = i + 1;
    c1.innerText = item.nombre;
    c2.innerText = item.categoria;
    c3.innerText = item.anio;
    c4.innerHTML = "&#9997;";
    c5.innerHTML = "&#9746;";
    
    c4.classList.add("zoom");
    c5.classList.add("zoom");
    
    c4.addEventListener("click", () => prepararEdicion(c4, i));
    c5.addEventListener("click", () => eliminarElemento(item));
}

function inicializarTabla() {
    datos.map((e, i) => insertarFila(e, i));
}

function ordenarElementos(titulo) {
    limpiarTabla();
    switch (titulo) {
        case "nombre":
            datos.sort((a, b) => a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase()));
            if (banderasOrden.nombre) datos.reverse();
            banderasOrden.nombre = !banderasOrden.nombre;
            break;
        case "categoria":
            datos.sort((a, b) => a.categoria.toLowerCase().localeCompare(b.categoria.toLowerCase()));
            if (banderasOrden.categoria) datos.reverse();
            banderasOrden.categoria = !banderasOrden.categoria;
            break;
        case "anio":
            datos.sort((a, b) => a.anio - b.anio);
            if (banderasOrden.anio) datos.reverse();
            banderasOrden.anio = !banderasOrden.anio;
            break;
    }
    datos.map((e, i) => insertarFila(e, i));
}

function limpiarTabla() {
    while (tablaRef.rows.length > 1) tablaRef.deleteRow(-1);
}

function buscarElementos() {
    let busqueda = document.getElementById("entradaBusqueda").value.toLowerCase();
    let filtrados = datos.filter((e) => {
        return (
            e.nombre.toLowerCase().includes(busqueda) ||
            e.categoria.toLowerCase().includes(busqueda) ||
            e.anio.includes(busqueda)
        );
    });
    limpiarTabla();
    filtrados.map((e, i) => insertarFila(e, i));
}

function prepararEdicion(celda, i) {
    if (!celda.classList.contains("abierto")) {
        celda.classList.add("abierto");
        let item = datos[i];
        alternarModoEdicion();

        document.getElementById("entradaNombre").value = item.nombre;
        document.getElementById("entradaCategoria").value = item.categoria;
        document.getElementById("entradaAnio").value = item.anio;
        indiceEdicion = i;
    } else {
        celda.classList.remove("abierto");
        alternarModoAgregar();
        limpiarCampos();
        indiceEdicion = -1;
    }
}

function actualizarElemento() {
    let nom = document.getElementById("entradaNombre");
    let cat = document.getElementById("entradaCategoria");
    let anio = document.getElementById("entradaAnio");

    datos[indiceEdicion] = {
        nombre: nom.value,
        categoria: cat.value,
        anio: anio.value,
    };

    limpiarTabla();
    datos.map((e, i) => insertarFila(e, i));
    limpiarCampos();
    alternarModoAgregar();
}

function enviarElemento() {
    let nom = document.getElementById("entradaNombre").value;
    let cat = document.getElementById("entradaCategoria").value;
    let anio = document.getElementById("entradaAnio").value;

    if (nom === "" || cat === "" || anio === "") {
        window.alert("Datos incompletos");
        return;
    }

    datos.push({ nombre: nom, categoria: cat, anio: anio });
    limpiarCampos();
    limpiarTabla();
    datos.map((e, i) => insertarFila(e, i));
}

function eliminarElemento(item) {
    datos = datos.filter((e) => e.nombre !== item.nombre);
    limpiarTabla();
    datos.map((e, i) => insertarFila(e, i));
}

function limpiarCampos() {
    document.getElementById("entradaNombre").value = "";
    document.getElementById("entradaCategoria").value = "";
    document.getElementById("entradaAnio").value = "";
}

inicializarTabla();