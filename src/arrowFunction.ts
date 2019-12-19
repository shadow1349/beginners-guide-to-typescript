function test() {
  return "hello world";
}
console.log(test()); // hello world

const test1 = () => "hello world";
console.log(test1()); // hello world

const test2 = name => `hello ${name}`;
console.log(test2("John")); // hello John

const test3 = (firstName: string, lastName: string) =>
  `hello ${firstName} ${lastName}`;

console.log(test3("John", "Doe")); // hello John Doe
