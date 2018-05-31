import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { oneOrManyChildElements } from '../../../prop-types';

import { View, Image } from '../../ui';

import formatNumber from '../../../helpers/number-helpers';

import styles from './TransferMonitor.scss';

const TransferItem = ({ source, title, amount }) => (
  <View className={styles.item}>
    <div className={styles.icon}>
      <Image source={source} hint={title} />
    </div>
    <h1 className={styles.amount}>{formatNumber(amount, 2)}</h1>
    <h2 className={`${styles.title} bolder`}>{title}</h2>
  </View>
);
TransferItem.propTypes = {
  source: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default class TransferMonitor extends React.Component {
  static propTypes = {
    children: oneOrManyChildElements,
    fromItem: PropTypes.shape({
      source: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    fromAmount: PropTypes.number.isRequired,
    toItem: PropTypes.shape({
      source: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    toAmount: PropTypes.number.isRequired,
    transferAmount: PropTypes.number.isRequired,
  };

  static defaultProps = {
  };

  render() {
    return (
      <div
        className={classnames(styles.component, {
        })}
      >
        <div className={styles.itemContainer}>

          <TransferItem
            {...this.props.fromItem}
            amount={this.props.fromAmount}
          />

          <TransferItem
            {...this.props.toItem}
            amount={this.props.toAmount}
          />

        </div>

        <div className={styles.amountContainer}>
          <div className={styles.amount}>
            {formatNumber(this.props.transferAmount, 2)}
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
