import * as path from 'path';
import { readFile } from 'fs';
import { promisify } from 'util';
import Request from './request';

const fsReadFile = promisify(readFile);

export default class Workspace {
  public static async parse(
    value: string | object,
    filePath: string
  ): Promise<Workspace> {
    const workspace = new Workspace(filePath);
    let raw: any;

    if (typeof value === 'string') {
      raw = JSON.parse(value);
    } else {
      raw = value;
    }

    workspace.title = raw.title;

    return workspace;
  }

  public path: string;
  public title: string = 'Workspace';
  public requests: Request[] = [];

  constructor(filePath: string) {
    this.path = filePath;
  }

  public toString(): string {
    return JSON.stringify({
      title: this.title,
      requests: this.requests.map(r => r.id)
    });
  }
}
