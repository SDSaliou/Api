//Créer un dossier models et un fichier User.js à l'intérieur.
//Dans User.js, définir un schéma Mongoose et exporter le modèle. Vous l'utiliserez dans server.js.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, default: 0 }
});

module.exports = mongoose.model('Users', userSchema);
