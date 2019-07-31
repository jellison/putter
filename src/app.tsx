import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';

import * as styles from './app.m.scss';

import AppDataRepo from './data/appDataRepository';
import Workspace from './components/workspace/workspace';

// tslint:disable-next-line:no-var-requires
require('./styles/main.scss');

(async () => {
  // todo: display loader while we're waiting
  const appData = await AppDataRepo.get();

  ReactDOM.render(
    <div className={styles.app}>
      <CssBaseline />
      <Workspace filePath={appData.lastWorkspace} />
    </div>,
    document.getElementById('root')
  );
})();
