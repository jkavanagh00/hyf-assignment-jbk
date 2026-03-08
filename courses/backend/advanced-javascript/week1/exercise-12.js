import { teas } from "./data/teas.js";

const organicTeaStrings = teas.filter(tea => tea.organic).map(tea => `${tea.name} - ${tea.pricePerGram * 100} DKK/100g`);