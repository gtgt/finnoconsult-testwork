import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import { oneOrManyChildElements } from '../../../prop-types';

import { View } from '../';

import styles from './ButtonGroup.scss';

@observer
export default class ButtonGroup extends View {
  static propTypes = {
    titles: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.number,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    children: oneOrManyChildElements,
  };

  static defaultProps = {
    value: false,
    onClick: () => null,
    disabled: false,
    className: '',
  };

  handleClick(index) {
    const { onClick, disabled } = this.props;

    if (disabled) return;

    onClick(index);
  }

  render() {
    const { value, disabled, className, titles, children } = this.props;
    return (
      <View
        className={classnames({
          [`${styles.component}`]: true,
          [`${styles.isDisabled}`]: disabled,
          [`${className}`]: className,
        })}
        disabled={disabled}
      >
        {children && (
          <View className={styles.toggleContainer}>
            {children}
          </View>
        )}

        {!children && (
          <View className={styles.toggleContainer}>
            {titles.map((title, index) => (
              <button
                key={index}
                onClick={() => this.handleClick(index)}
                className={classnames({
                  [`${styles.toggle}`]: true,
                  [`${styles.isActive}`]: index === value,
                })}
              >
                {title}
              </button>
            ))}
          </View>
        )}
      </View>
    );
  }
}
