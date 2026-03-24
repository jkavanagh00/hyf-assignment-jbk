const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

export async function getTeaDetails(id) {
  const [tea, inventory] = await Promise.all([
    fetch(`${API_BASE}/teas/${id}/`).then((result) => result.json()),
    fetch(`${API_BASE}/inventory/${id}`).then((result) => result.json()),
  ]);
  return {
    ...tea,
    stock: inventory.stockCount,
  };
}

// Test it:
// getTeaDetails(1).then((tea) => {
//   console.log(`${tea.name} (${tea.origin})`);
//   console.log(`Price: ${tea.pricePerGram} DKK/gram`);
//   console.log(`Stock: ${tea.stock} grams`);
//   console.log(`Value: ${(tea.pricePerGram * tea.stock).toFixed(2)} DKK`);
// });
