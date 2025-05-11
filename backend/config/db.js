const mongoose = require('mongoose');
require('dotenv').config();

// URI de conexión a MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/moviesdb';

// Función para conectar a la base de datos
const connectDB = async () => {
  try {
    console.log('Intentando conectar a MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('✅ Conexión a MongoDB establecida con éxito');
    return true;
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    return false;
  }
};

module.exports = connectDB;