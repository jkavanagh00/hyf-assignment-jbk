function dogify(dogYearOfBirth, dogYearFuture, shouldShowResultInDogYears) {
    const humanYears = dogYearFuture - dogYearOfBirth
    const dogYears =   humanYears * 7;
    return shouldShowResultInDogYears === false ? 
    `Your dog will be ${humanYears} human years old in ${dogYearFuture}` :
    `Your dog will be ${dogYears} dog years old in ${dogYearFuture}`;
}

console.log(dogify(2022, 2031, true)); 
console.log(dogify(2022, 2031, false));