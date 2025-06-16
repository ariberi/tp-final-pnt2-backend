import User from './User.js';
import Expense from "./Expense.js";
import Category from "./Category.js";

User.hasMany(Expense, { foreignKey: 'UserId' });
Expense.belongsTo(User, { foreignKey: 'UserId' });

Category.hasMany(Expense, { foreignKey: 'CategoryId' });
Expense.belongsTo(Category, { foreignKey: 'CategoryId' });

export { User, Expense, Category };