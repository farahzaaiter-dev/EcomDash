const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const login = async (email, password) => {
  // Rechercher l'administrateur par email
  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  // Vérifier si l'administrateur existe
  if (!admin) {
    throw new Error("Email ou mot de passe incorrect.");
  }

  // Vérifier le mot de passe
  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    throw new Error("Email ou mot de passe incorrect.");
  }

  // Retourner les informations de l'administrateur
  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
  };
};

module.exports = {
  login,
};