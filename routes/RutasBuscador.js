const express = require('express');
const router = express.Router();

//Se importa controlador de buscador
const controller = require('../controllers/buscadorController')

router.get('/api/buscadorBebida',controller.buscarBebida);
router.get('/api/buscadorArticulo',controller.buscarArtManuf);

module.exports = router;