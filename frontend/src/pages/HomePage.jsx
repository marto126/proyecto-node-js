import { useState, useEffect } from 'react';
import { movieService } from '../services/api';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await movieService.getAllMovies();
      setMovies(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error al cargar películas:', err);
      setError('Hubo un error al cargar las películas. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDeleteMovie = async (id) => {
    try {
      await movieService.deleteMovie(id);
      // Actualizar la lista después de eliminar
      setMovies(movies.filter(movie => movie._id !== id));
    } catch (err) {
      console.error('Error al eliminar la película:', err);
      setError('Hubo un error al eliminar la película. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="page-container container">
      <div className="page-header">
        <h1 className="page-title">Catálogo de Películas</h1>
        <p className="page-subtitle">Explora nuestra colección de películas</p>
      </div>
      
      {error && (
        <div className="alert alert-error">
          <p>{error}</p>
        </div>
      )}
      
      {loading ? (
        <Loading />
      ) : (
        <MovieList 
          movies={movies} 
          onDeleteMovie={handleDeleteMovie} 
          loading={false} 
        />
      )}
    </div>
  );
};

export default HomePage;