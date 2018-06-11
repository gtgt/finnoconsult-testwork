import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

import ContainerWithRouter from '../../../containers/ContainerWithRouter';
import View from '../View';
import Text from '../Text';
import Image from '../Image';
import { Switch } from '../input';

// import { oneOrManyChildElements } from '../../../prop-types';
import accessoryRightArrow from './accessoryRightArrow.svg';

import styles from './TableViewCell.scss';

@withRouter
export default class TableViewCell extends ContainerWithRouter {
  static propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    description: PropTypes.string,
    route: PropTypes.string,
    accessoryView: PropTypes.shape(),
    rightArrow: PropTypes.bool,
    switcher: PropTypes.bool,
    badge: PropTypes.number,
    accessoryLabel: PropTypes.string,
    onClick: PropTypes.func,
    switchState: PropTypes.bool,
    // children: oneOrManyChildElements,
  }

  static defaultProps = {
    // accessoryView: <View>AccessoryView</View>,
    route: '',
    rightArrow: false,
    switch: false,
    badge: 0,
  };

  handleClick(e) {
    if (this.props.route) {
      this.goTo(this.props.route);
    } else if (this.props.onClick) {
      this.props.onClick(e);
    } else {
      // do nothing
    }
  }

  render() {
    const {
      label,
      icon,
      description,
      accessoryView,
      rightArrow,
      switcher,
      badge,
      accessoryLabel,
      // onClick,
      switchState,
    } = this.props;

    return (
      <View
        className={classnames(styles.component, {
        })}
        onClick={e => this.handleClick(e)}
      >
        {icon && (
          <View
            className={classnames({
              [`${styles.icon}`]: true,
            })}
          >
            <Image source={icon} />
          </View>
        )}

        <View
          className={classnames({
            [`${styles.labelContainer}`]: true,
          })}
        >
          <Text
            className={classnames({
              [`${styles.label}`]: true,
            })}
          >
            {label}
          </Text>

          {description && (
            <Text
              className={classnames({
                [`${styles.description}`]: true,
              })}
            >
              {description}
            </Text>
          )}
        </View>

        <View
          className={classnames({
            [`${styles.accessoryView}`]: true,
          })}
        >
          {accessoryView && (
            <View>{accessoryView}</View>
          )}

          {(!accessoryView && accessoryLabel) && (
            <Text
              className={classnames({
                [`${styles.accessoryLabel}`]: true,
              })}
            >
              {accessoryLabel}
            </Text>
          )}
          {(!accessoryView && badge > 0) && (
            <Text
              className={classnames({
                [`${styles.badge}`]: true,
              })}
            >
              {badge}
            </Text>
          )}
          {(!accessoryView && rightArrow) && (
            <Image className={classnames({ [`${styles.rightArrow}`]: true })} source={accessoryRightArrow} />
          )}
          {(!accessoryView && switcher) && (
            <View
              className={classnames({
                [`${styles.switcher}`]: true,
              })}
            >
              <Switch onClick={e => this.handleClick(e)} on={switchState} />
            </View>
          )}
        </View>
      </View>
    );
  }
}
