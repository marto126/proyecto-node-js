import { Link } from 'react-router-dom';
import { FaFilm, FaPlus } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="header-logo">
          <FaFilm className="header-logo-icon" />
          <span>Catálogo de Películas</span>
        </Link>
        
        <nav className="header-nav">
          <Link to="/" className="nav-link">
            Inicio
          </Link>
          <Link to="/add" className="add-btn">
            <FaPlus size={12} />
            <span>Añadir Película</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;