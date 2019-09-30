import { observable } from 'mobx';
import Request from '../models/request';
import KeyValuePair from '../models/keyValuePair';
import { Key } from 'react';

export default class RequestStore {
  @observable public requests: Request[];
  @observable public request: Request;
}
