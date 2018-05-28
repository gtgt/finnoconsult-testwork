// Common imports
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { oneOrManyChildElements } from '../../prop-types';
// Style imports
import styles from './Button.scss';

export default class Button extends React.Component {
  static propTypes = {
    children: oneOrManyChildElements,
    link: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    title: '[ button ]',
    link: '/',
    disabled: false,
  };

  render() {
    if (this.props.onClick) {
      return (
        <button
          className={styles.button}
          disabled={this.props.disabled}
          onClick={() => {
            this.props.onClick();
          }}
        >
          {this.props.children}
        </button>
      );
    }

    return (
      <Link className={styles.button} to={this.props.link} disabled={this.props.disabled}>
        {this.props.children}
      </Link>
    );
  }
}
