import { teas } from "../data/teas.js";

function inventoryReport(teas) {
    const totalTeas = teas.length;
    const inStock = teas.filter(tea => tea.inStock).length;
    const outOfStock = totalTeas - inStock;
    const totalInventoryValue = teas.map(tea => tea.pricePerGram * tea.stockCount).reduce((x, y) => x + y);
    const averagePrice = Number((totalInventoryValue / totalTeas).toFixed(2));
    return {
        totalTeas,
        inStock,
        outOfStock,
        totalInventoryValue,
        averagePrice
    }
  };

console.log(inventoryReport(teas));