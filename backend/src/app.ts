import "dotenv/config";
import express from "express";
import mongoose from 'mongoose';
import userRoutes from './routes/user';
import cookieParser from 'cookie-parser';
import uploadRoutes from './routes/upload';




// Connexion avec la base de donnée Mongo
mongoose.connect(`${process.env.MONGO_DB_URI}`)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// Routes d'authentification
app.use('/api/auth', userRoutes);


// Routes pour l'upload de base de données
app.use('/upload', uploadRoutes)



export default app;