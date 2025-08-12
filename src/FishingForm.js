import React, { useState, useEffect } from 'react';
import fishSpecies from './FishData';

function FishingForm({ onAddCatch, editingCatch }) {
  const [species, setSpecies] = useState('');
  const [weight, setWeight] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (editingCatch) {
      setSpecies(editingCatch.species);
      setWeight(editingCatch.weight);
      setLocation(editingCatch.location);
      setImage(editingCatch.image || null);
    } else {
      resetForm();
    }
  }, [editingCatch]);

  const resetForm = () => {
    setSpecies('');
    setWeight('');
    setLocation('');
    setImage(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // Base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!species || !weight || !location) return;

    const newCatch = {
      species,
      weight: parseFloat(weight),
      location,
      date: new Date().toLocaleDateString(),
      image
    };

    onAddCatch(newCatch);
    resetForm();
    setSuccessMessage('✅ Ulov uspješno dodan!');

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <select
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
        required
      >
        <option value="" disabled hidden>
          Odaberi vrstu ribe
        </option>
        {fishSpecies.map((fish, index) => (
          <option key={index} value={fish}>
            {fish}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Težina (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Lokacija"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />

      <label htmlFor="fileUpload" className="custom-upload-button">
        📸 Odaberi sliku
      </label>
      <input
        id="fileUpload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
      {image && <img src={image} alt="preview" className="preview-image" />}

      <button type="submit">
        {editingCatch ? 'Spremi izmjene' : 'Dodaj ulov'}
      </button>

      {successMessage && (
        <p className="success-message">{successMessage}</p>
      )}
    </form>
  );
}

export default FishingForm;