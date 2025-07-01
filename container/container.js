import UserService from '../services/UserService.js';
import UserController from '../controllers/UserController.js';

import AuthService from '../services/AuthService.js';
import AuthController from '../controllers/AuthController.js'

import CategoryService from '../services/CategoryService.js';
import CategoryController from '../controllers/CategoryController.js'

import MovementService from '../services/MovementService.js';
import MovementController from '../controllers/MovementController.js';

// INYECCION DE DEPENDENCIA USERS
const userService = new UserService();
export const userController = new UserController(userService);

// INYECCION DE DEPENDENCIAS AUTH
const authService = new AuthService();
export const authController = new AuthController(authService);

// INYECCION DE DEPENDENCIAS CATEGORY
const categoryService = new CategoryService();
export const categoryController = new CategoryController(categoryService);

// console.log("DEBUG:", {
//   getAllCategories: categoryController.getAllCategories,
//   createCategory: categoryController.createCategory
// });

// INYECCION DE DEPENDENCIAS MOVEMENT
const movementService = new MovementService();
export const movementController = new MovementController(movementService);