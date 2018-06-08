import React from 'react';
import PropTypes from 'prop-types';

import links from '../../../../content/links';
import {
  Image,
  Text,
  NavigationButton,
} from '../../../ui';

export default class NavigationButtonFactory extends React.Component {
  static propTypes = {
    use: PropTypes.string.isRequired,
  }

  render() {
    const button = links.links.buttons.find(link => link.id === this.props.use);

    return button ?
      <NavigationButton {...button}>
        {button.image ? <Image {...button} source={button} /> : <Text>{button.title}</Text>}
      </NavigationButton>
      : null;
  }
}
