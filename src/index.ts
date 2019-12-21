import * as uuid from "uuid/v4";

const datastore = [];

type idType = { id?: string };

function addItem<T extends idType>(item: T) {
  item.id = uuid();
  datastore.push(item);
  return item;
}

function getItem<T>(id: string): T {
  const index = datastore.findIndex(x => x.id === id);

  if (index === -1) {
    return null;
  }

  return datastore[index];
}

function updateItem<T>(item: Partial<T>, id: string): T {
  const index = datastore.findIndex(x => x.id === id);

  if (index === -1) {
    return null;
  }

  const keys = Object.keys(item);

  if (keys.length === 0) {
    return null;
  }

  const existingItem = datastore[index];

  for (const key of keys) {
    existingItem[key] = item[key];
  }

  return existingItem;
}

function deleteItem(id: string) {
  const index = datastore.findIndex(x => x.id === id);

  if (index === -1) {
    return null;
  }

  datastore.splice(index, 1);

  return id;
}

(() => {
  const newItem = addItem<{ id?: string; name: string }>({ name: "John" });

  console.log("Added new item: ", newItem);

  const existingItem = getItem<{ id: string; name: string }>(newItem.id);

  console.log("Retrieved existing item: ", existingItem);

  const updatedItem = updateItem<{ id: string; name: string }>(
    {
      name: "Jack"
    },
    existingItem.id
  );

  console.log("Updated existing item: ", updatedItem);

  deleteItem(updatedItem.id);

  console.log(datastore);
})();
