import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="loading">
      <FaSpinner className="loading-spinner" />
      <span className="loading-text">Cargando...</span>
    </div>
  );
};

export default Loading;