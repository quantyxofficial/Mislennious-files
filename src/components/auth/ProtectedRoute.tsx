import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAgencyAuth } from '../../context/AgencyAuthContext';
import { UserRole } from '../../types/models';

interface ProtectedRouteProps {
  children: React.JSX.Element;
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, loading } = useAgencyAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  const userRole = user.user_metadata?.role || 'student'; // Default to student for now if not set

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // If user is trying to access a restricted area, redirect to their own dashboard
    return <Navigate to={`/${userRole}`} replace />;
  }

  return children;
};
