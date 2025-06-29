
export default function UserController(userService) {
  return {
    getUser: async (req, res) => {
      try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },

    getAllUsers: async (req, res) => {
      try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },

    createUser: async (req, res) => {
      try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },

    deleteUser: async (req, res) => {
      try {
        await userService.deleteUser(req.params.id);
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  };
}
