const express = require('express');
const router = express.Router();

//Se importa validaciones
const {validator} = require('../validators/rubroGeneralValidator')

//Se importa controlador de autentificacion para administradores
const {authAdmin} = require('../controllers/authController')

//Se importa controlador de rubro general
const controller = require('../controllers/rubroGeneralController')

router.get('/api/rubroGeneral',controller.getRubros);
router.get('/api/rubroGeneral/all',authAdmin,controller.getAllRubros);
router.post('/api/rubroGeneral',authAdmin,validator,controller.createRubros);
router.delete('/api/rubroGeneral/:id',authAdmin,controller.bajaRubros); //BAJA LOGICA
router.put('/api/rubroGeneral/:id',authAdmin,validator,controller.updateRubros);
router.get('/api/rubroGeneral/:id',controller.getRubrosId);
router.delete('/api/rubroGeneral/delete/:id',authAdmin,controller.deleteRubros);

module.exports = router;