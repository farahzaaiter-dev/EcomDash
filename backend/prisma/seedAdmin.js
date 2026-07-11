const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Chiffrer le mot de passe
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // Créer ou mettre à jour l'admin
  await prisma.admin.upsert({
    where: {
      email: "admin@ecomdash.com",
    },
    update: {
      name: "Admin",
      password: hashedPassword,
    },
    create: {
      name: "Admin",
      email: "admin@ecomdash.com",
      password: hashedPassword,
    },
  });

  console.log("✅ Admin créé avec succès !");
  console.log("Email : admin@ecomdash.com");
  console.log("Mot de passe : admin123");
}

main()
  .catch((error) => {
    console.error("❌ Erreur :", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });