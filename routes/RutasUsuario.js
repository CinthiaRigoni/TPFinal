const express = require('express');
const router = express.Router();

const {validator} = require('../validators/usuarioValidator')

//Se importa controlador de autentificacion para administradores
const {authAdmin} = require('../controllers/authController')

//Se importa controlador del elemento
const controller = require('../controllers/usuarioController')

router.get('/api/usuario',authAdmin,controller.getUsuarios);
router.get('/api/usuario/all',authAdmin,controller.getAllUsuarios);
router.post('/api/usuario',validator,controller.createUsuario);
router.delete('/api/usuario/:id',authAdmin,controller.bajaUsuario); //BAJA LOGICA
router.put('/api/usuario/:id',validator,controller.updateUsuario);
router.get('/api/usuario/:id',authAdmin,controller.getUsuarioId);
router.delete('/api/usuario/delete/:id',authAdmin,controller.deleteUsuario);

module.exports = router;
