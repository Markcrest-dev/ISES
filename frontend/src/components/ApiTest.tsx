import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const ApiTest: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test Supabase connection by querying the profiles table
        const { data, error } = await supabase.from('profiles').select('id').limit(1);

        if (error) {
          setStatus('error');
          setMessage(`Supabase error: ${error.message}`);
        } else {
          setStatus('success');
          setMessage('Successfully connected to Supabase!');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Failed to connect to Supabase');
        console.error('Supabase Error:', error);
      }
    };

    testConnection();
  }, []);

  return (
    <div>
      <h2>Supabase Connection Test</h2>
      <p>Status: {status}</p>
      <p>Message: {message}</p>
    </div>
  );
};

export default ApiTest;