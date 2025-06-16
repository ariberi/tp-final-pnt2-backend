import authService from '../services/AuthService.js';

export const register = async (req, res, next) => {
    console.log('[CONTROLLER] register → body:', req.body);
    try {
        const { user, token } = await authService.register(req.body);
        console.log('[CONTROLLER] register ✔ userId:', user.id);
        res.status(201).json({ user, token });
    } catch (err) {
        console.log('[CONTROLLER] register ✖', err.message);
        next(err);
    }
};

export const login = async (req, res, next) => {
    console.log('[CONTROLLER] login → email:', req.body.email);
    try {
        const { user, token } = await authService.login(req.body);
        console.log('[CONTROLLER] login ✔ userId:', user.id);
        res.json({ user, token });
    } catch (err) {
        console.log('[CONTROLLER] login ✖', err.message);
        next(err);
    }
};

export const logout = async (_req, res) => {
    console.log('[CONTROLLER] logout → OK (stateless)');
    res.json({ message: 'Logged out' });
};
