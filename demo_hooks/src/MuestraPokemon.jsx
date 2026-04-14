import { useEffect, useState } from "react";

export function MuestraPokemon() {
    const [pokemon, setPokemon] = useState(null);
    //el useEffect sirve para ejecutar código después de que el componente se haya renderizado. En este caso, se utiliza para hacer una solicitud a la API de Pokémon y obtener los datos de Pikachu.
    useEffect(() => {
        //el fatch es una función que se utiliza para hacer solicitudes HTTP. En este caso, se hace una solicitud GET a la URL de la API de Pokémon para obtener los datos de Pikachu.
        fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
        .then((response) => response.json())
        .then((data) => setPokemon(data));
    }, []);

    return pokemon ? <h1>{pokemon.name}</h1> : <h2>Cargando...</h2>;

}