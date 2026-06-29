const express = require('express');
const router = express.Router();
const kpiController = require('../controllers/kpiController');

// Chiffre d'affaires total
router.get('/revenue', kpiController.getRevenue);

// Nombre total de commandes
router.get('/orders', kpiController.getTotalOrders);

// Top 10 produits les plus vendus
router.get('/top-products', kpiController.getTopProducts);

// Nombre de clients
router.get('/customers', kpiController.getTotalCustomers);

// Nombre de clients par ville
router.get('/customers-by-city', kpiController.getCustomersByCity);

// Produits vendus par catégorie
router.get('/sales-by-category', kpiController.getSalesByCategory);

// Répartition des moyens de paiement
router.get('/payment-methods', kpiController.getPaymentMethods);

// Chiffre d'affaires par catégorie
router.get('/revenue-by-category', kpiController.getRevenueByCategory);

module.exports = router;