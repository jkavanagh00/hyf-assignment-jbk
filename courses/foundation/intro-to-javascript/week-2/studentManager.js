const class07Students = [];

const addStudentToClass = studentName => class07Students.push(studentName);

const  getNumberOfStudents = () => class07Students.length;

console.log(getNumberOfStudents());
addStudentToClass("Jenny");
console.log(getNumberOfStudents());
addStudentToClass("Jerry");
console.log(getNumberOfStudents());