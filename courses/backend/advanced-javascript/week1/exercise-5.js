import { teas } from "./data/teas.js";

const teaPrices = teas.map(tea => tea.pricePerGram * 100);

console.log(teaPrices);