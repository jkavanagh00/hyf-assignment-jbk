const names = [
  "Peter",
  "Ahmad",
  "Yana",
  "kristina",
  "Rasmus",
  "Samuel",
  "Katrine",
  "Tala",
];
const nameToRemove = "Ahmad";

function removeName(nameToRemove) {
    for (let i = 0; i < names.length; i++) {
        if(names[i] === nameToRemove) names.splice(i, 1);
    }
}

removeName(nameToRemove);
console.log(names); // ['Peter', 'Yana', 'kristina', 'Rasmus', 'Samuel', 'Katrine', 'Tala']