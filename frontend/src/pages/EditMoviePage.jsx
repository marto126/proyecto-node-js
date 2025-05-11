// src/pages/EditMoviePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditMoviePage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    year: 2023
  });
  
  // Cargar datos de la película
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        console.log(`Intentando cargar película con ID: ${id}`);
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
        console.log('Película cargada:', response.data);
        
        if (response.data && response.data.data) {
          setMovie(response.data.data);
          // Inicializar el formulario con los datos existentes
          setFormData({
            title: response.data.data.title || '',
            director: response.data.data.director || '',
            year: response.data.data.year || 2023
          });
        } else {
          setError('Formato de respuesta inesperado');
        }
      } catch (err) {
        console.error('Error al cargar película:', err);
        setError(`Error al cargar la película: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    } else {
      setError('ID de película no proporcionado');
      setLoading(false);
    }
  }, [id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/movies/${id}`, formData);
      console.log('Película actualizada:', response.data);
      setError('¡Película actualizada con éxito!');
    } catch (err) {
      console.error('Error al actualizar película:', err);
      setError(`Error al actualizar: ${err.message}`);
    }
  };
  
  // Mostrar estados de carga y error
  if (loading) return <div style={{padding: '20px', textAlign: 'center'}}>Cargando...</div>;
  if (error && !movie) return <div style={{padding: '20px', color: 'red'}}>{error}</div>;
  
  return (
    <div style={{padding: '20px', maxWidth: '600px', margin: '0 auto'}}>
      <h1>Editar Película</h1>
      
      {error && (
        <div style={{
          padding: '10px', 
          background: error.includes('éxito') ? '#eeffee' : '#ffeeee', 
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
        <div style={{marginBottom: '15px'}}>
          <label style={{display: 'block', marginBottom: '5px'}}>Título:</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            style={{width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd'}}
            required
          />
        </div>
        
        <div style={{marginBottom: '15px'}}>
          <label style={{display: 'block', marginBottom: '5px'}}>Director:</label>
          <input 
            type="text" 
            name="director" 
            value={formData.director} 
            onChange={handleChange} 
            style={{width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd'}}
            required
          />
        </div>
        
        <div style={{marginBottom: '15px'}}>
          <label style={{display: 'block', marginBottom: '5px'}}>Año:</label>
          <input 
            type="number" 
            name="year" 
            value={formData.year} 
            onChange={handleChange} 
            style={{width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd'}}
            required
          />
        </div>
        
        <button 
          type="submit" 
          style={{background: '#3498db', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer'}}
        >
          Actualizar Película
        </button>
      </form>
      
        </div>
  );
};

export default EditMoviePage;