import React from 'react';
import PropTypes from 'prop-types';

import styles from './StartService.scss';

export default class StartService extends React.Component {
  static propTypes = {
    isRunning: PropTypes.bool.isRequired,
    toggleRunState: PropTypes.func.isRequired,
  };


  render() {
    return (
      <div className={styles.component}>
        <button
          onClick={() => this.props.toggleRunState()}
        >
          {this.props.isRunning ? 'Running' : 'click here to start'}
        </button>
      </div>
    );
  }
}
