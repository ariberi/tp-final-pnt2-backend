class MovementController {
    constructor(movementService) {
        this.movementService = movementService;
    }

    createMovement = async (req, res, next) => {
        console.log("[CONTROLLER] createMovement → body:", req.body);
        const { description, amount, date, type, categoryId } = req.body;
        const { userId } = req;

        try {
            if (!description || !amount || !date || !type || !categoryId) {
                return res.status(400).json({ error: "All fields are required" });
            }

            const movement = await this.movementService.create(
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
            console.error("[CONTROLLER] createMovement ✖", err.message);
            next(err);
        }
    };

    getMovements = async (req, res, next) => {
        const { userId } = req;
        console.log("[CONTROLLER] getMovements → userId:", userId);

        try {
            const movements = await this.movementService.findAllByUserId(userId);
            if (!movements || movements.length === 0) {
                console.log("[CONTROLLER] getMovements ✖ No movements found");
                return res.status(404).json({ message: "No movements found" });
            }
            console.log("[CONTROLLER] getMovements ✔ count:", movements.length);
            res.status(200).json(movements);
        } catch (err) {
            console.error("[CONTROLLER] getMovements ✖", err.message);
            next(err);
        }
    };

    getMovementsByCategory = async (req, res, next) => {
        const { categoryId } = req.params;
        const { userId } = req;
        console.log("[CONTROLLER] getMovementsByCategory → userId:", userId, "categoryId:", categoryId);

        try {
            const movements = await this.movementService.findByCategory({ userId, categoryId });
            if (!movements || movements.length === 0) {
                console.log("[CONTROLLER] getMovementsByCategory ✖ No movements for category");
                return res.status(404).json({ message: "No movements found for this category." });
            }
            console.log("[CONTROLLER] getMovementsByCategory ✔ count:", movements.length);
            res.status(200).json(movements);
        } catch (err) {
            console.error("[CONTROLLER] getMovementsByCategory ✖", err.message);
            next(err);
        }
    };

    getAllIncomes = async (req, res, next) => {
        const { userId } = req;
        console.log("[CONTROLLER] getAllIncomes → userId:", userId);

        try {
            const incomes = await this.movementService.getAllIncomes(userId);
            if (!incomes || incomes.length === 0) {
                console.log("[CONTROLLER] getAllIncomes ✖ No incomes found");
                return res.status(404).json({ message: "No incomes found" });
            }
            console.log("[CONTROLLER] getAllIncomes ✔ count:", incomes.length);
            res.status(200).json(incomes);
        } catch (err) {
            console.error("[CONTROLLER] getAllIncomes ✖", err.message);
            next(err);
        }
    };

    getAllExpenses = async (req, res, next) => {
        const { userId } = req;
        console.log("[CONTROLLER] getAllExpenses → userId:", userId);

        try {
            const expenses = await this.movementService.getAllExpenses(userId);
            if (!expenses || expenses.length === 0) {
                console.log("[CONTROLLER] getAllExpenses ✖ No expenses found");
                return res.status(404).json({ message: "No expenses found" });
            }
            console.log("[CONTROLLER] getAllExpenses ✔ count:", expenses.length);
            res.status(200).json(expenses);
        } catch (err) {
            console.error("[CONTROLLER] getAllExpenses ✖", err.message);
            next(err);
        }
    };

    updateMovement = async (req, res, next) => {
        const { id } = req.params;
        const { description, amount, date, type, categoryId } = req.body;
        const { userId } = req;
        console.log("[CONTROLLER] updateMovement → id:", id, "body:", req.body);

        try {
            if (!description || !amount || !date || !type || !categoryId) {
                return res.status(400).json({ error: "All fields are required for update" });
            }

            const movement = await this.movementService.update(
                id,
                description,
                amount,
                date,
                type,
                categoryId,
                userId
            );
            console.log("[CONTROLLER] updateMovement ✔ info:", JSON.stringify(movement));
            res.status(200).json(movement);
        } catch (err) {
            console.error("[CONTROLLER] updateMovement ✖", err.message);
            next(err);
        }
    };

    deleteMovement = async (req, res, next) => {
        const { id } = req.params;
        const { userId } = req;
        console.log("[CONTROLLER] deleteMovement → id:", id, "userId:", userId);

        try {
            await this.movementService.delete({ movementId: id, userId });
            console.log("[CONTROLLER] deleteMovement ✔ id:", id);
            res.status(204).end();
        } catch (err) {
            console.error("[CONTROLLER] deleteMovement ✖", err.message);
            next(err);
        }
    };
}

export default MovementController;
