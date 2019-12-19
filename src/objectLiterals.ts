export const person = {
  name: "John Doe",
  age: 123,
  getFirstName() {
    return name.split(" ")[0];
  }
};
