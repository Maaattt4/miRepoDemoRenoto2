const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let registros = [
    {
        id: 1,
        nombre: 'Juan Pérez',
        email: 'juan.perez@ucc.mx',
        genero: 'Masculino',
        plataformas: ['Netflix', 'Prime']
    },
    {
        id: 2,
        nombre: 'María López',
        email: 'maria.lopez@ucc.mx',
        genero: 'Femenino',
        plataformas: ['Disney+', 'HBO']
    }
];

let idActual=3;

app.get('/api/usuarios', (req, res) => {
    res.json(registros);
});

app.post('/api/usuarios', (req, res) => {
    const nuevo = {
        id: idActual++,
        nombre: req.body.nombre,
        email: req.body.email,
        genero: req.body.genero,
        plataformas: req.body.plataformas
    };
    registros.push(nuevo);
    res.json(nuevo);

});

app.put("/api/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = registros.find(u => u.id === id);
    if(!usuario){
        return res.status(404).json({ error: "Usuario no encontrado" });
    }
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.genero = req.body.genero;
    usuario.plataformas = req.body.plataformas;
    res.json(usuario);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});