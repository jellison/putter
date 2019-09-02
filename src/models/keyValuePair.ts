import { v4 as guid } from 'uuid';

export default class KeyValuePair {
  public static parse(value: string | object): Request {
    const request = new KeyValuePair();
    let raw: any;

    if (typeof value === 'string') {
      raw = JSON.parse(value);
    } else {
      raw = value;
    }

    return Object.assign(request, {
      ...raw
    });
  }

  public id: string = null;
  public key: string = null;
  public value: string = null;
  public enabled: boolean = true;

  constructor() {
    this.id = guid();
  }
}
