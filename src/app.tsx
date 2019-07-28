import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppDataRepo from './data/appDataRepository';
import Workspace from './components/workspace';

(async () => {
  const appData = await AppDataRepo.get();

  ReactDOM.render(
    <div>
      <CssBaseline />
      <Workspace filePath={appData.lastWorkspace} />
    </div>,
    document.getElementById('app')
  );
})();
