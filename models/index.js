import User from './User.js';
import Expense from "./Expense.js";
import Category from "./Category.js";

User.hasMany(Expense, { foreignKey: 'userId' });
User.hasMany(Category, { foreignKey: 'userId' });

Expense.belongsTo(User, { foreignKey: 'userId' });
Expense.belongsTo(Category, { foreignKey: 'categoryId' });

Category.hasMany(Expense, { foreignKey: 'categoryId' });
Category.belongsTo(User, { foreignKey: 'userId' });

export { User, Expense, Category };