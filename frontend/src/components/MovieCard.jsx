import { Link } from 'react-router-dom';
import { FaStar, FaPencilAlt, FaTrash, FaClock } from 'react-icons/fa';

const MovieCard = ({ movie, onDeleteClick }) => {
  return (
    <div className="movie-card">
      <div className="movie-card-content">
        <div className="movie-card-header">
          <h2 className="movie-card-title">{movie.title}</h2>
          <div className="movie-card-rating">
            <FaStar className="movie-card-rating-icon" />
            <span>{movie.rating}/10</span>
          </div>
        </div>
        
        <p className="movie-card-director">{movie.director}</p>
        
        <div className="movie-card-info">
          <span className="movie-card-year">{movie.year}</span>
          {movie.duration > 0 && (
            <div className="movie-card-duration">
              <FaClock className="movie-card-duration-icon" />
              <span>{movie.duration} min</span>
            </div>
          )}
        </div>
        
        {movie.genre && movie.genre.length > 0 && (
          <div className="movie-card-genres">
            {movie.genre.map((g, index) => (
              <span key={index} className="movie-card-genre">
                {g}
              </span>
            ))}
          </div>
        )}
        
        <div className="movie-card-actions">
          <Link 
            to={`/edit/${movie._id}`}
            className="action-btn edit-btn"
            title="Editar"
          >
            <FaPencilAlt />
          </Link>
          <button 
            onClick={() => onDeleteClick(movie)}
            className="action-btn delete-btn"
            title="Eliminar"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;