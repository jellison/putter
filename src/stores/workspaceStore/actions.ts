import Workspace from '../../models/workspace';
import Request from '../../models/request';

export function selectWorkspace(workspace: Workspace) {
  return {
    type: 'SELECT_WORKSPACE',
    workspace
  } as const;
}

export function selectRequest(request: Request) {
  return {
    type: 'SELECT_REQUEST',
    request
  } as const;
}

export function updateRequest(request: Request) {
  return {
    type: 'UPDATE_REQUEST',
    request
  } as const;
}

export type ActionTypes = ReturnType<typeof selectWorkspace | typeof selectRequest | typeof updateRequest>;
