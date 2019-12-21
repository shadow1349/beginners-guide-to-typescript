import * as fs from 'fs';

class DatabaseFileManager {
  private dataFolder = `${__dirname}/../../.data`;

  checkDataDirectory() {
    if (!fs.existsSync(this.dataFolder)) {
      fs.mkdirSync(this.dataFolder);
    }
  }

  getFiles() {
    return fs.readdirSync(this.dataFolder);
  }

  writeData(path: string, rawData: any) {
    fs.writeFileSync(`${this.dataFolder}/${path}`, JSON.stringify(rawData));
  }

  deleteFile(path: string) {
    fs.unlinkSync(`${this.dataFolder}/${path}`);
  }

  readFile<T>(path: string) {
    const validPath = path.includes('.json') ? path : `${path}.json`;

    const rawData = fs.readFileSync(`${this.dataFolder}/${validPath}`, { encoding: 'utf8' });

    return JSON.parse(rawData) as {
      data: T[];
    };
  }

  modifyFile(path: string, rawObject: any, operation?: 'modify' | 'delete') {
    const data = this.readFile(path);

    const index = data.data.findIndex(x => x['id'] === rawObject['id']);

    if (index !== -1) {
      if (operation === 'delete') {
        data.data.splice(index, 1);
      }
      if (operation === 'modify') {
        data.data[index] = rawObject;
      }
    } else {
      data.data.push(rawObject);
    }

    this.writeData(path, data);
    return true;
  }
}

export default DatabaseFileManager;
