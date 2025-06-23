import movementService from "../services/MovementService.js";

export const createMovement = async (req, res, next) => {

    console.log("[CONTROLLER] createMovement → body:", req.body);
    const { description, amount, date, type, categoryId } = req.body;
    const { userId } = req;
    console.log(req.userId);

    try {
        const movement = await movementService.create(
            description,
            amount,
            date,
            type,
            categoryId,
            userId
        );
        console.log("[CONTROLLER] createMovement ✔ id:", movement.id);
        res.status(201).json(movement);
    } catch (err) {
        console.log("[CONTROLLER] createMovement ✖", err.message);
        next(err);
    }
};

export const getMovements = async (req, res, next) => {

    console.log("[CONTROLLER] getMovements → userId:", req.userId);

    try {
        const movements = await movementService.findAllByUserId(req.userId);
        if (!movements || movements.length === 0) {
            console.log("[CONTROLLER] getMovements ✖ No movements found for userId:", req.userId);
            return res.status(404).json({ message: "No movements found" });
        }
        console.log("[CONTROLLER] getMovements ✔ count:", movements.length);
        res.json(movements);
    } catch (err) {
        console.log("[CONTROLLER] getMovements ✖", err.message);

        next(err);
    }
};

export const getMovementsByCategory = async (req, res, next) => {

    console.log("[CONTROLLER] getMovementsByCategory → userId:", req.userId);

    try {
        const { categoryId } = req.params;
        const movements = await movementService.findByCategory({userId : req.userId, categoryId});
        if (!movements || movements?.length === 0) {
            console.log("[CONTROLLER] getMovementsByCategory ✖ No movements found for category:", categoryId);
            return res.status(404).json({ message: "No movements found for this category." });
        }
        console.log("[CONTROLLER] getMovementsByCategory ✔ count:", movements.length);
        res.json(movements);
    } catch (err) {
        console.log("[CONTROLLER] getMovementsByCategory ✖", err.message);
        next(err);
    }
};

export const getAllIncomes = async (req, res, next) => {

    console.log("[CONTROLLER] getAllIncomes → userId:", req.userId);

    try {
        const incomes = await movementService.getAllIncomes(req.userId);
        if (!incomes || incomes.length === 0) {
            console.log("[CONTROLLER] getAllIncomes ✖ No incomes found for userId:", req.userId);
            return res.status(404).json({ message: "No incomes found" });
        }
        console.log("[CONTROLLER] getAllIncomes ✔ count:", incomes.length);
        res.json(incomes);
    } catch (err) {
        console.log("[CONTROLLER] getAllIncomes ✖", err.message);
        next(err);
    }
}

export const getAllExpenses = async (req, res, next) => {

    console.log("[CONTROLLER] getAllExpenses → userId:", req.userId);

    try {
        const expenses = await movementService.getAllExpenses(req.userId);
        if (!expenses || expenses.length === 0) {
            console.log("[CONTROLLER] getAllExpenses ✖ No expenses found for userId:", req.userId);
            return res.status(404).json({ message: "No expenses found" });
        }
        console.log("[CONTROLLER] getAllExpenses ✔ count:", expenses.length);
        res.json(expenses);
    } catch (err) {
        console.log("[CONTROLLER] getAllExpenses ✖", err.message);
        next(err);
    }
}

export const updateMovement = async (req, res, next) => {

    console.log("[CONTROLLER] updateMovement → userId:", req.userId);

    try {
        const { id } = req.params;
        const { description, amount, date, type, categoryId } = req.body;
        const { userId } = req;
        const movement = await movementService.update(
            id,
            description,
            amount,
            date,
            type,
            categoryId,
            userId
        );
        console.log("[CONTROLLER] updateMovement ✔ info:", JSON.stringify(movement));

        res.json(movement);
    } catch (err) {
        console.log("[CONTROLLER] updateMovement ✖", err.message);

        next(err);
    }
};

export const deleteMovement = async (req, res, next) => {

    console.log("[CONTROLLER] deleteMovement → userId:", req.userId);

    try {
        const { id } = req.params;
        const { userId } = req;

        await movementService.delete({movementId: id, userId});
        console.log("[CONTROLLER] deleteMovement ✔ id:", id);

        res.status(204).end();
    } catch (err) {
        next(err);
    }
};
