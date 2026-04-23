import jwt from "jsonwebtoken";
const SECRET = "supersupersecreto";

export default function auth(req, res, next) {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "No autenticado" });

    try {
        const decoded = jwt.verify(token, SECRET); 
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token no válido" });
    }
}