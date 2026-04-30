import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, loading, children }) {
    // Mientras esperamos la respuesta del servidor, mostramos un mensaje
    if (loading) return <p>Cargando sesión...</p>;
    
    // Si después de cargar no hay usuario, lo mandamos al login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Si todo está bien, mostramos el contenido (Home, Detalles, etc.)
    return children;
}