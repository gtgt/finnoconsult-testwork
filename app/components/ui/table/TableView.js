import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ScrollView from '../ScrollView';
import VerticalLayout from '../layout/VerticalLayout';
import { oneOrManyChildElements } from '../../../prop-types';

import styles from './TableView.scss';

export default class TableView extends Component {
  static propTypes = {
    isGrouped: PropTypes.bool,
    children: oneOrManyChildElements,
    className: PropTypes.string,
  }

  static defaultProps = {
    isGrouped: false,
    className: '',
  };

  render() {
    const { isGrouped, children, className } = this.props;

    return (
      <ScrollView
        className={classnames(styles.component, className, {
          [`${styles.isGrouped}`]: isGrouped,
        })}
      >
        <VerticalLayout
          className={classnames({
            [`${styles.switchToggle}`]: true,
          })}
        >
          {children}
        </VerticalLayout>
      </ScrollView>
    );
  }
}
