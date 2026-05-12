require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Redis = require('ioredis');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// --- ESTADO EN RAM (Persistencia volátil) ---
let historialMensajes = []; 

// --- MIDDLEWARES ---
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));

// --- CONEXIÓN REDIS PUB/SUB ---
const redisConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
};

const pub = new Redis(redisConfig);
const sub = new Redis(redisConfig);

sub.subscribe(process.env.REDIS_CHANNEL);

// Escuchar mensajes de Redis (Vengan de mi servidor o de otros)
sub.on("message", (channel, message) => {
  if (channel === process.env.REDIS_CHANNEL) {
    const msgData = JSON.parse(message);
    
    // Guardar en RAM local
    historialMensajes.push(msgData);
    if (historialMensajes.length > 200) historialMensajes.shift();

    // Emitir a mis clientes Socket.io
    io.emit('chat:message', msgData);
  }
});

// --- API ENDPOINTS ---

// Login y entrega de Cookie httpOnly
app.post("/api/session", (req, res) => {
  const { nickname } = req.body;
  if (!nickname) return res.status(400).json({ error: "Falta nickname" });

  const token = jwt.sign({ nickname }, process.env.JWT_SECRET);

  res.cookie("user_token", token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false, // true en producción con HTTPS
    maxAge: 3600000 
  });

  res.json({ success: true, nickname });
});

app.get("/api/me", (req, res) => {
  const token = req.cookies.user_token;
  if (!token) return res.status(401).json({ error: "No autenticado" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ nickname: decoded.nickname });
  } catch (err) { res.status(401).send(); }
});

app.get("/api/messages", (req, res) => {
  res.json(historialMensajes);
});

// --- SOCKET.IO CON SEGURIDAD ---
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true }
});

// Middleware: Validar JWT en el handshake
io.use((socket, next) => {
  const cookie = socket.handshake.headers.cookie;
  const token = cookie?.split('; ').find(row => row.startsWith('user_token='))?.split('=')[1];

  if (!token) return next(new Error("Acceso denegado"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded; // Inyectamos el usuario en el socket
    next();
  } catch (err) { next(new Error("Token inválido")); }
});

io.on('connection', (socket) => {
  console.log(`📡 Conectado: ${socket.user.nickname}`);

  socket.on('chat:send', (content) => {
    const nuevoMensaje = {
      id: Date.now(),
      nickname: socket.user.nickname, // Usamos el del JWT, no el que mande el cliente
      text: content,
      serverId: process.env.SERVER_ID
    };

    // NO hacemos io.emit aquí. Publicamos en Redis para que TODOS los servidores lo reciban.
    pub.publish(process.env.REDIS_CHANNEL, JSON.stringify(nuevoMensaje));
  });
});

server.listen(process.env.PORT, () => {
  console.log(`🚀 Servidor Fase 2 listo en puerto ${process.env.PORT}`);
});