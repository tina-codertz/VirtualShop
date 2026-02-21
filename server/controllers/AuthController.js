import AuthService from '../services/authServices.js';

const AuthController = {
  register: async (req, res) => {
    try {
      const { name, username, email, password, role } = req.body;
      if (!name || !username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const result = await AuthService.register(name, username, email, password, role);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      const result = await AuthService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await AuthService.getUser(req.user.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};

export default AuthController;
