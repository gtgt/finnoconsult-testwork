import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';

import styles from './IconToggle.scss';

@observer
export default class IconToggle extends Component {
  static propTypes = {
    icons: PropTypes.arrayOf(PropTypes.shape({
      normal: PropTypes.string.isRequired,
      active: PropTypes.string.isRequired,
    })).isRequired,
    value: PropTypes.number,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    value: false,
    onClick: () => null,
    disabled: false,
    className: '',
  };

  // state = {
  //   listType: false,
  // }

  handleClick(index) {
    const { onClick, disabled } = this.props;
    if (disabled) return;
    onClick(index);
  }

  render() {
    const { value, disabled, className } = this.props;

    let iconLeft = null;
    let iconRight = null;

    if (value) {
      iconLeft = <img src={this.props.icons[0].normal} alt="" />;
    } else {
      iconLeft = <img src={this.props.icons[0].active} alt="" />;
    }

    if (!value) {
      iconRight = <img src={this.props.icons[1].normal} alt="" />;
    } else {
      iconRight = <img src={this.props.icons[1].active} alt="" />;
    }

    return (
      <div
        className={classnames({
          [`${styles.component}`]: true,
          [`${styles.isDisabled}`]: disabled,
          [`${className}`]: className,
        })}
        disabled={disabled}
      >
        <div className={styles.toggleContainer}>
          <button
            onClick={() => this.handleClick(0)}
            className={classnames({
              [`${styles.toggle}`]: true,
            })}
          >
            {iconLeft}
          </button>
          <button
            onClick={() => this.handleClick(1)}
            className={classnames({
              [`${styles.toggle}`]: true,
            })}
          >
            {iconRight}
          </button>
        </div>
      </div>
    );
  }
}
