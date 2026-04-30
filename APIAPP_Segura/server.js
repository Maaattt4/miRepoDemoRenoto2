import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import auth from "./src/cookieHttOnly/auth.js"; // Importamos el middleware que haremos en el paso 2

const app = express();
const SECRET = "supersupersecreto"; // Llave para firmar los tokens

app.use(express.json()); 
app.use(cookieParser()); // Para que el servidor pueda leer cookies
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true // Permitir el envío de cookies entre cliente y servidor
}));

// Ruta de Login: Genera la Cookie HttpOnly
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    // Aquí puedes usar "admin"/"1234" o "Ash"/"pika123"
    if (username === "admin" && password === "1234") {
        const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { 
            httpOnly: true, // 🛡️ Evita que JS acceda a la cookie
            secure: false,  // false porque estamos en localhost (sin HTTPS)
            sameSite: "lax", 
            maxAge: 3600000 // 1 hora de vida
        });
        return res.json({ message: "Login exitoso" });
    }
    return res.status(401).json({ message: "Credenciales inválidas" });
});

// Ruta Protegida: Verifica la identidad
app.get("/perfil", auth, (req, res) => {
    res.json({ 
        message: "Eres un usuario protegido",
        user: req.user
    });
});

// Ruta Logout: Borra la cookie
app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout exitoso" });
});

app.listen(4000, () => {
    console.log("Servidor escuchando en http://localhost:4000");
});