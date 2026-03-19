const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { UsuarioModel: usuario } = require('./models/usuario');


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//MongoDB
mongoose.connect("mongodb://gibran:razotol1@ac-khjj93y-shard-00-00.hhvonya.mongodb.net:27017,ac-khjj93y-shard-00-01.hhvonya.mongodb.net:27017,ac-khjj93y-shard-00-02.hhvonya.mongodb.net:27017/?ssl=true&replicaSet=atlas-xkhhzr-shard-0&authSource=admin&appName=Cluster0", {
})
.then(() => console.log("Conexión exitosa a MongoDB"))
.catch((error) => console.error("Error al conectar a MongoDB:", error));

app.post('/api/usuarios', async (req, res) => {
    const nuevo = new usuario({
        nombre: req.body.nombre,
        email: req.body.email,
        genero: req.body.genero,
        plataformas: req.body.plataformas,
    });
    const guardado = await nuevo.save();
    res.json(guardado);    
});

app.get('/api/usuarios', async (req, res) => {
    const usuarios = await usuario.find();
    res.json(usuarios);
});

app.put('/api/usuarios/:id', async (req, res) => {
    const usuarioActualizado = await usuario.findByIdAndUpdate(
        req.params.id, 
        {
            nombre: req.body.nombre,
            email: req.body.email,
            genero: req.body.genero,
            plataformas: req.body.plataformas,
        },
        { new: true }
    );
    res.json(usuarioActualizado);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});