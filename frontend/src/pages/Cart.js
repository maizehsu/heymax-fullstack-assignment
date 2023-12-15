import React, { useState, useEffect } from 'react';
import { List, Button, message } from 'antd';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const userId = 1; // Replace with the actual user ID

  useEffect(() => {
    fetch(`/user/cart/${userId}`)
      .then(response => response.json())
      .then(data => setCartItems(data.cart_items))
      .catch(error => console.error('Error fetching cart:', error));
  }, []);

  const handleRemoveFromCart = (itemId) => {
    fetch('/cart/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId, item_id: itemId }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        message.success('Item removed from cart');
        // Optionally, refresh cart items here
      }
    })
    .catch(error => console.error('Error removing item from cart:', error));
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.name}
              description={`Quantity: ${item.quantity}`}
            />
            <Button onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Cart;
