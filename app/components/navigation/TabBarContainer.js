import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
// import Swipeable from 'react-swipeable';

import { Image, Text, View } from '../ui';

import { NavigationButton } from '../ui/layout/navigation';

import styles from './TabBar.scss';

@withRouter
@observer
export default class TabBarContainer extends View {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    className: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const {
      items,
      // className,
    } = this.props;

    return (
      <View
        className={classnames({
          [`${styles.component}`]: true,
        })}
      >
        {items.map((item, index) => (
          <NavigationButton
            key={index}
            to={item.route}
            className={classnames({
              [`${styles.isActive}`]: this.props.location.pathname === item.route,
            })}
          >
            { item.image && (
              <Image source={item.image} />
            )}
            { item.title && (
              <Text>{item.title}</Text>
            )}
          </NavigationButton>
        ))}
      </View>
    );
  }
}
