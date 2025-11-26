const travelInformation = {
    speed: 50,
    destinationDistance: 432,
};

const travelTime = calculateTravelTime(travelInformation);
console.log(travelTime);

function calculateTravelTime(obj) {
    const speed = obj.speed;
    const distance = obj.destinationDistance;
    const totalSeconds = Math.floor((distance / speed) * 3600);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds - hours * 3600 - minutes * 60;
    return `${hours} hours, ${minutes} minutes and ${seconds} seconds`
}