import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function ReturnButton() {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <Button
      type="default"
      onClick={handleReturnHome}
      style={{ position: 'fixed', top: '20px', left: '20px', margin: 0 }}
    >
      Return to Homepage
    </Button>
  );
}

export default ReturnButton;
