// Create your own myForEach(array, callback) function that works like the built-in forEach.
import { teas } from "../../week1/data/teas.js";

function myForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i]);
  }
  // call callback for each item
}

// Test it:
myForEach(teas, function (tea) {
  console.log(tea.name);
});