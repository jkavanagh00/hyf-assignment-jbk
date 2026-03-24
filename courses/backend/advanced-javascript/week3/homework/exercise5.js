import { checkOrderStock } from "./exercise4.js";
import { calculateOrderTotal } from "./exercise3.js";
import { getTeaDetails } from "./exercise2.js";
const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function processOrder(items) {
  console.log("Processing order...");

  console.log("\n1. Validating items...");
  const teas = await fetch(`${API_BASE}/teas/`)
    .then((result) => {
      if (!result.ok)
        throw new Error(
          "Error: Unable to retrieve teas from database.",
          result.status,
        );
      return result.json();
    })
    .catch(() => {
      throw new Error("Uh-oh!");
    });

  for (const item of items) {
    if (!teas.some((tea) => tea.id === item.teaId)) {
      throw new Error(`Tea with ID ${item.teaId} does not exist`);
    }
  }
  console.log("Order successfully validated");

  console.log("\n2. Checking stock...");
  const stockResult = await checkOrderStock(items);
  if (!stockResult.inStock) {
    for (const shortage of stockResult.shortages) {
        const str = `${shortage.name}: ${shortage.needed}g needed, ${shortage.available}g available`;
        console.log(str)
    };
    throw new Error("Items out of stock");
  } else {
    console.log("All items in stock");
  }

  console.log("\n3. Calculating total...");
  const total = await calculateOrderTotal(items);
  console.log(total.toFixed(2));

  console.log("\n4. Creating summary...");
  const teasOrdered = await Promise.all(
    items.map(async (item) => {
      const tea = await getTeaDetails(item.teaId);
      return {
        ...tea,
        grams: item.grams,
      };
    }),
  );
  const summary = teasOrdered.map((tea) => {
    return [
      `${tea.name} (${tea.origin}), ${tea.grams}g\n` +
        `Price: ${tea.pricePerGram} DKK/gram\n` +
        `Subtotal: ${(tea.pricePerGram * tea.grams).toFixed(2)} DKK\n`
    ];
  });

  console.log(summary.join("\n"));

  return {
    items: items.length,
    total,
    status: "ready",
  };
}

// Invalid ID order
// const invalidIDOrder = [
//   { teaId: 3, grams: 50 },
//   { teaId: 60, grams: 10 },
// ];

// processOrder(invalidIDOrder)
//   .then((result) => {
//     console.log("Order ready!");
//     console.log(`Items: ${result.items}`);
//     console.log(`Total: ${result.total.toFixed(2)} DKK`);
//   })
//   .catch((err) => {
//     console.error("Order failed:", err.message);
//   });

// Out of stock order
// const outOfStockOrder = [
//   { teaId: 3, grams: 500 },
//   { teaId: 6, grams: 1000 },
// ];

// processOrder(outOfStockOrder)
//   .then((result) => {
//     console.log("Order ready!");
//     console.log(`Items: ${result.items}`);
//     console.log(`Total: ${result.total.toFixed(2)} DKK`);
//   })
//   .catch((err) => {
//     console.error("Order failed:", err.message);
//   });

// Successful order
// const successfulOrder = [
//   { teaId: 3, grams: 50 },
//   { teaId: 6, grams: 100 },
// ];

// processOrder(successfulOrder)
//   .then((result) => {
//     console.log("Order ready!");
//     console.log(`Items: ${result.items}`);
//     console.log(`Total: ${result.total.toFixed(2)} DKK`);
//   })
//   .catch((err) => {
//     console.error("Order failed:", err.message);
//   });
