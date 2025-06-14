import { Sequelize } from 'sequelize';
import { DB } from '../Config/config.js';

const sequelize = new Sequelize(DB.name, DB.user, DB.pass, {
  host: DB.host,
  port: DB.port,
  dialect: 'mysql',
  logging: false
});

export default sequelize;