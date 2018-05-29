import React, { Component, PropTypes } from 'react';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import ReactDOM from 'react-dom';
import classname from 'classnames';

import CarouselItem from './CarouselItem';
import { oneOrManyChildElements } from '../../prop-types';
import styles from './Carousel.scss';

@observer
export default class Carousel extends Component {
  static propTypes = {
    children: oneOrManyChildElements.isRequired,
    activeIndex: PropTypes.number,
    dots: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    activeIndex: 0,
    dots: false,
  };

  state = {
    moveBase: 0,
    itemWidth: 0,
  };

  componentDidMount() {
    autorun(() => {
      this._updateDimensions();
    });

    window.addEventListener('resize', () => this._updateDimensions());
  }

  setActive(activeIndex) {
    this.setState({
      activeIndex,
    });

    this.props.onChange(activeIndex);
  }

  moveRight(activeIndex) {
    if (activeIndex > 0) {
      // this.setState({
      //   activeIndex: activeIndex - 1,
      // });
      this.setActive(activeIndex - 1);
    }
  }

  moveLeft(activeIndex) {
    if (activeIndex < React.Children.count(this.props.children) - 1) {
      // this.setState({
      //   activeIndex: activeIndex + 1,
      // });
      this.setActive(activeIndex + 1);
    }
  }

  get activeIndex() {
    return this.state.activeIndex === undefined
      ? this.props.activeIndex
      : this.state.activeIndex;
  }

  _updateDimensions() {
    // const { children } = this.props;
    const index = this.activeIndex;

    const stageWidth = ReactDOM.findDOMNode(this.stage).offsetWidth; //eslint-disable-line
    const itemWidth = ReactDOM.findDOMNode(this.items[0]).offsetWidth; //eslint-disable-line

    // const length = children.length;
    // const totalWidth = length * itemWidth;


    // const baseWidth = totalWidth / length;
    // const center = Math.floor(length / 2);

    const moveBase = ((stageWidth - itemWidth) / 2) - (itemWidth * index);

    // if (length % 2 === 0) {
    //   moveBase -= itemWidth / 2;
    // }

    const state = Object.assign(this.state, {
      moveBase,
      itemWidth,
    });

    this.setState(state);
  }

  stage = null;
  items = [];

  render() {
    const { children } = this.props;
    const { moveBase } = this.state;

    return (
      <div
        className={styles.component}
        ref={(node) => { this.stage = node; }}
      >
        <div className={styles.wrapper}>
          <div className={styles.itemContainer}>
            {React.Children.map(children, (child, index) => (
              <CarouselItem
                key={index}
                index={index}
                ref={(node) => { this.items[index] = node; }}
                centerOffset={moveBase}
                onClick={() => this.setActive(index)}
                moveLeft={() => this.moveLeft(index)}
                moveRight={() => this.moveRight(index)}
              >
                {child}
              </CarouselItem>
            ))}
          </div>
          {this.props.dots && (
            <div className={styles.indicatorContainer}>
              {React.Children.map(children, (child, index) => (
                <button
                  className={classname({
                    [`${styles.indicator}`]: true,
                    [`${styles.indicatorActive}`]: index === this.activeIndex,
                  })}
                  onClick={() => this.setActive(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
