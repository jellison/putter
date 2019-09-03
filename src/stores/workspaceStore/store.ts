import { createStore } from 'redux';
import reducers from './reducers';
import Workspace from '../../models/workspace';
import Request from '../../models/request';

export const initialState = {
  workspace: null as Workspace,
  selectedRequest: null as Request
};

export type State = typeof initialState;

export default createStore(reducers);
