import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import LoginRegister from './pages/LoginRegister';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/product/:id" element={<ProductDetail/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/login" element={<LoginRegister/>} />
        <Route path="/product/:id" element={<ProductDetail/>} />
        {/* Define other routes here */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
