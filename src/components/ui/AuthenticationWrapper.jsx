import React, { useState, useEffect, createContext, useContext } from 'react';
import { useAuth as useSupabaseAuth } from '../../hooks/useAuth';

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  loading: true
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthenticationWrapper');
  }
  return context;
};

const AuthenticationWrapper = ({ children }) => {
  const { 
    user, 
    profile, 
    loading, 
    isAuthenticated, 
    signIn, 
    signOut, 
    hasRole 
  } = useSupabaseAuth();

  const contextValue = {
    isAuthenticated,
    user: profile ? {
      id: user?.id,
      name: profile?.full_name || `${profile?.first_name} ${profile?.last_name}`,
      email: user?.email,
      role: profile?.role,
      department: profile?.department || 'MDRRMO',
      permissions: getPermissionsForRole(profile?.role)
    } : null,
    login: signIn,
    logout: signOut,
    loading,
    hasRole
  };

  function getPermissionsForRole(role) {
    const rolePermissions = {
      super_admin: ['dashboard', 'incidents', 'advisories', 'calendar', 'users', 'settings', 'resources', 'reports'],
      admin: ['dashboard', 'incidents', 'advisories', 'calendar', 'users', 'resources', 'reports'],
      editor: ['dashboard', 'incidents', 'advisories', 'calendar', 'resources'],
      viewer: ['dashboard']
    };
    return rolePermissions?.[role] || ['dashboard'];
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route Component
export const ProtectedRoute = ({ children, requiredPermissions = [] }) => {
  const { isAuthenticated, user, loading, hasRole } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = '/login';
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  // Check permissions if required
  if (requiredPermissions?.length > 0 && user) {
    const hasPermission = requiredPermissions?.some(permission => 
      user?.permissions?.includes(permission)
    ) || hasRole(['super_admin', 'admin']);
    
    if (!hasPermission) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
            <p className="text-muted-foreground">You don't have permission to access this page.</p>
          </div>
        </div>
      );
    }
  }

  return children;
};

// Public Route Component (redirects to dashboard if authenticated)
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      window.location.href = '/main-dashboard';
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Will redirect to dashboard
  }

  return children;
};

export default AuthenticationWrapper;