const countrySchema = require('../models/country');
const continentSchema = require('../models/continent');

const fs = require('fs'); //file systeme


/*AJOUTER un élément dans la DB*/
exports.createCountry = (req, res, next) => {
    const country = new countrySchema({
      ...req.body,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    country.save()
    continentSchema.findByIdAndUpdate(
      { _id: req.body.continent },
      { $push: { countries: country._id } },
      {safe: true, upsert: true},
      )
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };


   /*SUPPRIMER le COUNTRY (_id) de la DB CONTINENT*/
  exports.removeCountryToContinent = (req, res, next) => {
      continentSchema.findByIdAndUpdate(
        { _id: req.body.continent },
        { $pull: { countries: req.params.id } },
        {safe: true, upsert: true},
        )
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

  /*AFFICHER 1 élément spécifique de la DB*/
  exports.getOneCountry = (req, res, next) => {
    countrySchema.findOne({ _id: req.params.id })
      .then(countries => res.status(200).json(countries))
      .catch(error => res.status(404).json({ error }));
  };
  
  /*MODIFIER un élément de la DB*/
  exports.editCountry = (req, res, next) => {
    const countryObject = req.file ?
      {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
      countrySchema.updateOne({ _id: req.params.id }, { ...countryObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

  /*SUPPRIMER un élément de la DB*/
  exports.deleteCountry = (req, res, next) => {
    countrySchema.findOne({ _id: req.params.id })
      .then(country => {
        const filename = country.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          countrySchema.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };
  
  /*AFFICHER les éléments de la DB*/
  exports.getAllCountries = (req, res, next) => {
    countrySchema.find()
    .populate('continent').sort({name:1})
    .populate('pictures')
      .then(countries => res.status(200).json(countries))
      .catch(error => res.status(400).json({ error }));
  };

   /*AFFICHER les CONTINENTS de la DB*/
   exports.getAllContinents = (req, res, next) => {
    continentSchema.find().sort({name:1})
      .then(continents => res.status(200).json(continents))
      .catch(error => res.status(400).json({ error }));
  };
  
