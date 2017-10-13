import { computed, action, observable } from 'mobx';

import Store from './lib/Store';
// import { gaPage, gaEvent, gaSetValue } from '../helpers/analytics-helper';
// import { mobility as mobilityList, sports as sportsList, video as videos } from '../content';


export default class UIStore extends Store {

  @observable activeSlide = 0; // TODO: set to 0, debugging only
  @observable maxSlides = 0; // TODO adjust on Reach.childern
  @observable isNavigationBarVisible = true;
  @observable isDebugBarVisible = true; // TODO: set to false
  @observable navigationBarTitle = '';
  @observable navigationBarClassName = null;
  @observable slideLabels = ['', '', '', '', '', ''];

  @observable userLoggedIn = true; // TODO: set to false
  @observable userPassword = 'CL3Rtutorial';

  @observable devToolDebugMessage = '';


  pageTitles = [
    'A',
  ];

  constructor(...args) {
    super(...args);

    // Register action handlers
    this.actions.toggleDebugBar.listen(this._toggleDebugBar.bind(this));
    this.actions.toggleNavbar.listen(this._toggleNavbar.bind(this));
    this.actions.setNavBarTitle.listen(this._setNavBarTitle.bind(this));
    this.actions.setSlideLabel.listen(this._setSlideLabel.bind(this));
    this.actions.setNavBarClassName.listen(this._setNavBarClassName.bind(this));
    this.actions.nextSlide.listen(this._nextSlide.bind(this));
    this.actions.setMaxSlides.listen(this._setMaxSlides.bind(this));
    this.actions.debug.listen(this._debug.bind(this));
  }

  @computed get slideLabel() {
    return this.slideLabels[this.activeSlide];
  }

  _setMaxSlides({ maxSlides }) {
    this.maxSlides = maxSlides;
  }

  _toggleDebugBar({ isVisible }) {
    let state = !this.isDebugBarVisible;
    if (isVisible !== undefined) {
      state = isVisible;
    }

    this.isDebugBarVisible = state;
  }

  _toggleNavbar({ isVisible }) {
    let state = !this.isNavigationBarVisible;
    if (isVisible !== undefined) {
      state = isVisible;
    }

    this.isNavigationBarVisible = state;
  }

  _setNavBarTitle({ title }) {
    this.navigationBarTitle = title;
  }

  _setSlideLabel({ index, title }) {
    this.slideLabels[index] = title;
  }

  _setNavBarClassName({ className }) {
    this.navigationBarClassName = className;
  }


  _setSlide({ slide }) {
    if (slide >= 0 && slide <= this.maxSlides) {
      // this._setNavBarBackButtonHidden();
      this.activeSlide = slide;
      if (slide === this.maxSlides) {
        // gaSetValue('valueSelection', this.stores.form.data.valueSelection);
      }
      // gaPage(this.pageTitles[this.activeSlide]);
    }
  }

  _nextSlide() {
    this._setSlide({ slide: this.activeSlide + 1 });
  }

  _prevSlide() {
    this._setSlide({ slide: this.activeSlide - 1 });
  }


  @action _debug({ time = new Date(), message }) {
    console.debug(`${time.getMinutes()}:${time.getSeconds()}`, message);
    this.devToolDebugMessage += `\n${time.getMinutes()}:${time.getSeconds()}:${message}`;
  }


}