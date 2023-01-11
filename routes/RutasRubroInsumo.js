const express = require('express');
const router = express.Router();

const {validator} = require('../validators/rubroInsumoValidator')

//Se importa controlador de autentificacion para administradores
const {authAdmin} = require('../controllers/authController')

//Se importa controlador de rubro insumo
const controller = require('../controllers/rubroInsumoController')

router.get('/api/rubroInsumo',controller.getRubros);
router.get('/api/rubroInsumo/all',authAdmin,controller.getAllRubros);
router.post('/api/rubroInsumo',authAdmin,validator,controller.createRubros);
router.delete('/api/rubroInsumo/:id',authAdmin,controller.bajaRubros); //BAJA LOGICA
router.put('/api/rubroInsumo/:id',authAdmin,validator,controller.updateRubros);
router.get('/api/rubroInsumo/:id',controller.getRubrosId);
router.delete('/api/rubroInsumo/delete/:id',authAdmin,controller.deleteRubros);

module.exports = router;
