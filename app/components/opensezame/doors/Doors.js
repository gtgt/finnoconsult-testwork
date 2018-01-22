import React from 'react';
import PropTypes from 'prop-types';

import styles from './Doors.scss';

export default class Doors extends React.Component {
  static propTypes = {
    something: PropTypes.string,
  };


  render() {
    console.log('received something:', this.props.something);
    return (
      <div className={styles.component}>
        Let&acute;s try:
        <a href="https://github.com/marmelab/admin-on-rest">https://github.com/marmelab/admin-on-rest</a>
      </div>
    );
  }
}
