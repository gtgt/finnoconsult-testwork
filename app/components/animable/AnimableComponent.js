import { PropTypes, Component } from 'react';

export default class AnimableComponent extends Component {
  static propTypes = {
    startAnimation: PropTypes.bool.isRequired,
    animationSpeed: PropTypes.number.isRequired,
  };

  state = {
    animationStep: 0,
  };


  componentDidMount() {
    // TODO: do in a smarter manner (however this is required only on testing when UIStore activeslide starts wirth this)
    this.startAnimationQueue();
    this.isActive = true;
  }

  componentDidUpdate() {
    this.startAnimationQueue();
    this.isActive = true;
  }

  componentWillUnmount() {
    this.isActive = false;
  }

  isActive = false;
  isAnimationRunnning = false;
  animationSteps = [
    // 600,
    // 700,
    // 800,
    // 900,
    1000,
    1100,
    1200,
    1300,
    1400,
    1500,
    1600,
    1700,
    1800,
    1900,
    2000,
    2100,
    2200,
    2300,
    2400,
    2500,
    2600,
    2700,
    2800,
    2900,
  ];


  startAnimationQueue() {
    if (this.props.startAnimation && !this.isAnimationRunnning) {
      // console.log('(re)start animation', this.animationSteps, this.props.animationSpeed);
      this.isAnimationRunnning = true;
      this.animationSteps.forEach(time => setTimeout(() => {
        if (this.isActive) {
          // console.debug('AnimableSettings/animationStep', this.state.animationStep, this.state.animationStep + 1, 'isActive', this.isActive);
          this.setState({ animationStep: this.state.animationStep + 1 });
        }
      }, time / this.props.animationSpeed));
      // TODO: set isAnimationRunnning= false & animationStep =0 in case we want a 2 way and reocurring animation (or apply previndex to check)
    }
  }
}
