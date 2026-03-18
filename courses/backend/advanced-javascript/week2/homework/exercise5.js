const tasks = [
  (done) =>
    setTimeout(() => {
      console.log("Task 1");
      done();
    }, 300),
  (done) =>
    setTimeout(() => {
      console.log("Task 2");
      done();
    }, 200),
  (done) =>
    setTimeout(() => {
      console.log("Task 3");
      done();
    }, 100),
];

function runSequentially(tasks, finalCallback) {

  let i = 0;

  const next = () => {
    if (i === tasks.length) {
      finalCallback();
      return;
    }

    tasks[i](next);
    i++;
  };

  next();
  
}

runSequentially(tasks, () => {
  console.log("All tasks complete!");
});
