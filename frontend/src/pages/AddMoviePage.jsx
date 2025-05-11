// src/pages/AddMoviePage.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddMoviePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    year: 2023
  });
  
  const [message, setMessage] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Enviando datos...');
    
    try {
      const response = await axios.post('http://localhost:5000/api/movies', formData);
      console.log('Respuesta:', response.data);
      setMessage('¡Película guardada exitosamente!');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error: ' + (error.response?.data?.error || error.message));
    }
  };
  
  return (
    <div style={{padding: '20px', maxWidth: '600px', margin: '0 auto'}}>
      <h1>Añadir Película (Simplificado)</h1>
      
      {message && <div style={{padding: '10px', background: message.includes('Error') ? '#ffeeee' : '#eeffee', marginBottom: '20px'}}>{message}</div>}
      
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
          Guardar Película
        </button>
      </form>
    </div>
  );
};

export default AddMoviePage;