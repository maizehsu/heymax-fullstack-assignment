import React, {useState, useEffect} from 'react';
import './App.css';
import Home from './pages/Home'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Product Catalog</h1>
                <Home/>
            </header>
        </div>
    );
}

export default App;
