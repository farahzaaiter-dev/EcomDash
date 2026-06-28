const prisma = require('../config/db');

// Chiffre d'affaires total
const getRevenue = async () => {
  const result = await prisma.orderItem.aggregate({
    _sum: { unitPrice: true }
  });
  return result._sum.unitPrice;
};

// Nombre total de commandes
const getTotalOrders = async () => {
  return await prisma.order.count();
};

// Top 10 produits les plus vendus
const getTopProducts = async () => {
  return await prisma.orderItem.groupBy({
    by: ['productId'],
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: 'desc' } },
    take: 10
  });
};

// Nombre de clients
const getTotalCustomers = async () => {
  return await prisma.customer.count();
};

// Nombre de clients par ville
const getCustomersByCity = async () => {
  return await prisma.customer.groupBy({
    by: ['city'],
    _count: { id: true }
  });
};

// Produits vendus par catégorie
const getSalesByCategory = async () => {
  return await prisma.orderItem.groupBy({
    by: ['productId'],
    _sum: { quantity: true }
  });
};

// Répartition des moyens de paiement
const getPaymentMethods = async () => {
  return await prisma.order.groupBy({
    by: ['paymentMethod'],
    _count: { id: true }
  });
};

// Chiffre d'affaires par catégorie
const getRevenueByCategory = async () => {
  return await prisma.orderItem.groupBy({
    by: ['productId'],
    _sum: { unitPrice: true }
  });
};

module.exports = {
  getRevenue,
  getTotalOrders,
  getTopProducts,
  getTotalCustomers,
  getCustomersByCity,
  getSalesByCategory,
  getPaymentMethods,
  getRevenueByCategory
};
