import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Swipeable from 'react-swipeable';

import Screen from '../../../../containers/screens/Screen';

import { oneOrManyChildElements } from '../../../../prop-types';

import { Image, ScrollView } from '../../';

@inject('stores', 'actions') @observer
export default class StaticImagePage extends Screen {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      source: PropTypes.string.isRequired,
      title: PropTypes.string,
    }).isRequired).isRequired,
    children: oneOrManyChildElements,
  }

  state = {
    index: 0,
  }

  get images() {
    return this.props.images || [];
  }

  onChangeIndex(direction) {
    // TODO: rolling support based on a give prop
    let newIndex = null;
    if (this.state.index + direction < 0) newIndex = 0; // this.images.length-1;
    else if (this.state.index + direction >= this.images.length) newIndex = this.images.length - 1; // 0;
    else newIndex = this.state.index + direction;
    // console.debug('ndewIndex', newIndex);
    this.setState({ index: newIndex });
  }


  render() {
    return (
      <Swipeable
        onSwipedLeft={() => this.onChangeIndex(-1)}
        onSwipedRight={() => this.onChangeIndex(1)}
        // style={{ position: 'absolute' }}
      >
        <ScrollView>
          {this.props.children}

          <button
            onClick={() => this.onChangeIndex(1)}
            style={{ width: '100%', height: '100%' }}
          >
            <Image {...this.images[this.state.index]} />
          </button>
        </ScrollView>
      </Swipeable>
    );
  }
}
