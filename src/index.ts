import Database from "./database";

(() => {
  const database = new Database();

  const collection = database.createCollection("Users");

  collection.addDocument({ name: "John" });
})();
