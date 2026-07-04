const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const prisma = new PrismaClient();

//  chemin vers processed data
const DATA_DIR = path.join(__dirname, '../../data-processing/processed');

//  util CSV loader
function loadCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}

//  MAIN SEED
async function main() {
  console.log(" Starting seed...");

  // =====================
  // 1. CATEGORY
  // =====================
  const categories = await loadCSV(path.join(DATA_DIR, 'categories_clean.csv'));

  for (const c of categories) {
    await prisma.category.create({
      data: {
        id: parseInt(c.category_id),
        categoryName: c.category_name,
      },
    });
  }

  console.log(" Categories seeded");

  // =====================
  // 2. CUSTOMER
  // =====================
  const customers = await loadCSV(path.join(DATA_DIR, 'customers_clean.csv'));

  for (const c of customers) {
    await prisma.customer.create({
      data: {
        id: parseInt(c.customer_id),
        name: c.name,
        email: c.email,
        signupDate: new Date(c.signup_date),
        city: c.city,
        state: c.state,
      },
    });
  }

  console.log(" Customers seeded");

  // =====================
  // 3. PRODUCT
  // =====================
  const products = await loadCSV(path.join(DATA_DIR, 'products_clean.csv'));

  for (const p of products) {
    await prisma.product.create({
      data: {
        id: parseInt(p.product_id),
        name: p.product_name,
        categoryId: parseInt(p.category_id),
        price: parseFloat(p.price),
        costPrice: parseFloat(p.cost_price),
      },
    });
  }

  console.log(" Products seeded");

  // =====================
  // 4. ORDER
  // =====================
  const orders = await loadCSV(path.join(DATA_DIR, 'orders_clean.csv'));

  for (const o of orders) {
    await prisma.order.create({
      data: {
        id: parseInt(o.order_id),
        customerId: parseInt(o.customer_id),
        status: o.order_status,
        paymentMethod: o.payment_method,
      },
    });
  }

  console.log(" Orders seeded");

  // =====================
  // 5. ORDER ITEMS
  // =====================
  const orderItems = await loadCSV(path.join(DATA_DIR, 'order_items_clean.csv'));

  for (const oi of orderItems) {
    await prisma.orderItem.create({
      data: {
        id: parseInt(oi.order_item_id),
        orderId: parseInt(oi.order_id),
        productId: parseInt(oi.product_id),
        quantity: parseInt(oi.quantity),
        unitPrice: parseFloat(oi.unit_price),
      },
    });
  }

  console.log(" OrderItems seeded");

  console.log(" Seeding completed successfully !");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });