import { Category } from '../models/index.js';


class CategoryService {

  create(data) {
    return Category.create(data);
  }

  findAll() {
    return Category.findAll();
  }

  update(id, data) {
    return Category.update(data, { where: { id } });
  }

  async findById(id) {
    return Category.findByPk(id);
  }

  delete(id) {
    return Category.destroy({ where: { id } });
  }
}

export default new CategoryService();
