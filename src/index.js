import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Importe BrowserRouter depuis la bibliothèque 'react-router-dom'
// BrowserRouter est un composant 
// qui permet de gérer la navigation (routing) dans une application React
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

// context
import { AuthProvider } from './context/AuthContext';

// Redux
import store from './redux/store'
import {Provider} from 'react-redux'

// pour que le cookie soit correctement géré dans les requetes axios, il faut rajouter withcredentials
axios.defaults.withCredentials = true;

// Trouve l'élément HTML avec l'ID 'root' dans le DOM
// Cela correspond généralement à une div 
// dans le fichier index.html (dans le dossier public ) 
// où l'application React sera injectée
const root = ReactDOM.createRoot(document.getElementById('root'));

// Utilise la méthode render() pour afficher l'application dans le DOM
root.render(
  // React.StrictMode est un outil de développement 
  // qui permet de détecter des problèmes potentiels dans le code
  // Il n'a aucun effet sur la production, 
  // mais aide à écrire un code React plus propre
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
