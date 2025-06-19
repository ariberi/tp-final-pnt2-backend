import { Movement, Category } from "../models/index.js";
import CategoryService from "./CategoryService.js";

class MovementService {
  async create(description, amount, date, type, categoryId, userId) {
    if (!description || !amount || !type || !categoryId || !userId) {
      throw new Error(
        "Missing required fields: description, amount, type, or categoryId"
      );
    }

    if (!["income", "expense"].includes(type)) {
      throw new Error('Invalid type. Must be "income" or "expense".');
    }

    const category = await CategoryService.findById(categoryId, userId);
    if (!category) throw new Error("Category not found");

    const newMovement = await Movement.create({
      description,
      amount,
      date: date ?? new Date(),
      type,
      categoryId,
      userId,
    });

    return Movement.findByPk(newMovement.id, {
      include: [Category],
      where: { userId },
    });
  }

  async findAll(userId) {
    return Movement.findAll({ where: { UserId: userId }, include: [Category] });
  }

  async findByCategory(userId, categoryId) {
    return Movement.findAll({
      where: { UserId: userId, CategoryId: categoryId },
      include: [Category],
    });
  }

  async update(movementId, description, amount, date, type, categoryId, userId) {
    if (!description || !amount || !type || !categoryId || !userId) {
      throw new Error(
        "Missing required fields: description, amount, type, or categoryId"
      );
    }
    await Movement.update(data, { where: { id: movementId, userId } });
    return Movement.findByPk(movementId, { include: [Category] });
  }

  async delete(movementId, userId) {
    return Movement.destroy({ where: { id: movementId , userId} });
  }
}

export default new MovementService();
