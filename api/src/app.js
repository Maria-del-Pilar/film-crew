require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Permite recibir solicitudes desde el frontend.
app.use(cors());

// Permite interpretar datos enviados en formato JSON.
app.use(express.json());

// Rutas de proyectos.
const proyectoRoutes = require('./routes/proyectoRoutes');
app.use('/api/proyectos', proyectoRoutes);

// Rutas de autenticacion.
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Rutas de postulacion.
const postulacionRoutes = require('./routes/postulacionRoutes');
app.use('/api/proyectos/:id/postulaciones', postulacionRoutes);

// Rutas de usuario.
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/api/usuarios', usuarioRoutes);

// Ruta inicial para comprobar que la API funciona.
app.get('/api', (req, res) => {
    res.json({
        mensaje: 'API de Film Crew funcionando correctamente'
    });
});


// Inicia el servidor.
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
