import browser from 'platform';

export function isIE11() {
  return `${browser.name}${parseInt(browser.version, 0)}`.toLowerCase() === 'ie11';
}

export function isAndroid() {
  return `${browser.os.family}`.toLowerCase() === 'android';
}
function getResolution() {
  const body = document.body;
  const html = document.documentElement;

  return {
    width: Math.min(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth),
    height: Math.min(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight),
  };
}

export const resolution = getResolution();

export function isAndoridNewerThanKitKat() {
  return isAndroid() && parseFloat(browser.os.version, 0) >= 4.4;
}

export default function getBrowser() {
  return browser;
}
