const camposEntrada = document.querySelector(".camposEntrada");
const seccionPrincipal = document.querySelector(".constructor-cv");
const contenedorSalida = document.querySelector(".contenedor_salida");
let estaOculto = true;

function alternarVisibilidad() {
    if (estaOculto) {
        seccionPrincipal.style.display = "none";
        estaOculto = false;

        contenedorSalida.style.display = "block";
        contenedorSalida.innerHTML = `
            <div class="salida">
                <div class="encabezado">
                    <h1>${camposEntrada["nombre"].value}</h1>
                    <h4>${camposEntrada["titulo"].value}</h4>
                </div>
                <div class="info">
                    <div class="izquierda">
                        <div class="caja">
                            <h2>Objetivo</h2>
                            <p>${camposEntrada["objetivo"].value}</p>
                        </div>
                        <div class="caja">
                            <h2>Habilidades</h2>
                            <p>${camposEntrada["habilidades"].value}</p>
                        </div>
                        <div class="caja">
                            <h2>Detalles Académicos</h2>
                            <p>${camposEntrada["detalles_academicos"].value}</p>
                        </div>
                        <div class="caja">
                            <h2>Contacto</h2>
                            <p>${camposEntrada["contacto"].value}</p>
                        </div>
                    </div>
                    <div class="derecha">
                        <div class="caja">
                            <h2>Experiencia Laboral</h2>
                            <p>${camposEntrada["experiencia_laboral"].value}</p>
                        </div>
                        <div class="caja">
                            <h2>Logros</h2>
                            <p>${camposEntrada["logros"].value}</p>
                        </div>
                        <div class="caja">
                            <h2>Proyectos</h2>
                            <p>${camposEntrada["proyectos"].value}</p>
                        </div>
                    </div>
                </div>
            </div>
            <button onclick="window.print()">Imprimir Currículum</button>
        `;
    } else {
        seccionPrincipal.style.display = "block";
        estaOculto = true;
        contenedorSalida.style.display = "none";
        contenedorSalida.innerHTML = "";
    }
}