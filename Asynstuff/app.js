// /*
// /*
// const showMessage = () => {
//     setTimeout(() => {
//         console.log("Hello");
//     }, 3000);
// };
// */
// //tarea asincrona
// async function tarea() {
//     return "asyncrhronus task";
// }
// // Para ejecutar la tarea asincrona, se debe usar el await, pero para eso se debe colocar la palabra async antes de la funcion que la ejecuta
// // esto es una forma de ejecutar appis
// async function ejecuta() {
//     const respuesta = await tarea();
//     console.log(respuesta);
// }
// ejecuta();
// //showMessage();

// //Ejemplo de promesas
// //una promesa sirve para manejar tareas asincronas, es una forma de manejar el resultado de una tarea asincrona, ya sea que se cumpla o se rechace
// //una promesa tiene 3 estados: pendiente, cumplida y rechazada
// const promesa = new Promise(
//     (resolve, reject) => {
//         const todobien = true;
//         setTimeout(() => {
//             if (todobien) {
//                 resolve("Todo bien");
//             } else {
//                 reject("Todo mal");
//             }
//         }, 5000)
//     }
// );
// //la forma de ejecutar una promesa es usando el metodo then, que se ejecuta cuando la promesa se cumple, y el metodo catch, que se ejecuta cuando la promesa se rechaza
// todobien=true;
// promesa.then((respuesta) => {
//     console.log(respuesta);
// }).catch((error) => {
//     console.log(error);
// });


// //esta es una forma de encadenar promesas, es decir, ejecutar una promesa despues de que se cumpla otra promesa
// const promesaUno = new Promise(
//     (resolve, reject) => {
//         resolve("Promesa uno resuelta");
//     }
// );

// const promesaDos = new Promise(
//     (resolve, reject) => {
//         resolve("Promesa dos resuelta");
//     }
// );

// const promesaTres = new Promise(
//     (resolve, reject) => {
//         reject("Promesa tres fallida");
//     }
// );  

// promesaUno
// .then(
//     (res) => {
//         console.log(res);
//         return promesaDos;
//     }
// )
// .then(
//     (res) => {
//         console.log(res);
//         return promesaTres;
//     }
// )
// .catch(
//     (error) => {
//         console.log(error);
//     }
// );

// //esta es otra forma de encadenar promesas,usando el metodo then dentro del metodo then, lo que se conoce como callback hell, y es una forma de manejar las promesas que no es recomendable, ya que hace que el codigo sea dificil de leer y mantener

// const promesaUno1 = new Promise(
//     (resolve, reject) => {
//         resolve("Promesa uno resuelta");
//     }
// );

// const promesaDos2 = new Promise(
//     (resolve, reject) => {
//         resolve("Promesa dos resuelta");
//     }
// );

// const promesaTres3 = new Promise(
//     (resolve, reject) => {
//         reject("Promesa tres fallida");
//     }
// );  

// promesaUno1.then(
//     (respuesta) => {
//         console.log(respuesta);
//         promesaDos2.then(
//             (respuesta2) => {
//                 console.log(respuesta2);
//                 promesaTres3.then(
//                     (respuesta3) => {
//                         console.log(respuesta3);
//                     }
//                 ).catch(
//                     (error) => {
//                         console.log(error);
//                     }
//                 );
//             }
//         )
//     }
// )

/*
const contenedor = document.getElementById("pokemonContainer");

async function getPokemon() {
    try {
        const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const datos = await respuesta.json();
        
        
        const detalles = await fetch(datos.results[0].url);
        const pokemon = await detalles.json(); 

        //crear la tarjeta del pokemon
        const col = document.createElement("div");
        col.className = "col-md-4 col-lg-3";
        col.innerHTML = `
        <div class="card h-100 shadow-lg bg-secondary text-white">
            <img src="${pokemon.sprites.other['official-artwork'].front_default}"
            class="card-img-top p-3"
            alt ="${pokemon.name}">
            <div class="card-body text-center">
                <h5 class="card-title text-capitalize">${pokemon.name}</h5>
                <p class="card-text">
                    Tipo: ${pokemon.types.map(t => t.type.name).join(", ")}
                </p>
            </div>
        </div>
        `;
        contenedor.appendChild(col);
    } catch (error) {
        console.error("Hubo un error al obtener el Pokémon:", error);
    }
}

getPokemon();
*/


const contenedor = document.getElementById("pokemonContainer");
    async function getPokemon() {
        const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const datos = await respuesta.json();
        datos.results.forEach(
            pokemon => {fetchDetalles(pokemon.url)}
        );
    }

    async function fetchDetalles(url) {
        const detalles = await fetch(url);
        const pokemon = await detalles.json();
        createCard(pokemon);
    }

    function createCard(pokemon) {
        const col = document.createElement("div");
        col.className = "col-md-4 col-lg-3";
        col.innerHTML = `
        <div class="card h-100 shadow-lg bg-secondary text-white">
            <img src="${pokemon.sprites.other['official-artwork'].front_default}"
            class="card-img-top p-3"
            alt ="${pokemon.name}">
            <div class="card-body text-center">
                <h5 class="card-title text-capitalize">${pokemon.name}</h5>
                <p class="card-text">
                    Tipo: ${pokemon.types.map(t => t.type.name).join(", ")}
                </p>
            </div>
        </div>
        `;
        contenedor.appendChild(col);
    }

getPokemon();
