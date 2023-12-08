const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://mongo:27017/nombresdb', { useNewUrlParser: true, useUnifiedTopology: true });

const NombreSchema = new mongoose.Schema({
    nombre: String
});

const Nombre = mongoose.model('Nombre', NombreSchema);

app.post('/api/save', async (req, res) => {
    const nombre = req.body.nombre;
    const nuevoNombre = new Nombre({ nombre });

    await nuevoNombre.save();

    res.send('Nombre guardado con éxito');
});

app.listen(3000, () => {
    console.log(`Servidor API corriendo en el puerto 3000`);
});
