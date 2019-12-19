function timesTwoCallback(num, callback) {
  callback(num * 2);
}
function doSomething(num) {
  return new Promise((resolve, reject) => {
    console.log("Inside the promise function");

    timesTwoCallback(num, res => {
      if (res < 1) {
        reject("Oops there was an invalid number");
      } else {
        resolve(num);
      }
    });
  });
}

doSomething(1)
  .then(response => {
    console.log("Promise Done!");
  })
  .catch(e => {
    console.log("ERROR: ", e);
  });

console.log("Program Done!");
