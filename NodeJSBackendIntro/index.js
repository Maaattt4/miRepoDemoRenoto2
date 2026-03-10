const express = require('express');
const app = express();
const port = 3600;
app.use(express.json());

let data=[
    {id:1, superhero:"Batman"},
    {id:2, superhero:"Superman"},
    {id:3, superhero:"Ironman"},
];

app.get('/', (req, res) => {
    return res.send('Hola desde mi repo con nodemon');
});

app.get('/datos', (req, res) => {
    res.json(data);
});

app.post("/add",(req,res)=>{
    let nuevoHeroe={
        id:data.length+1,
        superhero:req.body.superhero
    };
    data.push(nuevoHeroe);
    return res.status(200).send("Heroe agregado");
});

app.get('/datos/superman', (req, res) => {
    res.json(data[1]);
});


app.listen( port, () => {
    console.log(`Servidor http://localhost:${port}`);
});