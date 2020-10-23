const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const continentsRoutes = require('./routes/continents');
const countriesRoutes = require('./routes/countries');
const picturesRoutes = require('./routes/pictures');

const app = express();

const path = require('path');

/*Se connecter à la DB*/
mongoose.connect('mongodb+srv://doriane-31:H3Ne349UF4Ioo50h@cluster0.euroi.mongodb.net/dbvoyagepic?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  
/*Corriger les erreurs dee CORS*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //accéder à l'API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //ajouter les headers mentionnés aux requêtes envoyées vers l'API
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //envoyer des requêtes avec les méthodes mentionnées
  next();
});

app.use(bodyParser.json());

app.use('/api/continents', continentsRoutes);
app.use('/api/countries', countriesRoutes);
app.use('/api/pictures', picturesRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;