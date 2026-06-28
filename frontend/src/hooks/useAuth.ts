import { useAuthContext } from '../contexts/AuthContext';

// Re-export the User type from AuthContext
export type { User } from '../contexts/AuthContext';

/**
 * Hook for accessing auth state and actions.
 * Delegates to AuthContext which manages Supabase auth internally.
 */
export const useAuth = () => {
  return useAuthContext();
};