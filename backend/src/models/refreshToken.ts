import mongoose from 'mongoose';

var Schema = mongoose.Schema

// Model d'un user
const refreshTokenSchema = new mongoose.Schema({
    refreshToken: { type: String, required: true },
    expires: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true }
});



// Exportation du model
export default mongoose.model('RefreshToken', refreshTokenSchema);