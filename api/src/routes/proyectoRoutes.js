const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/verificarToken');

const {
    obtenerProyectos,
    crearProyecto,
    obtenerProyectoPorId,
    actualizarProyecto,
    eliminarProyecto
} = require('../controllers/proyectoController');

router.get('/', obtenerProyectos);
router.post('/', verificarToken, crearProyecto);
router.get('/:id', obtenerProyectoPorId);
router.put('/:id', verificarToken, actualizarProyecto);
router.delete('/:id', verificarToken, eliminarProyecto);

module.exports = router;