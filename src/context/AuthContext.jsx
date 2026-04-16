import React, { createContext, useContext, useState, useEffect } from 'react';
// 1. Create the Context without the <AuthContextType> generic
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Example logic (replace with your actual auth logic)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Your login check here
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    // Add your login/logout functions here
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 2. Custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};