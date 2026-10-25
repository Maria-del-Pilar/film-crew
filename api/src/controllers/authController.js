
const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Registrar un usuario nuevo.
async function registrarUsuario(req, res) {
    try {
        const { nombre, correo, contraseña } = req.body;

        // Validar los campos obligatorios.
        if (!nombre || !correo || !contraseña) {
            return res.status(400).json({
                mensaje: 'Nombre, correo y contraseña son obligatorios'
            });
        }

        // Validar una longitud mínima de contraseña.
        if (contraseña.length < 8) {
            return res.status(400).json({
                mensaje: 'La contraseña debe tener al menos 8 caracteres'
            });
        }

        // Comprobar si el correo ya está registrado.
        const [usuarios] = await pool.query(
            'SELECT id_usuario FROM usuario WHERE correo = ?',
            [correo]
        );

        if (usuarios.length > 0) {
            return res.status(409).json({
                mensaje: 'Este correo ya está registrado'
            });
        }

        // Proteger la contraseña con bcrypt.
        const hash = await bcrypt.hash(contraseña, 10);

        // Crear el usuario con un rol inicial.
        const [resultado] = await pool.query(
            `INSERT INTO usuario
            (nombre, correo, rol, contraseña)
            VALUES (?, ?, ?, ?)`,
            [nombre, correo, 'Usuario', hash]
        );

        return res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            id_usuario: resultado.insertId
        });

    } catch (error) {
        console.error('Error al registrar usuario:', error);

        return res.status(500).json({
            mensaje: 'Error interno al registrar el usuario'
        });
    }
}


async function iniciarSesion(req, res) {
    try {
        const { correo, contraseña } = req.body;

        // Validar los campos.
        if (!correo || !contraseña) {
            return res.status(400).json({
                mensaje: 'Correo y contraseña son obligatorios'
            });
        }

        // Buscar al usuario por correo.
        const [usuarios] = await pool.query(
            `SELECT id_usuario, nombre, correo, rol, contraseña
             FROM usuario
             WHERE correo = ?`,
            [correo]
        );

        // No revelar si el correo existe.
        if (usuarios.length === 0) {
            return res.status(401).json({
                mensaje: 'Correo o contraseña incorrectos'
            });
        }

        const usuario = usuarios[0];

        // Comparar la contraseña con el hash almacenado.
        const contraseñaValida = await bcrypt.compare(
            contraseña,
            usuario.contraseña
        );

        if (!contraseñaValida) {
            return res.status(401).json({
                mensaje: 'Correo o contraseña incorrectos'
            });
        }

        // No enviar el hash de la contraseña al cliente.
        return res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            usuario: {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);

        return res.status(500).json({
            mensaje: 'Error interno al iniciar sesión'
        });
    }
}


module.exports = {
    registrarUsuario,
    iniciarSesion
};
