// const express = require ('express') une autre méthode
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

// ROUTES
import user from './router/user.js'
import userMessage from './router/message.js';


dotenv.config();
const app = express();

// Port 
const PORT = process.env.PORT || 8080;



// Connexion à MongoDB

mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME, 
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(error => console.error('Erreur lors de la connexion à MongoDB :', error));

// MIDDLEWARES 
// a chaque fois qu'on envoit une requette à notre serveur, a partir de ce moment la, ma requette est intersepter. ils doivenet etre toujours avant les prefix: En Node.js, le middleware joue un rôle essentiel dans la gestion des requêtes HTTP avant qu'elles n'atteignent leur gestionnaire final (comme un contrôleur ou une fonction qui renvoie une réponse). Le terme "middleware" désigne un ensemble de fonctions qui s'exécutent de manière séquentielle lors du traitement des requêtes
app.use(express.json())
// USE ROUTER 
app.use('/api/user', user)
app.use('/api/message', userMessage);
// SERVER LISTEN
app.listen(PORT, () =>{
    console.log(`Listening at http://localhost:${PORT}`);
 })