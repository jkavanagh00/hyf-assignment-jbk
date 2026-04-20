import { teas } from "../../week1/data/teas.js";

const logTea = function (tea) {
    console.log(`${tea.name} (${tea.origin})`);
};

logTea(teas[0]); // should log: "Sencha (Japan)"