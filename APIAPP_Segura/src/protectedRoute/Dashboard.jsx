import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ user, onLogout }) {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGen5 = async () => {
            try {
                // Offset 493 es donde termina la 4ta gen e inicia la 5ta
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=156&offset=493");
                const data = await response.json();
                
                const detailedData = await Promise.all(
                    data.results.map(async (p) => {
                        const res = await fetch(p.url);
                        return res.json();
                    })
                );
                setPokemons(detailedData);
            } catch (error) {
                console.error("Error cargando la Pokedex", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGen5();
    }, []);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#333", color: "white", padding: "10px 20px", borderRadius: "10px" }}>
                <h2>Pokedex: Teselia (Gen 5)</h2>
                <div>
                    <span>Entrenador: <strong>{user?.username}</strong> </span>
                    <button onClick={onLogout} style={{ marginLeft: "15px", cursor: "pointer", background: "#ff4444", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px" }}>Salir</button>
                </div>
            </div>

            {loading ? <p>Cargando Pokémon...</p> : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "15px", marginTop: "20px" }}>
                    {pokemons.map(p => (
                        <div 
                            key={p.id} 
                            onClick={() => navigate(`/pokemon/${p.id}`)}
                            style={{ border: "2px solid #ddd", borderRadius: "15px", padding: "10px", textAlign: "center", cursor: "pointer", background: "#fff", transition: "transform 0.2s" }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                            <img src={p.sprites.front_default} alt={p.name} style={{ width: "90px" }} />
                            <p style={{ fontWeight: "bold", textTransform: "capitalize", margin: "5px 0" }}>{p.name}</p>
                            <small style={{ color: "#777" }}>#{p.id}</small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}