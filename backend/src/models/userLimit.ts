import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

var Schema = mongoose.Schema

// Model d'un user
const userLimitSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true },
    limitedStorage: { type: Number, required: true },
    currentStorage: { type: Number, required: true },
    limitedAnalyse: { type: Number, required: true },
    currentAnalyse: { type: Number, required: true }
});


userLimitSchema.plugin(uniqueValidator);


// Exportation du model
export default mongoose.model('UserLimit', userLimitSchema);