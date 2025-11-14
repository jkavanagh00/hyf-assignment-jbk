const seriesDurations = [
  {
    title: "Game of thrones",
    days: 3,
    hours: 1,
    minutes: 0,
  },
  {
    title: "Sopranos",
    days: 3,
    hours: 14,
    minutes: 0,
  },
  {
    title: "The Wire",
    days: 2,
    hours: 12,
    minutes: 0,
  },
];

function calculatePercentage(obj) {
    const percentage = (((obj.hours + (obj.days * 24)) / (8760*80)) * 100);
    return percentage.toFixed(3);
}

function calculateTimeSpent(arr) {
    const total = {
        days: 0,
        hours: 0,
        minutes: 0
    };
    for (let i = 0; i < arr.length; i++) {
        const series = seriesDurations[i];
        console.log(`${series.title} took ${calculatePercentage(series)}% of my life`)
        total.days += series.days;
        total.hours += series.hours;
    }
    console.log(`In total, that is ${calculatePercentage(total)}% of my life`);
}

calculateTimeSpent(seriesDurations);