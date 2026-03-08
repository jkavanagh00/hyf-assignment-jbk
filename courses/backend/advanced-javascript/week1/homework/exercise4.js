import { teas } from "../data/teas.js";

function teasByOrigin(teas) {
    let origins = {};
    teas.forEach(tea => {
        const origin = tea.origin;
        if (!origins[origin]) {
            origins[origin] = [tea.name];
        } else {
            origins[origin].push(tea.name);
        }
    });
    return origins;
}

console.log(teasByOrigin(teas));