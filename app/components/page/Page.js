import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import UIStore from '../../stores/UIStore';

import { oneOrManyChildElements } from '../../prop-types';
import styles from './Page.scss';

@inject('stores', 'actions') @observer
export default class Page extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: oneOrManyChildElements, //eslint-disable-line
    setScrollAnchor: PropTypes.func,
    isHomeLocation: PropTypes.bool,
  };

  componentDidMount() {
    this.toggleMenu();
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu() {
    // if () {
    this.props.actions.toggleNavbar({ isVisible: this.props.isHomeLocation });
    // }
  }

  render() {
    return (
      <div
        className={classnames({
          [`${styles.component}`]: true,
          [`${this.props.className}`]: this.props.className,
          [`${styles.isMenuVisible}`]: this.props.stores.ui.isNavigationBarVisible,
        })}
        ref={e => this.props.setScrollAnchor && this.props.setScrollAnchor(e)}
      >
        {this.props.children}
      </div>

    );
  }
}
Page.wrappedComponent.propTypes = {
  stores: PropTypes.shape({
    ui: PropTypes.instanceOf(UIStore).isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    toggleNavbar: PropTypes.func.isRequired,
  }).isRequired,
};
