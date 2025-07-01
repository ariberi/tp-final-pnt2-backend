import {Category, Movement} from "../models/index.js";
import CategoryService from "./CategoryService.js";

const categoryService = new CategoryService();

class MovementService {

    async create(description, amount, date, type, categoryId, userId) {
        if (!description || !amount || !type || !categoryId || !userId) {
            throw new Error("Missing required fields: description, amount, type, or categoryId");
        }

        if (!["income", "expense"].includes(type)) {
            throw new Error('Invalid type. Must be "income" or "expense".');
        }

        const category = await categoryService.findById({id: categoryId, userId});
        if (!category) throw new Error("Category not found for the given user.");

        const newMovement = await Movement.create({
            description,
            amount,
            date: date ?? new Date(),
            type,
            categoryId,
            userId,
        });

        return Movement.findByPk(newMovement.id, {include: [Category]});
    }

    async findAllByUserId(userId) {
        if (!userId) {
            throw new Error("User ID is required to fetch movements.");
        }
        return await Movement.findAll({where: {userId}, include: [Category]});
    }

    async findByCategory({userId, categoryId}) {

        if (!userId) {
            throw new Error("User ID is required to fetch movements by category.");
        }
        if (!categoryId) {
            throw new Error("Category ID is required to fetch movements by category.");
        }

        const category = await categoryService.findById({id: categoryId, userId});
        if (!category) throw new Error("Category not found for the given user.");

        return Movement.findAll({where: { userId, CategoryId: categoryId }, include: [Category]});
    }

    async getAllIncomes(userId) {

        if (!userId) {
            throw new Error("User ID is required to fetch incomes.");
        }

        return Movement.findAll({
            where: { userId, type: "income" },
            include: [Category]
        });

    }

    async getAllExpenses(userId) {

        if (!userId) {
            throw new Error("User ID is required to fetch expenses.");
        }

        return Movement.findAll({
            where: { userId, type: "expense" },
            include: [Category]
        });
    }

    async update(movementId, description, amount, date, type, categoryId, userId) {

        if (!description || !amount || !type || !categoryId || !userId) {
            throw new Error("Missing required fields: description, amount, type, or categoryId");
        }

        if (!["income", "expense"].includes(type)) {
            throw new Error('Invalid type. Must be "income" or "expense".');
        }

        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error("Amount must be a positive number.");
        }

        if (description.trim().length > 100) {
            throw new Error("Description must be less than 100 characters.");
        }

        const category = await categoryService.findById({id: categoryId, userId});
        if (!category) throw new Error("Category not found for the given user.");

        const data = { description, amount, date, type, categoryId };

        const [updated] = await Movement.update(data, { where: { id: movementId, userId } });

        if (updated === 0) {
            throw new Error("Movement not found or you do not have permission to update it.");
        }

        return Movement.findByPk(movementId, { include: [Category] });
    }

    async delete({movementId, userId}) {

        const deleted = await Movement.destroy({ where: { id: movementId , userId} });

        if (!deleted) {
            throw new Error("Movement not found or you do not have permission to delete it.");
        }

        return {
            deleted,
            message: "Movement deleted successfully."
        }
    }

}

export default MovementService;
