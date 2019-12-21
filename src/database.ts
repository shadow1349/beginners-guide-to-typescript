import Collection from "./collection";
import DatabaseFileManager from "./fileSystem";

class Database {
  private fs = new DatabaseFileManager();
  private collections: Collection<any>[];

  constructor() {
    this.fs.checkDataDirectory();

    this.collections = this.fs
      .getFiles()
      .map(fileName => new Collection(this.normalizeName(fileName)));
  }

  private normalizeName(name: string) {
    return name.trim().toLowerCase();
  }

  getCollection<T>(name: string): Collection<T> {
    const index = this.collections.findIndex(
      x => this.normalizeName(x.name) === this.normalizeName(`${name}.json`)
    );

    if (index === -1) {
      return null as null;
    }

    return this.collections[index];
  }

  getCollections<T>(): Collection<T>[] {
    return this.collections;
  }

  createCollection<T>(name: string): Collection<T> {
    try {
      const exists = this.getCollection(name);

      if (exists) {
        return this.getCollection(name);
      }

      const collectionName = this.normalizeName(name);

      this.fs.writeData(`${collectionName}.json`, { data: [] });

      const newCollection = new Collection<T>(collectionName);

      this.collections.push(newCollection);

      return newCollection;
    } catch (e) {
      console.error(e);
      return null as null;
    }
  }

  deleteCollection(name: string) {
    try {
      const index = this.collections.findIndex(
        x => this.normalizeName(x.name) === this.normalizeName(name)
      );

      if (index !== -1) {
        this.collections.splice(index, 1);
        this.fs.deleteFile(`${name}.json`);
        return true;
      }

      console.warn(
        `Cannot delete collection ${name} because it does not exist`
      );
      return false;
    } catch (e) {
      console.error(e);
      return null as null;
    }
  }
}

export default Database;
