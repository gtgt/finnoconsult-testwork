import React from 'react';
import { css } from 'styled-components';
import PropTypes from 'prop-types';

import ScrollView from './ScrollView';

import { oneOrManyChildElements } from '../../prop-types';

const AppearingViewPlaceholder = ScrollView.extend`
  opacity: 0;
  /* height: 0; */
  transition: all ${props => `${props.transitionDuration || 0.5}s`} ease;
  transform: scaleY(0);
  transform-origin: ${props => props.transformOrigin || 'top center'};

  /* //TODO setTimeout in the Container compomnent should have been used to update only 1 semaphore instead of init & active */
  transition-delay: ${props => `${props.transitionDelay || 2}s`};

  ${props => props.active && css`
    opacity: 1;
    /* height: auto; */
    transform: scaleY(1);
  `}

  ${props => props.init && css`
    opacity: 0;
    /* height: auto; */
    transform: scaleY(0);
  `}
`;


// module.exports = AppearingView;

export default class AppearingViewContainer extends React.Component {
  static propTypes = {
    children: oneOrManyChildElements.isRequired,
    active: PropTypes.bool,
    transitionDelay: PropTypes.number,
  }

  static defaultProps = {
    transitionDelay: 1,
  }

  constructor(props) {
    super(props);
    this.state = {
      init: !!props.active && (props.transitionDelay),
    };
  }


  componentDidMount() {
    if (this.state.init) {
      setTimeout(() => this.setState({ init: false }), (this.props.transitionDelay * 1000) || 1000);
    }
  }

  render() {
    return (
      <AppearingViewPlaceholder {...this.props} init={this.state.init}>
        {!this.state.init && this.props.children}
      </AppearingViewPlaceholder>
    );
  }
}
