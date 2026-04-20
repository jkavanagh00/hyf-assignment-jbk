function functionRunner(fn) {
  fn();
}

// Test it:
functionRunner(function () {
  console.log("I was called!");
});

// Also test with a function variable:
const sayHello = function () {
  console.log("Hello!");
};
functionRunner(sayHello);