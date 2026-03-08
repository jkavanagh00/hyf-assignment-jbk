import { teas } from "../data/teas.js";

const displayStrings = teas.map(tea => `${tea.name} - ${tea.pricePerGram * 100} DKK/100g`);

console.log(displayStrings);