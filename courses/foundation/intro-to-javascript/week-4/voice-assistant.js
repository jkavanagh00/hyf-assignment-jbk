let userName = '';
let toDo = [];

function introduction(nameString) {
    if (!nameString) {
        console.log("Invalid name input")
    } else if (userName === nameString) {
        console.log(`Nice to see you again, ${userName}`)
    } else {
        userName = nameString;
        console.log(`Nice to meet you, ${userName}`)
    }
}

function confirmName() {
    if (userName.length > 0) {
        console.log("I don't believe we've met")
    } else {
        console.log(`Your name is ${userName}, of course`)
    }
}

function addToDoItem(str) {
    toDo.push(str);
    console.log(`Added ${str} to your to-do list`)
}

function removeToDoItem(str) {
    const i = toDo.indexOf(str);
    if (i > -1) {
        toDo.splice(i, 1);
    }
    console.log(`Removed ${str} from your to-do list`)
}

function displayToDo(arr) {
    if (arr.length === 0) {
        console.log(`You have no items on your To Do list`);
    } else if (arr.length === 1) {
        console.log(`You have 1 item on your To Do list: ${arr[0]}`);
    } else {
        const list = arr.slice(0, arr.length - 1).join(', ') + ` and ${arr[arr.length - 1]}`;
        console.log(`You have ${toDo.length} items on your To Do list: ${list}`);
    }
}

function displayDay() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = new Date().getDay();
    console.log(`It is currently ${days[day]}`)
}

function add(x, y) {
    console.log(`${x} + ${y} = ${Number(x) + Number(y)}`)
}

function subtract(x, y) {
    console.log(`${x} - ${y} = ${Number(x) - Number(y)}`)
}

function divide(x, y) {
    console.log(`${x} / ${y} = ${Number(x) / Number(y)}`)
}

function multiply(x, y) {
    console.log(`${x} * ${y} = ${Number(x) * Number(y)}`)
}

function setTimer(mins) {
    const milliseconds = mins * 6000;
    console.log(`${mins}-minute timer is set`);
    setTimeout(function () {
        console.log(`${mins}-minute timer is complete`);
    }, milliseconds);
}

function getReply(command) {
    const name = command.split(" ")[command.split(" ").length - 1]
    const commandArray = command.toLowerCase().split(" ");
    console.log(`COMMAND [${command}]`);
    if (commandArray[0] === "hello") {
        introduction(name);
    } else if (command === "What is my name?") {
        confirmName();
    } else if (commandArray[0] === "add") {
        commandArray.splice(0, 1);
        commandArray.splice(commandArray.length - 3);
        addToDoItem(commandArray.join(" "));
    } else if (commandArray[0] === "remove") {
        commandArray.splice(0, 1);
        commandArray.splice(commandArray.length - 3);
        removeToDoItem(commandArray.join(" "));
    } else if (command === "What is on my todo?") {
        displayToDo(toDo)
    } else if (command === "What day is it today?") {
        displayDay()
    } else if (command.includes('+')) {
        add(commandArray[commandArray.length - 3], commandArray[commandArray.length - 1]);
    } else if (command.includes('-')) {
        subtract(commandArray[commandArray.length - 3], commandArray[commandArray.length - 1]);
    } else if (command.includes('/')) {
        divide(commandArray[commandArray.length - 3], commandArray[commandArray.length - 1]);
    } else if (command.includes('*')) {
        multiply(commandArray[commandArray.length - 3], commandArray[commandArray.length - 1]);
    } else if (commandArray[0] === 'set') {
        setTimer(Number(commandArray[4]));
    }
}

getReply('Hello my name is Jessie');
getReply('Hello my name is Jessie');
getReply('What is my name?');
getReply('Add juggling to my todo');
getReply('What is on my todo?');
getReply('Add coding to my todo');
getReply('What is on my todo?');
getReply('Add singing in the shower to my todo');
getReply('What is on my todo?');
getReply('Remove singing in the shower from my todo');
getReply('What is on my todo?');
getReply("What day is it today?");
getReply("What is 4 + 3");
getReply("What is 4 - 3");
getReply("What is 12 / 3");
getReply("What is 4 * 3");
getReply("Set a timer for 1 minute")