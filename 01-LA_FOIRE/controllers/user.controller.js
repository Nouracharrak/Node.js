import Model from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from '../config/index.js';
// Cette fonction est une fonction asynchrone nommée 'signup'
export const signup = async (req, res, next) => {
  // Début du bloc try pour la gestion des erreurs
  try {
    // Hashage du mot de passe avec bcrypt, "10" est le nombre de tours de salage
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    // Création d'un nouvel utilisateur dans la base de données avec les informations reçues et le mot de passe haché
    await Model.create({ 
		// '...req.body' est une syntaxe de décomposition (spread syntax). Elle permet de créer une copie de toutes les propriétés de 'req.body' et de les ajouter à l'objet en cours de création.
      ...req.body,
      password: hashedPassword
     });

    // Envoi d'une réponse avec le statut 201 (créé) et un message de confirmation
    res.status(201).json("User has been created!");
  } catch (error) {
    // Si une erreur se produit, passez-la au prochain middleware pour la gestion des erreurs
    next(error);
  }
};

// Fonction SIGN
export const sign = async (req, res,next) => {
  try{
    // Recherche l'utilisateur dans la base de données par son email
    const user = await Model.findOne({ email: req.body.email })
    // si l'utilisateur n'est pas trouvé, renvoie une erreur 404.
    if(!user) return res.status(404).json("User not found!");

    // Compare le mot de passe fourni dans la requête avec le mot de passe de l'utilisateur (qui est dans la bdd)
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    )

		// Si le mot de passe est incorrect, renvoie une erreur 400.
    if(!comparePassword) return res.status(400).json("Wrong Credentials!") 

    // Crée un jeton JWT pour l'utilisateur avec son ID, expire après 24 heures
    const token = jwt.sign(
		// Le premier argument est la charge utile du token. Ici, nous incluons l'ID de l'utilisateur
		{ id: user._id}, 
		// Le deuxième argument est la clé secrète, qui est utilisée pour signer le token. Nous la récupérons à partir des variables d'environnement
		env.token, 
	  // Le troisième argument est un objet contenant les options du token. Ici, nous définissons une durée d'expiration de 24 heures pour le token
		{ expiresIn: "24h"})
    // Supprime le mot de passe de l'utilisateur pour des raisons de sécurité. Ce code utilise la destructuration pour extraire; la propriété password de user._doc. Toutes les autres propriétés sont regroupées dans un nouvel objet appelé others. C’est une pratique courante lorsque vous voulez exclure certaines propriétés d’un objet. 
    const { password, ...others } = user._doc
    
    // Envoie le jeton (token) JWT sous forme de cookie HTTPOnly
    res.cookie('access_token', token, { httpOnly: true })
    .status(200)
    .json(others) 
    // .json(others) Renvoie les données d'utilisateur en réponse (à l'exeption du mot de passe)
  }catch(error){
    next(error)
  }
} 
// Fonction pour récupérer tous les joueurs
export const getUsers = async (req, res) => {
  try {
    // Récupérer tous les users depuis la base de données. La fonction find() permet de récupérer tous les users 
    const users = await Model.find();
    // Envoyer une réponse avec les users récupérés
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};
// Cette fonction est une fonction asynchrone nommée 'getUserById'
export const getUserById = async (req, res) => {
  try{
    // nous essayons de récupérer un utilisateur de notre base de données 'Model.findById(req.params.id ; cherche un utilisateur avec l'ID fourni dans les paramètres de la requête
    const user = await Model.findById(req.params.id)
    
    // Si l'utilisateur est trouvé, nous renvoyons un statut 200 (OK) avec les données de l'utilisateur
    if(user) res.status(200).json(user)
    
     // Si aucun utilisateur n'est trouvé avec cet ID, nous renvoyons un statut 404 (Non trouvé) avec un message d'erreur
     if(!user) res.status(404).json("User not found !")
    
  }catch(error){
    // Si une erreur se produit lors de la récupération de l'utilisateur, nous l'affichons dans la console
    console.log(error);
  }
}

// Fonction pour supprimer un joueur
export const deleteUser = async (req, res, next) => {
  try{
    // Rechercher l'utilisateur par son ID dans la base de données
    const user = await Model.findById(req.params.id)
    // Vérifier si l'utilisateur existe
    if (!user) return res.status(404).json("User not found.")
    
//     // Supprimer l'utilisateur de la base de données
//     await Model.findOneAndDelete(req.params.id)
//     // Envoyer une réponse avec un message indiquant que l'utilisateur a été mis à jour avec les données mises à jour de l'utilisateur
//     res.status(200).json(`The User with the id 
// 		${req.params.id} has been deleted.`)
//   }catch(error){
// 	  // Si une erreur se produit lors de la récupération de l'utilisateur, nous l'affichons dans la console
//     console.log(error)
//   }
// }  
// import User from '../models/user.model.js';  // Modèle de l'utilisateur

// export const deleteUser = async (req, res) => {
//   try {
//     // Vérifier si l'utilisateur est authentifié et s'il est le bon utilisateur ou un administrateur
//     const userIdFromToken = req.user.id;  // L'ID de l'utilisateur connecté à partir du token JWT
//     const userIdToDelete = req.params.id; // L'ID de l'utilisateur à supprimer (depuis la route)

  // Si l'utilisateur connecté tente de supprimer son propre compte
    if (userIdFromToken === userIdToDelete) {
      const deletedUser = await User.findByIdAndDelete(userIdToDelete); // Supprimer l'utilisateur
      if (!deletedUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      return res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } else {
      return res.status(403).json({ message: 'Accès refusé. Vous ne pouvez pas supprimer un autre utilisateur.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error: error.message });
  }
};

// Fonction pour mettre à jour un user
export const updateUser = async (req, res, next) => {
  try{
    // Rechercher l'utilisateur par son ID dans la base de données
    const user = await Model.findById(req.params.id);
    // Vérifier si l'utilisateur existe
    if(!user) return res.status(404).json("user not found !");

    // Mettre à jour l'utilisateur avec les données fournies dans le corps de la requête
    const userUpdated = await Model.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )

    // Envoyer une réponse avec un message indiquant que l'utilisateur a été mis à jour avec les données mises à jour de l'utilisateur
    res.status(200).json({
      message: "User updated",
      userUpdated
    })
  }catch(error){
    // Si une erreur se produit lors de la récupération de l'utilisateur, nous l'affichons dans la console
    console.log(error)
  }
}

// Fonction pour modifier le profil
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;  // Récupérer l'ID de l'utilisateur depuis le token JWT
    const updatedData = req.body;  // Les nouvelles données à mettre à jour

    // Mettre à jour l'utilisateur dans la base de données
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ message: 'Profil mis à jour avec succès', updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du profil', error: error.message });
  }
};

// Fonction pour désactiver l'utilisateur
export const desactivateUser = async (req, res) => {
  try {
    const userId = req.user.id;  // L'utilisateur connecté
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    user.isActive = false;  // Désactiver le compte
    await user.save();

    res.status(200).json({ message: 'Compte désactivé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la désactivation du compte', error: error.message });
  }
};

