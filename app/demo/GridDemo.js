import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Screen from '../containers/screens/Screen';

import { View, Image } from '../components/ui';
import { AnimatedGrid as Grid } from '../components/ui/layout';

import images from './images.json';

const Cell = styled.li`
  ${'' /* display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden; */}
  background-color: rgba(0,0,0,0.2);
  border:solid 1px lightgray;
`;

// const Grid = styled.div`
//    /* Grid Fallback */
//   display: flex;
//   flex-wrap: wrap;
//
//   /* Supports Grid */
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(${props => props.height || '200px'}, 1fr));
//   grid-auto-rows: minmax(${props => props.height || '150px'}, auto);
//   grid-gap: ${props => props.gap || '1em'};
// `;

@inject('stores', 'actions') @observer
export default class GridDemo extends Screen {

  static defaultProps = {
    pageTitle: 'I\'m a grid!',
  }

  get images() {
    return images;
  }

  render() {
    this.images.sort(() => 0.5 - Math.random());

    return (
      <View>
        <button onClick={() => this.forceUpdate()}>Refresh!</button>

        <Grid>
          <Cell>I&apos;m talking about...</Cell>
          {this.images.map((source, index) => (
            <Cell key={index}>
              <Image source={source} />
            </Cell>
          ))}
          <Cell>...final thoughts</Cell>
        </Grid>
      </View>

    );
  }
}
