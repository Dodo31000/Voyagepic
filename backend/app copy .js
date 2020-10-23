const express = require('express');
const bodyParser = require('body-parser');
const continentSchema = require('./models/continent');

const app = express();

const mongoose = require('mongoose');


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

/*AJOUTER un élément dans la DB*/
app.post('/api/continents', (req, res, next) => {
  const continent = new continentSchema({
    ...req.body
  });
  continent.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

/*AFFICHER 1 élément spécifique de la DB*/
app.get('/api/continents/:id', (req, res, next) => {
  continentSchema.findOne({ _id: req.params.id })
    .then(continents => res.status(200).json(continents))
    .catch(error => res.status(404).json({ error }));
});

/*MODIFIER un élément de la DB*/
app.put('/api/continents/update/:id', (req, res, next) => {
  continentSchema.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

/*SUPPRIMER un élément de la DB*/
app.delete('/api/continents/delete/:id', (req, res, next) => {
  continentSchema.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

/*AFFICHER les éléments de la DB*/
app.use('/api/continents', (req, res, next) => {
  continentSchema.find()
    .then(continents => res.status(200).json(continents))
    .catch(error => res.status(400).json({ error }));
});


module.exports = app;