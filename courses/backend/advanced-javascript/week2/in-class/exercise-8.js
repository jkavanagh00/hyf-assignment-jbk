import { teas } from "../../week1/data/teas.js";

const groupedByOrigin = teas.reduce((origins, tea) => {
    if (!origins[tea.origin]) {
        origins[tea.origin] = [tea.name]
    } else {
        origins[tea.origin].push(tea.name);
    }
    return origins
}, {});
console.log(groupedByOrigin);
// Expected: { Japan: ["Sencha", "Matcha", ...], China: [...], ... }