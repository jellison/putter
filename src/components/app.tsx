import * as React from 'react';

import AppDataRepo from '../data/appDataRepository';
import Workspace from '../models/workspace';
import WorkspaceComponent from './workspace/workspace';

import * as styles from './app.m.scss';
import WorkspaceRepo from '../data/workspaceRepository';
import WorkspaceEmpty from './workspace/workspace-empty';

export interface IAppState {
  workspace?: Workspace
}

export default class AppComponent extends React.Component<{}, IAppState> {
  constructor(props = {}){
    super(props);
    this.state = {};
  }

  public async componentDidMount(): Promise<void> {
    // todo: display loader while we're waiting
    const appData = await AppDataRepo.get();

    if(appData.lastWorkspace) {
      this.open(appData.lastWorkspace);
    }
  }

  public async onWorkspaceSelected(filePath: string): Promise<void> {
    await this.open(filePath);
  }

  public render() {
    if(this.state.workspace) {
      return (
        <div className={styles.app}>
          <WorkspaceComponent workspace={this.state.workspace} />
        </div>
      );
    } else {
      return (
        <div className={styles.app}>
          <WorkspaceEmpty onWorkspaceSelected={f => this.onWorkspaceSelected(f)} />
        </div>
      );
    }

  }

  private async open(filePath: string): Promise<void> {
    await WorkspaceRepo.get(filePath).then(ws => {
      this.setState({ workspace: ws });
    });
  }
}