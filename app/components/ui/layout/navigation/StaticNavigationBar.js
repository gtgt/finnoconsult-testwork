import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
// import Swipeable from 'react-swipeable';

import { oneOrManyChildElements } from '../../../../prop-types';

import styles from './StaticNavigationBar.scss';

@observer
export default class StaticNavigationBar extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.shape(),
    children: oneOrManyChildElements.isRequired,
    title: PropTypes.string,
    // BUGFIX: isVisible is undefined always
    // isVisible: PropTypes.bool,
  }

  render() {
    // if (!this.props.isVisible) return null;

    return (
      // <Swipeable
      //   onSwipingRight={() => this.onBackClick()}
      //   className={`${styles.component} ${this.props.navigationBarClassName}`}
      //   // style={{ width: '100%', height: '100%' }}
      // >
      <div
        className={`${this.props.className} l-container l-container--horizontal l-container-grow`}
        style={this.props.style || {}}
      >
        {this.props.title && <h1 className={styles.title}>{this.props.title}</h1>}
        {this.props.children}
      </div>
      // </Swipeable>
    );
  }
}
