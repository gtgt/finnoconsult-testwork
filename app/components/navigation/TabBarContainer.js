import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
// import Swipeable from 'react-swipeable';

import { Image, Text, View } from '../ui';

import styles from './TabBar.scss';

@observer
export default class TabBarContainer extends View {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    className: PropTypes.string,
  }

  state = {
    selectedIndex: 0,
  };

  handleClick(index) {
    this.setState({ selectedIndex: index });
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
          <button
            key={index}
            onClick={() => this.handleClick(index)}
            className={classnames({
              [`${styles.toggle}`]: true,
              [`${styles.isActive}`]: index === this.state.selectedIndex,
            })}
          >
            { item.image && (
              <Image source={item.image} />
            )}
            { item.title && (
              <Text>{item.title}</Text>
            )}
          </button>
        ))}
      </View>
    );
  }
}
