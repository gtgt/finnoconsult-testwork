//eslint-disable-next-line
import actions from '../actions';
import storeFactory from './index';

const stores = storeFactory(actions);

const defaultValues = {
  act: 0,
  step: [0, 0, 0, 0, 0, 0],
  // maxStep: [12, 10, 12, 6, 7, 10],
  paused: false,
  speed: 1,
  milliSecondUnit: 1000,
  frequency: 200,
  status: [],
};

//eslint-disable-next-line
// jest.mock('../helpers/analytics-helper.js');

describe('AnimStore', () => {
  it('Store default flags are set', () => {
    expect(stores.anim.act).toEqual(defaultValues.act);
    expect(stores.anim.step).toEqual(defaultValues.step);
    // expect(stores.anim.maxStep).toEqual(defaultValues.maxStep);
    expect(stores.anim.paused).toEqual(defaultValues.paused);
    expect(stores.anim.speed).toEqual(defaultValues.speed);
    expect(stores.anim.milliSecondUnit).toEqual(defaultValues.milliSecondUnit);
    expect(stores.anim.frequency).toEqual(defaultValues.frequency);
    expect(stores.anim.status).toEqual(defaultValues.status);
  });
});
