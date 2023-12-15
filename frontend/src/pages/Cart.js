import React, {useState, useEffect, useContext} from 'react';
import {List, Button, message, Row, Col} from 'antd';
import {AuthContext} from '../AuthContext';
import ReturnButton from '../components/ReturnButton';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            fetch(`/user/cart/${user.id}`)
                .then((response) => response.json())
                .then((data) => setCartItems(data.cart_items))
                .catch((error) => console.error('Error fetching cart:', error));
        }
    }, []);

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
                    message.success('Item removed from cart');
                }
                // Refresh the cart

            })
            .catch((error) => console.error('Error removing item from cart:', error));
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
                </Col>
            </Row>
            <ReturnButton/>
        </div>
    );
}

export default Cart;
