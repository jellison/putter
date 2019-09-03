import Workspace from '../../models/workspace';
import Request from '../../models/request';

export function setWorkspace(workspace: Workspace) {
  return {
    type: 'UPDATE_WORKSPACE',
    workspace
  } as const;
}

export function updateRequest(request: Request) {
  return {
    type: 'UPDATE_REQUEST',
    request
  } as const;
}

export type ActionTypes = ReturnType<typeof setWorkspace | typeof updateRequest>;
