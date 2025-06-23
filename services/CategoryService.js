import { Category } from "../models/index.js";

class CategoryService {

  create(nameCategory, userId) {
    if (!nameCategory) throw new Error("nameCategory empty");
    if (!userId) throw new Error("userId empty");
    nameCategory = nameCategory.trim().toLowerCase();
    return Category.create({
      name: nameCategory,
      userId: userId,
    });
  }

  findAllByUserId(userId) {
    if (!userId) throw new Error("userId empty");
    return Category.findAll({
      where: {
        userId: userId,
      },
    });
  }

  update({id, name, userId}) {
    if (!id) throw new Error("id empty");
    if (!name) throw new Error("name empty");
    if (!userId) throw new Error("userId empty");


    return Category.update({ name }, { where: { id, userId } });
  }

  async findById({id, userId}) {
    return Category.findOne({ where: { id, userId } });
  }

  delete({id,userId}) {
    return Category.destroy({ where: { id, userId } });
  }
}

export default new CategoryService();
