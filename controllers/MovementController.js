import movementService from "../services/movementService.js";

export const createMovement = async (req, res, next) => {
  console.log("[CONTROLLER] createMovement → body:", req.body);
  try {
    const expense = await movementService.create(req.userId, req.body);
    console.log("[CONTROLLER] createMovement ✔ id:", expense.id);

    res.status(201).json(expense);
  } catch (err) {
    console.log("[CONTROLLER] createMovement ✖", err.message);
    next(err);
  }
};

export const getMovements = async (req, res, next) => {
  console.log("[CONTROLLER] getMovements → userId:", req.userId);
  try {
    const expenses = await movementService.findAll(req.userId);
    console.log("[CONTROLLER] getMovements ✔ count:", expenses.length);

    res.json(expenses);
  } catch (err) {
    console.log("[CONTROLLER] getMovements ✖", err.message);

    next(err);
  }
};

export const getMovementsByCategory = async (req, res, next) => {
  console.log("[CONTROLLER] getMovementsByCategory → userId:", req.userId);

  try {
    const { categoryId } = req.params;
    const expenses = await movementService.findByCategory(
      req.userId,
      categoryId
    );
    console.log("[CONTROLLER] getMovementsByCategory ✔ count:", expenses.length);

    res.json(expenses);
  } catch (err) {
    console.log("[CONTROLLER] getMovementsByCategory ✖", err.message);

    next(err);
  }
};

export const updateMovement = async (req, res, next) => {
  console.log("[CONTROLLER] updateMovement → userId:", req.userId);

  try {
    const { id } = req.params;
    const expense = await movementService.update(id, req.body);
    console.log("[CONTROLLER] updateMovement ✔ info:", JSON.stringify(expense));

    res.json(expense);
  } catch (err) {
    console.log("[CONTROLLER] updateMovement ✖", err.message);

    next(err);
  }
};

export const deleteMovement = async (req, res, next) => {
  console.log("[CONTROLLER] deleteMovement → userId:", req.userId);

  try {
    const { id } = req.params;
    await movementService.delete(id);
    console.log("[CONTROLLER] deleteMovement ✔ id:", id);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
