// Mock authentication service
// In a real application, this would make API calls to your backend

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

export const authService = {
  // Login user
  login: async (email: string, password: string): Promise<LoginResponse> => {
    // In a real app, you would make an API call here
    // For now, we'll simulate a successful login
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple validation
        if (!email || !password) {
          reject(new Error('Email and password are required'));
          return;
        }
        
        // Mock user data
        const mockUser = {
          id: '1',
          full_name: 'John Doe',
          email: email,
          role: 'student',
          student_id: '12345',
          program: 'Computer Science',
          year_of_study: 2
        };
        
        const mockResponse: LoginResponse = {
          user: mockUser,
          token: 'mock-auth-token'
        };
        
        resolve(mockResponse);
      }, 1000);
    });
  },

  // Register user
  register: async (data: RegisterData): Promise<LoginResponse> => {
    // In a real app, you would make an API call here
    // For now, we'll simulate a successful registration
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple validation
        if (!data.full_name || !data.email || !data.password) {
          reject(new Error('Name, email, and password are required'));
          return;
        }
        
        // Mock user data
        const mockUser = {
          id: '1',
          full_name: data.full_name,
          email: data.email,
          role: data.role,
          student_id: data.student_id,
          program: data.program,
          year_of_study: data.year_of_study
        };
        
        const mockResponse: LoginResponse = {
          user: mockUser,
          token: 'mock-auth-token'
        };
        
        resolve(mockResponse);
      }, 1000);
    });
  },

  // Logout user
  logout: async (): Promise<void> => {
    // In a real app, you would make an API call here to invalidate the token
    // For now, we'll just return a resolved promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  },

  // Get current user
  getCurrentUser: async (): Promise<any> => {
    // In a real app, you would make an API call here to get the current user
    // For now, we'll check if there's a token in localStorage
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    // Mock user data
    return {
      id: '1',
      full_name: 'John Doe',
      email: 'john@university.edu',
      role: 'student',
      student_id: '12345',
      program: 'Computer Science',
      year_of_study: 2
    };
  }
};