import express from 'express'
import User from '../models/user.model.js'

const router = express.Router();

// endpoint CRUD
// req contient toutes les informations sur la requête HTTP reçue par le serveur, comme la méthode, l'URL, les paramètres, et les données envoyées.
// res permet de définir la réponse envoyée au client, y compris les données, les codes de statut, et les en-têtes.

// GET
router.get('/all', async (req, res) => {
    try{
        // recupérer des données c'est a dire y pas besoin de mettre req et res
        const response = await User.find()
        res.status(200).json(response)
 
    } catch (error){
         res.status(500).json({error: error.message})
    }
 });

// Get by Id
// req.params  contient les paramètres dynamiques dans l'URL d'une route. Les paramètres sont définis dans la route comme des segments dynamiques, qui sont extraits de l'URL de la requête.
router.get("/find/:idUser", async (req, res) => {
    try{
        const response = await User.findById(req.params.idUser)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});
// POST (ajouter un nouvel utilisateur)
// req.body contient les données envoyées par le client dans le corps de la requête HTTP. Cela est principalement utilisé pour les requêtes de type POST, PUT, ou PATCH, où des informations sont envoyées au serveur (comme des formulaires ou des données JSON).
router.post('/add', async (req, res) => {
   try{
       const response = await User.create(req.body)
       res.status(200).json(response)

   } catch (error){
        res.status(500).json({error: error.message})
   }
});
// PUT
router.put('/update/:idUser', async (req, res) => {
    try{
        const response = await User.findByIdAndUpdate(
            req.params.idUser,
            req.body,
            {new: true}
        )
        res.status(200).json(response)
    } catch (error){
         res.status(500).json({error: error.message})
    }
});
// DELETE
router.delete('/delete/:idUser', async (req, res) => {
    try{
        const response = await User.findByIdAndDelete (req.params.idUser)
        res.status(200).json(response)
 
    } catch (error){
         res.status(500).json({error: error.message})
    }
});
export default router;