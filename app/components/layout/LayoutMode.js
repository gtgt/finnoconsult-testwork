import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { oneOrManyChildElements } from '../../prop-types';

export default class LayoutMode extends Component {
  static propTypes = {
    children: oneOrManyChildElements.isRequired,
    action: PropTypes.func,
  }

  state = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    portrait: Math.floor(window.innerWidth / window.innerHeight) === 0, // TODO: determine from props if portrait or landscape
  }

  componentDidMount() {
    window.addEventListener('resize', () => this._checkLayoutMode());
  }

  _checkLayoutMode() {
    if (this.props.action && window.innerWidth !== this.state.windowWidth && window.innerHeight !== this.state.windowHeight) {
      // !this.state.portrait
      this.props.action();
      // console.log('Warning! layout had changed or device were rotated!', this.state, window.innerWidth);
      // document.location.href='/'; // TODO: get url as props
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
