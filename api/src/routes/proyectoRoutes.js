const express = require('express');
const router = express.Router();

const {
    obtenerProyectos,
    crearProyecto,
    obtenerProyectoPorId,
    actualizarProyecto,
    eliminarProyecto
} = require('../controllers/proyectoController');

router.get('/', obtenerProyectos);
router.post('/', crearProyecto);
router.get('/:id', obtenerProyectoPorId);
router.put('/:id', actualizarProyecto);
router.delete('/:id', eliminarProyecto);

module.exports = router;