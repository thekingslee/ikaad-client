'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTokenFromStorage } from '@/utils/auth';
import { jwtDecode } from 'jwt-decode';
import { authService } from '@/services/auth';

interface User {
  id: number;
  email: string;
  username: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const verifyAndSetUser = async (token: string) => {
    try {
      const { data } = await authService.getUser();
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getTokenFromStorage();

      if (token) {
        await verifyAndSetUser(token);
      } else {
        setIsLoading(false);
        setIsAuthenticated(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (token: string) => {
    setIsLoading(true);
    await verifyAndSetUser(token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    router.push('/auth/signin');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
