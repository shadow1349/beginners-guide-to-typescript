import Database from "./database";

(() => {
  const database = new Database();

  const collection = database.createCollection<{ name: string }>("Users");

  const userDocuments = collection.getDocuments();

  collection.addDocument({ name: "John" });

  console.log(userDocuments);
})();
