import { teas } from "../data/teas.js";

const organicTeas = teas.filter(tea => tea.organic);

console.log(organicTeas);