// Use reduce to calculate the total stockCount across all teas.
import { teas } from "../../week1/data/teas.js";

const totalStock = teas.reduce((sum, tea) => sum + tea.stockCount, 0);

console.log(totalStock); // sum of all stockCount values