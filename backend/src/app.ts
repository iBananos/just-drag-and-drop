import "dotenv/config";
import path from "path"
import express from "express";
import mongoose from 'mongoose';
import userRoutes from './routes/user';
import cookieParser from 'cookie-parser';
import uploadRoutes from './routes/upload';
import dataVisuRoutes from './routes/dataVisu';
import analyzeRoutes from './routes/analyze';
import middlewareError from './middleware/error';
import HttpException from './utils/httpException';



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
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, x-xsrf-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// Demande a node de servire les fichier react
//app.use(express.static(path.resolve(__dirname, '../../site-web/react-ts-app/build')));


// Routes d'authentification
app.use('/api/auth', userRoutes);

// Routes pour l'upload de base de données
app.use('/api/upload', uploadRoutes);

// Routes pour les analyses de base de données
app.use('/api/analyze', analyzeRoutes);

// Routes pour les dataVisualisation de base de données
app.use('/api/dataVisu', dataVisuRoutes);


// Toutes les autres demandes GET non traitées renverront sur application React
/*
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../site-web/react-ts-app/build', 'index.html'));

});
*/


// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'app.ts', 'Page Not Found');
    next(err);
});

// Error middleware
app.use(middlewareError);



export default app;