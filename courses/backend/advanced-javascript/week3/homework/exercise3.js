const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

export async function calculateOrderTotal(items) {
  const teas = await fetch(`${API_BASE}/teas/`)
    .then((result) => {
      if (!result.ok) throw new Error("Uh-oh!");
      return result.json();
    })
    .catch(() => {
      throw new Error("Uh-oh!");
    });

  const prices = items.map((item) => {
    const tea = teas.find((tea) => tea.id === item.teaId);
    if (!tea) throw new Error(`Tea with ID ${item.teaId} does not exist`);
    return item.grams * tea.pricePerGram;
  });

  const total = prices.reduce((x, y) => x + y);

  return total;
}

// const order = [
//   { teaId: 1, grams: 100 },
//   { teaId: 3, grams: 50 },
//   { teaId: 8, grams: 200 },
// ];

// calculateOrderTotal(order)
//   .then((total) => console.log(`Order total: ${total.toFixed(2)} DKK`))
//   .catch((err) => console.error("Error:", err.message));