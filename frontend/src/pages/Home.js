import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {Card, Button, Row, Col, notification} from 'antd';
import {AuthContext} from '../AuthContext';
import LogoutButton from '../components/LogoutButton';

function Home() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    useEffect(() => {
        fetch('/catalog')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching catalog:', error));
    }, []);

    const handleViewDetails = (id) => {
        navigate(`/product/${id}`);
    };

    const handleGoToLogin = () => {
        navigate('/login');
    };

    const handleGoToUserPage = () => {
        navigate('/user');
    };

    const handleAddToCart = (itemId) => {
        if (!user) {
            notification.warning({
                message: 'Please log in to add items to your cart',
                description: 'You will be redirected to the login page.',
            });
            navigate('/login');
            return;
        }

        const userId = 1; // Replace with actual user ID from user context or session
        fetch('/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_id: userId, item_id: itemId}),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    notification.success({
                        message: 'Item Added to Cart',
                        description: 'The item has been successfully added to your cart.',
                    });
                }
            })
            .catch(error => console.error('Error adding item to cart:', error));
    };

    const goToCart = () => {
        navigate('/cart');
    };

    return (
        <div className="App">
            {user ? (
                <div>
                    <span>Welcome, {user.username}!</span>
                    <Button onClick={handleGoToUserPage}>User Page</Button>
                    <LogoutButton/>
                </div>
            ) : (
                <Button onClick={handleGoToLogin}>Login</Button>
            )}
            <Button type="primary" onClick={goToCart}
                    style={{marginBottom: 16}}>
                Go to Cart
            </Button>
            <Row gutter={[16, 16]}>
                {items.map(item => (
                    <Col span={8} key={item.id}>
                        <Card title={item.name} bordered={false}>
                            {/*<p>Description: {item.description}</p>*/}
                            <p>Price: ${item.price}</p>
                            <p>Inventory: {item.inventory_count}</p>
                            {/*<p>Category: {item.category}</p>*/}
                            <Button type="primary"
                                    onClick={() => handleViewDetails(item.id)}>View
                                Details</Button>
                            <Button type="default" style={{marginLeft: 8}}
                                    onClick={() => handleAddToCart(item.id)}>Add
                                to Cart</Button>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Home;
