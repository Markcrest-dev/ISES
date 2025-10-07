import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ApiTest: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await api.get('/test');
        setStatus('success');
        setMessage(response.data.message);
      } catch (error) {
        setStatus('error');
        setMessage('Failed to connect to the backend');
        console.error('API Error:', error);
      }
    };

    testConnection();
  }, []);

  return (
    <div>
      <h2>API Connection Test</h2>
      <p>Status: {status}</p>
      <p>Message: {message}</p>
    </div>
  );
};

export default ApiTest;