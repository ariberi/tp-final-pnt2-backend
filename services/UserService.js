import { User } from '../models/index.js';
import { Op } from 'sequelize';

class UserService {
  async update({ id, data }) {
    if (!id) throw new Error("User ID is required.");

    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found.");

    const allowedFields = ["name", "email"];
    const updates = {};

    for (const key of allowedFields) {
      if (data[key]) {
        updates[key] = data[key].trim();
      }
    }

    // Validar nombre
    if (updates.name) {
      if (updates.name.length < 2 || updates.name.length > 50) {
        throw new Error("Name must be between 2 and 50 characters.");
      }
    }

    // Validar email
    if (updates.email) {
      updates.email = updates.email.toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updates.email)) {
        throw new Error("Invalid email format.");
      }

      const existingUser = await User.findOne({
        where: { email: updates.email, id: { [Op.ne]: id } },
      });

      if (existingUser) {
        throw new Error("Email already in use by another user.");
      }
    }

    if (Object.keys(updates).length === 0) {
      throw new Error("No valid fields to update.");
    }

    await User.update(updates, { where: { id } });

    return User.findByPk(id);
  }
}

export default UserService;