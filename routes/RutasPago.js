const express = require('express')
const router = express.Router()

//Validador
const {validator} = require('../validators/pagoValidator')

//Controlador
const controller = require('../controllers/pagoController')

router.post('/api/pago',validator,controller.generaPago);

module.exports = router;