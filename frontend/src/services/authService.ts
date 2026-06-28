import { supabase } from '../lib/supabase';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: string;
  student_id?: string;
  program?: string;
  year_of_study?: number;
  created_at?: string;
  updated_at?: string;
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
  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Supabase login error:', {
        message: error.message,
        status: error.status,
        name: error.name,
        code: (error as any).code,
      });
      throw new Error(error.message);
    }

    // Fetch user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      throw new Error('Failed to fetch user profile');
    }

    return {
      user: profile as Profile,
      token: data.session.access_token,
      message: 'Login successful',
    };
  },

  // Register user
  register: async (registerData: RegisterData) => {
    const { data, error } = await supabase.auth.signUp({
      email: registerData.email,
      password: registerData.password,
      options: {
        data: {
          full_name: registerData.full_name,
          role: registerData.role,
        },
      },
    });

    if (error) {
      console.error('Supabase signup error:', {
        message: error.message,
        status: error.status,
        name: error.name,
        code: (error as any).code,
      });
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('Registration failed — no user returned');
    }

    // Wait briefly for the trigger to create the profile, then update it
    // with student-specific fields if needed
    await new Promise((resolve) => setTimeout(resolve, 500));

    const updateFields: Record<string, any> = {
      full_name: registerData.full_name,
      role: registerData.role,
    };

    if (registerData.role === 'student') {
      updateFields.student_id = registerData.student_id || null;
      updateFields.program = registerData.program || null;
      updateFields.year_of_study = registerData.year_of_study || null;
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update(updateFields)
      .eq('id', data.user.id);

    if (updateError) {
      console.error('Failed to update profile with additional data:', updateError);
    }

    // Fetch the full profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    return {
      user: (profile || {
        id: data.user.id,
        full_name: registerData.full_name,
        email: registerData.email,
        role: registerData.role,
      }) as Profile,
      token: data.session?.access_token || '',
      message: 'User registered successfully',
    };
  },

  // Logout user
  logout: async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout failed:', error);
    }
  },

  // Get current user profile
  getCurrentUser: async (): Promise<Profile | null> => {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      throw new Error('Failed to fetch user profile');
    }

    return profile as Profile;
  },
};