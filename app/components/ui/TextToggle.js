// Common imports
import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';

// Framework imports
import View from './View';

// Style imports
import styles from './TextToggle.scss';

// import arrowDownIcon from '../../../images/static/arrow_down.png';

@observer
export default class TextToggle extends View {
  static propTypes = {
    titles: PropTypes.arrayOf(PropTypes.string).isRequired,
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

  handleClick(index) {
    const { onClick, disabled } = this.props;

    if (disabled) return;

    onClick(index);
  }

  render() {
    const { value, disabled, className, titles } = this.props;
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
          {titles.map((title, index) => (
            <button
              key={index}
              onClick={() => this.handleClick(index)}
              className={classnames({
                [`${styles.toggle}`]: true,
                [`${styles.hidden}`]: index === value,
              })}
            >
              {title}
              {/* <img src={arrowDownIcon} alt="" /> */}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
