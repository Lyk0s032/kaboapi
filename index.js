const express = require('express');
const bodyParser = require('body-parser');
const {db, Op } = require('./db/db');
const { newProject, getProjects, getProjectById, addImages } = require('./controllers/project');

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
}); 

const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
    res.send('Bienvenido al servidor de virtual');
});
app.get('/helloWorld', (req, res) => {
    res.send('Hello World!!')
})

// GET 
app.get('/pr/general', getProjects); // Obtenemos todos los proyectos
app.get('/pr/watch/:id', getProjectById); // Buscamos proyecto por ID

// POST
app.post('/pr/add/', newProject); // Agregar proyecto a la base de datos.
app.post('/pr/screenshots/add', addImages); // Relacionar capturas de pantallas al proyecto


// Enciende el servidor
app.listen(PORT, () => {
    db.sync();
    console.log(`Server running on port ${PORT}`);
}); 