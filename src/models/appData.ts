export default class AppData {
  public static parse(value: string | object): AppData {
    const collection = new AppData();
    let raw: any;

    if (typeof value === 'string') {
      raw = JSON.parse(value);
    } else {
      raw = value;
    }

    return Object.assign(collection, {
      ...raw
    });
  }

  public lastWorkspace: string;

  public toString(): string {
    return JSON.stringify(this);
  }
}
