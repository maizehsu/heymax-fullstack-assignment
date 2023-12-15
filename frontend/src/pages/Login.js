import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../AuthContext';
import {Form, Input, Button, Tabs, notification, Row, Col, Typography} from 'antd';

const {TabPane} = Tabs;
const { Title } = Typography;

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    notification.success({
                        message: 'Login Successful',
                        description: 'You have successfully logged in.'
                    })
                    login({id: data.user_id, username});
                    navigate('/');
                } else {
                    notification.error({
                        message: 'Login Failed',
                        description: data.error
                    });
                }
            });
    };

    const handleRegister = () => {
        fetch('/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, email, password}),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    notification.success({
                        message: 'Registration Successful',
                        description: `${username}, you have successfully logged in!`
                    });
                    login({id: data.user_id, username});
                    navigate('/');
                } else {
                    notification.error({
                        message: 'Registration Failed',
                        description: data.error
                    });
                }
            });
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={8}>
        <Tabs defaultActiveKey="1">
            <TabPane tab="Login" key="1" centered>
                <Form onFinish={handleLogin}>
                    <Form.Item label="Username" name="username" rules={[{
                        required: true,
                        message: 'Please input your username!'
                    }]}>
                        <Input value={username}
                               onChange={(e) => setUsername(e.target.value)}/>
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{
                        required: true,
                        message: 'Please input your password!'
                    }]}>
                        <Input.Password value={password}
                                        onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Login</Button>
                </Form>
            </TabPane>
            <TabPane tab="Register" key="2">
                <Form onFinish={handleRegister}>
                    <Form.Item label="Username" name="username"
                               rules={[{required: true}]}>
                        <Input value={username}
                               onChange={(e) => setUsername(e.target.value)}/>
                    </Form.Item>
                    <Form.Item label="Email" name="email"
                               rules={[{required: true, type: 'email'}]}>
                        <Input value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Item>
                    <Form.Item label="Password" name="password"
                               rules={[{required: true, min: 8}]}>
                        <Input.Password value={password}
                                        onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Register</Button>
                </Form>
            </TabPane>
        </Tabs>
            </Col>
        </Row>
);
}

export default Login;
