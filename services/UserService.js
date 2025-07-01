import { User } from '../models/index.js';

class UserService {

    async update({ id, data }) {
        if (!id) throw new Error("User ID is required.");

        const user = await User.findByPk(id);
        if (!user) throw new Error("User not found.");

        const allowedFields = ['name', 'email'];
        const updates = {};

        for (const key of allowedFields) {
            if (data[key]) {
                updates[key] = data[key].trim();
            }
        }

        if (updates.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updates.email)) {
            throw new Error("Invalid email format.");
        }

        if (Object.keys(updates).length === 0) {
            throw new Error("No valid fields to update.");
        }

        await User.update(updates, { where: { id } });

        return User.findByPk(id);
    }
}

export default UserService;
