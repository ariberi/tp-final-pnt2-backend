import categoryService from "../services/CategoryService.js";

export const createCategory = async (req, res, next) => {
  console.log("[CONTROLLER] createCategory → body:", req.body);
  try {
    const cat = await categoryService.create(req.body);
    console.log("[CONTROLLER] createCategory ✔ id:", cat.id);
    res.status(201).json(cat);
  } catch (err) {
    console.log("[CONTROLLER] createCategory ✖", err.message);
    next(err);
  }
};

export const getCategories = async (req, res, next) => {
  console.log("[CONTROLLER] getCategories →");
  try {
    const list = await categoryService.findAll();
    console.log("[CONTROLLER] getCategories ✔ count:", list.length);
    res.json(list);
  } catch (err) {
    console.log("[CONTROLLER] getCategories ✖", err.message);
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  console.log("[CONTROLLER] updateCategory → id:", id, "body:", req.body);
  try {
    await categoryService.update(id, req.body);
    const updated = await categoryService.findById(id);
    console.log("[CONTROLLER] updateCategory ✔");
    res.json(updated);
  } catch (err) {
    console.log("[CONTROLLER] updateCategory ✖", err.message);
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  console.log("[CONTROLLER] deleteCategory → id:", id);
  try {
    await categoryService.delete(id);
    console.log("[CONTROLLER] deleteCategory ✔ removed");
    res.status(204).end();
  } catch (err) {
    console.log("[CONTROLLER] deleteCategory ✖", err.message);
    next(err);
  }
};
