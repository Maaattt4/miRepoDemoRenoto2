const URL_API = "https://api.github.com/users/";

let scriptAxios = document.createElement("script");
scriptAxios.src = "https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.0/axios.min.js";
scriptAxios.crossOrigin = "anonymous";
document.head.appendChild(scriptAxios);

const contenedorMain = document.getElementById("contenedor-principal");
const formulario = document.getElementById("formularioUsuario");
const cajaTexto = document.getElementById("cajaBusqueda");


const obtenerUsuario = (nombreUsuario) => {
    axios(URL_API + nombreUsuario)
        .then((respuesta) => {
            crearTarjetaUsuario(respuesta.data);
            obtenerRepositorios(nombreUsuario);
        })
        .catch((error) => {
            if (error.response && error.response.status == 404) {
                mostrarError("No se encontró el perfil con ese nombre");
            }
        });
};

const obtenerRepositorios = (nombreUsuario) => {
    axios(URL_API + nombreUsuario + "/repos?sort=created")
        .then((respuesta) => {
            agregarRepositoriosATarjeta(respuesta.data);
        })
        .catch(() => {
            mostrarError("Hubo un problema al cargar los repositorios");
        });
};

const crearTarjetaUsuario = (usuario) => {
    const nombreAMostrar = usuario.name || usuario.login;
    const biografia = usuario.bio ? `<p>${usuario.bio}</p>` : "";
    
    const contenidoHTML = `
        <div class="tarjeta">
            <div>
                <img src="${usuario.avatar_url}" alt="${usuario.name}" class="foto-perfil">
            </div>
            <div class="info-usuario">
                <h2>${nombreAMostrar}</h2>
                ${biografia}
                <ul>
                    <li>${usuario.followers} <strong>Seguidores</strong></li>
                    <li>${usuario.following} <strong>Siguiendo</strong></li>
                    <li>${usuario.public_repos} <strong>Repos</strong></li>
                </ul>
                <div id="lista-repos"></div>
            </div>
        </div>`;
    
    contenedorMain.innerHTML = contenidoHTML;
};

const mostrarError = (mensaje) => {
    const errorHTML = `
        <div class="tarjeta">
            <h1>${mensaje}</h1>
        </div>`;
    contenedorMain.innerHTML = errorHTML;
};

const agregarRepositoriosATarjeta = (repositorios) => {
    const contenedorRepos = document.getElementById("lista-repos");
    
    for (let i = 0; i < 5 && i < repositorios.length; i++) {
        const repo = repositorios[i];
        const enlaceRepo = document.createElement("a");
        
        enlaceRepo.classList.add("repositorio-link");
        enlaceRepo.href = repo.html_url;
        enlaceRepo.target = "_blank";
        enlaceRepo.innerText = repo.name;
        
        contenedorRepos.appendChild(enlaceRepo);
    }
};

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const usuarioBuscado = cajaTexto.value;
    
    if (usuarioBuscado) {
        obtenerUsuario(usuarioBuscado);
        cajaTexto.value = "";
    }
});