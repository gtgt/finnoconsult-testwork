import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

import { oneOrManyChildElements } from '../../prop-types';

import { StaticNavigationBar } from '../../components/ui/layout/navigation';

@observer
export default class NavigationBarContainer extends Component {

  static propTypes = {
    navigationBar: PropTypes.func, //eslint-disable-line
    children: oneOrManyChildElements,
  };

  static defaultProps = {
    navigationBar: StaticNavigationBar,
  };

  get navigationBar() {
    return this.props.navigationBar || StaticNavigationBar;
  }

  render() {
    return (
      <this.navigationBar
        {...this.props}
      >
        {this.props.children}
      </this.navigationBar>
    );
  }
}
