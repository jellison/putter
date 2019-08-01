import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import AppComponent from './components/app';

// tslint:disable-next-line:no-var-requires
require('./styles/main.scss');

ReactDOM.render(
  <div>
    <CssBaseline />
    <AppComponent />
  </div>,
  document.getElementById('root')
);
