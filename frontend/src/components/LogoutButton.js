import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Button } from 'antd';

function LogoutButton() {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    fetch('/user/logout', { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          logout();
        }
      });
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}

export default LogoutButton;
