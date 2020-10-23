const countrySchema = require('../models/country');
const continentSchema = require('../models/continent');
const pictureSchema = require('../models/picture');

const fs = require('fs'); //file systeme

/*AJOUTER un élément dans la DB*/
/*exports.createPicture = (req, res, next) => {
  const pictureObject = JSON.parse(req.body.picture);
    const picture = new pictureSchema({
      ...pictureObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    picture.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };*/

  /*AJOUTER un élément dans la DB*/
  exports.createPicture = (req, res, next) => {
    const picture = new pictureSchema({
      ...req.body,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    picture.save()
    countrySchema.findByIdAndUpdate(
      { _id: req.body.country },
      { $push: { pictures: picture._id } },
      {safe: true, upsert: true},
      )
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

  /*SUPPRIMER la PICTURE (_id) de la DB COUNTRY*/
  exports.removePictureToCountry = (req, res, next) => {
    countrySchema.findByIdAndUpdate(
      { _id: req.body.country },
      { $pull: { pictures: req.params.id } },
      {safe: true, upsert: true},
      )
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

  /*AFFICHER 1 élément spécifique de la DB*/
  exports.getOnePicture = (req, res, next) => {
    pictureSchema.findOne({ _id: req.params.id })
      .then(pictures => res.status(200).json(pictures))
      .catch(error => res.status(404).json({ error }));
  };
  
  /*MODIFIER un élément de la DB*/
  exports.editPicture = (req, res, next) => {
    const pictureObject = req.file ?
      {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
      pictureSchema.updateOne({ _id: req.params.id }, { ...pictureObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };
  
  /*SUPPRIMER un élément de la DB*/
  exports.deletePicture = (req, res, next) => {
    pictureSchema.findOne({ _id: req.params.id })
      .then(picture => {
        const filename = picture.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          pictureSchema.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };
  
  /*AFFICHER les éléments de la DB*/
  exports.getAllPictures = (req, res, next) => {
    pictureSchema.find()
    .populate('continent').sort({name:1})
    .populate('country').sort({name:1})
      .then(pictures => res.status(200).json(pictures))
      .catch(error => res.status(400).json({ error }));
  };

   /*AFFICHER les CONTINENTS de la DB*/
   exports.getAllContinents = (req, res, next) => {
    continentSchema.find().sort({name:1})
      .then(continents => res.status(200).json(continents))
      .catch(error => res.status(400).json({ error }));
  };

  /*AFFICHER les CONTINENTS de la DB*/
  exports.getAllCountries = (req, res, next) => {
    countrySchema.find().sort({name:1})
      .then(countries => res.status(200).json(countries))
      .catch(error => res.status(400).json({ error }));
  };

  /*AFFICHER les CONTINENTS de la DB*/
  exports.getPicturesByCountryId = (req, res, next) => {
    pictureSchema.find({country : req.params.countryId})
    .populate('continent').sort({name:1})
    .populate('country').sort({name:1})
      .then(pictures => res.status(200).json(pictures))
      .catch(error => res.status(400).json({ error }));
  };
  
