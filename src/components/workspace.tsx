/** @jsx jsx */
import * as React from 'react';
import { css, jsx } from '@emotion/core';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import RequestComponent from './request';
import RequestList from './request-list';
import Workspace from '../models/workspace';
import WorkspaceRepo from '../data/workspaceRepository';
import Request from '../models/request';

import * as styles from './workspace.m.scss';

export interface IWorkspaceProps {
  filePath: string;
}

export interface IWorkspaceState {
  workspace: Workspace;
  selectedRequest?: Request;
}

export default class WorkspaceComponent extends React.Component<
  IWorkspaceProps,
  IWorkspaceState
> {
  constructor(props: IWorkspaceProps) {
    super(props);
    this.state = {
      workspace: new Workspace(null)
    };

    WorkspaceRepo.get(props.filePath).then(ws => {
      this.setState({ workspace: ws, selectedRequest: ws.requests[0] });
    });
  }

  public onRequestSelected(request: Request): void {
    this.setState({ selectedRequest: request });
  }

  public render() {
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
  }
}
