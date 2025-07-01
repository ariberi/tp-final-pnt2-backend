class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }

    createCategory = async (req, res, next) => {
        const nameCategory = req.body.name;
        console.log("[CONTROLLER] createCategory → name:", nameCategory);

        try {
            if (!nameCategory || nameCategory.trim() === '') {
                return res.status(400).json({ error: "Category name is required" });
            }

            if (nameCategory.trim().length < 3) {
                return res.status(400).json({ error: "Category name must be at least 3 characters" });
            }

            const { userId } = req;
            const cat = await this.categoryService.create(nameCategory.trim(), userId);

            console.log("[CONTROLLER] createCategory ✔ id:", cat.id);
            res.status(201).json(cat);
        } catch (err) {
            console.error("[CONTROLLER] createCategory ✖", err.message);
            err.details = err.message;
            err.message = "Error creating category";
            next(err);
        }
    }

    getCategories = async (req, res, next) => {
        console.log("[CONTROLLER] getCategories →");

        try {
            const { userId } = req;
            const list = await this.categoryService.findAllByUserId(userId);

            console.log("[CONTROLLER] getCategories ✔ count:", list.length);
            res.status(200).json(list);
        } catch (err) {
            console.error("[CONTROLLER] getCategories ✖", err.message);
            next(err);
        }
    }

    updateCategory = async (req, res, next) => {
        const { id } = req.params;
        const { userId } = req;
        const { name } = req.body;

        console.log("[CONTROLLER] updateCategory → id:", id, "name:", name);

        try {
            if (!name || name.trim().length < 3) {
                return res.status(400).json({ error: "Category name must be at least 3 characters" });
            }

            await this.categoryService.update({ id, name: name.trim(), userId });

            const updated = await this.categoryService.findById({ id, userId });
            if (!updated) {
                return res.status(404).json({ error: "Category not found for update" });
            }

            console.log("[CONTROLLER] updateCategory ✔ id:", updated.id);
            res.status(200).json(updated);
        } catch (err) {
            console.error("[CONTROLLER] updateCategory ✖", err.message);
            next(err);
        }
    }

    deleteCategory = async (req, res, next) => {
        const { id } = req.params;
        const { userId } = req;

        console.log("[CONTROLLER] deleteCategory → id:", id);

        try {
            const category = await this.categoryService.findById({ id, userId });
            if (!category) {
                return res.status(404).json({ error: "Category not found" });
            }

            await this.categoryService.delete({ id, userId });
            console.log("[CONTROLLER] deleteCategory ✔ removed");
            res.status(204).end();
        } catch (err) {
            console.error("[CONTROLLER] deleteCategory ✖", err.message);
            next(err);
        }
    }

    getCategoryById = async (req, res, next) => {
        const { id } = req.params;
        const { userId } = req;

        console.log("[CONTROLLER] getCategoryById → id:", id);

        try {
            const category = await this.categoryService.findById({ id, userId });
            if (!category) {
                return res.status(404).json({ error: "Category not found" });
            }
            res.status(200).json(category);
        } catch (err) {
            console.log("[CONTROLLER] getCategoryById ✖", err.message);
            next(err);
        }
    }
}

export default CategoryController;
