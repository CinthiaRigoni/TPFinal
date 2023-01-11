const express = require('express');
const router = express.Router();

//Se importa validaciones
const {validator} = require('../validators/rolValidator')

//Se importa controlador de autentificacion para administradores
const {authAdmin} = require('../controllers/authController')

//Se importa controlador de roles
const controller = require('../controllers/rolController')

router.get('/api/roles',authAdmin,controller.getRoles);
router.get('/api/roles/all',authAdmin,controller.getAllRoles);
router.post('/api/roles',authAdmin,validator,controller.createRoles);
router.delete('/api/roles/:id',authAdmin,controller.bajaRoles); //BAJA LOGICA
router.put('/api/roles/:id',authAdmin,validator,controller.updateRoles);
router.get('/api/roles/:id',authAdmin,controller.getRolesId);
router.delete('/api/roles/delete/:id',authAdmin,controller.deleteRoles);

module.exports = router;