const honorifics = {
    man: "Mr.",
    woman: "Ms.",
    "non-binary": "Mx."
}

const passengers = [
    {
        firstName: "John",
        secondName: "Smith",
        gender: "man",
        formal: false
    },
    {
        firstName: "Jane",
        secondName: "Smythe",
        gender: "woman",
        formal: true
    },
    {
        firstName: "Jayden",
        secondName: "Smith",
        gender: "non-binary",
        formal: true
    }
]

let formal = false;
let gender = "man";

function getFullName(firstName, secondName) {
    var passenger = passengers.find(obj => {
        return obj.firstName === firstName && obj.secondName === secondName;
    });
    
    if (!passenger) {
        return "No passenger found"
    } else {
        return passenger.formal ? 
        `${honorifics[passenger.gender]} ${passenger.firstName} ${passenger.secondName}` : 
        `${passenger.firstName} ${passenger.secondName}`};
};

console.log(getFullName("John", "Smith"));
console.log(getFullName("Jane", "Smythe"));
console.log(getFullName("Jayden", "Smith"));
console.log(getFullName("Jane", "Smith"));