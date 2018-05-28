import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';

import { oneOrManyChildElements } from '../../prop-types';

import UIStore from '../../stores/UIStore';
import MobileNavigationBar from '../../components/navigation/MobileNavigationBar';

@inject('stores', 'actions') @observer
export default class NavigationBarStore extends Component {
  static propTypes = {
    stores: PropTypes.shape({
      ui: PropTypes.instanceOf(UIStore).isRequired,
    }).isRequired,
    /* eslint-disable */
    navigationBar: PropTypes.func,
    /* eslint-enable */
    children: oneOrManyChildElements,
  };

  static defaultProps = {
    navigationBar: MobileNavigationBar,
  };

  get navigationBar() {
    return this.props.navigationBar || MobileNavigationBar;
  }

  render() {
    const { ui } = this.props.stores;

    return (
      <this.navigationBar
        isVisible={ui.isNavigationBarVisible}
        className={ui.navigationBarClassName}
        title={ui.navigationBarTitle}
        {...this.props}
      >
        {this.props.children}
      </this.navigationBar>
    );
  }
}
