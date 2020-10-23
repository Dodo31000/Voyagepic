const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');

const pictureCtrl = require('../controllers/pictures');

/*AFFICHER les éléments de la DB*/
router.get('/', pictureCtrl.getAllPictures);

/*AFFICHER les CONTINENTS de la DB*/
router.get('/', pictureCtrl.getAllContinents);

/*AFFICHER les COUNTRIES de la DB*/
router.get('/', pictureCtrl.getAllCountries);

/*AFFICHER les COUNTRIES de la DB*/
router.get('/filter/:countryId', pictureCtrl.getPicturesByCountryId);

/*AJOUTER un élément dans la DB*/
router.post('/', multer, pictureCtrl.createPicture); //placer "multer" avant "auth" !

/*AFFICHER 1 élément spécifique de la DB*/
router.get('/:id', pictureCtrl.getOnePicture);
  
/*MODIFIER un élément de la DB*/
router.put('/update/:id', multer, pictureCtrl.editPicture);

/*SUPPRIMER la PICTURE (_id) de la DB COUNTRY*/
router.post('/delete/:id', multer, pictureCtrl.removePictureToCountry);
  
/*SUPPRIMER un élément de la DB*/
router.delete('/delete/:id', pictureCtrl.deletePicture);

module.exports = router;