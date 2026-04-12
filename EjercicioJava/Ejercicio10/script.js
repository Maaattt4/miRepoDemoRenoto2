function calcular() {
    const q = document.getElementById("quimica").value;
    const l = document.getElementById("lengua").value;
    const m = document.getElementById("matematicas").value;
    const f = document.getElementById("fisica").value;
    const display = document.getElementById("datos-resultado");

    if (q === "" || l === "" || m === "" || f === "") {
        alert("Por favor, completa todas las materias.");
        return;
    }

    const n1 = parseFloat(q);
    const n2 = parseFloat(l);
    const n3 = parseFloat(m);
    const n4 = parseFloat(f);

    const promedio = (n1 + n2 + n3 + n4) / 4;
    const porcentaje = promedio * 10;
    const estado = (promedio >= 6) ? "APROBADO" : "REPROBADO";
    const colorEstado = (promedio >= 6) ? "green" : "red";

    display.style.display = "block";
    display.innerHTML = `
        Promedio Final: ${promedio.toFixed(1)} / 10 <br>
        Porcentaje: ${porcentaje.toFixed(0)}% <br>
        Estado: <span style="color: ${colorEstado}">${estado}</span>
    `;
}