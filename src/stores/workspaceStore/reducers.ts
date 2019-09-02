import Workspace from '../../models/workspace';
import Request from '../../models/request';
import { ActionTypes } from './actions';

const initialState = {
  workspace: null as Workspace,
  selectedRequest: null as Request
};

export type State = typeof initialState;

export default function workspaceReducer(
  state: State = initialState,
  action: ActionTypes
): State {
  switch (action.type) {
    case 'UPDATE_WORKSPACE':
      return {
        ...initialState,
        workspace: action.workspace
      };
    case 'UPDATE_REQUEST':
      return {
        ...state,
        selectedRequest: action.request
      };
  }
}
