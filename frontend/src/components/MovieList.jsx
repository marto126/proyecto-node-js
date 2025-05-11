import { useState } from 'react';
import MovieCard from './MovieCard';
import DeleteConfirmation from './DeleteConfirmation';
import { FaSearch } from 'react-icons/fa';

const MovieList = ({ movies, onDeleteMovie, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleDeleteClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedMovie) {
      onDeleteMovie(selectedMovie._id);
      setShowModal(false);
      setSelectedMovie(null);
    }
  };

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (movie.genre && movie.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  if (loading) {
    return (
      <div className="movies-grid">
        {[...Array(6)].map((_, index) => (
          <div 
            key={index} 
            className="skeleton"
          ></div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <h3 className="empty-state-title">No hay películas disponibles</h3>
        <p className="empty-state-text">¡Agrega tu primera película haciendo clic en "Añadir Película"!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="search-container">
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por título, director o género..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {filteredMovies.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-text">No se encontraron películas que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        <div className="movies-grid">
          {filteredMovies.map(movie => (
            <MovieCard 
              key={movie._id} 
              movie={movie} 
              onDeleteClick={handleDeleteClick} 
            />
          ))}
        </div>
      )}

      {showModal && (
        <DeleteConfirmation
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={confirmDelete}
          title={selectedMovie?.title || ''}
        />
      )}
    </div>
  );
};

export default MovieList;