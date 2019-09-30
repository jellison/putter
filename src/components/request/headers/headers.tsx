import * as React from 'react';
import * as styles from './headers.m.scss';
import * as _ from 'lodash';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import KeyValuePair from '../../../models/keyValuePair';
import RequestStore from '../../../stores/requestStore';

enum RefType {
  Key,
  Value
}

export interface IHeadersProps {
  store?: RequestStore;
}

@inject('store')
@observer
export default class HeadersComponent extends React.Component<IHeadersProps> {
  private addPending?: RefType;
  private nodes: Array<{
    type: RefType;
    id: string;
    ref: React.RefObject<HTMLInputElement>;
  }> = [];

  public componentDidUpdate(prevProps: Readonly<IHeadersProps>): void {
    const headerAdded = prevProps.store.request.headers.length < this.props.store.request.headers.length;

    if (this.addPending != null && headerAdded) {
      this.findLastNode(this.addPending).focus();
      this.addPending = null;
    }
  }

  public render() {
    return (
      <div id={styles.main}>
        {this.props.store.request.headers.map((h, i) => (
          <div className={styles.entry} key={i}>
            <div className={styles.field}>
              <input
                type="text"
                className="form-control"
                placeholder="Header"
                value={h.key}
                onChange={e => (h.key = e.target.value)}
                ref={this.getRef(RefType.Key, h.id)}
              />
            </div>
            <div className={styles.field}>
              <input
                type="text"
                className="form-control"
                placeholder="Value"
                value={h.value}
                onChange={e => (h.value = e.target.value)}
                ref={this.getRef(RefType.Value, h.id)}
              />
            </div>
            <div className={styles.controls}>
              <div className={styles.control}>
                <a onClick={() => (h.enabled = !h.enabled)}>
                  <FontAwesomeIcon icon={h.enabled === true ? faCheckSquare : faSquare} />
                </a>
              </div>
              <div className={styles.control}>
                <a onClick={() => _.pull(this.props.store.request.headers, h)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </a>
              </div>
            </div>
          </div>
        ))}

        <div className={styles.entry}>
          <div className={styles.field}>
            <input
              type="text"
              className="form-control"
              placeholder="New Header"
              readOnly={true}
              onFocus={e => this.onNewKeyFocus(e)}
            />
          </div>
          <div className={styles.field}>
            <input
              type="text"
              className="form-control"
              placeholder="New Value"
              readOnly={true}
              onFocus={e => this.onNewValueFocus(e)}
            />
          </div>
          <div className={styles.controls} />
        </div>
      </div>
    );
  }

  private onNewKeyFocus(event: React.SyntheticEvent): void {
    event.preventDefault();
    this.addPending = RefType.Key;
  }

  private onNewValueFocus(event: React.SyntheticEvent): void {
    event.preventDefault();
    this.addPending = RefType.Value;
    this.props.store.request.headers.push(new KeyValuePair());
  }

  private findLastNode(type: RefType): HTMLInputElement {
    const typed = this.nodes.filter(n => n.type === type);

    return typed[typed.length - 1].ref.current;
  }

  private getRef(type: RefType, id: string): React.Ref<HTMLInputElement> {
    const ref = React.createRef<HTMLInputElement>();

    this.nodes.push({ type, id, ref });

    return ref;
  }
}
