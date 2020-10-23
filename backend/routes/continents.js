const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');

const continentCtrl = require('../controllers/continents');

/*AFFICHER les éléments de la DB*/
router.get('/', continentCtrl.getAllContinents);

/*AFFICHER les COUNTRIES de la DB*/
router.get('/countries', continentCtrl.getAllCountries);

/*AJOUTER un élément dans la DB*/
router.post('/', multer, continentCtrl.createContinent);

/*AFFICHER 1 élément spécifique de la DB*/
router.get('/:id', continentCtrl.getOneContinent);
  
/*MODIFIER un élément de la DB*/
router.put('/update/:id', multer, continentCtrl.editContinent);
  
/*SUPPRIMER un élément de la DB*/
router.delete('/delete/:id', continentCtrl.deleteContinent);

module.exports = router;

  
