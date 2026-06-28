const app = require('./app');
const prisma = require('./config/db');

const PORT = process.env.PORT || 3000;
async function startServer() {
  try{
    await prisma.$connect();
    console.log('prisma connecte');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch(error){
    console.error('error:',error);
    process.exit(1)
  }
};
startServer();

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Prisma déconnecté');
  process.exit(0);
});