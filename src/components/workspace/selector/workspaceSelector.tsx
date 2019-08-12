import * as React from 'react';
import * as styles from './workspaceSelector.m.scss';
import { remote } from 'electron';
import { Button } from '@material-ui/core';
import WorkspaceRepository from '../../../data/workspaceRepository';

const { dialog } = remote;

export interface IWorkspaceEmptyProps {
  onWorkspaceSelected(filePath: string): void;
}

export default class WorkspaceSelector extends React.Component<
  IWorkspaceEmptyProps
> {
  public onCreateWorkSpace() {
    dialog.showSaveDialog({}, async fileName => {
      await WorkspaceRepository.initialize(fileName);
      this.props.onWorkspaceSelected(fileName);
    });
  }

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
      <div className={styles.main}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.onCreateWorkSpace()}
        >
          New Workspace
        </Button>
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
