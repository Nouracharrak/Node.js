import express from 'express';
import UserMessage from '../models/userMessage.model.js';
import User from '../models/user.model.js';

const router = express.Router();

// post

router.post('/addMessage', async (req, res) => {
    try {
        const message = new UserMessage({
            content: req.body.content,
            author: req.body.author,
        });
        const savedMessage = await message.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get
router.get('/allMessages', async (req, res) => {
    try {
        // Récupère tous les messages et utilise populate pour inclure les informations sur l'auteur
        const messages = await UserMessage.find().populate('author');
        res.status(200).json(messages); // Envoie la liste des messages
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Get By Id
router.get('/message/:id', async (req, res) => {
    try {
        const message = await UserMessage.findById(req.params.id).populate('author');
        if (!message) {
            return res.status(404).json({ message: 'Message non trouvé' });
        }
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// GET ALL MESSAGES OF THE SAME USER
router.get('/all/message/:id', async (req, res) => {
    try {
        const message = await UserMessage.find({ author: req.params.id}).populate('author');
        if (!message) {
            return res.status(404).json({ message: 'Message non trouvé' });
        }
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Put: seul l'utilisateur peut modifier le message
router.put('/updateMessage/:id', async (req, res) => {
    try {
        const message = await UserMessage.findById(
            req.params.id,
            req.body,
            {new: true}
        );
        // Vérifie si l'auteur du message correspond à l'utilisateur qui veut le modifier
        if (message.author.toString() !== req.body.author) {
            return res.status(403).json({ message: 'Vous ne pouvez pas modifier ce message' });
        }
        // Si l'auteur est le même, on peut modifier le message
        message.content = req.body.content || message.content;
        
        const updatedMessage = await message.save();
        res.status(200).json(updatedMessage);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Delete: seul l'utilisateur peut supprimer le message
router.delete('/deleteMessage/:id', async (req, res) => {
    try {
        const message = await UserMessage.findByIdAndDelete(req.params.id);
         // Vérifie si l'auteur du message correspond à l'utilisateur qui veut le supprimer
         if (message.author.toString() !== req.body.author) {
        return res.status(403).json({ message: 'Vous ne pouvez pas supprimer ce message' });
        }
        await message.deleteOne();
        res.status(200).json({ message: 'Message supprimé' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export default router;