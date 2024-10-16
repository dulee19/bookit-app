
import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import checkAuth from "@/app/actions/checkAuth";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const { isAuthenticated, user } = await checkAuth();

      setIsAuthenticated(isAuthenticated);
      setCurrentUser(user || null);
    }

    checkAuthentication();
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      currentUser,
      setCurrentUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context;
}