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
    let totalMinutes = 0;
    const length = activities.length;
    for (let i = 0; i < length; i++) {
        totalMinutes += activities[i].duration;
    }
    if (totalMinutes > limit) return "You have reached your limit, no more smartphoning for you!"; 
    // NOTE: instructions unclear as to whether or not this function should return or log this result
    return length > 0 ? `You have added ${length} activities. They amount to ${totalMinutes} min. of usage` : "Add some activities before calling showStatus";
}