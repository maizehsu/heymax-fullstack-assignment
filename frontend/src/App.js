import React, { useState, useEffect } from 'react';
import './App.css';

const url = 'http://localhost:5000';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/catalog')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching catalog:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Catalog</h1>
        {items.map(item => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>${item.price}</p>
            {/* Add buttons for view details, add to cart, etc. */}
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
