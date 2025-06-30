import userService from '../services/UserService.js';
import UserController from '../controllers/UserController.js';

import authService from '../services/AuthService.js';
import AuthController from '../controllers/AuthController.js'

import categoryService from '../services/CategoryService.js';
import CategoryController from '../controllers/CategoryController.js'

import movementService from '../services/MovementService.js';
import MovementController from '../controllers/MovementController.js';

// INYECCION DE DEPENDENCIA USERS
const userController = UserController(userService);

// INYECCION DE DEPENDENCIAS AUTH
const authController = AuthController(authService);

// INYECCION DE DEPENDENCIAS CATEGORY
const categoryController = CategoryController(categoryService);
console.log("DEBUG:", {
  getAllCategories: categoryController.getAllCategories,
  createCategory: categoryController.createCategory
});


// INYECCION DE DEPENDENCIAS MOVEMENT
const movementController = MovementController(movementService);

export default {
  userController,
  authController,
  categoryController,
  movementController
};
