
const dogYearOfBirth = 2023;
const dogYearFuture = 2033;
const humanYears = dogYearFuture - dogYearOfBirth
const dogYears = humanYears*7;

let shouldShowResultInDogYears = true;
shouldShowResultInDogYears ? 
    console.log(`Your dog will be ${dogYears} dog years old in ${dogYearFuture}`) : 
    console.log(`Your dog will be ${humanYears} human years old in ${dogYearFuture}`);

shouldShowResultInDogYears = false;
shouldShowResultInDogYears ? 
    console.log(`Your dog will be ${dogYears} dog years old in ${dogYearFuture}`) : 
    console.log(`Your dog will be ${humanYears} human years old in ${dogYearFuture}`);