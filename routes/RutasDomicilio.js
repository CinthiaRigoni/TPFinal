const express = require('express');
const router = express.Router();

const {validator} = require('../validators/domicilioValidator')

//Se importa controlador de autentificacion para administradores
const {authAdmin} = require('../controllers/authController')

//Se importa controlador
const controller = require('../controllers/domicilioController')

router.get('/api/domicilio',authAdmin,controller.getDomicilio);
router.post('/api/domicilio',authAdmin,validator,controller.createDomicilio);
router.delete('/api/domicilio/:id',authAdmin,controller.deleteDomicilio); //ELIMINA
router.put('/api/domicilio/:id',authAdmin,validator,controller.updateDomicilio);
router.get('/api/domicilio/:id',authAdmin,controller.getDomicilioId);


module.exports = router;
