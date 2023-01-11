const express = require('express');
const router = express.Router();

const {validator} = require('../validators/mercadoPagoDatosValidator')

//Se importa controlador de autentificacion para administradores y estandar
const {authAdmin,authEstandar} = require('../controllers/authController');

//Se importa controlador
const controller = require('../controllers/MercadoPagoDatosController')

router.get('/api/mpDatos',authEstandar,controller.getMPDatos);
router.post('/api/mpDatos',authAdmin,validator,controller.createMPDatos);
router.delete('/api/mpDatos/:id',authAdmin,controller.deleteMPDatos); //ELIMINA
router.put('/api/mpDatos/:id',authAdmin,validator,controller.updateMPDatos);
router.get('/api/mpDatos/:id',authEstandar,controller.getMPDatosId);


module.exports = router;