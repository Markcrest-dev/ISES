import api from './api';

interface LoginResponse {
  user: {
    id: string;
    full_name: string;
    email: string;
    role: string;
    student_id?: string;
    program?: string;
    year_of_study?: number;
  };
  token: string;
  message: string;
}

interface RegisterData {
  full_name: string;
  email: string;
  role: string;
  student_id?: string;
  program?: string;
  year_of_study?: number;
  password: string;
}

interface RegisterResponse {
  user: {
    id: string;
    full_name: string;
    email: string;
    role: string;
    student_id?: string;
    program?: string;
    year_of_study?: number;
  };
  token: string;
  message: string;
}

interface LogoutResponse {
  message: string;
}

interface MeResponse {
  user: {
    id: string;
    full_name: string;
    email: string;
    role: string;
    student_id?: string;
    program?: string;
    year_of_study?: number;
  };
}

export const authService = {
  // Login user
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', { email, password });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  // Register user
  register: async (data: RegisterData): Promise<RegisterResponse> => {
    try {
      const response = await api.post<RegisterResponse>('/auth/register', data);
      return response.data;
    } catch (error: any) {
      // Extract detailed error information
      const errorMessage = error.response?.data?.message || 'Registration failed';
      const errorDetails = error.response?.data?.errors || error.response?.data?.details;

      // If there are detailed validation errors, format them nicely
      if (errorDetails) {
        const errorMessages = Object.entries(errorDetails)
          .map(([field, messages]: [string, any]) => {
            const messageArray = Array.isArray(messages) ? messages : [messages];
            return `${field}: ${messageArray.join(', ')}`;
          })
          .join('; ');
        throw new Error(`${errorMessage} - ${errorMessages}`);
      }

      throw new Error(errorMessage);
    }
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      await api.post<LogoutResponse>('/auth/logout');
    } catch (error: any) {
      // Even if logout fails on the server, we still want to clear local data
      console.error('Logout API call failed:', error);
    }
  },

  // Get current user
  getCurrentUser: async (): Promise<any> => {
    try {
      const response = await api.get<MeResponse>('/auth/me');
      return response.data.user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get user data');
    }
  }
};