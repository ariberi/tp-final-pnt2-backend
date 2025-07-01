import { Category, Movement } from "../models/index.js";
import CategoryService from "./CategoryService.js";

const categoryService = new CategoryService();

class MovementService {
  async create(description, amount, date, type, categoryId, userId) {
    const requiredFields = { description, amount, type, categoryId, userId };
    const missing = Object.entries(requiredFields).filter(([_, v]) => !v);
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.map(([k]) => k).join(', ')}`);
    }

    const sanitizedType = type.toLowerCase();
    if (!["income", "expense"].includes(sanitizedType)) {
      throw new Error('Invalid type. Must be "income" or "expense".');
    }

    const category = await categoryService.findById({ id: categoryId, userId });
    if (!category) {
      const err = new Error("Category not found for the given user.");
      err.name = "CategoryNotFoundError";
      throw err;
    }

    const parsedDate = date ? new Date(date) : new Date();
    if (isNaN(parsedDate)) {
      throw new Error("Invalid date format.");
    }

    const newMovement = await Movement.create({
      description: description.trim(),
      amount,
      date: parsedDate,
      type: sanitizedType,
      categoryId,
      userId,
    });

    return Movement.findByPk(newMovement.id, { include: [Category] });
  }

  async findAllByUserId(userId) {
    if (!userId) {
      throw new Error("User ID is required to fetch movements.");
    }

    return Movement.findAll({ where: { userId }, include: [Category] });
  }

  async findByCategory({ userId, categoryId }) {
    if (!userId) throw new Error("User ID is required to fetch movements by category.");
    if (!categoryId) throw new Error("Category ID is required to fetch movements by category.");

    const category = await categoryService.findById({ id: categoryId, userId });
    if (!category) {
      const err = new Error("Category not found for the given user.");
      err.name = "CategoryNotFoundError";
      throw err;
    }

    return Movement.findAll({
      where: { userId, categoryId },
      include: [Category],
    });
  }

  async getAllIncomes(userId) {
    if (!userId) throw new Error("User ID is required to fetch incomes.");
    return Movement.findAll({ where: { userId, type: "income" }, include: [Category] });
  }

  async getAllExpenses(userId) {
    if (!userId) throw new Error("User ID is required to fetch expenses.");
    return Movement.findAll({ where: { userId, type: "expense" }, include: [Category] });
  }

  async update(movementId, description, amount, date, type, categoryId, userId) {
    const requiredFields = { description, amount, type, categoryId, userId };
    const missing = Object.entries(requiredFields).filter(([_, v]) => !v);
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.map(([k]) => k).join(', ')}`);
    }

    const parsedDate = date ? new Date(date) : new Date();
    if (isNaN(parsedDate)) {
      throw new Error("Invalid date format.");
    }

    const data = {
      description: description.trim(),
      amount,
      date: parsedDate,
      type: type.toLowerCase(),
      categoryId,
    };

    const [updated] = await Movement.update(data, {
      where: { id: movementId, userId },
    });

    if (updated === 0) {
      const err = new Error("Movement not found or you do not have permission to update it.");
      err.name = "UpdateFailed";
      throw err;
    }

    return Movement.findByPk(movementId, { include: [Category] });
  }

  async delete({ movementId, userId }) {
    const deleted = await Movement.destroy({
      where: { id: movementId, userId },
    });

    if (!deleted) {
      const err = new Error("Movement not found or you do not have permission to delete it.");
      err.name = "DeleteFailed";
      throw err;
    }

    return {
      deleted,
      message: "Movement deleted successfully.",
    };
  }
}

export default MovementService;
