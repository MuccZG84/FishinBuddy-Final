import React from 'react';

function CatchList({ catches, onDelete, onEdit }) {
  return (
    <div className="catch-list">
      <h2>Popis ulova</h2>
      {catches.length === 0 ? (
        <p>Nema ulova...</p>
      ) : (
        <ul>
          {catches.map((catchItem, index) => (
            <li key={index}>
              <strong>{catchItem.species}</strong> — {catchItem.weight} kg, {catchItem.location} ({catchItem.date})
              {catchItem.image && (
                <img src={catchItem.image} alt="ulov" className="catch-image" />
              )}
              <div className="catch-actions">
                <button onClick={() => onEdit(index)}>Uredi</button>
                <button onClick={() => onDelete(index)}>Obriši</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CatchList;