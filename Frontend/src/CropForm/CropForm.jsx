import React, { useState } from 'react';
import './CropForm.css';

export const CropForm = () => {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    rainfall: '',
    ph: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
  
      // Reset the form after successful submission
      setFormData({
        nitrogen: '',
        phosphorus: '',
        potassium: '',
        temperature: '',
        humidity: '',
        rainfall: '',
        ph: ''
      });
  
      // Handle the response from the server if needed
      const result = await response.json();
      console.log('Prediction Result:', result);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  return (
    <div className="container">
    <form className="crop-form" onSubmit={handleSubmit}>
        <div className='row-group'>
      <div className="form-group">
        <label className="label">Nitrogen (%)</label>
        <input className="input" type="number" name="nitrogen" placeholder="Nitrogen" value={formData.nitrogen} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label className="label">Phosphorus (%)</label>
        <input className="input" type="number" name="phosphorus" placeholder='Phosphorus' value={formData.phosphorus} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label className="label">Potassium (%)</label>
        <input className="input" type="number" name="potassium" placeholder='Potassium' value={formData.potassium} onChange={handleChange} />
      </div>
      </div>
      <div className='row-group'>
      <div className="form-group">
        <label className="label">Temperature (°C)</label>
        <input className="input" type="number" name="temperature" placeholder="Temperature" value={formData.temperature} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label className="label">Humidity</label>
        <input className="input" type="number" name="humidity" placeholder="Humidity" value={formData.humidity} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label className="label">Rainfall (mm)</label>
        <input className="input" type="number" name="rainfall" value={formData.rainfall} placeholder='Rainfall' onChange={handleChange} />
      </div>
      </div>
      <div className='row-group1' >
      <div className="form-group">
        <label className="label1">pH</label>
        <input className="ph" type="number" name="ph" value={formData.ph} placeholder='pH' onChange={handleChange}  />
      </div>
      </div>
      <button className="submit-button" type="submit">Predict Crop</button>
    </form>
    </div>
  );
};
