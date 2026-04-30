import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PokemonDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [description, setDescription] = useState("");

    useEffect(() => {
        const fetchDetails = async () => {
            // Datos básicos e imagen
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await res.json();
            setPokemon(data);

            // Descripción en español
            const resSpecies = await fetch(data.species.url);
            const dataSpecies = await resSpecies.json();
            const text = dataSpecies.flavor_text_entries.find(e => e.language.name === "es");
            setDescription(text ? text.flavor_text : "No hay descripción disponible.");
        };
        fetchDetails();
    }, [id]);

    if (!pokemon) return <p>Cargando datos del Pokémon...</p>;

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px" }}>
            <button onClick={() => navigate("/home")} style={{ alignSelf: "flex-start", marginBottom: "20px" }}>
                ⬅ Volver a la Pokedex
            </button>
            
            <div style={{ 
                border: "5px solid #ffcb05", 
                borderRadius: "20px", 
                padding: "20px", 
                width: "300px", 
                textAlign: "center",
                backgroundColor: "#3d7dca",
                color: "white",
                boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
            }}>
                <h2 style={{ textTransform: "uppercase" }}>{pokemon.name}</h2>
                <div style={{ backgroundColor: "white", borderRadius: "10px", margin: "10px 0" }}>
                    <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} style={{ width: "200px" }} />
                </div>
                <div style={{ backgroundColor: "#f0f0f0", color: "#333", padding: "15px", borderRadius: "10px", textAlign: "left" }}>
                    <strong>Descripción:</strong>
                    <p>{description}</p>
                    <hr />
                    <p><strong>Tipo:</strong> {pokemon.types.map(t => t.type.name).join(", ")}</p>
                </div>
            </div>
        </div>
    );
}