
const express = require('express');
const mongoose = require('mongoose');


const app = express();
app.use(express.json()); // Middleware pour analyser le corps des requêtes en JSON

// Connexion à la base de données
const uri = 'localhost:27017'; 
const database = 'Server';

mongoose.connect(`mongodb://${uri}/${database}`)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(err => console.error('Erreur lors de la connexion à la base de données:', err));

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});



const User = require('./models/Users');

// GET : retourner tous les utilisateurs
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// POST : ajouter un nouvel utilisateur
app.post('/users', async (req, res) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT : éditer un utilisateur par ID
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE : supprimer un utilisateur par ID
app.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json(err);
    }
});
