import PokemonCard from './pokemoncard.jsx';

export default function GrupoPokemonCard() {
  // Generamos un array con 20 números (del 0 al 19)
  const espacios = [...Array(20).keys()];

  return (
    <div className="deck-container">
      <h1 className="deck-title">Colección de 20 Pokémon</h1>
      <div className="pokemon-grid">
        {espacios.map((i) => (
          <PokemonCard key={i} />
        ))}
      </div>
    </div>
  );
}