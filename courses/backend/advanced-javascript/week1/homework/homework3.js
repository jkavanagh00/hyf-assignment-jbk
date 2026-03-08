import { teas } from "../data/teas.js";

function lowStockAlert(teas) {
    return teas.map(tea => {
        return {
            name: tea.name,
            stock: tea.stockCount
        }
    }).sort((a, b) => a.stock - b.stock);
}

console.log(lowStockAlert(teas));