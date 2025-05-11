import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Servicios para las películas
export const movieService = {
    
  // Obtener todas las películas
  getAllMovies: async () => {
    try {
      console.log('API: Obteniendo todas las películas');
      const response = await apiClient.get('/movies');
      console.log('API: Películas obtenidas', response.data);
      return response.data;
    } catch (error) {
      console.error('API: Error al obtener películas:', error);
      throw error;
    }
    
  },

  // Obtener una película por ID
  getMovieById: async (id) => {
    try {
      console.log(`API: Obteniendo película con ID ${id}`);
      const response = await apiClient.get(`/movies/${id}`);
      console.log('API: Película obtenida', response.data);
      return response.data;
    } catch (error) {
      console.error(`API: Error al obtener película con ID ${id}:`, error);
      throw error;
    }
  },

  // Crear una nueva película
  createMovie: async (movieData) => {
    try {
      console.log('API: Creando nueva película', movieData);
      const response = await apiClient.post('/movies', movieData);
      console.log('API: Película creada', response.data);
      return response.data;
    } catch (error) {
      console.error('API: Error al crear película:', error);
      throw error;
    }
  },

  // Actualizar una película existente
  updateMovie: async (id, movieData) => {
    try {
      console.log(`API: Actualizando película con ID ${id}`, movieData);
      const response = await apiClient.put(`/movies/${id}`, movieData);
      console.log('API: Película actualizada', response.data);
      return response.data;
    } catch (error) {
      console.error(`API: Error al actualizar película con ID ${id}:`, error);
      throw error;
    }
  },

  // Eliminar una película
  deleteMovie: async (id) => {
    try {
      console.log(`API: Eliminando película con ID ${id}`);
      const response = await apiClient.delete(`/movies/${id}`);
      console.log('API: Película eliminada', response.data);
      return response.data;
    } catch (error) {
      console.error(`API: Error al eliminar película con ID ${id}:`, error);
      throw error;
    }
  }
};

export default apiClient;