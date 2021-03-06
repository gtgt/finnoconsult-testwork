import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import platform from 'platform';
// import { Route, withRouter } from 'react-router-dom';

import { oneOrManyChildElements } from '../prop-types';

import { ResponsiveWebLayout as WebLayout } from '../components/ui/layout';
// import MobileLayout from '../components/layout/MobileLayout';

const MobileLayout = WebLayout;
const TabletLayout = WebLayout;

// @withRouter
export default class LayoutContainer extends Component {
  static propTypes = {
    defaultLayout: PropTypes.func, //eslint-disable-line
    canBeResponsive: PropTypes.bool,
    children: oneOrManyChildElements,
  }

  static defaultProps = {
    // defaultLayout: WebLayout,
    canBeResponsive: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      layout: this.calculateViewPortDimensions(props.defaultLayout),
    };
  }


  componentDidMount() {
    if (this.props.canBeResponsive) {
      window.addEventListener('resize', () => this.setState({
        layout: this.calculateViewPortDimensions(this.props.defaultLayout),
      }));
    }
  }

  viewPortDimensions = [
    width => (width<=650) && MobileLayout,
    width => (width >650 && width<=1024) && TabletLayout,
    width => (width>1024) && WebLayout,
  ];

  get isPortrait() {
    return Math.floor(window.innerWidth / window.innerHeight) === 0;
  }

  calculateViewPortDimensions(defaultLayout) {
    return this.viewPortDimensions.find(l => l(window.innerWidth, this.isPortrait))(window.innerWidth) || defaultLayout;
  }

  render() {
    return (
      <this.state.layout
        {...this.props}
      >
        {this.props.children}
      </this.state.layout>
    );
  }
}
