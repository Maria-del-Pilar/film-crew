
const express = require('express');
const router = express.Router({ mergeParams: true });

const {
    crearPostulacion,
    obtenerPostulaciones
} = require('../controllers/postulacionController');

router.post('/', crearPostulacion);
router.get('/', obtenerPostulaciones)

module.exports = router;
