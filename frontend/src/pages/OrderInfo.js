import React, { useState, useEffect, useContext } from 'react';
import { List, Card, Typography } from 'antd';
import { AuthContext } from '../AuthContext';

const { Title, Text } = Typography;

function OrderInfo() {
    const [order, setOrder] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        // TODO: Replace this with the actual API call to fetch the latest order
        fetch(`/user/order/latest/${user.id}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setOrder(data.order);
                }
            })
            .catch(error => console.error('Error fetching order:', error));
    }, [user.id]);

    if (!order) {
        return <div>Loading order details...</div>;
    }

    const totalPrice = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <Title level={2}>Order Information</Title>
            <Text strong>User: {user.username}</Text>
            <List
                dataSource={order.items}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.name}>
                            Price: ${item.price.toFixed(2)}<br/>
                            Quantity: {item.quantity}
                        </Card>
                    </List.Item>
                )}
            />
            <Title level={4}>Total Price: ${totalPrice.toFixed(2)}</Title>
        </div>
    );
}

export default OrderInfo;
