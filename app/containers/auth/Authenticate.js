import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { inject, observer } from 'mobx-react';

import { oneOrManyChildElements } from '../../prop-types';
import UIStore from '../../stores/UIStore';

import Login from './Login';

@inject('stores') @observer
export default class Authenticate extends Component {
  static propTypes = {
    children: oneOrManyChildElements,
  };

  constructor(props) {
    super(props);
    this.state = {
      userLoggedIn: props.stores.ui.userLoggedIn,
    };
  }

  onLoginAttempt(data) {
    if (data.password === this.props.stores.ui.userPassword) {
      this.setState({ userLoggedIn: true });
    }
  }

  render() {
    const { userLoggedIn } = this.state;

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
};
