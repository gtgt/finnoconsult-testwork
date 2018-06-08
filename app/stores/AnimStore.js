import { action, observable, computed } from 'mobx';

import Store from './lib/Store';
// import { gaPage, gaEvent, gaSetValue } from '../helpers/analytics-helper';
// import { mobility as mobilityList, sports as sportsList, video as videos } from '../content';


export default class AninStore extends Store {

  @observable start = new Date().getTime();
  @observable act = 0; // TODO: set to 0
  @observable step = [0, 0, 0, 0, 0, 0]; // TODO: set to [0, 0, 0, 0, 0, 0]
  @observable maxStep = [18, 21, 13, 13, 15, 14];
  @observable videos = [null, null, null, null, null, null];
  // @observable pauseStart = null; // TODO: implement
  // @observable pauseAmount = 0; // TODO: substract this from the difference to start time.
  @observable paused = false; // TODO: set to false
  @observable speed = 1; // TODO: set to 1
  @observable milliSecondUnit = 1000; // TODO: set to 1000
  @observable frequency = 200; // TODO: set to 500
  @observable status = [];

  @computed get getAnimationSpeed() {
    return !isNaN(this.speed) && this.speed > 0 ? Number(this.speed) : 1;
  }

  constructor(...args) {
    super(...args);

    // Register action handlers
    this.actions.setAnimationSpeed.listen(this._setAnimationSpeed.bind(this));
    this.actions.pauseAnimation.listen(this._pause.bind(this));
    this.actions.unPauseAnimation.listen(this._unPause.bind(this));
    // this.actions.setAnimationMaxStep.listen(this._setMaxStep.bind(this));
    this.actions.setAnimationAct.listen(this._setAct.bind(this));
    this.actions.setAnimationStep.listen(this._setStep.bind(this));
    this.actions.startAnimation.listen(this._startAnimation.bind(this));
    this.actions.setVideo.listen(this._setVideo.bind(this));
    // this.actions.setAnimationStatus.listen(this._setAnimationStatus.bind(this));
  }

  @action _setAnimationSpeed({ speed }) {
    this.speed = speed;
  }

  @action _pause({ paused }) {
    let state = !this.paused;
    if (paused !== undefined) {
      state = paused;
    }
    this.paused = state;
  }

  @action _unPause() {
    this._pause({ paused: false });
  }

  // @action _setMaxStep({ step }) {
  //   this.maxStep = step;
  // }

  @action _setStep({ step }) {
    this.step[this.act] = step;
  }

  @action _setAct({ act }) {
    // TODO: if we had already been there, let's start from 0
    // console.debug('try to play and pause video', act, this.videos[act]);
    if (this.videos[act]) {
      // this.stores.ui._debug({ message: 'video exists, trying to play' });
      const playPromise = this.videos[act].play();
      playPromise.then(() => {
        // this.stores.ui._debug({ message: 'animstore autoplay' });
        this.videos[act].pause();
      })
      .catch(() => {
        // this.stores.ui._debug({ message: `autoplay error ${e}` });
      });
    }

    this.start=new Date().getTime();
    // this.stores.ui._setSlide({ slide: act });
    this.act = act;
  }

  // _setAnimationStatus({ id, name, status }) {
  //   console.log('setAnimationStatus', id, name, status);
  //   this.animationStatus[id] = { id, status };
  //   // console.warn(this.animationStatus);
  // }

  _doingAnimations() {
    const step = Math.floor(
      (
        (new Date().getTime() - this.start)
        * this.speed
      )
      / (this.milliSecondUnit / 2),
    ) / 2;
    if (!this.paused && step < this.maxStep[this.act]) {
      if (step !== this.step[this.act]) {
        // console.warn('step', step);
      }
      this.step[this.act] = step;
    } else if (!this.paused && step >= this.maxStep[this.act] /* && this.act < this.stores.ui.maxSlides */) {
      // console.debug('step is at maxstep, restart current act', this.act, this.step[this.act]);
      this.start=new Date().getTime();
      // console.debug('step is at maxstep, going to next act', this.act, this.step[this.act]);
      // this.actions.setAnimationAct({ act: this.act + 1 });
    // } else if (this.act === this.stores.ui.maxSlides) {
      // console.debug('_doingAnimations had completed');
      // NOTE : do not stop / kill _doingAnimations as it might be required later on manual carousel swyping
      // clearTimeout(this.timer);
    }
  }

  @action _startAnimation() {
    clearTimeout(this.timer);
    this.timer = setInterval(() => this._doingAnimations(), this.frequency / this.speed);
  }

  @action _setVideo({ act, video }) {
    this.videos[act]=video;
  }

}
