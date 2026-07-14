const express = require('express');
const router = express.Router();
const kpiController = require('../controllers/kpiController');
const authMiddleware = require("../middleware/authMiddleware");
router.use(authMiddleware);
// Chiffre d'affaires total
//http://localhost:5000/api/kpis/revenue
router.get('/revenue', kpiController.getRevenue);

// Nombre total de commandes
//http://localhost:5000/api/kpis/orders
router.get('/orders', kpiController.getTotalOrders);

// Top 10 produits les plus vendus
//http://localhost:5000/api/kpis/top-products
router.get('/top-products', kpiController.getTopProducts);

// Nombre de clients
//http://localhost:5000/api/kpis/customers
router.get('/customers', kpiController.getTotalCustomers);

// Nombre de clients par ville
//http://localhost:5000/api/kpis/customers-by-city
router.get('/customers-by-city', kpiController.getCustomersByCity);

// Produits vendus par catégorie
//http://localhost:5000/api/kpis/sales-by-category
router.get('/sales-by-category', kpiController.getSalesByCategory);

// Répartition des moyens de paiement
//http://localhost:5000/api/kpis/payment-methods
router.get('/payment-methods', kpiController.getPaymentMethods);

// Chiffre d'affaires par catégorie
//http://localhost:5000/api/kpis/revenue-by-category
router.get('/revenue-by-category', kpiController.getRevenueByCategory);

module.exports = router;