import userService from '../services/UserService.js';

export const updateUser = async (req, res, next) => {

    console.log('[CONTROLLER] updateUser → userId:', req.userId, 'body:', req.body);

    try {
        const user = await userService.update({ id: req.userId, data: req.body });
        console.log('[CONTROLLER] updateUser ✔ userId:', user.id);
        res.json(user);
    } catch (err) {
        console.log('[CONTROLLER] updateUser ✖', err.message);
        next(err);
    }
};
