import React, {useState} from 'react'
import '../styles/register.css'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Register = () => {

    const [user, setUser] = useState({
        isActive: true
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (event) => {
        // Empêche le comportement par défaut du formulaire
        event.preventDefault();
        try {
            console.log(event)
            // Envoie une requête POST à l'API avec les données utilisateur
            await axios.post(`http://localhost:8000/api/user/signup`, user);
            console.log("Utilisateur créé avec succès !");
        } catch (error) {
            // En cas d'erreur, affiche l'erreur dans la console
            console.error("Erreur lors de l'inscription :", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="register-form">
            {/* Exemple d'input lié */}
            <input
                type="text"
                name="prenom"
                onChange={handleChange}
                placeholder="Nom d'utilisateur"
            />
            <input
                type="text"
                name="avatar"
                onChange={handleChange}
                placeholder="URL picture"
            />
            <input
                type="text"
                name="email"
                onChange={handleChange}
                placeholder="email"
            />
            <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="password"
            />
            <button type="submit">Registration</button>
            <Link to='/sign'>Already registrer</Link>
        </form>
    );
};

export default Register;
