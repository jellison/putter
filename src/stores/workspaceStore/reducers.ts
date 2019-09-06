import * as actions from './actions';
import { initialState, State } from './store';

function selectWorkspace(state: State, action: ReturnType<typeof actions.selectWorkspace>): State {
  return {
    ...initialState,
    workspace: action.workspace
  };
}

function selectRequest(state: State, action: ReturnType<typeof actions.selectRequest>): State {
  return {
    ...state,
    selectedRequest: action.request
  };
}

function updateRequest(state: State, action: ReturnType<typeof actions.updateRequest>): State {
  // the updated request may NOT be the selected request; find the request and update it in place
  const requestIndex = state.workspace.requests.findIndex(r => r.id === action.request.id);

  const requests = [...state.workspace.requests];
  requests.splice(requestIndex, 1, action.request);

  return {
    ...state,
    workspace: {
      ...state.workspace,
      requests
    }
  };
}

export default function workspaceReducer(state: State = initialState, action: actions.ActionTypes): State {
  switch (action.type) {
    case 'SELECT_WORKSPACE':
      return selectWorkspace(state, action);
    case 'SELECT_REQUEST':
      return selectRequest(state, action);
    case 'UPDATE_REQUEST':
      return updateRequest(state, action);
    default:
      return state;
  }
}
