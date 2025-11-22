const activities = [];
const limit = 60;


function getCurrentDate() {
    const current = new Date;
    const day = current.getDate();
    const month = current.getMonth();
    const year = current.getFullYear();
    return `${day}/${month}-${year}`
}

function addActivity(activity, duration) {
    activities.push({
        date: getCurrentDate(),
        activity: activity,
        duration: duration
    });
}

function showStatus(activities) {
    const length = activities.length;
    if (length < 1) return "Add some activities before calling showStatus.";
    let totalMinutes = 0;
    for (let i = 0; i < length; i++) {
        totalMinutes += activities[i].duration;
    }
    if (totalMinutes > limit) return "You have reached your limit, no more smartphoning for you!";
    // NOTE: instructions unclear as to whether or not this function should return or log this result
    return activities.length > 1 ?
        `You have added ${length} activities. They amount to ${totalMinutes} minutes of usage.` :
        `You have added 1 activity. It amounts to ${totalMinutes} minutes of usage.`;
}

console.log(showStatus(activities));
addActivity("coding", 23)
console.log(showStatus(activities));
addActivity("napping", 27)
console.log(showStatus(activities));
addActivity("making tea", 15);
console.log(showStatus(activities));
