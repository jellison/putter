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

  public key: string = null;
  public value: string = null;
  public enabled: boolean = true;
}
