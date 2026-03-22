import { teas } from "../week1/data/teas.js";

function myFilter(array, callback) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i])) result.push(array[i]);
    }
    return result;
}

// Test it:
const organic = myFilter(teas, function (tea) {
  return tea.organic;
});
console.log(organic.length); // number of organic teas