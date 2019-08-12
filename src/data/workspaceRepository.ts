import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import Request from '../models/request';
import Workspace from '../models/workspace';

const fsExists = promisify(fs.exists);
const fsMkDir = promisify(fs.mkdir);
const fsReadFile = promisify(fs.readFile);
const fsWriteFile = promisify(fs.writeFile);

export default class WorkspaceRepository {
  public static async get(filePath: string): Promise<Workspace> {
    const workspaceData = JSON.parse(await fsReadFile(filePath, 'utf8'));
    const workspacePath = path.dirname(filePath);
    const workspace = await Workspace.parse(workspaceData, workspacePath);

    const requestDir = path.join(workspacePath, 'requests');
    for (const r of workspaceData.requests) {
      const requestPath = path.join(requestDir, `${r}.json`);
      const requestData = await fsReadFile(requestPath, 'utf8');
      workspace.requests.push(Request.parse(requestData));
    }

    return workspace;
  }

  public static async initialize(filePath: string): Promise<void> {
    const workspacePath = path.dirname(filePath);
    const workspaceData = new Workspace(filePath).toString();

    if (!(await fsExists(workspacePath))) {
      await fsMkDir(workspacePath);
    }

    await fsWriteFile(filePath, workspaceData, {
      encoding: 'utf-8',
      flag: 'w'
    });
  }
}
