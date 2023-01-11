const express = require('express');
const router = express.Router();

const {validator} = require('../validators/detallePedidoValidator')

//Se importa controlador de autentificacion para administradores
const {authAdmin} = require('../controllers/authController')

//Se importa controlador
const controller = require('../controllers/detallePedidoController')

router.get('/api/detallePedido',authAdmin,controller.getDetallePedido);
router.post('/api/detallePedido',authAdmin,validator,controller.createDetallePedido);
router.delete('/api/detallePedido/:id',authAdmin,controller.deleteDetallePedido); //ELIMINA
router.put('/api/detallePedido/:id',authAdmin,validator,controller.updateDetallePedido);
router.get('/api/detallePedido/:id',authAdmin,controller.getDetallePedidoId);


module.exports = router;
