const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

export async function checkOrderStock(items) {
  const inventory = await fetch(`${API_BASE}/inventory/`)
    .then((result) => {
      if (!result.ok) throw new Error("Uh-oh!");
      return result.json();
    })
    .catch(() => {
      throw new Error("Uh-oh!");
    });
  const inStock = items.every((item) => {
    const tea = inventory.find((tea) => tea.teaId === item.teaId);
    return tea.stockCount >= item.grams;
  }, false);

  const shortages = items
    .map((item) => {
      const tea = inventory.find((tea) => tea.teaId === item.teaId);
      if (tea.stockCount < item.grams)
        return {
          name: tea.teaName,
          needed: item.grams,
          available: tea.stockCount,
        };
    }, [])
    .filter(Boolean);
  console.log(shortages);
  return { inStock: inStock, shortages: shortages };
}

// const largeOrder = [
//   { teaId: 1, grams: 100 },
//   { teaId: 2, grams: 500 }, // might be out of stock
//   { teaId: 3, grams: 9999 }, // definitely out of stock
// ];

// checkOrderStock(largeOrder).then((result) => {
//   if (result.inStock) {
//     console.log("All items in stock!");
//   } else {
//     console.log("Shortages:");
//     result.shortages.forEach((s) => {
//       console.log(`- ${s.name}: need ${s.needed}, have ${s.available}`);
//     });
//   }
// });
