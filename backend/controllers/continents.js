const continentSchema = require('../models/continent');
const countrySchema = require('../models/country');

const fs = require('fs'); //file systeme

/*AJOUTER un élément dans la DB*/
  exports.createContinent = (req, res, next) => {
    const continent = new continentSchema({
      ...req.body,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    //continent.countries.push(req._id);
    continent.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

  /*AFFICHER 1 élément spécifique de la DB*/
  exports.getOneContinent = (req, res, next) => {
    continentSchema.findOne({ _id: req.params.id })
      .then(continents => res.status(200).json(continents))
      .catch(error => res.status(404).json({ error }));
  };

  /*MODIFIER un élément de la DB*/
  exports.editContinent = (req, res, next) => {
    const continentObject = req.file ?
      {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
      continentSchema.updateOne({ _id: req.params.id }, { ...continentObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

  
  /*SUPPRIMER un élément de la DB*/
  exports.deleteContinent = (req, res, next) => {
    continentSchema.findOne({ _id: req.params.id })
      .then(continent => {
        const filename = continent.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          continentSchema.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };
  
  /*AFFICHER les éléments de la DB*/
  exports.getAllContinents = (req, res, next) => {
    continentSchema.find().populate('countries').sort({name:1})
      .then(continents => res.status(200).json(continents))
      .catch(error => res.status(400).json({ error }));
  };

  /*AFFICHER les COUNTRIES ASSOCIES de la DB*/
  exports.getAllCountries = (req, res, next) => {
    countrySchema.find().sort({name:1})
      .populate('continent').populate('pictures')
      .then(countries => res.status(200).json(countries))
      .catch(error => res.status(400).json({ error }));
  };
  
