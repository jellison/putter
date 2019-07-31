import * as React from 'react';
import { remote } from 'electron';

import { Button } from '@material-ui/core';

import * as styles from './workspace-empty.m.scss';

const { dialog } = remote;

export interface IWorkspaceEmptyProps {
  onWorkspaceSelected(filePath: string): void;
}

export default class WorkspaceEmpty extends React.Component<
  IWorkspaceEmptyProps
> {
  public onOpenWorkspace() {
    dialog.showOpenDialog(
      {
        title: 'Open Putter Workspace File',
        filters: [
          {
            name: 'Putter Collection',
            extensions: ['workspace']
          },
          {
            name: 'All Files',
            extensions: ['*']
          }
        ],
        properties: ['openFile']
      },
      filePaths => {
        if (filePaths !== undefined) {
          this.props.onWorkspaceSelected(filePaths[0]);
        }
      }
    );
  }

  public render() {
    return (
      <div className={styles.workspaceEmpty}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.onOpenWorkspace()}
        >
          Open Workspace
        </Button>
      </div>
    );
  }
}
