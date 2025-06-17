import User from './User.js';
import Movement from "./Movement.js";
import Category from "./Category.js";

User.hasMany(Movement, { foreignKey: 'userId' });
User.hasMany(Category, { foreignKey: 'userId' });

Movement.belongsTo(User, { foreignKey: 'userId' });
Movement.belongsTo(Category, { foreignKey: 'categoryId' });

Category.hasMany(Movement, { foreignKey: 'categoryId' });
Category.belongsTo(User, { foreignKey: 'userId' });

export { User, Movement, Category };