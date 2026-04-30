import { useState, useEffect } from "react";

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            // Importante: El puerto debe ser 4000 que es donde corre tu server.js
            const res = await fetch("http://localhost:4000/perfil", {
                credentials: "include" // 🛡️ Esto permite enviar la cookie HttpOnly
            });
            
            if (!res.ok) throw new Error("No autenticado");

            const data = await res.json();
            setUser(data.user); // Guardamos los datos del usuario (ej. {username: 'admin'})
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return { user, loading, checkAuth };
}