// Common imports
import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';

// Framework imports
import { View, Image } from '../';

// Style imports
import styles from './Stepper.scss';

@observer
export default class TextToggle extends View {
  static propTypes = {
    // initValue: PropTypes.number.isRequired,
    // stepValue: PropTypes.number.isRequired,
    // minValue: PropTypes.number,
    // maxValue: PropTypes.number,
    onChangeDecrement: PropTypes.func.isRequired,
    onChangeIncrement: PropTypes.func.isRequired,
    decrementImage: PropTypes.string,
    incrementImage: PropTypes.string,
  };

  static defaultProps = {
  };

  render() {
    const {
      decrementImage,
      incrementImage,
    } = this.props;

    return (
      <View
        className={classnames({
          [`${styles.component}`]: true,
        })}
      >
        <button
          onClick={() => this.props.onChangeDecrement()}
          className={classnames({
            [`${styles.decrement}`]: true,
          })}
        >
          {decrementImage && (
            <Image src={decrementImage} />
          )}
          {!decrementImage && (
            <View>&minus;</View>
          )}
        </button>
        <button
          onClick={() => this.props.onChangeIncrement()}
          className={classnames({
            [`${styles.increment}`]: true,
          })}
        >
          {incrementImage && (
            <Image src={incrementImage} />
          )}
          {!incrementImage && (
            <View>&#43;</View>
          )}
        </button>
      </View>
    );
  }
}
