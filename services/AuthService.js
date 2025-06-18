import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { JWT_SECRET } from '../config/config.js';

class AuthService {

    async register(data) {
        const user = await User.create(data);
        const token = this.generateToken(user.id);
        return { user, token };
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error('User not found');
        const valid = await user.validPassword(password);
        if (!valid) throw new Error('Invalid credentials');
        const token = this.generateToken(user.id);
        return { user, token };
    }

    generateToken(userId) {
        return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
    }

    async me(token) {




    }
}

export default new AuthService();