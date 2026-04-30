import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import { useAuth } from "./useAuth";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Dashboard";
import PokemonDetail from "./PokemonDetail"; // Importamos la nueva pantalla

export default function AppProtectedRoute() {
    const { user, loading, checkAuth } = useAuth();

    const logout = async () => {
        await fetch("http://localhost:4000/logout", {
            method: "POST",
            credentials: "include"
        });
        await checkAuth();
    };

    return (
        <Routes>
            <Route path="/login" element={<Login onLogin={checkAuth} />} />

            {/* Pantalla Principal de la Pokedex */}
            <Route path="/home" element={
                <ProtectedRoute user={user} loading={loading}>
                    <Dashboard user={user} onLogout={logout} />
                </ProtectedRoute>
            } />

            {/* Nueva Pantalla de Detalle Protegida */}
            <Route path="/pokemon/:id" element={
                <ProtectedRoute user={user} loading={loading}>
                    <PokemonDetail />
                </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}