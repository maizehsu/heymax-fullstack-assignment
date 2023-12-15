import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import App from './App';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import UserPage from "./pages/UserPage";
import OrderInfo from './pages/OrderInfo';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/product/:id" element={<ProductDetail/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/product/:id" element={<ProductDetail/>}/>
                <Route path="/user" element={<UserPage/>}/>
                <Route path="/order-info" element={<OrderInfo/>} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
