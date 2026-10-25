const pool = require('../config/db');

async function crearPostulacion(req, res) {
    try {
        const { requisitos, id_usuario } = req.body;
        const { id } = req.params;

        if (!id || !requisitos || !id_usuario) {
            return res.status(400).json({
                mensaje: 'El ID del proyecto, los requisitos y el usuario son obligatorios'
            });
        }

        const [proyectos] = await pool.query(
            'SELECT id_proyecto FROM proyecto WHERE id_proyecto = ?',
            [id]
        );

        if (proyectos.length === 0) {
            return res.status(404).json({
                mensaje: 'El proyecto no existe'
            });
        }

        const [usuarios] = await pool.query(
            'SELECT id_usuario FROM usuario WHERE id_usuario = ?',
            [id_usuario]
        );

        if (usuarios.length === 0) {
            return res.status(404).json({
                mensaje: 'El usuario no existe'
            });
        }

        const [resultado] = await pool.query(
            `INSERT INTO postulacion
            (requisitos, fecha, id_usuario, id_proyecto)
            VALUES (?, CURDATE(), ?, ?)`,
            [requisitos, id_usuario, id]
        );

        return res.status(201).json({
            mensaje: 'Postulación registrada correctamente',
            id_postulacion: resultado.insertId
        });

    } catch (error) {
        console.error('Error al registrar postulación:', error);

        return res.status(500).json({
            mensaje: 'Error interno al registrar la postulación'
        });
    }
}


async function obtenerPostulaciones(req, res) {
    try {
        const { id } = req.params;

        const [proyectos] = await pool.query(
            'SELECT id_proyecto FROM proyecto WHERE id_proyecto = ?',
            [id]
        );

        if (proyectos.length === 0) {
            return res.status(404).json({
                mensaje: 'El proyecto no existe'
            });
        }

        const [postulaciones] = await pool.query(
            `SELECT
                postulacion.id_postulacion,
                postulacion.requisitos,
                postulacion.fecha,
                postulacion.id_usuario,
                postulacion.id_proyecto,
                usuario.nombre,
                usuario.correo
            FROM postulacion
            INNER JOIN usuario
                ON postulacion.id_usuario = usuario.id_usuario
            WHERE postulacion.id_proyecto = ?`,
            [id]
        );

        return res.status(200).json(postulaciones);

    } catch (error) {
        console.error('Error al obtener postulaciones:', error);

        return res.status(500).json({
            mensaje: 'Error al obtener las postulaciones'
        });
    }
}


module.exports = { 
    crearPostulacion,
    obtenerPostulaciones
};
