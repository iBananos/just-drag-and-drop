import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// Model d'un user
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);


// Exportation du model
export default mongoose.model('User', userSchema);