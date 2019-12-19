import * as myFunctions from "./myFunctions";
console.log(myFunctions.doStuff());

(() => {
  console.log("I am an anonymous function");
})();
