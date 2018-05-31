import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { Grid } from '../components/layout';
import { DraggableSource, DraggingTarget } from '../components/draggable';
import { arrayOrMobXArray } from '../prop-types';


@observer
export default class DragDemo extends React.Component {
  static propTypes = {
    items: arrayOrMobXArray.isRequired,
    itemComponent: PropTypes.func.isRequired, //eslint-disable-line
    onDragEnd: PropTypes.func,
  }

  onDragEnd({ from, to }) {
    return this.props.onDragEnd && this.props.onDragEnd({ from, to });
  }


  render() {
    return (
      <Grid>
        {this.props.items.map((item, index) => (
          <DraggableSource id={item.id} key={index} onDragEnd={e => this.onDragEnd(e)} isActive>
            <DraggingTarget id={item.id}>
              <this.props.itemComponent
                {...item}
              />
            </DraggingTarget>
          </DraggableSource>
         ))}
      </Grid>
    );
  }
}
