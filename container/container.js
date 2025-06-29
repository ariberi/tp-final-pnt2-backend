import UserService from '../services/UserService.js';
import UserController from '../controllers/UserController.js';

import AuthService from '../services/AuthService.js';
import AuthController from '../controllers/AuthController.js'

// INYECCION DE DEPENDENCIA USERS
const userService = new UserService();
const userController = UserController(userService);

// INYECCION DE DEPENDENCIAS AUTH
const authService = new AuthService();
const authController = AuthController(authService);

export default {
  userController,
  authController
};
