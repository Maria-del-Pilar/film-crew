const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const encabezado = req.headers.authorization;

    // Comprobar si se envió el token.
    if (!encabezado || !encabezado.startsWith('Bearer ')) {
        return res.status(401).json({
            mensaje: 'No estás autenticado'
        });
    }

    // Obtener el token.
    const token = encabezado.split(' ')[1];

    try {
        // Verificar que el token sea válido.
        const datosUsuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Guardar los datos del usuario en la petición.
        req.usuario = datosUsuario;

        next();

    } catch (error) {
        return res.status(401).json({
            mensaje: 'Token inválido o expirado'
        });
    }
}

module.exports = verificarToken;