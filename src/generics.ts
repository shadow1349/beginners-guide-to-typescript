export function test<T>(myArgument: T): T {
  return myArgument;
}

const isString = test<string>("hello");
const isNumber = test<number>(1);

console.log(isString); // ‘hello’
console.log(isNumber); // 1
