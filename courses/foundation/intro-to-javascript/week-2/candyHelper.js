const pricePerGram = {
    sweet: 0.5,
    chocolate: 0.7,
    toffee: 1.1,
    "chewing-gum": 0.03 
};

const addCandy = (type, weight) => canBuyMoreCandy() ? boughtCandyPrices.push(pricePerGram[type] * weight) : console.log("Enough candy for you!");

const boughtCandyPrices = [];
const calculateTotalSpent = () => boughtCandyPrices.length > 0 ? boughtCandyPrices.reduce((x, y) => x + y) : 0 ;

const canBuyMoreCandy = () => amountToSpend > calculateTotalSpent();

const amountToSpend = Math.random() * 100;