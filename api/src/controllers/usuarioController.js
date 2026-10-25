
const pool = require('../config/db');

async function obtenerUsuarioPorId(req, res) {
    try {
        const { id } = req.params;

        const [usuarios] = await pool.query(
            `SELECT
                id_usuario,
                nombre,
                correo,
                rol,
                foto,
                ubicacion
             FROM usuario
             WHERE id_usuario = ?`,
            [id]
        );

        if (usuarios.length === 0) {
            return res.status(404).json({
                mensaje: 'El usuario no existe'
            });
        }

        return res.status(200).json(usuarios[0]);

    } catch (error) {
        console.error('Error al obtener el usuario:', error);

        return res.status(500).json({
            mensaje: 'Error al obtener el usuario'
        });
    }
}


async function obtenerProyectosUsuario(req, res) {
    try {
        const { id } = req.params;

        // Verificar que el usuario exista.
        const [usuarios] = await pool.query(
            'SELECT id_usuario FROM usuario WHERE id_usuario = ?',
            [id]
        );

        if (usuarios.length === 0) {
            return res.status(404).json({
                mensaje: 'El usuario no existe'
            });
        }

        // Consultar los proyectos creados por el usuario.
        const [proyectos] = await pool.query(
            `SELECT
                proyecto.id_proyecto,
                proyecto.titulo,
                proyecto.descripcion,
                proyecto.ubicacion,
                proyecto.estado,
                usuario.nombre AS creador
             FROM proyecto
             INNER JOIN usuario
                ON proyecto.id_usuario = usuario.id_usuario
             WHERE usuario.id_usuario = ?`,
            [id]
        );

        return res.status(200).json(proyectos);

    } catch (error) {
        console.error('Error al obtener los proyectos del usuario:', error);

        return res.status(500).json({
            mensaje: 'Error al obtener los proyectos del usuario'
        });
    }
}


async function obtenerPostulacionesUsuario(req, res) {
    try {
        const { id } = req.params;

        const [usuarios] = await pool.query(
            'SELECT id_usuario FROM usuario WHERE id_usuario = ?',
            [id]
        );

        if (usuarios.length === 0) {
            return res.status(404).json({
                mensaje: 'El usuario no existe'
            });
        }

        const [postulaciones] = await pool.query(
            `SELECT
                postulacion.id_postulacion,
                postulacion.requisitos,
                postulacion.fecha,
                proyecto.id_proyecto,
                proyecto.titulo,
                proyecto.descripcion,
                proyecto.ubicacion,
                proyecto.estado
             FROM postulacion
             INNER JOIN proyecto
                ON postulacion.id_proyecto = proyecto.id_proyecto
             WHERE postulacion.id_usuario = ?`,
            [id]
        );

        return res.status(200).json(postulaciones);

    } catch (error) {
        console.error('Error al obtener las postulaciones del usuario:', error);

        return res.status(500).json({
            mensaje: 'Error al obtener las postulaciones del usuario'
        });
    }
}


module.exports = {
    obtenerUsuarioPorId,
    obtenerProyectosUsuario,
    obtenerPostulacionesUsuario
};
