// Common imports
import React from 'react';
import { observer } from 'mobx-react';
// import { inject, observer } from 'mobx-react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import { oneOrManyChildElements } from '../../prop-types';

// Framework imports
import { View } from '../';
import Stepper from './Stepper';

// Style imports
import styles from './NumericStepper.scss';

// @inject('stores', 'actions') @observer
@observer
export default class InvestStepper extends View {
  static propTypes = {
    initValue: PropTypes.number.isRequired,
    stepValue: PropTypes.number.isRequired,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    currency: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    decrementImage: PropTypes.string,
    incrementImage: PropTypes.string,
    // children: oneOrManyChildElements,
    // images: PropTypes.arrayOf(PropTypes.shape({
    //   source: PropTypes.string.isRequired,
    //   title: PropTypes.string,
    // }).isRequired).isRequired,
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);

    this.state.value = props.initValue;
  }

  state = {
    value: 0,
  }

  decrementValue = () => {
    let newValue = 0;
    if (typeof (this.props.minValue) !== 'undefined' && (this.state.value - this.props.stepValue >= this.props.minValue)) {
      newValue = this.state.value - this.props.stepValue;
    } else if (typeof (this.props.minValue) === 'undefined' && (this.state.value - this.props.stepValue >= 0)) {
      newValue = this.state.value - this.props.stepValue;
    } else {
      return;
    }

    this.setState({ value: newValue });
    this.props.onChange(newValue);
  };

  incrementValue = () => {
    let newValue = 0;
    if (typeof (this.props.maxValue) !== 'undefined' && (this.state.value + this.props.stepValue <= this.props.maxValue)) {
      newValue = this.state.value + this.props.stepValue;
    } else {
      newValue = this.state.value + this.props.stepValue;
    }

    this.setState({ value: newValue });
    this.props.onChange(newValue);
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
        <span
          className={classnames({
            [`${styles.value}`]: true,
          })}
        >
          {this.props.currency} {this.state.value}
        </span>
        <span
          className={classnames({
            [`${styles.title}`]: true,
          })}
        >
          {this.props.title}
        </span>
        <Stepper
          initValue={this.props.initValue}
          stepValue={this.props.stepValue}
          onChangeDecrement={this.decrementValue}
          onChangeIncrement={this.incrementValue}
          decrementImage={decrementImage}
          incrementImage={incrementImage}
        />
      </View>
    );
  }
}
