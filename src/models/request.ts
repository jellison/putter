import { v4 as guid } from 'uuid';
import KeyValuePair from './keyValuePair';

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
      ...raw,
      headers: raw.headers.map((h: any) => KeyValuePair.parse(h)),
      queryParams: raw.queryParams.map((q: any) => KeyValuePair.parse(q))
    });
  }

  public id: string = guid();
  public name: string = null;

  public url: string = null;
  public method: string = 'GET';
  public body: string = null;
  public headers: KeyValuePair[] = [];
  public queryParams: KeyValuePair[] = [];
}
