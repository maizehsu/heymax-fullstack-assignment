import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Form, Input, Button } from 'antd';

function UserPage() {
  const { user } = useContext(AuthContext);

  const handleSubmit = (values) => {
    // Implement logic to update user details
  };

  return (
    <div>
      <h2>User Page</h2>
      <Form onFinish={handleSubmit}>
        <Form.Item label="Username" name="username" initialValue={user.username}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" initialValue={user.email}>
          <Input />
        </Form.Item>
        {/* ... other form fields */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UserPage;
