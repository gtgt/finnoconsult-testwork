import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Route, withRouter } from 'react-router-dom';

import { oneOrManyChildElements } from '../prop-types';

import View from '../components/layout/MobileLayout';

// @withRouter
export default class LayoutContainer extends Component {
  static propTypes = {
    /* eslint-disable */
    navBar: PropTypes.func,
    tabBar: PropTypes.func,
    sideMenu: PropTypes.func,
    /* eslint-enable */
    children: oneOrManyChildElements,
  }

  render() {
    return (
      <View>
        {this.props.navBar && <this.props.navBar />}
        {this.props.sideMenu && <this.props.sideMenu />}
        {this.props.children}
        {this.props.tabBar && <this.props.tabBar />}
      </View>
    );
  }
}
