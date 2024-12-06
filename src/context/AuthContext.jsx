import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Créer un contexte
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn();
  }, []);

  const login = async (dataForm) => {
    setIsLoading(true);
    try {
      const { data, status } = await axios.post('http://localhost:8000/api/user/sign', dataForm);
      if (status === 200) {
        // Stocke les données de l'utilisateur dans localStorage
        localStorage.setItem('auth', JSON.stringify(data));
      }
      // Met à jour l'état avec les données de l'utilisateur
      setAuth(data);
      navigate('/');
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  const isLoggedIn = async () => {
    setIsLoading(true);
    try {
      const authData = localStorage.getItem('auth');
      setAuth(authData ? JSON.parse(authData) : null);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = () => {
    setIsLoading(true);
    setAuth(null);
    localStorage.removeItem('auth');
    navigate('/');
    setIsLoading(false);
  };

  // Vérifie si l'utilisateur est un admin
  const isAdmin = () => {
    return auth?.role === 'admin'; // Retourne true si le rôle est admin
  };

  return (
    <AuthContext.Provider value={{ login, logout, auth, isLoading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

