import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { AuthContext } from '../context/AuthContext';

const Sign = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login, isLoading } = useContext(AuthContext);  // On ne récupère plus 'auth' ici
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(user);  // Effectue la connexion

      // Récupérer les données de l'utilisateur à partir de 'localStorage'
      const storedAuth = JSON.parse(localStorage.getItem('auth'));

      if (storedAuth?.role === 'admin') {
        navigate('/dashboard'); // Redirige vers le dashboard pour les admins
      } else {
        navigate('/'); // Redirige vers la page d'accueil pour les utilisateurs normaux
      }
    } catch (err) {
      setError('Identifiants incorrects');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={isLoading}>Login</button>
        <Link to="/register">You are not registered?</Link>
      </form>
    </div>
  );
};

export default Sign;


