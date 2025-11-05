function ripOffDetector(clientName) {
    const volumeInMeters = customerData[clientName].width * customerData[clientName].depth * customerData[clientName].height;
    const housePrice = (volumeInMeters * 2.5 * 1000) + (customerData[clientName].gardenSizeInM2 * 300);
    customerData[clientName].quotedPrice <= housePrice ?
    console.log(`Looking good, ${clientName}, you should buy!`) :
    console.log(`What a rip off! Get out of there ${clientName}!`);
}

const customerData = {
    Peter: {
        quotedPrice: 2500000,
        gardenSizeInM2: 100,
        width: 8,
        depth: 10,
        height: 10
    },
    Julia: {
        quotedPrice: 1000000,
        gardenSizeInM2: 70,
        width: 5,
        depth: 11,
        height: 8
    }
}

ripOffDetector("Peter");
ripOffDetector("Julia");