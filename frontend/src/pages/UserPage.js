import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../AuthContext';
import {Form, Input, Button, notification, List, Card, Rate} from 'antd';
import ReturnButton from '../components/ReturnButton';

const OrderCard = ({ order }) => {
  return (
    <Card title={`Order #${order.id}`} extra={`Date: ${order.date}`}>
      <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
      <List
        size="small"
        header={<div>Items:</div>}
        bordered
        dataSource={order.items}
        renderItem={item => <List.Item>{item.name} (x{item.quantity})</List.Item>}
      />
    </Card>
  );
};

const ReviewCard = ({ review }) => {
  return (
    <Card title={`Review for Item #${review.item_id}`}>
      <Rate disabled defaultValue={review.rating} />
      <p style={{ marginTop: '10px' }}>{review.comment}</p>
    </Card>
  );
};

function UserPage() {
    const {user, logout} = useContext(AuthContext);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        fetch(`/order/history/${user.id}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setOrders(data.orders);
                }
            });

        fetch(`/reviews/${user.id}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setReviews(data.reviews);
                }
            });
    }, [user, navigate]);

    const handleSubmit = (values) => {
        fetch('/user/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_id: user.id, ...values}),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    notification.success({
                        message: 'Profile Updated',
                        description: 'Your profile has been successfully updated.'
                    });
                } else {
                    notification.error({
                        message: 'Update Failed',
                        description: data.error
                    });
                }
            });
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div style={{maxWidth: '600px', margin: '0 auto'}}>
            <h2>👋 Hi, {user.username}</h2>
            <ReturnButton />
            {user && (
                <Form onFinish={handleSubmit} initialValues={{
                    username: user.username,
                    email: user.email
                }}>
                    <Form.Item label="Username" name="username"
                               rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Email" name="email"
                               rules={[{required: true, type: 'email'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Password" name="password"
                               rules={[{required: true}]}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            )}
            <Button type="default" onClick={handleLogout}
                    style={{margin: '10px 0'}}>
                Logout
            </Button>
            <h3>Order History</h3>
            {orders.map(order => <OrderCard key={order.id} order={order} />)}
            <h3>Your Reviews</h3>
            {reviews.map(review => <ReviewCard key={review.id} review={review} />)}
        </div>
    );
}

export default UserPage;
