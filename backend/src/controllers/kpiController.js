const kpiService = require('../services/kpiService');

// Chiffre d'affaires total
const getRevenue = async (req, res) => {
  try {
    const revenue = await kpiService.getRevenue();
    res.status(200).json({ revenue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Nombre total de commandes
const getTotalOrders = async (req, res) => {
  try {
    const totalOrders = await kpiService.getTotalOrders();
    res.status(200).json({ totalOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Top 10 produits les plus vendus
const getTopProducts = async (req, res) => {
  try {
    const topProducts = await kpiService.getTopProducts();
    res.status(200).json(topProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Nombre total de clients
const getTotalCustomers = async (req, res) => {
  try {
    const totalCustomers = await kpiService.getTotalCustomers();
    res.status(200).json({ totalCustomers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Nombre de clients par ville
const getCustomersByCity = async (req, res) => {
  try {
    const customersByCity = await kpiService.getCustomersByCity();
    res.status(200).json(customersByCity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Produits vendus par catégorie
const getSalesByCategory = async (req, res) => {
  try {
    const salesByCategory = await kpiService.getSalesByCategory();
    res.status(200).json(salesByCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Répartition des moyens de paiement
const getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await kpiService.getPaymentMethods();
    res.status(200).json(paymentMethods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Chiffre d'affaires par catégorie
const getRevenueByCategory = async (req, res) => {
  try {
    const revenueByCategory = await kpiService.getRevenueByCategory();
    res.status(200).json(revenueByCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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