import userService from '../services/UserService.js';

export const updateUser = async (req, res, next) => {
  console.log('[CONTROLLER] updateUser → userId:', req.userId, 'body:', req.body);
  try {
    const user = await userService.update(req.userId, req.body);
    console.log('[CONTROLLER] updateUser ✔ userId:', user.id);
    res.json(user);
  } catch (err) {
    console.log('[CONTROLLER] updateUser ✖', err.message);
    next(err);
  }
}

export const getUsers = async (req, res, next) => {
  console.log("[CONTROLLER] getUsers →");
  try {
    const list = await userService.findAll();
    console.log("[CONTROLLER] getUsers ✔ count:", list.length);
    res.json(list);
  } catch (err) {
    console.log("[CONTROLLER] getUsers ✖", err.message);
    next(err);
  }
};
