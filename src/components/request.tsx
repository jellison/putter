import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Request from '../models/request';

export interface IRequestComponentProps {
  request?: Request;
}

export default class RequestComponent extends React.Component<
  IRequestComponentProps
> {
  public render() {
    if (this.props.request) {
      return (
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" noWrap>
                {this.props.request.name}
              </Typography>
            </Toolbar>
          </AppBar>
          <div>{this.props.request.body}</div>
        </div>
      );
    }

    return <div></div>;
  }
}
