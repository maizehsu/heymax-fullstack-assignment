import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {List, Button, message, Row, Col} from 'antd';
import {AuthContext} from '../AuthContext';
import ReturnButton from '../components/ReturnButton';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetch(`/user/cart/${user.id}`)
                .then((response) => response.json())
                .then((data) => setCartItems(data.cart_items))
                .catch((error) => console.error('Error fetching cart:', error));
        }
    }, []);

    const handleCheckout = () => {
        fetch('/user/order/place', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_id: user.id}),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setCartItems([]);
                    message.success('Checkout successful');
                    navigate('/order-info');
                } else {
                    message.error('Checkout failed');
                }
            })
            .catch((error) => console.error('Error placing order:', error));
    };

    const handleRemoveFromCart = (itemId) => {
        fetch('/cart/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_id: user.id, item_id: itemId}),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // Update cartItems state to reflect the change in quantity
                    const updatedCartItems = cartItems.map(item => {
                        if (item.id === itemId) {
                            return {...item, quantity: item.quantity - 1};
                        }
                        return item;
                    }).filter(item => item.quantity > 0);

                    setCartItems(updatedCartItems);
                    message.success('Item quantity updated in cart');
                } else {
                    // Handle failure
                    message.error('Failed to update item in cart');
                }
            })
            .catch((error) => console.error('Error updating item in cart:', error));
    };


    return (
        <div style={{textAlign: 'center'}}>
            <h1>Your Cart</h1>
            <Row justify="center">
                <Col span={16}>
                    <List
                        itemLayout="horizontal"
                        dataSource={cartItems}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.name}
                                    description={`Quantity: ${item.quantity}`}
                                />
                                <Button
                                    onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
                            </List.Item>
                        )}
                    />
                    {cartItems.length > 0 && (
                        <Button type="primary" onClick={handleCheckout}
                                style={{marginTop: 20}}>
                            Checkout
                        </Button>
                    )}
                </Col>
            </Row>
            <ReturnButton/>
        </div>
    );
}

export default Cart;
