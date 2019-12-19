const person = {
  name: "John Doe",
  age: 123,
  getFirstName() {
    return this.name.split(" ")[0];
  }
};
