const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');

const countryCtrl = require('../controllers/countries');

/*AFFICHER les éléments de la DB*/
router.get('/', countryCtrl.getAllCountries);

/*AFFICHER les CONTINENTS de la DB*/
router.get('/', countryCtrl.getAllContinents);

/*AJOUTER un élément dans la DB*/
router.post('/', multer, countryCtrl.createCountry);

/*AFFICHER 1 élément spécifique de la DB*/
router.get('/:id', countryCtrl.getOneCountry);
  
/*MODIFIER un élément de la DB*/
router.put('/update/:id', multer, countryCtrl.editCountry);

/*SUPPRIMER le COUNTRY (_id) de la DB CONTINENT*/
router.post('/delete/:id', countryCtrl.removeCountryToContinent);
  
/*SUPPRIMER un élément de la DB*/
router.delete('/delete/:id', countryCtrl.deleteCountry);

module.exports = router;