const express = require('express');
const router = express.Router();

const {validator} = require('../validators/facturaValidator')

//Se importa controlador de autentificacion para administradores y estandar
const {authAdmin,authEstandar} = require('../controllers/authController');

//Se importa controlador
const controller = require('../controllers/facturaController')

router.get('/api/factura',authEstandar,controller.getFacturas);
router.post('/api/factura',authAdmin,validator,controller.createFactura);
router.delete('/api/factura/:id',authAdmin,controller.deleteFactura); //ELIMINA
router.put('/api/factura/:id',authAdmin,validator,controller.updateFactura);
router.get('/api/factura/:id',authEstandar,controller.getFacuraId);


module.exports = router;