import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import Request from '../../models/request';
import RequestComponent from '../request/request';
import RequestList from '../request/request-list';
import Workspace from '../../models/workspace';
import WorkspaceEmpty from './workspace-empty';
import WorkspaceRepo from '../../data/workspaceRepository';

import * as styles from './workspace.m.scss';
import { file } from '@babel/types';

export interface IWorkspaceProps {
  filePath: string;
}

export interface IWorkspaceState {
  workspace?: Workspace;
  selectedRequest?: Request;
}

export default class WorkspaceComponent extends React.Component<
  IWorkspaceProps,
  IWorkspaceState
> {
  constructor(props: IWorkspaceProps) {
    super(props);

    this.state = {};

    if (this.props.filePath) this.open(this.props.filePath);
  }

  public onRequestSelected(request: Request): void {
    this.setState({ selectedRequest: request });
  }

  public onWorkspaceSelected(filePath: string): void {
    this.open(filePath);
  }

  public render() {
    if (this.state.workspace) {
      return (
        <div className={styles.workspace}>
          <Drawer className={styles.drawer} variant="permanent" anchor="left">
            <div />
            <Divider />
            <RequestList
              requests={this.state.workspace.requests}
              onSelected={e => this.onRequestSelected(e)}
              selected={this.state.selectedRequest}
            />
          </Drawer>
          <div className={styles.request}>
            <RequestComponent request={this.state.selectedRequest} />
          </div>
        </div>
      );
    } else {
      return (
        <WorkspaceEmpty
          onWorkspaceSelected={f => this.onWorkspaceSelected(f)}
        />
      );
    }
  }

  private async open(filePath: string): Promise<void> {
    await WorkspaceRepo.get(filePath).then(ws => {
      this.setState({ workspace: ws, selectedRequest: ws.requests[0] });
    });
  }
}
