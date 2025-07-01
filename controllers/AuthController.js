class AuthController {

    constructor(authService) {
        this.authService = authService;
    }

    register = async (req, res, next) => {
        console.log('[CONTROLLER] register → body:', req.body);
        try {
            const { name, email, password } = req.body;
            const { user, token } = await this.authService.register({ name, email, password });
            console.log('[CONTROLLER] register ✔ userId:', user.id);
            res.cookie("token", token);
            res.status(201).json({ user, token });
        } catch (err) {
            console.log('[CONTROLLER] register ✖', err.message);
            next(err);
        }
    }

    login = async (req, res, next) => {
        console.log('[CONTROLLER] login → email:', req.body.email);
        try {
            const { email, password } = req.body;
            const { user, token } = await this.authService.login({ email, password });
            console.log('[CONTROLLER] login ✔ userId:', user.id);
            res.cookie("token", token);
            res.json({ user, token });
        } catch (err) {
            console.log('[CONTROLLER] login ✖', err.message);
            next(err);
        }
    }

    me =  async (req, res) => {
        console.log('[CONTROLLER] me → userId:', req.userId);
        try {
            const user = await this.authService.me(req.userId);
            console.log('[CONTROLLER] me ✔ name:', user.name);
            res.json(user);
        } catch (err) {
            console.log('[CONTROLLER] me ✖', err.message);
            res.status(400).json({ error: err.message });
        }
    }

    logout = (_req, res) => {
        console.log('[CONTROLLER] logout → clearing cookie');
        console.log('[CONTROLLER] logout → OK (stateless)');
        res.clearCookie("token");
        res.json({ message: 'Logged out successfully ✔' });
    }

}

export default AuthController;