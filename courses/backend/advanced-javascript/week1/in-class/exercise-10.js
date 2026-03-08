import { teas } from "../data/teas.js";

const organicTeasInStock = teas.filter(tea => tea.inStock).filter(tea => tea.organic);