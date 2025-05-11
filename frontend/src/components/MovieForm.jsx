import { FaExclamationTriangle } from 'react-icons/fa';

const DeleteConfirmation = ({ isOpen, onClose, onConfirm, title }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-icon">
          <FaExclamationTriangle />
        </div>
        
        <h3 className="modal-title">Confirmar eliminación</h3>
        
        <p className="modal-text">
          ¿Estás seguro de que deseas eliminar la película <span className="font-bold">"{title}"</span>? 
          Esta acción no se puede deshacer.
        </p>
        
        <div className="modal-actions">
          <button
            onClick={onClose}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-danger"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;