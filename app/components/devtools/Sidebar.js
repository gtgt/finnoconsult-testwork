import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import platform from 'platform';

import AnimStore from '../../stores/AnimStore';
import UIStore from '../../stores/UIStore';
import FormStore from '../../stores/FormStore';

import styles from './Sidebar.scss';

const mapper = obj => ({
  x: obj.innerWidth || obj.width || obj.offsetWidth,
  y: obj.innerHeight || obj.height || obj.offsetHeight,
});

const resolutionFormatter = (title, obj) => (<p><span>{title}:</span> {mapper(obj).x} x {mapper(obj).y}px</p>);


@inject('stores', 'actions') @observer
export default class SidebarDevTool extends Component {
  // state = {
  //   show: false,
  // };

  devTest = false;

  render() {
    /* eslint-disable */
    this.devTest = ENV.IS_PRODUCTION !== true;
    /* eslint-enable */

    // console.log('devtool - this.props.stores.ui.animationStatus', this.props.stores.ui.animationStatus, this.props.stores.ui.animationStatus.length);
    // this.props.stores.ui.animationStatus.slice().map((item, key) => console.log('foreach', key));

    // const { data } = this.props.stores.form;
    // const { actions } = this.props;
    return (
      <div>
        {this.devTest && (
          <div className={styles.component}>
            <h1>Dev Tools</h1>
            <button
              onClick={e => this.props.actions.toggleDebugBar(e)}
            >
              x
            </button>
            {this.props.stores.ui.isDebugBarVisible && (
              <div>
                <div className={styles.section}>
                  <h2>Info</h2>
                  <div className={styles.info}>
                    {platform.name} {parseFloat(platform.version, 0)} @{platform.os.family}{parseFloat(platform.os.version, 0)}
                    {resolutionFormatter('screen', window.screen)}
                    {resolutionFormatter('window', window)}
                    {resolutionFormatter('body', document.body)}
                  </div>
                  <div className={styles.debug}>
                    {this.props.stores.ui.devToolDebugMessage}
                  </div>
                  <h2>UI</h2>
                  {/* <ul className={styles.animationStatus}>
                    {this.props.stores.ui.animationStatus.map((item, key) => (
                      <li key={key}>{item.name} {item.status}</li>
                    ))}
                  </ul> */}
                  <label htmlFor="isNavigationBarVisible">Show Navbar:</label>
                  <input
                    type="checkbox"
                    name="isNavigationBarVisible"
                    checked={!this.props.stores.ui.isNavigationBarVisible}
                    onChange={e => console.log('not to be changed like this', e)}
                    // onChange={e => this.props.actions.toggleNavbar(e)}
                  />
                  <label htmlFor="isNavigationBarVisible">UserAccessToken:</label>
                  {this.props.stores.ui.userAuthToken}
                  {/* <label htmlFor="setNavBarTitle">NavBar title:</label>
                  <input
                    type="text"
                    name="setNavBarTitle"
                    className="grow"
                    value={this.props.stores.ui.navigationBarTitle}
                    onChange={e => this.props.actions.setNavBarTitle({ title: e.target.value })}
                  />
                  */ }
                  {/* <label htmlFor="activeSlide">ActiveSlide:</label>
                  <input
                    type="number"
                    name="activeSlide"
                    value={this.props.stores.ui.activeSlide}
                    min="0"
                    max={this.props.stores.ui.maxSlides}
                    onChange={(e) => {
                      this.props.actions.setSlide({ slide: parseInt(e.target.value, 10) });
                    }}
                  /> / {this.props.stores.ui.maxSlides} */}
                  { /*
                  <button onClick={e => this.props.actions.nextSlide(e)}>Next Slide</button>
                  <label htmlFor="wheelPosition">Active Wheel Position</label>
                  <input
                    type="number"
                    name="wheelPosition"
                    value={this.props.stores.ui.activeWheelIndex}
                    min="0"
                    max="4"
                    onChange={(e) => {
                      this.props.stores.ui.activeWheelIndex = parseInt(e.target.value, 10);
                    }}
                  /> */}
                  <h2>Animation</h2>
                  {/* <label htmlFor="animationAct">act</label>
                  <input
                    type="number"
                    name="animationAct"
                    value={this.props.stores.anim.act}
                    min="0"
                    max={this.props.stores.ui.maxSlides}
                    onChange={(e) => {
                      this.props.actions.setAnimationAct({ act: parseFloat(e.target.value, 10) });
                    }}
                  />
                  <label htmlFor="animationSpeed">step</label>
                  <input
                    type="number"
                    name="animationSpeed"
                    value={this.props.stores.anim.step[this.props.stores.anim.act]}
                    min="0"
                    max={this.props.stores.anim.maxStep[this.props.stores.anim.act]}
                    onChange={(e) => {
                      this.props.actions.setAnimationStep({ step: parseFloat(e.target.value, 10) });
                    }}
                  />
                  / [ {this.props.stores.anim.step.map(step => `${step}, `)} ]
                  <label htmlFor="isAnimationPaused">paused</label>
                  <input
                    type="checkbox"
                    name="isAnimationPaused"
                    checked={this.props.stores.anim.paused}
                    onChange={e => this.props.actions.pauseAnimation({ paused: e.target.checked })}
                  />
                  <label htmlFor="animationSpeed">Speed</label>
                  <input
                    type="number"
                    name="animationSpeed"
                    value={this.props.stores.anim.speed}
                    min="1"
                    max="20"
                    onChange={(e) => {
                      this.props.stores.anim.speed = parseInt(e.target.value, 10);
                    }}
                  /> */}
                  {/*
                  <label htmlFor="selectedVideoIndex">Selected Video Index</label>
                  <input
                    type="number"
                    name="selectedVideoIndex"
                    value={this.props.stores.ui.selectedVideoIndex}
                    min="0"
                    max={videos.length}
                    onChange={(e) => {
                      this.props.stores.ui.selectedVideoIndex = parseInt(e.target.value, 10);
                      this.props.stores.ui.selectedVideoInitialized = false;
                    }}
                  /> */}
                </div>
                <div className={styles.section}>
                  <h2>UserData</h2>


                  <h2>Value data</h2>

                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

SidebarDevTool.wrappedComponent.propTypes = {
  stores: PropTypes.shape({
    anim: PropTypes.instanceOf(AnimStore).isRequired,
    ui: PropTypes.instanceOf(UIStore).isRequired,
    form: PropTypes.instanceOf(FormStore).isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    toggleDebugBar: PropTypes.func.isRequired,
    // setAnimationStep: PropTypes.func.isRequired,
    // setAnimationAct: PropTypes.func.isRequired,
    // pauseAnimation: PropTypes.func.isRequired,
    // setSlide: PropTypes.func.isRequired,
    // nextSlide: PropTypes.func.isRequired,
    toggleNavbar: PropTypes.func.isRequired,
  //   setNavBarTitle: PropTypes.func.isRequired,
  //   updateFormData: PropTypes.func.isRequired,
  }),
};
