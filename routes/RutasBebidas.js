const express = require('express');
const router = express.Router();

const {validator} = require('../validators/bebidaValidator')

//Se importa controlador de autentificacion para administradores
const {authAdmin} = require('../controllers/authController')

//Se importa controlador de bebidas
const controller = require('../controllers/bebidaController')

router.get('/api/bebidas',controller.getBebidas);
router.get('/api/bebidas/all',authAdmin,controller.getAllBebidas);
router.post('/api/bebidas',authAdmin,validator,controller.createBebidas);
router.delete('/api/bebidas/:id',authAdmin,controller.bajaBebidas); //BAJA LOGICA
router.put('/api/bebidas/:id',authAdmin,validator,controller.updateBebidas);
router.get('/api/bebidas/:id',controller.getBebidasId);
router.delete('/api/bebidas/delete/:id',authAdmin,controller.deleteBebidas);

module.exports = router;
