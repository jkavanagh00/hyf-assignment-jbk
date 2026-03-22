// prediction: "1. Starting", "3. Continuing", "2. Timeout done"

console.log("1. Starting");

setTimeout(function () {
  console.log("2. Timeout done");
}, 1000);

console.log("3. Continuing");