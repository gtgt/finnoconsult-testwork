import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import { oneOrManyChildElements } from '../../prop-types';

import UIStore from '../../stores/UIStore';
import NavigationBarStore from './NavigationBarStore';
import Button from '../../components/ui/Button';

@withRouter
@inject('stores', 'actions') @observer
export default class NavigationBarStoreWithButton extends Component {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      goForward: PropTypes.func.isRequired,
    }).isRequired,
    stores: PropTypes.shape({
      ui: PropTypes.instanceOf(UIStore).isRequired,
    }).isRequired,
    // actions: PropTypes.shape({
    //   toggleNavbar: PropTypes.func.isRequired,
    // }).isRequired,
    navigationBar: PropTypes.func, //eslint-disable-line
    leftButton: PropTypes.func,
    rightButton: PropTypes.func,
    children: oneOrManyChildElements,
  };

  onLeftClick() {
    // if (this.props.location.pathname.match(/\/pages/g)) {
    //   this.props.actions.toggleNavbar({ isVisible: !this.props.stores.ui.isNavigationBarVisible });
    //   return null;
    // }
    if (this.props.stores.ui.navigationBarLeftLink) {
      return this.props.stores.ui.navigationBarLeftLink();
    }
    this.props.history.goBack();
    return null;
  }
  onRightClick() {
    if (this.props.stores.ui.navigationBarRightLink) {
      // return
      this.props.stores.ui.navigationBarRightLink();
    }
    this.props.history.goForward();
    // return null;
  }

  get leftButton() {
    // TODO: add image instead of text &lt;
    return () => this.props.leftButton || <Button onClick={e => this.onLeftClick(e)}>&lt;</Button>;
  }

  get rightButton() {
    // TODO: add image instead of text &lt;
    return () => this.props.rightButton || <Button onClick={e => this.onRightClick(e)}>&gt;</Button>;
  }

  render() {
    return (
      <NavigationBarStore
        leftButton={this.leftButton}
        rightButton={this.rightButton}
        {...this.props}
      >
        {this.props.children}
      </NavigationBarStore>
    );
  }
}
