require('es6-promise').polyfill();
require('isomorphic-fetch');
// import { * as gaConfig } from '../../build/analyticsConfig.json';

/* eslint-disable */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
/* eslint-enable */

let gaInitialized = false;

const pageCacheStack = [];


export function gaInit() {
  // eslint-disable-next-line
  if (!gaInitialized && typeof gaConfig !== 'undefined' && gaConfig.gaid) {
    gaInitialized = true;
    // eslint-disable-next-line
    ga('create', gaConfig.gaid, 'auto');
  }
}
export function gaInitTimeout() {
  /* eslint-disable */
  if (!gaInitialized && typeof gaConfig !== 'undefined' && gaConfig.gaid) {
    gaInit();
    while(pageCacheStack.length) {
      gaPage(pageCacheStack.shift());
    }
  } else {
    // if (typeof $ !=='undefined') {
    //   $.getJSON('./analyticsConfig.json', (response) => gaConfig = response);
    // }
    // else
    if (typeof fetch !=='undefined') {
      // NOTE: requires a kind of a polyfill
      fetch('./analyticsConfig.json')
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then(config => gaConfig = config);
    }
    gaInit();
    setTimeout(() => gaInitTimeout(), 500);
  }
  /* eslint-enable */
}
gaInitTimeout();


export function gaPage(page) {
  if (!gaInitialized) pageCacheStack.push(page);
  // eslint-disable-next-line
  else ga('send', 'pageview', page);
}

export function gaEvent(category, action, label) { // add custom dimensions
  /* eslint-disable */
  ga('send', 'event', {
    eventCategory: category,
    eventAction: action,
    eventLabel: label,
    // eventValue: value,
  });
  /* eslint-enable */
}

export function gaSetValue(field, value = 'selected') { // add custom dimensions
  /* eslint-disable */
  ga('set', gaConfig.customDimensions[field], value);
  /* eslint-enable */
}

export function gaSetListValues(list, settings) { // add custom dimensions
  settings.forEach((index) => {
    gaSetValue(list[index].tag);
  });
}
