/** @jsx jsx */
import * as React from 'react';
import { css, jsx } from '@emotion/core';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import RequestComponent from './request';
import RequestList from './requestList';
import Workspace from '../models/workspace';
import WorkspaceRepo from '../data/workspaceRepository';
import Request from '../models/request';

const drawerWidth = '250px';

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
      <div
        css={css`
          display: flex;
        `}
      >
        <Drawer
          css={css`
            width: ${drawerWidth};
            flex-shrink: 0;

            & > div {
              width: ${drawerWidth};
            }
          `}
          variant="permanent"
          anchor="left"
        >
          <div />
          <Divider />
          <RequestList
            requests={this.state.workspace.requests}
            onSelected={e => this.onRequestSelected(e)}
            selected={this.state.selectedRequest}
          />
        </Drawer>
        <main
          css={css`
            width: 100%;
          `}
        >
          <RequestComponent
            css={css`
              flex-grow: 1;
            `}
            request={this.state.selectedRequest}
          />
        </main>
      </div>
    );
  }
}
