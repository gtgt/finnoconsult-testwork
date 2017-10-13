import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';

import UIStore from '../../stores/UIStore';
import NavigationBar from '../../components/navigation/NavigationBar';

@inject('stores', 'actions') @observer
export default class NavigationBarScreen extends Component {

  onBackClick() {
    if (this.props.location.pathname.match(/\/pages/g)) {
      this.props.actions.toggleNavbar({ isVisible: !this.props.stores.ui.isNavigationBarVisible });
      return null;
    }
    // TODO: check for navigationBarBackLink in Screen => Store
    if (this.props.stores.ui.navigationBarBackLink) {
      return this.props.stores.ui.navigationBarBackLink;
    }
    return null;
  }

  render() {
    const { ui } = this.props.stores;

    return (
      <NavigationBar
        isNavigationBarVisible
        navigationBarClassName={ui.navigationBarClassName}
        navigationBarBackLink={() => this.onBackClick()}
        // isHomeLocation={this.props.location.pathname.match(/\/pages/g)s'}
        title={ui.navigationBarTitle}
      />
    );
  }
}

NavigationBarScreen.wrappedComponent.propTypes = {
  stores: PropTypes.shape({
    ui: PropTypes.instanceOf(UIStore).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    toggleNavbar: PropTypes.func.isRequired,
  }).isRequired,
};
