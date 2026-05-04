import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  mockLogin: (email: string) => void;
  mockLogout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  mockLogin: () => {},
  mockLogout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // MOCK IMPLEMENTATION (since no real Firebase credentials are provided)
  const mockLogin = (email: string) => {
    setUser({ email, uid: 'mock-uid-123', emailVerified: true } as User);
    localStorage.setItem('mock_user', email);
  };

  const mockLogout = () => {
    setUser(null);
    localStorage.removeItem('mock_user');
  };

  useEffect(() => {
    // Attempt real firebase auth, but gracefully fallback to mock
    try {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
           setUser(currentUser);
        } else {
           // check mock
           const mockEmail = localStorage.getItem('mock_user');
           if (mockEmail) {
             setUser({ email: mockEmail, uid: 'mock-uid-123', emailVerified: true } as User);
           } else {
             setUser(null);
           }
        }
        setLoading(false);
      });
      return unsubscribe;
    } catch (e) {
      // Mock fallback
      const mockEmail = localStorage.getItem('mock_user');
      if (mockEmail) {
        setUser({ email: mockEmail, uid: 'mock-uid-123', emailVerified: true } as User);
      }
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, mockLogin, mockLogout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
