// remove first and last character
function removeChar(str){
if (str.length < 3) {
  return "";
} else {
  return str.slice(1, str.length-1);
}
};

// counting sheep...
function countSheeps(sheep) {
  let count = 0;
  for (let i = 0; i < sheep.length; i++) {
    if (sheep[i] === true) count++;
  }
  return count;
}

// string ends with
const solution = (str, ending) => str.slice(str.length - ending.length) === ending;

// odd or even?
function oddOrEven(array) {
  if (array.length === 0 || array.reduce((x, y) => x + y) % 2 === 0) {
    return "even";
  } else {
    return "odd";
  }
}