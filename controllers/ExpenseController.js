import expenseService from "../services/ExpenseService.js";

export const createExpense = async (req, res, next) => {
  console.log("[CONTROLLER] createExpense → body:", req.body);
  try {
    const expense = await expenseService.create(req.userId, req.body);
    console.log("[CONTROLLER] createExpense ✔ id:", expense.id);

    res.status(201).json(expense);
  } catch (err) {
    console.log("[CONTROLLER] createExpense ✖", err.message);
    next(err);
  }
};

export const getExpenses = async (req, res, next) => {
  console.log("[CONTROLLER] getExpenses → userId:", req.userId);
  try {
    const expenses = await expenseService.findAll(req.userId);
    console.log("[CONTROLLER] getExpenses ✔ count:", expenses.length);

    res.json(expenses);
  } catch (err) {
    console.log("[CONTROLLER] getExpenses ✖", err.message);

    next(err);
  }
};

export const getExpensesByCategory = async (req, res, next) => {
  console.log("[CONTROLLER] getExpensesByCategory → userId:", req.userId);

  try {
    const { categoryId } = req.params;
    const expenses = await expenseService.findByCategory(
      req.userId,
      categoryId
    );
    console.log("[CONTROLLER] getExpensesByCategory ✔ count:", expenses.length);

    res.json(expenses);
  } catch (err) {
    console.log("[CONTROLLER] getExpensesByCategory ✖", err.message);

    next(err);
  }
};

export const updateExpense = async (req, res, next) => {
  console.log("[CONTROLLER] updateExpense → userId:", req.userId);

  try {
    const { id } = req.params;
    const expense = await expenseService.update(id, req.body);
    console.log("[CONTROLLER] updateExpense ✔ info:", JSON.stringify(expense));

    res.json(expense);
  } catch (err) {
    console.log("[CONTROLLER] updateExpense ✖", err.message);

    next(err);
  }
};

export const deleteExpense = async (req, res, next) => {
  console.log("[CONTROLLER] deleteExpense → userId:", req.userId);

  try {
    const { id } = req.params;
    await expenseService.delete(id);
    console.log("[CONTROLLER] deleteExpense ✔ id:", id);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
