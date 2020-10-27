const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const pictureCtrl = require('../controllers/pictures');

/*AFFICHER les éléments de la DB*/
router.get('/',  pictureCtrl.getAllPictures);

/*AFFICHER les éléments de la DB*/
router.get('/auth',  auth, pictureCtrl.getAllPictures);

/*AFFICHER les CONTINENTS de la DB*/
router.get('/auth',  auth, pictureCtrl.getAllContinents);

/*AFFICHER les COUNTRIES de la DB*/
router.get('/auth',  auth, pictureCtrl.getAllCountries);

/*AFFICHER les COUNTRIES de la DB*/
//router.get('/auth/filter/:countryId',  auth, pictureCtrl.getPicturesByCountryId);

/*AJOUTER un élément dans la DB*/
router.post('/auth', auth, multer, pictureCtrl.createPicture); //placer "multer" après "auth" !

/*AFFICHER 1 élément spécifique de la DB*/
router.get('/auth/:id',  auth, pictureCtrl.getOnePicture);
  
/*MODIFIER un élément de la DB*/
router.put('/authupdate/:id',  auth, multer, pictureCtrl.editPicture);

/*SUPPRIMER la PICTURE (_id) de la DB COUNTRY*/
router.post('/auth/delete/:id',  auth, multer, pictureCtrl.removePictureToCountry);
  
/*SUPPRIMER un élément de la DB*/
router.delete('/auth/delete/:id', auth, pictureCtrl.deletePicture);

module.exports = router;