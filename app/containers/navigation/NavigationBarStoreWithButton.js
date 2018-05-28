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
    }).isRequired,
    stores: PropTypes.shape({
      ui: PropTypes.instanceOf(UIStore).isRequired,
    }).isRequired,
    // actions: PropTypes.shape({
    //   toggleNavbar: PropTypes.func.isRequired,
    // }).isRequired,
    /* eslint-disable */
    navigationBar: PropTypes.func,
    /* eslint-enable */
    children: oneOrManyChildElements,
  };

  onBackClick() {
    // if (this.props.location.pathname.match(/\/pages/g)) {
    //   this.props.actions.toggleNavbar({ isVisible: !this.props.stores.ui.isNavigationBarVisible });
    //   return null;
    // }
    // TODO: check for navigationBarBackLink in Screen => Store
    if (this.props.stores.ui.navigationBarBackLink) {
      return this.props.stores.ui.navigationBarBackLink;
    }
    this.props.history.goBack();
    return null;
  }

  render() {
    return (
      <NavigationBarStore
        // TODO: add image instead of text
        leftButton={() => (<Button onClick={e => this.onBackClick(e)}>Back</Button>)}
        {...this.props}
      >
        {this.props.children}
      </NavigationBarStore>
    );
  }
}
