import { teas } from "../week1/data/teas.js";

function findTeaById(id, callback) {
  // Use setTimeout to wait 500ms
  setTimeout(function () {
    for (let i = 0; i < teas.length; i++) {
        if (teas[i].id === id) callback(teas[i]);
    }
  }, 500)
  // Inside the timeout: find the tea by id, then call the callback with it
}

findTeaById(1, function (tea) {
  console.log("Got:", tea.name);
});
findTeaById(5, function (tea) {
  console.log("Got:", tea.name);
});
findTeaById(10, function (tea) {
  console.log("Got:", tea.name);
});
console.log("All requests sent!");