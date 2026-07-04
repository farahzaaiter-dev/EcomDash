import api from "../api/api";

// Chiffre d'affaires
export const getRevenue = async () => {
  const { data } = await api.get("/kpis/revenue");
  return data;
};

// Nombre de commandes
export const getTotalOrders = async () => {
  const { data } = await api.get("/kpis/orders");
  return data;
};

// Top 10 produits
export const getTopProducts = async () => {
  const { data } = await api.get("/kpis/top-products");
  return data;
};

// Nombre de clients
export const getTotalCustomers = async () => {
  const { data } = await api.get("/kpis/customers");
  return data;
};

// Clients par ville
export const getCustomersByCity = async () => {
  const { data } = await api.get("/kpis/customers-by-city");
  return data;
};

// Ventes par catégorie
export const getSalesByCategory = async () => {
  const { data } = await api.get("/kpis/sales-by-category");
  return data;
};

// Moyens de paiement
export const getPaymentMethods = async () => {
  const { data } = await api.get("/kpis/payment-methods");
  return data;
};

// Chiffre d'affaires par catégorie
export const getRevenueByCategory = async () => {
  const { data } = await api.get("/kpis/revenue-by-category");
  return data;
};