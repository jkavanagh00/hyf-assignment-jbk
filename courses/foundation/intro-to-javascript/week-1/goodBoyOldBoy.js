
const dogYearOfBirth = 2023;
const dogYearFuture = 2033;
const dogYear = (dogYearFuture - dogYearOfBirth)*7;

let shouldShowResultInDogYears = true;
shouldShowResultInDogYears ? 
    console.log(`Your dog will be ${dogYear} dog years old in ${dogYearFuture}`) : 
    console.log(`Your dog will be ${dogYearFuture - dogYearOfBirth} human years old in ${dogYearFuture}`);

shouldShowResultInDogYears = false;
shouldShowResultInDogYears ? 
    console.log(`Your dog will be ${dogYear} dog years old in ${dogYearFuture}`) : 
    console.log(`Your dog will be ${dogYearFuture - dogYearOfBirth} human years old in ${dogYearFuture}`);