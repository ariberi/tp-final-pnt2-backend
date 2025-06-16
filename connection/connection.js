import { Sequelize } from 'sequelize';
import { DB } from '../config/config.js';

const connection = new Sequelize(
    DB.name,
    DB.user,
    DB.pass,
    {
        host: DB.host,
        port: DB.port,
        dialect: DB.dialect,
        logging: false
    });


const extracted = async () => {
    try {
        await connection.authenticate();
        console.log('Conexión a la base de datos exitosa.');
    } catch (error) {
        console.error('Error al conectarse a la base de datos:', error);
    }
}
await extracted();

export default connection;