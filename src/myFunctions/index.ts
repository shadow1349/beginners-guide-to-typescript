export * from './myfunctions';


import * as myFunctions from "./myfunctions";
import { subtract } from "./myfunctions";

const subtracted = subtract(2, 1);
const newNumber = myFunctions.add(1, 2);
const greeting = myFunctions.sayHello("Sam");
