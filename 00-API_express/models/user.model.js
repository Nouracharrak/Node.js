
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        minLength: 3,
        maxLength: 20,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true  // Ajouter unique si l'email doit être unique
    },
    password: {
        type: String,
        minLength: 8,  // Correction ici de miniLength à minLength
        required: true
    }
}, {
    timestamps: true  // Permet d'ajouter automatiquement les champs createdAt et updatedAt
});

export default mongoose.model('User', UserSchema);
