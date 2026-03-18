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

validateOrder(order, (result) => {
  console.log("Validation result:", result);
});

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

calculateTotal(order, (result) => {
  console.log("Total result:", result);
});

// 3. checkStock(order, callback) - 400ms delay
// Check if each tea has enough stock for the order quantity
// Callback receives { orderId: number, inStock: boolean, shortages: string[] }
// Test each function individually with console.log as callback function to see results after delays:

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

checkStock(order, (result) => {
  console.log("Stock result:", result);
});