import { teas } from "../data/teas.js";

const greenTeaNames = teas.filter(tea => tea.type === "green").map(tea => tea.name);