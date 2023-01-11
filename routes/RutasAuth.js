const express = require('express');
const router = express.Router();

const registrarValidator = require('../validators/registrarValidator');
const ingresarValidator = require('../validators/ingresarValidator');

//Se importa controlador
const controller = require('../controllers/authController')

router.post('/api/registrar',registrarValidator.validator,controller.registrar);
router.post('/api/ingresar',ingresarValidator.validator,controller.ingresar);

module.exports = router;
