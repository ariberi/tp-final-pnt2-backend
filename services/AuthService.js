import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { JWT_SECRET } from "../config/config.js";

class AuthService {
  generateToken(userId) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "2h" });
  }

  async register({ name, email, password }) {
    if (!name || !email || !password) {
      throw new Error("All fields (name, email, password) are required.");
    }

    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedName = name.trim();

    if (sanitizedName.length < 2 || sanitizedName.length > 50) {
      throw new Error("Name must be between 2 and 50 characters.");
    }

    if (password.length < 6 || password.length > 20) {
      throw new Error("Password must be between 6 and 20 characters long.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      throw new Error("Invalid email format.");
    }

    const existingUser = await User.findOne({ where: { email: sanitizedEmail } });
    if (existingUser) {
      const err = new Error("User already exists with this email.");
      err.name = "DuplicateEmailError";
      throw err;
    }

    const user = await User.create({ name: sanitizedName, email: sanitizedEmail, password });

    const token = this.generateToken(user.id);
    return { user, token };
  }

  async login({ email, password }) {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const user = await User.findOne({ where: { email: email.trim().toLowerCase() } });

    if (!user || !(await user.validPassword(password))) {
      const err = new Error("Invalid email or password.");
      err.name = "AuthError";
      throw err;
    }

    const token = this.generateToken(user.id);
    return { user, token };
  }

  async me(userId) {
    const user = await User.findByPk(userId);

    if (!user) {
      const err = new Error("User not found");
      err.name = "UserNotFoundError";
      throw err;
    }

    return { name: user.name, email: user.email };
  }
}

export default new AuthService();
