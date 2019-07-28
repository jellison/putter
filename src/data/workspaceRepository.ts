import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import Request from '../models/request';
import Workspace from '../models/workspace';

const fsReadFile = promisify(fs.readFile);

export default class WorkspaceRepository {
  public static async get(filePath: string): Promise<Workspace> {
    const workspaceData = JSON.parse(await fsReadFile(filePath, 'utf8'));
    const workspacePath = path.dirname(filePath);
    const workspace = await Workspace.parse(workspaceData, workspacePath);

    const requestDir = path.join(workspacePath, 'requests');
    for (const r of workspaceData.requests) {
      const requestPath = path.join(requestDir, `${r}.json`);
      const requestData = await fsReadFile(requestPath, 'utf-8');
      workspace.requests.push(Request.parse(requestData));
    }

    return workspace;
  }
}
