import { useState, useEffect } from "react";

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const res = await fetch("http://localhost:5131/perfil", {
                credentials: "include"
            });
            
            // CORRECCIÓN: Si NO está ok, lanzamos error para ir al catch
            if (!res.ok) throw new Error("No autenticado");

            const data = await res.json();
            setUser(data.user);
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