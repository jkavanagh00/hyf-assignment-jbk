import { teas } from "./data/teas.js";

const japaneseTeasByPrice = teas.filter(tea => tea.origin === "Japan").sort((a, b) => a.pricePerGram - b.pricePerGram);