import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  // Mock user data - in a real app, this would come from context or state management
  const currentUser = {
    role: 'student', // This would be dynamically determined
    isAuthenticated: true // This would be dynamically determined
  };

  // Check if user is authenticated
  if (!currentUser.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;