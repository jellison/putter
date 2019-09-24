import { observable, computed } from 'mobx';
import Workspace from '../models/workspace';

class WorkspaceStore {
  @observable public workspace: Workspace;

  @computed get requests() {
    return this.workspace.requests;
  }
}

export default new WorkspaceStore();
