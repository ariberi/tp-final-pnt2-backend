import Expense from '../models/Expense.js';
import Category from '../models/Category.js';

class ExpenseService {
  async create(userId, data) {
    return Expense.create({ ...data, UserId: userId });
  }

  async findAll(userId) {
    return Expense.findAll({ where: { UserId: userId }, include: [Category] });
  }

  async findByCategory(userId, categoryId) {
    return Expense.findAll({ where: { UserId: userId, CategoryId: categoryId }, include: [Category] });
  }

  async update(expenseId, data) {
    await Expense.update(data, { where: { id: expenseId } });
    return Expense.findByPk(expenseId, { include: [Category] });
  }

  async delete(expenseId) {
    return Expense.destroy({ where: { id: expenseId } });
  }
}

export default new ExpenseService();