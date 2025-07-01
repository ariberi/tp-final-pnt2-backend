class UserController {

    constructor(userService) {
        this.userService = userService;
    }

    // getUser = async (req, res) => {
    //     try {
    //         const user = await this.userService.getUserById(req.params.id);
    //         res.status(200).json(user);
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // }
    //
    // getAllUsers = async (req, res) => {
    //     try {
    //         const users = await this.userService.getAllUsers();
    //         res.status(200).json(users);
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // }
    //
    // createUser = async (req, res) => {
    //     try {
    //         const newUser = await this.userService.createUser(req.body);
    //         res.status(201).json(newUser);
    //     } catch (error) {
    //         res.status(400).json({ error: error.message });
    //     }
    // }
    //
    // deleteUser = async (req, res) => {
    //     try {
    //         await this.userService.deleteUser(req.params.id);
    //         res.status(204).end();
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // }

    updateUser = async (req, res, next) => {

        console.log('[CONTROLLER] updateUser → userId:', req.userId, 'body:', req.body);

        try {
            const user = await this.userService.update({ id: req.userId, data: req.body });
            console.log('[CONTROLLER] updateUser ✔ userId:', user.id);
            res.json(user);
        } catch (err) {
            console.log('[CONTROLLER] updateUser ✖', err.message);
            next(err);
        }
    }
}

export default UserController;