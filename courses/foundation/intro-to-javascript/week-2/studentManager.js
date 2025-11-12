const class07Students = [];

function addStudentToClass(studentName) {
    if (studentName.length < 1) {
        console.log("Invalid name entered");
    } else if (studentName === "The Queen") {
        class07Students.push(studentName);
    } else if (class07Students.includes(studentName)) {
        console.log(`Student ${studentName} is already in the class`);
    } else if (getNumberOfStudents() > 6) {
        console.log("Cannot add more students to class 07");
    } else {
        class07Students.push(studentName);
    };
};

function getNumberOfStudents() {
    return class07Students.length;
};