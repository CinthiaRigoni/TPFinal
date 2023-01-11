const express = require('express');
const router = express.Router();

const {validator} = require('../validators/pedidoValidator')

//Se importa controlador de autentificacion para administradores y estandar
const {authAdmin,authEstandar} = require('../controllers/authController');

//Se importa controlador
const controller = require('../controllers/pedidoController')

router.get('/api/pedido',authEstandar,controller.getPedidos);
router.post('/api/pedido',authAdmin,validator,controller.createPedido);
router.delete('/api/pedido/:id',authAdmin,controller.deletePedido); //ELIMINA
router.put('/api/pedido/:id',authAdmin,validator,controller.updatePedido);
router.get('/api/pedido/:id',authEstandar,controller.getPedidoId);


module.exports = router;