import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  student_id?: string;
  program?: string;
  year_of_study?: number;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (e.g., from localStorage or session)
    const token = localStorage.getItem('auth_token');
    if (token) {
      // In a real app, you would validate the token and fetch user data
      authService.getCurrentUser()
        .then(userData => {
          setUser(userData);
          setLoading(false);
        })
        .catch(() => {
          // If token is invalid, remove it
          localStorage.removeItem('auth_token');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      localStorage.setItem('auth_token', response.token);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      localStorage.removeItem('auth_token');
      setUser(null);
    }
  };

  return { user, login, logout, loading, isAuthenticated: !!user };
};