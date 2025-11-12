const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const currentDay = new Date().getDay();

function getWeekday(num) {
  const targetDay = currentDay + num % 7;
  return num === 0 ? "Today" : weekdays[targetDay];
}