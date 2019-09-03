import Workspace from '../../models/workspace';
import Request from '../../models/request';
import { ActionTypes } from './actions';
import { initialState, State } from './store';

export default function workspaceReducer(state: State = initialState, action: ActionTypes): State {
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
    default:
      return state;
  }
}
