export default function Dashboard({ user, onLogout }) {
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Bienvenido al dashboard</p>
            <p>Usuario: {user?.username}</p>
            <button onClick={onLogout}>Cerrar sesión</button>
        </div>
    );
}