import { teas } from "../../week1/data/teas.js";


const inventoryValue = teas.reduce((acc, tea) => acc + tea.pricePerGram * tea.stockCount, 0);
console.log(inventoryValue);