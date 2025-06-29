import UserService from '../services/UserService.js';
import UserController from '../controllers/UserController.js';

import AuthService from '../services/AuthService.js';
import AuthController from '../controllers/AuthController.js'

import CategoryService from '../services/CategoryService.js';
import CategoryController from '../controllers/CategoryController.js'

// INYECCION DE DEPENDENCIA USERS
const userService = new UserService();
const userController = UserController(userService);

// INYECCION DE DEPENDENCIAS AUTH
const authService = new AuthService();
const authController = AuthController(authService);

// INYECCION DE DEPENDENCIAS CATEGORY
const categoryService = new CategoryService();
const categoryController = CategoryController(categoryService);

export default {
  userController,
  authController,
  categoryController
};
