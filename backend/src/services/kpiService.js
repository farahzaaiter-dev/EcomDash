const prisma = require('../config/db');

// Chiffre d'affaires total
const getRevenue = async () => {
  const items = await prisma.orderItem.findMany({
    select: {
      unitPrice: true,
      quantity: true
    }
  });
  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  return total;
};

// Nombre total de commandes
const getTotalOrders = async () => {
  return await prisma.order.count();
};

// Top 10 produits les plus vendus
const getTopProducts = async () => {
  const items = await prisma.orderItem.groupBy({
    by: ['productId'],
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: 'desc' } },
    take: 10
  });

  const result = await Promise.all(
    items.map(async (item) => {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        select: { name: true }
      });
      return {
        productName: product.name,
        totalQuantity: item._sum.quantity
      };
    })
  );

  return result;
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
  const items = await prisma.orderItem.findMany({
    select: {
      quantity: true,
      product: {
        select: {
          category: {
            select: { categoryName: true }
          }
        }
      }
    }
  });

  const result = {};
  items.forEach(item => {
    const category = item.product.category.categoryName;
    if (!result[category]) result[category] = 0;
    result[category] += item.quantity;
  });

  return result;
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
  const items = await prisma.orderItem.findMany({
    select: {
      unitPrice: true,
      quantity: true,
      product: {
        select: {
          category: {
            select: { categoryName: true }
          }
        }
      }
    }
  });

  const result = {};
  items.forEach(item => {
    const category = item.product.category.categoryName;
    if (!result[category]) result[category] = 0;
    result[category] += item.unitPrice * item.quantity;
  });

  return result;
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