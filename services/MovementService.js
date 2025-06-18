import { Movement, Category } from '../models/index.js';


class MovementService {

  async create(userId, data) {

    const {description, amount, date, type, categoryId} = data;

    if (!description || !amount || !type || !categoryId) {
      throw new Error('Missing required fields: description, amount, type, or categoryId');
    }

    if (!['income', 'expense'].includes(type)) {
      throw new Error('Invalid type. Must be "income" or "expense".');
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      throw new Error('Category not found'); // o que pueda crearla en el momento?
    }

    const newMovement =
        await Movement.create( {
          description,
          amount,
          date: date ?? new Date(),
          type,
          categoryId,
          userId
    });

    return Movement.findByPk(newMovement.id, { include: [Category] });
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