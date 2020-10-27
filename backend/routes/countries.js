const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const countryCtrl = require('../controllers/countries');

/*AFFICHER les éléments de la DB*/
router.get('/', countryCtrl.getAllCountries);

/*AFFICHER les éléments de la DB*/
router.get('/auth', auth, countryCtrl.getAllCountries);

/*AFFICHER les CONTINENTS de la DB*/
router.get('/auth',  auth, countryCtrl.getAllContinents);

/*AJOUTER un élément dans la DB*/
router.post('/auth',  auth, multer, countryCtrl.createCountry);

/*AFFICHER 1 élément spécifique de la DB*/
router.get('/auth/:id',  auth, countryCtrl.getOneCountry);
  
/*MODIFIER un élément de la DB*/
router.put('/auth/update/:id',  auth, multer, countryCtrl.editCountry);

/*SUPPRIMER le COUNTRY (_id) de la DB CONTINENT*/
router.post('/auth/delete/:id',  auth, countryCtrl.removeCountryToContinent);
  
/*SUPPRIMER un élément de la DB*/
router.delete('/auth/delete/:id',  auth, countryCtrl.deleteCountry);

module.exports = router;