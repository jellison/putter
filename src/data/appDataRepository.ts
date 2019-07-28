import { remote } from 'electron';
import { exists, readFile } from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { AppData } from '../models/appData';

const fsExists = promisify(exists);
const fsReadFile = promisify(readFile);
const { app } = remote;

export default class AppDataRepository {
  public static async get(): Promise<AppData> {
    const appDataPath = path.join(app.getPath('userData'), 'data.json');
    let appData = new AppData();

    if (await fsExists(appDataPath)) {
      appData = AppData.parse(await fsReadFile(appDataPath, 'utf-8'));
    }

    return appData;
  }
}
