import React, { useState, useEffect } from 'react';
import FishingForm from './FishingForm';
import CatchList from './CatchList';
import './fishingbuddy.css';

function App() {
  const [catches, setCatches] = useState([]);
  const [editingCatch, setEditingCatch] = useState(null);
  const [filterLocation, setFilterLocation] = useState('');

  useEffect(() => {
    const savedCatches = localStorage.getItem('fishingCatches');
    if (savedCatches) {
      setCatches(JSON.parse(savedCatches));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fishingCatches', JSON.stringify(catches));
  }, [catches]);

  const addCatch = (newCatch) => {
    if (editingCatch !== null) {
      const updated = catches.map((c, i) =>
        i === editingCatch ? newCatch : c
      );
      setCatches(updated);
      setEditingCatch(null);
    } else {
      setCatches([...catches, newCatch]);
    }
  };

  const deleteCatch = (index) => {
    const updated = catches.filter((_, i) => i !== index);
    setCatches(updated);
  };

  const editCatch = (index) => {
    setEditingCatch(index);
  };

  const filteredCatches = catches.filter((c) =>
    c.location.toLowerCase().includes(filterLocation.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Fishing Buddy</h1>

      <input
        type="text"
        placeholder="Filtriraj po lokaciji..."
        value={filterLocation}
        onChange={(e) => setFilterLocation(e.target.value)}
        className="filter-input"
      />

      <FishingForm
        onAddCatch={addCatch}
        editingCatch={editingCatch !== null ? catches[editingCatch] : null}
      />
      <CatchList
        catches={filteredCatches}
        onDelete={deleteCatch}
        onEdit={editCatch}
      />
    </div>
  );
}



export default App;

