import { Movement, Category } from '../models/index.js';


class MovementService {
  async create(userId, data) {
    return Movement.create({ ...data, UserId: userId });
  }

  async findAll(userId) {
    return Movement.findAll({ where: { UserId: userId }, include: [Category] });
  }

  async findByCategory(userId, categoryId) {
    return Movement.findAll({ where: { UserId: userId, CategoryId: categoryId }, include: [Category] });
  }

  async update(expenseId, data) {
    await Movement.update(data, { where: { id: expenseId } });
    return Movement.findByPk(expenseId, { include: [Category] });
  }

  async delete(expenseId) {
    return Movement.destroy({ where: { id: expenseId } });
  }
}

export default new MovementService();