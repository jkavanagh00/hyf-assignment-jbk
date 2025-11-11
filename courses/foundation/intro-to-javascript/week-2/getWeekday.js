const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"]
const currentDate = new Date();
const currentDay = currentDate.getDay();

function getWeekday(num) {
    const difference = num % 7;
    const currentWeekday = currentDay + difference;
    if (num === 0) {
        return "Today"
    } else {
    return currentWeekday > 6 ?
    weekdays[currentWeekday - 7] :
    weekdays[currentWeekday];
    };
}

console.log(getWeekday(0));
console.log(getWeekday(1));
console.log(getWeekday(9));
console.log(getWeekday(17));