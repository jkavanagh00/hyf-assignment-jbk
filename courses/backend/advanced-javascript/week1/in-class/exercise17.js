import { teas } from "../data/teas.js";

function filterTeas (teas, obj) {
    const entries = Object.entries(obj);
    entries.forEach((entry) => {
        const key = entry[0];
        const value = entry[1];
        teas = teas.filter(tea => tea[key] === value);
    })
    return teas;
}

console.log('Organic teas: ', filterTeas(teas, { organic: true }))
// Returns all organic teas

console.log('Japanese teas: ', filterTeas(teas, { origin: "Japan" }))
// Returns all Japanese teas

console.log('Organic Japanese teas: ', filterTeas(teas, { organic: true, origin: "Japan" }))
// Returns organic Japanese teas

console.log('Green teas in stock: ', filterTeas(teas, { type: "green", inStock: true }))
// Returns green teas that are in stock);