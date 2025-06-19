import { Category } from "../models/index.js";

class CategoryService {
  create(nameCategory, userId) {
    if (!nameCategory) throw new Error("nameCategory empty");
    if (!userId) throw new Error("userId empty");
    return Category.create({
      name: nameCategory,
      userId: userId,
    });
  }

  findAll() {
    return Category.findAll();
  }
  findAllByUserId(userId) {
    if (!userId) throw new Error("userId empty");
    return Category.findAll({
      where: {
        userId: userId,
      },
    });
  }

  update(id, name, userId) {
    return Category.update(name, { where: { id, userId } });
  }

  async findById(id, userId) {
    return Category.findByPk(id, { where: { userId: userId } });
  }

  delete(id, userId) {
    return Category.destroy({ where: { id, userId } });
  }
}

export default new CategoryService();
