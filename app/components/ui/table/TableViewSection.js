import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { oneOrManyChildElements } from '../../../prop-types';

import View from '../View';
import Text from '../Text';

import styles from './TableViewSection.scss';

export default class TableViewSection extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    footerLabel: PropTypes.string,
    children: oneOrManyChildElements,
  }

  static defaultProps = {
    // label: 'HEADER',
    // footerLabel: 'FOOTER',
  };

  render() {
    const { label, footerLabel, children } = this.props;

    return (
      <View
        className={classnames(styles.component, {
        })}
      >
        <View
          className={classnames({
            [`${styles.header}`]: true,
          })}
        >
          {label && (
            <Text>{label}</Text>
          )}
        </View>

        {children && (
          <View
            className={classnames({
              [`${styles.content}`]: true,
            })}
          >
            {children}
          </View>
        )}

        <View
          className={classnames({
            [`${styles.footer}`]: true,
          })}
        >
          {footerLabel && (
            <Text>{footerLabel}</Text>
          )}
        </View>
      </View>
    );
  }
}
