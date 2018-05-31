import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './NumericInput.scss';
import kbStyles from './NumericInput_layoutGeneric.scss';
import NumericKeyboard from './NumericKeyboard';

import { isNumber, getNumber } from '../../../helpers/number-helpers';
import { numberOrStringText } from '../../../prop-types';

export default class NumericInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: numberOrStringText,
    // min: PropTypes.number,
    // max: PropTypes.number,
    hint: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    layout: PropTypes.shape({
      keyboard: PropTypes.string.isRequired,
      OKbutton: PropTypes.string,
    }),
    keyboard: PropTypes.shape(),
    closeButtonPosition: PropTypes.number,
  };


  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      keyboard: false,
      focus: false,
      uniqueId: `${props.type}${new Date().getTime()}`,
    };

    this.keyboard = this.props.keyboard || {};
    if (this.props.closeButtonPosition) {
      this.keyboard[this.props.closeButtonPosition] = {
        title: (<span>OK</span>),
        className: `${(this.props.layout && this.props.layout.OKbutton && this.props.layout.OKbutton) || 'NumericKeyboard_OKbutton'} NumericKeyboard_special`,
        action: v => this.hideKeyboard(v),
      };
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', e => this.onKeyPress(e));
  }

  onKeyPress(e) {
    if (e.keyCode && (e.keyCode in this.keys) && this.state.keyboard) {
      this.onChangedValue(this.keys[e.keyCode]);
    }
  }

  onChangedValue(e) {
    const value = this.getNewValue(e);
    this.setState({
      value,
    });
    if (this.props.onChange) {
      this.props.onChange(this.convertValue(value));
    }
  }


  setFocus(focus) {
    this.setState({
      focus,
    });
  }


  getNewValue(e) {
    if (typeof e === 'function') {
      const v = this.state.value || '';
      return e(v);
    }
    // TODO: handle min and max
    const newValue = `${this.state.value || ''}${(e.target && e.target.value && e.target.value) || e}`;
    return (this.props.type.toLowerCase() === 'number' && isNumber(newValue)) ? newValue : `${this.state.value || ''}`;
  }

  getNumber(value) {
    if (value === null || value === undefined) return '0';
    return this.props.type.toLowerCase() === 'number' ? getNumber(value) : value;
  }


  get getName() {
    return this.props.name || this.state.uniqueId;
  }

  get isKeyboardDisplayed() {
    return this.state.keyboard;
  }

  get isValueSet() {
    return this.state.value && this.state.value.length > 0;
  }

  toggleKeyboard() {
    this.setState({
      keyboard: !this.state.keyboard,
    });
  }

  hideKeyboard(v, force) {
    if (!this.state.focus || force) {
      this.setState({
        focus: false,
        keyboard: false,
      });
    }
    return v;
  }


  keys = {
    192: 0,
    48: 0,
    49: 1,
    50: 2,
    51: 3,
    52: 4,
    53: 5,
    54: 6,
    55: 7,
    56: 8,
    57: 9,
    188: ',',
    190: '.',
    8: v => v.substring(0, v.length-1),
    13: v => this.hideKeyboard(v), // TODO: if we are focusing on the original button (toggle occurs), we shouldn't use this
    27: v => this.hideKeyboard(v, true),
  };

  convertValue(value) {
    // TODO: more type conversion?
    return this.getNumber(value);
  }

  displayValue(value) {
    // TODO: write 0 decimals always!
    if (value === null || value === undefined) return '';
    return this.convertValue(value);
  }

  render() {
    return (
      <div
        className={classnames({
          [`${styles.component}`]: true,
          [`${this.props.className}`]: true,
          [`${this.props.layout ? this.props.layout.keyboard : kbStyles.keyboard}`]: this.isKeyboardDisplayed,
        })}
      >
        <div className={styles.mainContainer}>

          <span className={styles.labelContainer}>
            <span className={styles.label}>{this.props.label}</span>
          </span>
          {!this.isValueSet && !this.props.value && this.props.hint && (
            <span className={styles.hintContainer}>
              <label htmlFor={this.getName} className={styles.label}>{this.props.hint}</label>
            </span>
          )}
          <button
            id={this.getName}
            name={this.getName}
            // type={this.props.type}
            // min={this.props.min}
            // max={this.props.max}
            className={styles.input}
            onClick={() => this.toggleKeyboard()}
            onFocus={() => this.setFocus(true)}
            onBlur={() => this.setFocus(false)}
          >
            {this.displayValue(this.state.value || this.props.value)}
          </button>
          <button className={styles.doneContainer} onClick={v => this.hideKeyboard(v)}>
            OK
          </button>

          {this.isKeyboardDisplayed && (
            <div className={styles.keyboardContainer}>
              <NumericKeyboard
                onChange={e => this.onChangedValue(e)}
                keyboard={this.keyboard}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
