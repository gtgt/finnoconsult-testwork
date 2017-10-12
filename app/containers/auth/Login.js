import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Login.scss';

export default class Login extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    password: '',
  }

  onChangeValue(e) {
    this.setState({ password: e.target.value });
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.onSubmit();
    }
  }

  onSubmit() {
    const data = { password: this.state.password };
    this.props.onSubmit(data);
    this.setState({ password: '' });
  }

  render() {
    return (
      <div className={styles.component}>
        <div className={styles.login}>
          <h1>Protected demo</h1>
          <h2>Please sign in for content</h2>
          <input
            type="password"
            value={this.state.password}
            className={styles.password}
            onChange={e => this.onChangeValue(e)}
            onKeyDown={e => this.onKeyDown(e)}
          />
          <input type="submit" onClick={() => this.onSubmit()} />
        </div>
      </div>
    );
  }
}
