const pricePerGram = {
    sweet: 0.5,
    chocolate: 0.7,
    toffee: 1.1,
    chewingGum: 0.03
};

const boughtCandyPrices = [];
const amountToSpend = Math.random() * 100;

function addCandy(type, weight) {
    const totalSpent = boughtCandyPrices.length > 0 ? boughtCandyPrices.reduce((x, y) => x + y) : 0;
    const price = pricePerGram[type] * weight;
    if (totalSpent + price < amountToSpend) {
        boughtCandyPrices.push(price);
        console.log("You can buy more, so please do!");
    } else {
        console.log("Enough candy for you!");
    }
}