import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Screen extends Component {
  static propTypes = {
    pageTitle: PropTypes.string,
    navBarClassName: PropTypes.string,
    // navBarBackLink: PropTypes.string,
    actions: PropTypes.shape({
      setNavBarTitle: PropTypes.func.isRequired,
      setNavBarClassName: PropTypes.func.isRequired,
      // setNavBarBackLink: PropTypes.func.isRequired,
    }).isRequired,
    // animationSpeed: PropTypes.number.isRequired,
  };

  state = {
    soundPosition: 0,
    playSound: false,
  };

  componentDidMount() {
    const {
      pageTitle,
      navBarClassName,
      // navBarBackLink
    } = this.props;
    const {
      setNavBarTitle,
      setNavBarClassName,
      // setNavBarBackLink
    } = this.props.actions;

    setNavBarTitle({ title: this.getPageTitle || pageTitle || '' }); // TODO: move this default obj to Store?
    setNavBarClassName({ className: this.getNavBarClassName || navBarClassName });
    // setNavBarBackLink({ link: this.getNavBarBackLink || navBarBackLink });
  }


  handlePlayingSound(ev) {
    this.setState({ soundPosition: ev.position });
  }

  handleFinishedPlayingSound() {
    this.setState({ playSound: false, soundPosition: 0 });
  }

  get playSound() {
    console.log('playSound', this.state.playSound);
    return this.state.playSound;
  }


}

Screen.contextTypes = {
  router: React.PropTypes.object,
};
