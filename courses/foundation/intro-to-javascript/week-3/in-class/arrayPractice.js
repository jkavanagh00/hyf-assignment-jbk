fruits = ["apple", "banana", "pear"]

const addAtBeginningOfArray = (value, arr) => {
    const result = [value];
    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i]);
    }
    return result
}

const addAtBeginningOfArrayAndModify = (value) => {
    for (let i = fruits.length-1; i <= 0; i--) {
        fruits[i + 1] = arr[i];
    }
    fruits[0] = value;
    return fruits
}


console.log(addAtBeginningOfArray("lychee", fruits));
addAtBeginningOfArrayAndModify("cherry");
console.log(fruits);