import movementService from "../services/MovementService.js";

export const createMovement = async (req, res, next) => {
  console.log("[CONTROLLER] createMovement → body:", req.body);
  const { description, amount, date, type, categoryId } = req.body;
  const { userId } = req;
  console.log(req.userId);
  try {
    const expense = await movementService.create(
      description,
      amount,
      date,
      type,
      categoryId,
      userId
    );
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
    console.log(
      "[CONTROLLER] getMovementsByCategory ✔ count:",
      expenses.length
    );

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
    console.log("[CONTROLLER] updateMovement ✔ info:", JSON.stringify(expense));

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

    await movementService.delete(id, userId);
    console.log("[CONTROLLER] deleteMovement ✔ id:", id);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
