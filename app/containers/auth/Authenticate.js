import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { inject, observer } from 'mobx-react';

import { oneOrManyChildElements } from '../../prop-types';
import UIStore from '../../stores/UIStore';

import Login from './Login';

@inject('stores', 'actions') @observer
export default class Authenticate extends Component {
  static propTypes = {
    children: oneOrManyChildElements,
  };

  onLoginAttempt(data) {
    this.props.actions.loginAttempt(data);
  }

  render() {
    const { userLoggedIn } = this.props.stores.ui;

    if (userLoggedIn) {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
    return (
      <Login onSubmit={data => this.onLoginAttempt(data)} />
    );
  }
}
Authenticate.wrappedComponent.propTypes = {
  // title: PropTypes.string.isRequired,
  stores: PropTypes.shape({
    ui: PropTypes.instanceOf(UIStore).isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    loginAttempt: PropTypes.func.isRequired,
  }).isRequired,
};
