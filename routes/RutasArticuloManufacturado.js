const express = require('express');
const router = express.Router();

const {validator} = require('../validators/articuloManufacturadoValidator')

//Se importa controlador de autentificacion para administradores
const {authAdmin} = require('../controllers/authController');

//Se importa controlador de articulo manufacturado
const controller = require('../controllers/articuloManufacturadoController')

router.get('/api/articuloManufacturado',controller.getArticulos);
router.get('/api/articuloManufacturado/all',authAdmin,controller.getAllArticulos);
router.post('/api/articuloManufacturado',authAdmin,validator,controller.createArticulo);
router.delete('/api/articuloManufacturado/:id',authAdmin,controller.bajaArticulo); //BAJA LOGICA
router.put('/api/articuloManufacturado/:id',authAdmin,validator,controller.updateArticulo);
router.get('/api/articuloManufacturado/:id',controller.getArticuloId);
router.delete('/api/articuloManufacturado/delete/:id',authAdmin,controller.deleteArticulo);


module.exports = router;
