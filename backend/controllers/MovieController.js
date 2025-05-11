const Movie = require('../models/Movie');

// Obtener todas las películas
exports.getMovies = async (req, res) => {
  try {
    console.log('Obteniendo todas las películas...');
    const movies = await Movie.find();
    
    console.log(`Encontradas ${movies.length} películas`);
    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    console.error('Error al obtener películas:', error);
    res.status(500).json({
      success: false,
      error: 'Error del servidor: ' + error.message
    });
  }
};

// Obtener una película por ID
exports.getMovie = async (req, res) => {
  try {
    console.log(`Buscando película con ID: ${req.params.id}`);
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      console.log('Película no encontrada');
      return res.status(404).json({
        success: false,
        error: 'Película no encontrada'
      });
    }

    console.log('Película encontrada:', movie.title);
    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (error) {
    console.error('Error al obtener película:', error);
    res.status(500).json({
      success: false,
      error: 'Error del servidor: ' + error.message
    });
  }
};

// Crear una nueva película
exports.createMovie = async (req, res) => {
  try {
    console.log('Creando nueva película con datos:', req.body);
    
    const movie = await Movie.create(req.body);

    console.log('Película creada con éxito:', movie.title);
    res.status(201).json({
      success: true,
      data: movie
    });
  } catch (error) {
    console.error('Error al crear película:', error);
    
    // Manejar error de duplicado
    if (error.code === 11000 || error.message.includes('Ya existe una película')) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe una película con este título. Por favor, usa un título diferente.'
      });
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Error del servidor: ' + error.message
      });
    }
  }
};

// Actualizar una película
exports.updateMovie = async (req, res) => {
  try {
    console.log(`Actualizando película con ID: ${req.params.id}`);
    console.log('Nuevos datos:', req.body);
    
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!movie) {
      console.log('Película no encontrada para actualizar');
      return res.status(404).json({
        success: false,
        error: 'Película no encontrada'
      });
    }

    console.log('Película actualizada con éxito:', movie.title);
    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (error) {
    console.error('Error al actualizar película:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      console.error('Errores de validación:', messages);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Error del servidor: ' + error.message
      });
    }
  }
};

// Eliminar una película
exports.deleteMovie = async (req, res) => {
  try {
    console.log(`Eliminando película con ID: ${req.params.id}`);
    
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      console.log('Película no encontrada para eliminar');
      return res.status(404).json({
        success: false,
        error: 'Película no encontrada'
      });
    }

    console.log('Película eliminada con éxito:', movie.title);
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error al eliminar película:', error);
    res.status(500).json({
      success: false,
      error: 'Error del servidor: ' + error.message
    });
  }
};
