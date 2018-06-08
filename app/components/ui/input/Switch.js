import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import View from '../View';

import styles from './Switch.scss';

export default class Switch extends View {
  static propTypes = {
    on: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onDisabledClick: PropTypes.func,
    enabled: PropTypes.bool,
    className: PropTypes.string,
  }

  static defaultProps = {
    enabled: true,
    className: '',
    onDisabledClick: () => {},
  };

  handleClick(e) {
    if (this.props.enabled) {
      this.props.onClick(e);
    } else {
      this.props.onDisabledClick(e);
    }
  }

  render() {
    const { on, enabled, className, children } = this.props;

    return (
      <View
        className={classnames(styles.component, className, {
          [`${styles.on}`]: on,
          [`${styles.disabled}`]: !enabled,
        })}
        onClick={(e) => {
          this.handleClick(e);
        }}
      >
        <View
          className={classnames({
            [`${styles.switchToggle}`]: true,
          })}
        >
          {children}
        </View>
      </View>
    );
  }
}
