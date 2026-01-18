let userName = '';
let toDo = [];

function introduction(nameString) {
    if (!nameString) {
        return "invalid name input"
    } else if (userName === nameString) {
        return `nice to see you again, ${userName}`
    } else {
        userName = nameString;
        return `nice to meet you, ${userName}`
    }
}

function confirmName() {
    if (userName.length > 0) {
        return `your name is ${userName}, of course`
    } else {
        return "i don't believe we've met"
    }
}

function addToDoItem(str) {
    toDo.push(str);
    return `added ${str} to your to-do list`
}

function removeToDoItem(str) {
    const i = toDo.indexOf(str);
    if (i > -1) {
        toDo.splice(i, 1);
    }
    return `removed ${str} from your to-do list`
}

function displayToDo(arr) {
    if (arr.length === 0) {
        return `you have no items on your to do list`
    } else if (arr.length === 1) {
        return `you have 1 item on your to do list: ${arr[0]}`
    } else {
        const list = arr.slice(0, arr.length - 1).join(', ') + ` and ${arr[arr.length - 1]}`;
        return `you have ${toDo.length} items on your To Do list: ${list}`
    }
}

function displayDay() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = new Date().getDay();
    return `it is currently ${days[day]}`
}

function add(x, y) {
    return `${x} + ${y} = ${Number(x) + Number(y)}`
}

function subtract(x, y) {
    return `${x} - ${y} = ${Number(x) - Number(y)}`
}

function divide(x, y) {
    return `${x} / ${y} = ${Number(x) / Number(y)}`
}

function multiply(x, y) {
    return `${x} * ${y} = ${Number(x) * Number(y)}`
}

function setTimer(mins) {
    const milliseconds = mins * 6000;
    setTimeout(function () {
        return `${mins}-minute timer is complete`
    }, milliseconds);
    return `${mins}-minute timer is set`;
}

function getReply(command) {
    const commandArray = command.toLowerCase().split(" ");
    console.log(`COMMAND [${command}]`);
    if (commandArray[0] === "hello") {
        userName = command.split(" ")[command.split(" ").length - 1];
        introduction(userName);
    } else if (command === "what is my name") {
        confirmName();
    } else if (commandArray[0] === "add") {
        addToDoItem(commandArray[1]);
    } else if (commandArray[0] === "remove") {
        removeToDoItem(commandArray[1]);
    } else if (command === "what is on my to do") {
        displayToDo(toDo)
    } else if (command === "what day is it today") {
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