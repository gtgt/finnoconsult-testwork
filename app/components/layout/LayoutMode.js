import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { oneOrManyChildElements } from '../../prop-types';

// TODO: LAyoutMode.scss !

export default class LayoutMode extends Component {
  static propTypes = {
    children: oneOrManyChildElements.isRequired,
    // onGoingPortrait: PropTypes.func,
    // onGoingLandscape: PropTypes.func,
    portrait: PropTypes.bool,
    landscape: PropTypes.bool,
  }

  static defaultProps = {
    landscape: true,
  }

  state = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    isPortrait: Math.floor(window.innerWidth / window.innerHeight) === 0, // TODO: determine from props if portrait or landscape
  }

  componentDidMount() {
    window.addEventListener('resize', () => this._checkLayoutMode());
  }

  _checkLayoutMode() {
    // TODO: onGoingPortrait, onGoingLandscape
    // if (this.props.action && window.innerWidth !== this.state.windowWidth && window.innerHeight !== this.state.windowHeight) {
      // !this.state.portrait
      // this.props.action();
      // console.log('Warning! layout had changed or device were rotated!', this.state, window.innerWidth);
      // document.location.href='/'; // TODO: get url as props
    // }
  }

  render() {
    return (
      <div
        className={classnames({
          portrait: this.props.portrait,
          landscape: this.props.landscape,
        })}
      >
        {this.props.children}
      </div>
    );
  }
}
