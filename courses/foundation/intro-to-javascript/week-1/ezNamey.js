const firstWords = ["Easy", "Awesome", "Corporate", "Cool", "Fun", "Good", "Great", "Better", "Superb", "Yes"];
const secondWords = ["Corporation", "Company", "Firm", "Business", "Fund", "Alliance", "Equity", "Capital", "Finance", "Holdings"];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const startupName = getRandom(firstWords) + " " + getRandom(secondWords);

console.log("Your new app name is " + startupName + "!");