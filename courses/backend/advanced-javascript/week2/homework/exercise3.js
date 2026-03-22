import { teas } from "../../week1/data/teas.js";
import fs from "fs";

const order = {
  id: 1001,
  customerId: 42,
  items: [
    { teaId: 1, grams: 100 },
    { teaId: 8, grams: 50 },
    { teaId: 3, grams: 200 },
  ],
};

function validateOrder(order, callback) {
  setTimeout(() => {
    const errors = [];

    for (const item of order.items) {
      if (!teas.some((tea) => tea.id === item.teaId)) {
        errors.push(`Tea (ID: ${item.teaId}) does not exist.`);
      }
    }
    callback({
      valid: errors.length === 0,
      errors,
    });
  }, 200);
}

function calculateTotal(order, callback) {
  setTimeout(() => {
    let total = 0;
    for (const item of order.items) {
      const tea = teas.find(t => t.id === item.teaId);
      if (tea) {
        total += tea.pricePerGram * item.grams;
      }
    }

    callback({
      orderId : order.id,
      total,
    });
  }, 300)
}

function checkStock(order, callback) {
  setTimeout(() => {
    const shortages = [];
    let inStock = true;
    for (const item of order.items) {
      const tea = teas.find(t => t.id === item.teaId);
      if (!tea.inStock) {
        shortages.push(`${tea.name} is currently out of stock.`);
        inStock = false;
      } else if (tea.stockCount < item.grams) {
        shortages.push(`${tea.name} is short by ${item.grams - tea.stockCount} grams.`);
        inStock = false;
      }    
    }
    callback({
      orderId: order.id,
      inStock: inStock,
      shortages: shortages,
    });
  }, 400);
}

function processOrder(order) {
  console.log("Processing order", order.id);

  validateOrder(order, (validation) => {
    if (!validation.valid) {
      console.log("Validation failed:", validation.errors);
      return;
    }
    console.log("Validation passed");

    calculateTotal(order, (pricing) => {
      console.log("Total:", pricing.total, "DKK");

    checkStock(order, (stock) => {
      console.log("Stock check:", stock)
    })
    });
  });
}

processOrder(order);