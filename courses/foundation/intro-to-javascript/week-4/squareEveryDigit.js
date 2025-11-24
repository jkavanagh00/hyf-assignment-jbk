/* I have included two working solutions. 
Could you comment on which is better? */

const squareDigits = num => Number(num.toString().split('').map((char) => Math.pow(Number(char), 2)).join(''));

function squareDigits(num) {
    const arr = num.toString().split('');
    const numArr = arr.map((char) => Math.pow(Number(char), 2));
    const result = Number(numArr.join(''));
    return result;
}