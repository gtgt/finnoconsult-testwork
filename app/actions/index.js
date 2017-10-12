import PropTypes from 'prop-types';
import defineActions from './lib/actions';

export default defineActions({
  toggleNavbar: {
    isVisible: PropTypes.bool,
  },
  toggleDebugBar: {
    isVisible: PropTypes.bool,
  },
  setNavBarTitle: {
    title: PropTypes.string.isRequired,
  },
  setSlideLabel: {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  },
  setNavBarClassName: {
    className: PropTypes.string,
  },
  setSlide: {
    slide: PropTypes.number.isRequired,
  },
  nextSlide: {},
  prevSlide: {},
  setMaxSlides: {
    maxSlides: PropTypes.number.isRequired,
  },

  setAnimationSpeed: {
    speed: PropTypes.number.isRequired,
  },
  pauseAnimation: {
    paused: PropTypes.bool,
  },
  unPauseAnimation: {},
  setAnimationMaxStep: {
    step: PropTypes.number.isRequired,
  },
  setAnimationStep: {
    step: PropTypes.number.isRequired,
  },
  setAnimationAct: {
    act: PropTypes.number.isRequired,
  },
  startAnimation: {},
  setVideo: {
    act: PropTypes.number.isRequired,
    video: PropTypes.object,
  },
  // setAnimationStatus: {
  //   id: PropTypes.number,
  //   name: PropTypes.string,
  //   status: PropTypes.string.isRequired,
  // },

  debug: {
    time: PropTypes.string,
    message: PropTypes.string.isRequired,
  },
  updateFormData: {
    riskLevel: PropTypes.number,
  },
}, PropTypes.validateWithErrors);
