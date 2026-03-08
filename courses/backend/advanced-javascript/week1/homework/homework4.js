import { teas } from "../data/teas.js";

function teasByOrigin(teas) {
    let origins = {};
    teas.forEach(tea => {
        const origin = tea.origin;
        if (!origins[origin]) {
            origins[origin] = 1;
        } else {
            origins[origin]++;
        }
    });
    return origins;
}

console.log(teasByOrigin(teas));