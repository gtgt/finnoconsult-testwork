import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import classnames from 'classnames';
// import platform from 'platform';
import { withRouter } from 'react-router-dom';

import UIStore from '../stores/UIStore';
import { oneOrManyChildElements } from '../prop-types';

import { ResponsiveWebLayout as WebLayout } from '../components/ui/layout';
// import MobileLayout from '../components/layout/MobileLayout';

const MobileLayout = WebLayout;
const TabletLayout = WebLayout;

// NOTE: withRouter is a must with @observer decorator:
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
@withRouter
@inject('stores', 'actions') @observer
export default class LayoutContainer extends Component {
  static propTypes = {
    defaultLayout: PropTypes.func, //eslint-disable-line
    canBeResponsive: PropTypes.bool,
    className: PropTypes.string,
    children: oneOrManyChildElements,
    stores: PropTypes.shape({
      ui: PropTypes.instanceOf(UIStore).isRequired,
    }),
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
        className={classnames({
          [`${this.props.className}`]: this.props.className,
          [`${this.props.stores.ui.layoutClassName}`]: this.props.stores.ui.layoutClassName,
        })}
      >
        {this.props.children}
      </this.state.layout>
    );
  }
}
