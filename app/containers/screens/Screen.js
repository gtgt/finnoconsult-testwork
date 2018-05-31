import { Component } from 'react';
import PropTypes from 'prop-types';


export default class Screen extends Component {
  static propTypes = {
    pageTitle: PropTypes.string,
    pageNavBar: PropTypes.func,
    navBarClassName: PropTypes.string,
    navBarLeftLink: PropTypes.func,
    navBarRightLink: PropTypes.func,
    actions: PropTypes.shape({
      setNavBarTitle: PropTypes.func.isRequired,
      setNavBarClassName: PropTypes.func.isRequired,
      setNavBarComponent: PropTypes.func.isRequired,
      setNavigationBarLeftLink: PropTypes.func.isRequired,
      setNavigationBarRightLink: PropTypes.func.isRequired,
      toggleNavbar: PropTypes.func.isRequired,
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
      pageNavBar,
      navBarLeftLink,
      navBarRightLink,
    } = this.props;
    const {
      setNavBarTitle,
      setNavBarClassName,
      setNavBarComponent,
      toggleNavbar,
      setNavigationBarLeftLink,
      setNavigationBarRightLink,
      // setNavBarBackLink
    } = this.props.actions;

    // console.warn('new NAVBAR!');

    if (pageNavBar) {
      toggleNavbar({ isVisible: false });
      setNavBarComponent({ component: pageNavBar });
    } else {
      toggleNavbar({ isVisible: true });
    }
    // TODO: move this default '' obj to Store?
    setNavBarTitle({ title: this.getPageTitle || pageTitle || '' });
    setTimeout(() => setNavBarTitle({ title: this.getPageTitle || pageTitle || '' }), 600);
    setNavBarClassName({ className: this.getNavBarClassName || navBarClassName });
    setNavigationBarLeftLink({ link: this.getNavBarLeftLink || navBarLeftLink || null });
    setNavigationBarRightLink({ link: this.getNavBarRightLink || navBarRightLink || null });
  }

  // componentWillUnmount() {
  // // NOTE: This had been moved to Page.js, to detect new changes in location.
  // }


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
