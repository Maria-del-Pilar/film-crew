const pool = require('../config/db');

// Consultar todos los proyectos.
async function obtenerProyectos(req, res) {
    try {
        const [proyectos] = await pool.query(
            'SELECT * FROM proyecto'
        );

        res.json(proyectos);
    } catch (error) {
        console.error('Error al consultar proyectos:', error);

        res.status(500).json({
            mensaje: 'Error al obtener los proyectos'
        });
    }
}

// Registrar un proyecto nuevo.
async function crearProyecto(req, res) {
    try {
        const { titulo, tipo, descripcion, roles, ubicacion, id_usuario } = req.body;

        if (!titulo || !tipo || !descripcion || !roles || !ubicacion || !id_usuario) {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            });
        }

        const [resultado] = await pool.query(
            `INSERT INTO proyecto
            (titulo, tipo, descripcion, roles, ubicacion, estado, id_usuario)
            VALUES (?, ?, ?, ?, ?, 'Activo', ?)`,
            [titulo, tipo, descripcion, roles, ubicacion, id_usuario]
        );

        res.status(201).json({
            mensaje: 'Proyecto creado correctamente',
            id_proyecto: resultado.insertId
        });
    } catch (error) {
        console.error('Error al crear el proyecto:', error);

        res.status(500).json({
            mensaje: 'Error al registrar el proyecto'
        });
    }
}


async function obtenerProyectoPorId(req, res) {
    try {
        const { id } = req.params;

        const [proyectos] = await pool.query(
            'SELECT * FROM proyecto WHERE id_proyecto = ?',
            [id]
        );

        if (proyectos.length === 0) {
            return res.status(404).json({
                mensaje: 'El proyecto no existe'
            });
        }

        return res.status(200).json(proyectos[0]);

    } catch (error) {
        console.error('Error al obtener el proyecto:', error);

        return res.status(500).json({
            mensaje: 'Error al obtener el proyecto'
        });
    }
}


async function actualizarProyecto(req, res) {
    try {
        const { id } = req.params;
        const {
            titulo,
            tipo,
            descripcion,
            roles,
            ubicacion,
            estado
        } = req.body;

        if (!titulo || !tipo || !descripcion || !roles || !ubicacion || !estado) {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            });
        }

        if (!['Activo', 'Inactivo'].includes(estado)) {
            return res.status(400).json({
                mensaje: 'El estado debe ser Activo o Inactivo'
            });
        }

        const [resultado] = await pool.query(
            `UPDATE proyecto
             SET titulo = ?, tipo = ?, descripcion = ?,
                 roles = ?, ubicacion = ?, estado = ?
             WHERE id_proyecto = ?`,
            [titulo, tipo, descripcion, roles, ubicacion, estado, id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'El proyecto no existe'
            });
        }

        return res.status(200).json({
            mensaje: 'Proyecto actualizado correctamente'
        });

    } catch (error) {
        console.error('Error al actualizar el proyecto:', error);

        return res.status(500).json({
            mensaje: 'Error al actualizar el proyecto'
        });
    }
}


async function eliminarProyecto(req, res) {
    try {
        const { id } = req.params;

        // Verificar si el proyecto tiene postulaciones
        const [postulaciones] = await pool.query(
            'SELECT id_postulacion FROM postulacion WHERE id_proyecto = ?',
            [id]
        );

        if (postulaciones.length > 0) {
            return res.status(409).json({
                mensaje: 'No se puede eliminar el proyecto porque tiene postulaciones registradas'
            });
        }

        // Eliminar el proyecto
        const [resultado] = await pool.query(
            'DELETE FROM proyecto WHERE id_proyecto = ?',
            [id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'El proyecto no existe'
            });
        }

        return res.status(200).json({
            mensaje: 'Proyecto eliminado correctamente'
        });

    } catch (error) {
        console.error('Error al eliminar el proyecto:', error);

        return res.status(500).json({
            mensaje: 'Error al eliminar el proyecto'
        });
    }
}


module.exports = {
    obtenerProyectos,
    crearProyecto,
    obtenerProyectoPorId,
    actualizarProyecto,
    eliminarProyecto
};