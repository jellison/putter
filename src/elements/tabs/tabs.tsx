import * as React from 'react';
import * as styles from './tabs.m.scss';
import classnames from 'classnames';
import { ITabProps } from './tab';

export interface ITabsProps {
  children: Array<React.ReactElement<ITabProps>>;
}

interface ITabsState {
  selectedTabIndex: number;
}

export default class Tabs extends React.Component<ITabsProps, ITabsState> {
  constructor(props: ITabsProps) {
    super(props);

    if (this.props.children.length > 0) {
      this.state = {
        selectedTabIndex: 0
      };
    }
  }

  public onTabClick(index: number) {
    this.setState({
      selectedTabIndex: index
    });
  }

  public render() {
    if (this.props.children.length === 0) return null;

    return (
      <div id={styles.main}>
        <ul className={classnames(styles.tabs, 'nav nav-tabs')}>
          {this.props.children.map((t, i) => (
            <li key={i} className={classnames(styles.tab, 'nav-item')}>
              <a
                className={classnames({
                  [styles.active]: i === this.state.selectedTabIndex
                })}
                onClick={() => this.onTabClick(i)}
              >
                {t.props.name}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.tabContent}>
          {this.props.children[this.state.selectedTabIndex].props.children}
        </div>
      </div>
    );
  }
}
