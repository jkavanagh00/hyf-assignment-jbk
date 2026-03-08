import { teas } from "./data/teas.js";

const displayStrings = teas.map(tea => `${tea.name} - ${tea.pricePerGram * 100}/100g`);
console.log(teas)
console.log(displayStrings);