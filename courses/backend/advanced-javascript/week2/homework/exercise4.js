// Create a file inventory-updates.json:

// Copy
// [
//   { "teaId": 1, "change": -20, "reason": "sale" },
//   { "teaId": 1, "change": 50, "reason": "restock" },
//   { "teaId": 8, "change": -10, "reason": "sale" },
//   { "teaId": 3, "change": -100, "reason": "sale" },
//   { "teaId": 8, "change": 30, "reason": "restock" }
// ]

// Write a function that:

// Reads this file using a callback

// Uses reduce to calculate net change per tea

// Combines with original tea data to show new stock levels

// Logs a report

// Copy
import { teas } from "../../week1/data/teas.js";
import fs from "fs";

function generateInventoryReport(callback) {
  fs.readFile("./inventory-updates.json", "utf8", (error, data) => {
    if (error) {
      callback(error, null);
      return;
    }

    const updates = JSON.parse(data);

    const netChanges = updates.reduce((acc, update) => {
      acc[update.teaId] = (acc[update.teaId] || 0) + update.change;
      return acc;
    }, {});

    const report = Object.entries(netChanges).map(([teaId, change]) => {
      const tea = teas.find((t) => t.id === Number(teaId));
      const newStock = tea.stockCount + change;
      return `${tea.name}: was ${tea.stockCount}, change ${change < 0 ? change : '+' + change}, now ${newStock}${newStock < 0 ? '(NEGATIVE!)' : ''}`;
    });

    const output = "Inventory Report:\n" + report.join("\n");
    callback(null, output);
  });
}

generateInventoryReport((error, report) => {
  if (error) {
    console.error("Failed:", error.message);
    return;
  }
  console.log(report);
});
// Expected output format:

// Copy
// Inventory Report:
// - Sencha: was 150, change +30, now 180
// - Matcha: was 30, change +20, now 50
// - Dragon Well: was 45, change -100, now -55 (NEGATIVE!)
