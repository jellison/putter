import { v4 as guid } from 'uuid';

export default class Request {
  public static parse(value: string | object): Request {
    const request = new Request();
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

  public id: string = guid();
  public name: string = null;
  public body: string = null;
}
