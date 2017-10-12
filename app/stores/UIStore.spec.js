//eslint-disable-next-line
import actions from '../actions';
import storeFactory from './index';

const stores = storeFactory(actions);

const defaultValues = {
  activeSlide: 0,
  maxSlides: 0,
  isNavigationBarVisible: false,
  isDebugBarVisible: true,
  navigationBarTitle: '',
  navigationBarClassName: null,
  userLoggedIn: true,
};

//eslint-disable-next-line
// jest.mock('../helpers/analytics-helper.js');

describe('UIStore', () => {
  it('Store default flags are set', () => {
    expect(stores.ui.activeSlide).toEqual(defaultValues.activeSlide);
    expect(stores.ui.maxSlides).toEqual(defaultValues.maxSlides);
    expect(stores.ui.isNavigationBarVisible).toEqual(defaultValues.isNavigationBarVisible);
    expect(stores.ui.isDebugBarVisible).toEqual(defaultValues.isDebugBarVisible);
    expect(stores.ui.navigationBarTitle).toEqual(defaultValues.navigationBarTitle);
    expect(stores.ui.navigationBarClassName).toEqual(defaultValues.navigationBarClassName);
    expect(stores.ui.activeWheelIndex).toEqual(defaultValues.activeWheelIndex);
    expect(stores.ui.userLoggedIn).toEqual(defaultValues.userLoggedIn);
  });
});
