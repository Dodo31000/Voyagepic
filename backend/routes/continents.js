const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const continentCtrl = require('../controllers/continents');

/*AFFICHER les éléments de la DB*/
router.get('/', continentCtrl.getAllContinents);

/*AFFICHER les éléments de la DB*/
router.get('/auth', auth, continentCtrl.getAllContinents);

/*AFFICHER les COUNTRIES de la DB*/
//router.get('/countries',  auth, continentCtrl.getAllCountries);

/*AJOUTER un élément dans la DB*/
router.post('/auth',  auth, multer, continentCtrl.createContinent);

/*AFFICHER 1 élément spécifique de la DB*/
router.get('/auth/:id',  auth, continentCtrl.getOneContinent);
  
/*MODIFIER un élément de la DB*/
router.put('/auth/update/:id',  auth, multer, continentCtrl.editContinent);
  
/*SUPPRIMER un élément de la DB*/
router.delete('/auth/delete/:id',  auth, continentCtrl.deleteContinent);

module.exports = router;

  
