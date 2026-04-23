import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import auth from "./cookieHttOnly/auth.js";

const app = express();
const SECRET = "supersupersecreto";

app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));

// Rutas
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "1234") {
        const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { 
            httpOnly: true, 
            secure: false, 
            sameSite: "lax", 
            maxAge: 3600000 
        });
        return res.json({ message: "Login exitoso" });
    }
    return res.status(401).json({ message: "Credenciales inválidas" });
});

app.get("/perfil", auth, (req, res) => {
    res.json({ 
        message: "Eres un usuario protegido",
        user: req.user
    });
});

app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout exitoso" });
});

app.listen(4000, () => {
    console.log("Servidor escuchando en el puerto 4000");
});