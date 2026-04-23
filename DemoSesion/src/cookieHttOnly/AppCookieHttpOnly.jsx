import { useState } from "react";

export default function AppCookieHttpOnly() {
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("1234");
    const [mensaje, setMensaje] = useState("");

    const API_URL = "http://localhost:4000"; 

    const login = async () => {
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            setMensaje(data.message);
        } catch (err) {
            setMensaje("Error de conexión con el servidor");
        }
    };

    const obtenerPerfil = async () => {
        try {
            const res = await fetch(`${API_URL}/perfil`, { credentials: "include" });
            const data = await res.json();
            setMensaje(data.message || data.error);
        } catch (err) {
            setMensaje("Error al obtener perfil");
        }
    };

    const logout = async () => {
        try {
            const res = await fetch(`${API_URL}/logout`, {
                method: "POST",
                credentials: "include"
            });
            const data = await res.json();
            setMensaje(data.message);
        } catch (err) {
            setMensaje("Error al cerrar sesión");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Autentificación con cookie segura</h2>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
            <button onClick={login}>Login</button>
            <button onClick={obtenerPerfil}>Perfil</button>
            <button onClick={logout}>Logout</button>
            <div>
                <br />
                <strong>Respuesta:</strong>
                <p>{mensaje}</p>
            </div>
        </div>
    );
}