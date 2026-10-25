require('dotenv').config();

const pool = require('./config/db');

async function probarConexion() {
    try {
        const conexion = await pool.getConnection();

        console.log('¡Conexión a MySQL exitosa!');

        const [tablas] = await conexion.query('SHOW TABLES');

        console.log('Tablas de la base de datos:');
        console.table(tablas);

        conexion.release();
    } catch (error) {
        console.error('Error al conectar con MySQL:', error.message);
    } finally {
        await pool.end();
    }
}

probarConexion();