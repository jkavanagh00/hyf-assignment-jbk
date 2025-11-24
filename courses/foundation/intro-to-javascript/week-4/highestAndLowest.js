// Is chaining method calls in this way good practice or not?

function highAndLow(numbers) {
    const arr = numbers
        .split(" ")
        .map((char) => Number(char))
        .sort((x, y) => x - y);
    return `${arr[arr.length - 1]} ${arr[0]}`;
}