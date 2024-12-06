import React from 'react';
import { Link } from 'react-router-dom'; // Pour les liens internes de React
import '../styles/footer.css'

const Footer = () => {
  return (
    <footer className="my-footer">
      <div className="my-footer-content">
        {/* Navigation */}
        <nav className="my-footer-nav">
          <ul>
            <li><Link to="/about">À propos</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy-policy">Politique de confidentialité</Link></li>
            <li><Link to="/terms">Conditions d'utilisation</Link></li>
          </ul>
        </nav>

        {/* Réseaux sociaux */}
        <div className="my-social-media">
          <ul>
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i> Facebook</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i> Instagram</a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i> Twitter</a></li>
          </ul>
        </div>

        {/* Informations légales */}
        <div className="my-footer-info">
          <p>&copy; 2024 MonSite. Tous droits réservés.</p>
          <p>Développé par <a href="https://www.monportfolio.com" target="_blank" rel="noopener noreferrer">Mon Portfolio</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
