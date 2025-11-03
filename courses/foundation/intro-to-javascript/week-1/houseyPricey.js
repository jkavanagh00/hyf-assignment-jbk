function ripOffDetector(width, depth, height, gardenSizeInM2, clientName, quotedPrice) {
    const volumeInMeters = width * depth * height;
    const housePrice = (volumeInMeters * 2.5 * 1000) + (gardenSizeInM2 * 300);
    return quotedPrice <= housePrice ?
    `Looking good, ${clientName}, you should buy!` :
    `What a rip off! Get out of there ${clientName}!`;
}

console.log(ripOffDetector(8, 10, 10, 100, 'Peter', 2500000));
console.log(ripOffDetector(5, 11, 8, 70, 'Julia', 1000000));