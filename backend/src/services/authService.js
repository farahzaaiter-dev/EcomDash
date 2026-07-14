const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

// ================= REGISTER =================
const register = async (name, email, password) => {
  // Check if email already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    throw new Error("This email is already registered.");
  }

  // Encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create admin
  const admin = await prisma.admin.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
  };
};

// ================= LOGIN =================
const login = async (email, password) => {
  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    throw new Error("Email or password is incorrect.");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    admin.password
  );

  if (!isPasswordValid) {
    throw new Error("Email or password is incorrect.");
  }

  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
  };
};

module.exports = {
  register,
  login,
};