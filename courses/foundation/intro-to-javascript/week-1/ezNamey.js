firstParticles = ['Shop', 'Drink', 'Eat', 'Buy', 'Spend', 'Get', 'Bet', 'Swipe', 'Game', 'Pic', 'View']
secondParticles = ['r' ,'s\'r\'Us', 'ify', 'ly', 'hub', 'ful', 'book', 'Saver', 'Finder', 'tube']

getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

ezNamey = () => `Your new app name is ${getRandom(firstParticles)}${getRandom(secondParticles)}!`;