document.addEventListener("DOMContentLoaded", () => {
    const formularioGasto = document.getElementById("formulario-gastos");
    const listaGastosUI = document.getElementById("lista-gastos");
    const montoTotalUI = document.getElementById("monto-total");
    const filtroCategoria = document.getElementById("filtrar-categoria");

    let gastos = [];

    formularioGasto.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre-gasto").value;
        const monto = parseFloat(document.getElementById("monto-gasto").value);
        const categoria = document.getElementById("categoria-gasto").value;
        const fecha = document.getElementById("fecha-gasto").value;

        const gasto = {
            id: Date.now(),
            nombre,
            monto,
            categoria,
            fecha
        };

        gastos.push(gasto);
        mostrarGastos(gastos);
        actualizarMontoTotal();
        formularioGasto.reset();
    });

    listaGastosUI.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-eliminar")) {
            const id = parseInt(e.target.dataset.id);
            gastos = gastos.filter(gasto => gasto.id !== id);
            mostrarGastos(gastos);
            actualizarMontoTotal();
        }

        if (e.target.classList.contains("btn-editar")) {
            const id = parseInt(e.target.dataset.id);
            const gasto = gastos.find(gasto => gasto.id === id);

            document.getElementById("nombre-gasto").value = gasto.nombre;
            document.getElementById("monto-gasto").value = gasto.monto;
            document.getElementById("categoria-gasto").value = gasto.categoria;
            document.getElementById("fecha-gasto").value = gasto.fecha;

            gastos = gastos.filter(gasto => gasto.id !== id);
            mostrarGastos(gastos);
            actualizarMontoTotal();
        }
    });

    filtroCategoria.addEventListener("change", (e) => {
        const categoria = e.target.value;
        if (categoria === "Todas") {
            mostrarGastos(gastos);
        } else {
            const gastosFiltrados = gastos.filter(gasto => gasto.categoria === categoria);
            mostrarGastos(gastosFiltrados);
        }
    });

    function mostrarGastos(listaParaMostrar) {
        listaGastosUI.innerHTML = "";
        listaParaMostrar.forEach(gasto => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${gasto.nombre}</td>
                <td>$${gasto.monto.toFixed(2)}</td>
                <td>${gasto.categoria}</td>
                <td>${gasto.fecha}</td>
                <td>
                    <button class="btn-editar" data-id="${gasto.id}">Editar</button>
                    <button class="btn-eliminar" data-id="${gasto.id}">Eliminar</button>
                </td>
            `;

            listaGastosUI.appendChild(fila);
        });
    }

    function actualizarMontoTotal() {
        const total = gastos.reduce((suma, gasto) => suma + gasto.monto, 0);
        montoTotalUI.textContent = total.toFixed(2);
    }
});