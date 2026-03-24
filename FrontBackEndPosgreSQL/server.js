const express = require('express');
const cors = require('cors');
const {createClient} = require("@supabase/supabase-js");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

require('dotenv').config();

//plataformausuarios
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);


if (supabase) {
    console.log("Supabase client conectado correctamente");
    
    app.get('/api/usuarios', async (req, res) => {
        const { data, error } = await supabase
            .from('plataformaususarios')
            .select('*');

        if(error) return res.status(500).json(error);
        res.json(data);
    });
}

let idActual=3;



app.post('/api/usuarios', async (req, res) => {
    const {data,error} = await supabase
    .from("plataformaususarios")
    .insert([
        {
            nombre: req.body.nombre,
            email: req.body.email,
            genero: req.body.genero,
            plataformas: req.body.plataformas
        }
    ])
    .select();
    if(error) return res.status(500).json(error);
    res.json(data);
});

app.put("/api/usuarios/:id", async (req, res) => {
    const {data,error} = await supabase
    .from("plataformaususarios")
    .update([
        {
            nombre: req.body.nombre,
            email: req.body.email,
            genero: req.body.genero,
            plataformas: req.body.plataformas
        }
    ])
    .eq("id", req.params.id)
    .select();
    if(error) return res.status(500).json(error);
    res.json(data);
});

app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});