import React from 'react';
import PropTypes from 'prop-types';
import { oneOrManyChildElements } from '../../prop-types';

import styles from './NumericKeyboard.scss';

// import back from './backspace.png';
import back from './backspaceX.png';

export default class NumericKeyboard extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    children: oneOrManyChildElements,
    className: PropTypes.string,
    keyboard: PropTypes.shape(
      // PropTypes.shape({
      //   title: PropTypes.string,
      //   className: PropTypes.string,
      //   action: PropTypes.action,
      // }),
    ),
  };

  constructor(props) {
    super(props);
    this.keyboard = [
      { title: '1' },
      { title: '2' },
      { title: '3' },
      { title: '4' },
      { title: '5' },
      { title: '6' },
      { title: '7' },
      { title: '8' },
      { title: '9' },
      { title: ',', className: styles.special },
      { title: '0' },
      { title: (<img src={back} alt="" />), className: `${styles.special} ${styles.image} ${styles.backSpace}`, action: v => this.backSpace(v) },
    ];
    if (this.props.keyboard) {
      Object.keys(this.props.keyboard).forEach((key) => { this.keyboard[key] = this.props.keyboard[key]; });
    }
  }

  state = {
    lastClicked: null,
  }

  onClick(e, v) {
    e.preventDefault();
    const value = v.action || v.title;
    this.setState({ lastClicked: value });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
    return false;
  }

  backSpace(v) {
    return v.substring(0, v.length-1);
    // `${v}&#10;`;
  }


  render() {
    return (
      <div
        className={`${styles.component} ${this.props.className}`}
      >
        {this.props.children && (
          <div className={styles.header}>
            {this.props.children}
          </div>
        )}
        {this.keyboard.map((key, index) => (
          <button
            className={`${styles.key} ${key.className}`}
            key={index}
            onClick={e => this.onClick(e, key)}
          >{key.title}</button>
        ))}
      </div>
    );
  }
}
