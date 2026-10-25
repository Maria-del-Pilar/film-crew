
const express = require('express');
const router = express.Router();

const {
    obtenerUsuarioPorId,
    obtenerProyectosUsuario,
    obtenerPostulacionesUsuario
} = require('../controllers/usuarioController');

router.get('/:id', obtenerUsuarioPorId);
router.get('/:id/proyectos', obtenerProyectosUsuario);
router.get('/:id/postulaciones', obtenerPostulacionesUsuario);

module.exports = router;
