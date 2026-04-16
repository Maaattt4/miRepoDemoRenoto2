import { useEffect, useState } from 'react';

export default function PokemonCard() {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                // Generamos un ID al azar (1 al 151 para la Gen 1)
                const randomId = Math.floor(Math.random() * 151) + 1;
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
                const data = await response.json();
                setPokemon(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching pokemon:', error);
                setLoading(false);
            }
        };

        fetchPokemon();
    }, []);

    if (loading) return <div style={{color: 'white'}}>Cargando carta...</div>;

    return (
        <div className="pokemon-card">
            {/* Parte superior: Nombre y HP */}
            <div className="card-header">
                <span className="stage">Básico</span>
                <h2 className="name">{pokemon.name}</h2>
                <span className="hp">{pokemon.stats[0].base_stat * 2} HP</span>
            </div>

            {/* Ilustración central */}
            <div className="image-container">
                <img 
                    src={pokemon.sprites.other['official-artwork'].front_default} 
                    alt={pokemon.name} 
                />
            </div>

            {/* Cuerpo de la carta: Datos y Stats */}
            <div className="card-body">
                <div className="info-bar">
                    Pokémon No. {pokemon.id}  HT: {pokemon.height / 10}m  WT: {pokemon.weight / 10}kg
                </div>
                
                <div className="stats-section">
                    <p><strong>Tipo:</strong> <span className="type-badge">{pokemon.types.map(t => t.type.name).join(' / ')}</span></p>
                    <p><strong>Ataque base:</strong> <span>{pokemon.stats[1].base_stat}</span></p>
                    <p><strong>Defensa base:</strong> <span>{pokemon.stats[2].base_stat}</span></p>
                </div>

                <div className="flavor-text">
                    Generado aleatoriamente usando PokeAPI. Cada recarga muestra un nuevo Pokémon de la región de Kanto.
                </div>
            </div>
            
            {/* Pie de carta */}
            <div className="card-footer">
                <span>Illus. React + Vite</span>
                <span>ID: {pokemon.id}/151 ★</span>
            </div>
        </div>
    );
}