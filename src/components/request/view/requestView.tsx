import * as React from 'react';
import Request from '../../../models/request';

export interface IRequestComponentProps {
  request?: Request;
}

export default class RequestView extends React.Component<
  IRequestComponentProps
> {
  public render() {
    if (this.props.request) {
      return (
        <div>
          <nav className="navbar navbar-dark bg-primary">
            <div className="navbar-brand">{this.props.request.name}</div>
          </nav>
          <div className="container">
            <div className="row">
              <div className="col-md-12">{this.props.request.body}</div>
            </div>
          </div>
        </div>
      );
    }

    return <div></div>;
  }
}
