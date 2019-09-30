import * as React from 'react';
import * as styles from './body.m.scss';
import { inject, observer } from 'mobx-react';
import classnames from 'classnames';
import RequestStore from '../../../stores/requestStore';

export interface IBodyProps {
  store?: RequestStore;
}

@inject('store')
@observer
export default class BodyComponent extends React.Component<IBodyProps> {
  public render() {
    return (
      <div id={styles.main}>
        <textarea
          className={classnames(styles.editor, 'form-control')}
          value={this.props.store.request.body}
          onChange={e => (this.props.store.request.body = e.target.value)}
          onKeyDown={e => this.onBodyKeyDown(e)}
        />
      </div>
    );
  }

  private onBodyKeyDown(e: React.KeyboardEvent): void {
    if (e.keyCode === 9) {
      e.preventDefault();

      const input = e.target as HTMLTextAreaElement;

      const start = input.selectionStart;
      const end = input.selectionEnd;

      input.value = `${input.value.substr(0, start)}\t${input.value.substr(end)}`;
      input.selectionStart = input.selectionEnd = start + 1;
    }
  }
}
