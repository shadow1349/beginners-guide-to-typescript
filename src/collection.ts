import * as uuid from "uuid/v4";
import Document from "./document";
import DatabaseFileManager from "./fileSystem";

class Collection<T> {
  private documents: Document<T>[];
  private fs = new DatabaseFileManager();

  constructor(public name: string) {
    this.documents = this.fs.readFile<T>(name).data.map(x => {
      return { id: x["id"], data: x } as Document<T>;
    });
  }

  addDocument(data: T) {
    data["id"] = uuid();

    const newDocument: Document<T> = { id: data["id"], data };
    this.documents.push(newDocument);

    this.fs.modifyFile(this.name, data);

    return newDocument;
  }

  modifyDocument(id: string, data: T) {
    const index = this.documents.findIndex(x => x.id === id);

    if (index !== -1) {
      this.documents[index].data = data;
      this.fs.modifyFile(this.name, data);
      return this.documents[index].data;
    }

    return null as null;
  }

  getDocuments() {
    return this.documents;
  }

  getDocumentById(id: string) {
    const index = this.documents.findIndex(x => x["id"] === id);

    if (index === -1) {
      return null as null;
    }

    return this.documents[index];
  }

  deleteDocument(id: string) {
    const index = this.documents.findIndex(x => x["id"] === id);

    if (index !== -1) {
      this.documents.splice(index, 1);
      this.fs.modifyFile(this.name, { id }, "delete");
    }
  }
}

export default Collection;
