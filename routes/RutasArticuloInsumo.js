const express = require('express');
const router = express.Router();

const {validator} = require('../validators/articuloInsumoValidator')

//Se importa controlador de autentificacion para administradores
const {authAdmin} = require('../controllers/authController')

//Se importa controlador de articulo insumo
const controller = require('../controllers/articuloInsumoController')

router.get('/api/articuloInsumo',authAdmin,controller.getArticulos);
router.get('/api/articuloInsumo/all',authAdmin,controller.getAllArticulos);
router.post('/api/articuloInsumo',authAdmin,validator,controller.createArticulo);
router.delete('/api/articuloInsumo/:id',authAdmin,controller.bajaArticulo); //BAJA LOGICA
router.put('/api/articuloInsumo/:id',authAdmin,validator,controller.updateArticulo);
router.get('/api/articuloInsumo/:id',authAdmin,controller.getArticuloId);
router.delete('/api/articuloInsumo/delete/:id',authAdmin,controller.deleteArticulo);


module.exports = router;
