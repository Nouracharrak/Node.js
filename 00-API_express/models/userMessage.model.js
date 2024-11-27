import mongoose from "mongoose";
const UserMessageSchema = new mongoose.Schema({

        author: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true 
        },
        content:{
            type: String,
            required: true
        },
    }, {
        timestamps: true
    });

    const UserMessage = mongoose.model('UserMessage', UserMessageSchema);

    export default UserMessage;
