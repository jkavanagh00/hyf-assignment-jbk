const honorifics = {
    man: "Lord",
    woman: "Lady",
    nonBinary: "Regent"
};

const fullName1 = getFullName("John", "Doe");
const fullName2 = getFullName("Jane", "Doe", true);

function getFullName(firstName, secondName, useFormalName, gender) {
    return useFormalName && gender ? `${honorifics[gender]} ${firstName} ${secondName}` : `${firstName} ${secondName}`;
};