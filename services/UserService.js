import { User } from '../models/index.js';

class UserService {

  async update(id, data) {
    await User.update(data, { where: { id } });
    return User.findByPk(id);
  }
}

export default new UserService();