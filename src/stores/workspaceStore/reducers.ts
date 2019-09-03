import * as actions from './actions';
import { initialState, State } from './store';

function setWorkspace(state: State, action: ReturnType<typeof actions.setWorkspace>): State {
  return {
    ...initialState,
    workspace: action.workspace
  };
}

function updateRequest(state: State, action: ReturnType<typeof actions.updateRequest>): State {
  return {
    ...state,
    selectedRequest: action.request
  };
}

export default function workspaceReducer(state: State = initialState, action: actions.ActionTypes): State {
  switch (action.type) {
    case 'SET_WORKSPACE':
      return setWorkspace(state, action);
    case 'UPDATE_REQUEST':
      return updateRequest(state, action);
    default:
      return state;
  }
}
