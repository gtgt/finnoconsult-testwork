import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
// import classnames from 'classnames';
import Swipeable from 'react-swipeable';

import { oneOrManyChildElements } from '../../prop-types';
import styles from './CarouselItem.scss';

@observer
export default class CarouselItem extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    children: oneOrManyChildElements.isRequired,
    centerOffset: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    moveLeft: PropTypes.func.isRequired,
    moveRight: PropTypes.func.isRequired,
  }

  prodmode = true;

  render() {
    this.prodmode = ENV.IS_PRODUCTION === true;

    const {
      centerOffset,
      children,
      onClick,
      moveLeft,
      moveRight,
    } = this.props;

    const componentStyles = {
      transform: `translateX(${(centerOffset)}px)`,
    };
    // console.log(componentStyles);

    const modchildren = React.Children.map(children, child => React.cloneElement(child, {
      isActive: this.props.isActive,
    }));

    return (
      <Swipeable
        className={styles.component}
        onSwipingLeft={moveLeft}
        onSwipingRight={moveRight}
        onDrag={(e) => { if (this.prodmode) e.preventDefault(); }}
        onContextMenu={(e) => { if (this.prodmode) e.preventDefault(); }}
        // TODO: ontouchdown for long => disable hover
      >
        <div // eslint-disable-line
          className={styles.wrapper}
          style={componentStyles}
          onClick={onClick}
        >
          {modchildren}
        </div>
      </Swipeable>
    );
  }
}
