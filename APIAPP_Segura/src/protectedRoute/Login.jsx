import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // 🛡️ Para que el navegador acepte la cookie que viene del server
            body: JSON.stringify({ username, password })
        });

        if (res.ok) {
            await onLogin(); // Actualiza el estado global de auth
            navigate("/home"); // Nos vamos a la Pokedex
        } else {
            alert("Credenciales incorrectas. Intenta con admin / 1234");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Ingreso Entrenador</h2>
            <form onSubmit={handleLogin}>
                <input 
                    placeholder="Usuario" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    style={{ display: "block", margin: "10px auto" }}
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    style={{ display: "block", margin: "10px auto" }}
                />
                <button type="submit">Entrar a la Pokedex</button>
            </form>
        </div>
    );
}