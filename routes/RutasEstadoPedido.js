const express = require('express');
const router = express.Router();

const {validator} = require('../validators/estadoPedidoValidator')

//Se importa controlador de autentificacion para administradores y estandar
const {authAdmin,authEstandar} = require('../controllers/authController');

//Se importa controlador
const controller = require('../controllers/estadoPedidoController')

router.get('/api/estadoPedido',authEstandar,controller.getEstadoPedido);
router.get('/api/estadoPedido/all',authEstandar,controller.getAllEstadoPedido);
router.post('/api/estadoPedido',authAdmin,validator,controller.createEstadoPedido);
router.delete('/api/estadoPedido/:id',authAdmin,controller.bajaEstadoPedido); //BAJA LOGICA
router.put('/api/estadoPedido/:id',authAdmin,validator,controller.updateEstadoPedido);
router.get('/api/estadoPedido/:id',authEstandar,controller.getEstadoPedidoId);
router.delete('/api/estadoPedido/delete/:id',authAdmin,controller.deleteEstadoPedido);

module.exports = router;
