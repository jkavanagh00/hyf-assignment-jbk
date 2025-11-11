const class07Students = [];

function addStudentToClass (studentName) {
    return studentName.length < 1 ?
    "Invalid name entered" :

    studentName === "The Queen" ?
    class07Students.push(studentName) :

    getNumberOfStudents() < 7 && !class07Students.includes(studentName) ? 
    class07Students.push(studentName) :

    getNumberOfStudents() > 6 ? 
    "Cannot add more students to class 07" :

    class07Students.includes(studentName) ?
    `Student ${studentName} is already in the class` :

    "Invalid name entered";
};

const  getNumberOfStudents = () => class07Students.length;