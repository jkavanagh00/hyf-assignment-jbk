// Create your own myMap(array, callback) function that works like the built-in map
import { teas } from "../../week1/data/teas.js";

function myMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i]));
  }
  // call callback for each item
  // push the return value to result
  return result;
}

// Test it:
const names = myMap(teas, function (tea) {
  return tea.name;
});
console.log(names); // ["Sencha", "Earl Grey", ...]