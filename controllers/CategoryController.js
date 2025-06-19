import categoryService from "../services/CategoryService.js";

export const createCategory = async (req, res, next) => {
  console.log("[CONTROLLER] createCategory → body:", req.body);
  try {
    const nameCategory = req.body.name;
    const { userId } = req;
    const cat = await categoryService.create(nameCategory, userId);
    console.log("[CONTROLLER] createCategory ✔ id:", cat.id);
    res.status(201).json(cat);
  } catch (err) {
    console.log("[CONTROLLER] createCategory ✖", err.message);
    err.message = "Error create Category";
    next(err);
  }
};

export const getCategories = async (req, res, next) => {
  console.log("[CONTROLLER] getCategories →");
  try {
    const { userId } = req;
    const list = await categoryService.findAllByUserId(userId);
    console.log("[CONTROLLER] getCategories ✔ count:", list.length);
    res.json(list);
  } catch (err) {
    console.log("[CONTROLLER] getCategories ✖", err.message);
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req;
  const { name } = req.body;
  console.log("[CONTROLLER] updateCategory → id:", id, "body:", req.body);
  try {
    await categoryService.update(id, name, userId);
    const updated1 = await categoryService.findById(id);
    if (!updated1) throw new Error("Error updated category");
    console.log("[CONTROLLER] updateCategory ✔");
    res.json(updated1);
  } catch (err) {
    console.log("[CONTROLLER] updateCategory ✖", err.message);
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req;
  console.log("[CONTROLLER] deleteCategory → id:", id);
  try {
    const category = await categoryService.findById(id,userId);
    if(!category)throw new Error("Error deleted category")
    await categoryService.delete(id, userId);
    console.log("[CONTROLLER] deleteCategory ✔ removed");
    res.status(204).end();
  } catch (err) {
    console.log("[CONTROLLER] deleteCategory ✖", err.message);
    next(err);
  }
};
