const authService = require("../services/authService");

// Register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const result = await authService.register(name, email, password);

    res.status(201).json({
      success: true,
      message: "Compte créé avec succès.",
      token: result.token,
      admin: result.admin,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: "Connexion réussie.",
      token: result.token,
      admin: result.admin,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};