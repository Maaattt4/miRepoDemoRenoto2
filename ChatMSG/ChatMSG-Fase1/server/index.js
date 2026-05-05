const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { createAdapter } = require('@socket.io/redis-adapter');
const Redis = require('ioredis');

const app = express();
app.use(cors());

// CONFIGURACIÓN DE REDIS (Con la contraseña de tu compañero)
const REDIS_URL = "redis://:Ca4DwrGuldlXfhmfgRFb7CNr6jtQzpSH@redis-18104.c251.east-us-mz.azure.cloud.redislabs.com:18104";
const pubClient = new Redis(REDIS_URL);
const subClient = pubClient.duplicate();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Unimos Socket.io con Redis
io.adapter(createAdapter(pubClient, subClient));

io.on('connection', (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  socket.on('enviar_mensaje', (data) => {
    // Al usar el adaptador de Redis, esto le llega a TODOS
    io.emit('recibir_mensaje', data);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado ❌');
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Servidor Fase 1 corriendo en puerto ${PORT} 🚀`);
});