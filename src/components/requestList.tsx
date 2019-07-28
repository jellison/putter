import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Request from '../models/request';

export interface IRequestListProps {
  requests: Request[];
  selected?: Request;
  onSelected?(request: Request): void;
}

export default class RequestListComponent extends React.Component<
  IRequestListProps
> {
  public render() {
    return (
      <List>
        {this.props.requests.map((r, i) => (
          <ListItem
            button
            key={r.id}
            selected={r.id === this.props.selected.id}
            onClick={e => this.props.onSelected(r)}
          >
            <ListItemText primary={r.name} />
          </ListItem>
        ))}
      </List>
    );
  }
}
