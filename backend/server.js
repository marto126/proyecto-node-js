const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// Importar rutas
const movies = require('./routes/movies');

// Conectar a la base de datos
connectDB();

// Inicializar Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Montar rutas
app.use('/api/movies', movies);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de películas');
});

// Puerto
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});