const authService = require("../services/authService");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: "Connexion réussie",
      admin,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  login,
};