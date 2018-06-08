import { Component } from 'react';
import PropTypes from 'prop-types';


export default class Screen extends Component {
  static propTypes = {
    pageTitle: PropTypes.string,
    pageNavBar: PropTypes.func,
    navBarClassName: PropTypes.string,
    navBarLeftButton: PropTypes.func,
    navBarRightButton: PropTypes.func,
    layoutClassName: PropTypes.string,
    actions: PropTypes.shape({
      setNavBarTitle: PropTypes.func.isRequired,
      setNavBarClassName: PropTypes.func.isRequired,
      setNavBarComponent: PropTypes.func.isRequired,
      setNavigationBarLeftButton: PropTypes.func.isRequired,
      setNavigationBarRightButton: PropTypes.func.isRequired,
      toggleNavbar: PropTypes.func.isRequired,
      setLayoutClassName: PropTypes.func.isRequired,
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
      navBarLeftButton,
      navBarRightButton,
      layoutClassName,
    } = this.props;
    const {
      setNavBarTitle,
      setNavBarClassName,
      setNavBarComponent,
      toggleNavbar,
      setNavigationBarLeftButton,
      setNavigationBarRightButton,
      setLayoutClassName,
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
    setNavBarClassName({ className: this.getNavBarClassName || navBarClassName || null });
    setNavigationBarLeftButton({ button: this.getNavBarLeftButton || navBarLeftButton || null });
    setNavigationBarRightButton({ button: this.getNavBarRightButton || navBarRightButton || null });
    setLayoutClassName({ className: this.getLayoutClassName || layoutClassName || null });
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
