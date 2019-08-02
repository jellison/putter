import { remote } from 'electron';
import { exists, readFile, writeFile } from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { AppData } from '../models/appData';

const fsExists = promisify(exists);
const fsReadFile = promisify(readFile);
const fsWriteFile = promisify(writeFile);
const { app } = remote;

export default class AppDataRepository {
  public static async get(): Promise<AppData> {
    const appDataPath = this.getAppDataPath();
    let appData = new AppData();

    if (await fsExists(appDataPath)) {
      appData = AppData.parse(await fsReadFile(appDataPath, 'utf8'));
    }

    return appData;
  }

  public static async save(appData: AppData): Promise<void> {
    const appDataPath =  this.getAppDataPath();
    await fsWriteFile(appDataPath, appData.toString(), 'utf8');
  }

  private static getAppDataPath(): string {
    return path.join(app.getPath('userData'), 'data.json');
  }
}
