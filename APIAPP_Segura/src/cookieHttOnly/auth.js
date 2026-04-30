import jwt from "jsonwebtoken";
const SECRET = "supersupersecreto";

export default function auth(req, res, next) {
    const token = req.cookies.token; // Busca la cookie llamada 'token'

    if (!token) return res.status(401).json({ message: "No autenticado" });

    try {
        const decoded = jwt.verify(token, SECRET); // Verifica que el token no sea falso
        req.user = decoded;
        next(); // Si todo está bien, deja pasar al usuario
    } catch (error) {
        return res.status(401).json({ message: "Token no válido" });
    }
}