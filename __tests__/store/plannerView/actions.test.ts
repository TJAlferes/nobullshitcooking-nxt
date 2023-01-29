import { clickDay, load } from '../../../src/store/plannerView/actions'
import { actionTypes} from '../../../src/store/plannerView/types';

const { CLICK_DAY, LOAD } = actionTypes;

const recipeOne = {key: "ABC", id: 503, owner_id: 1, title: "Pho",         recipe_image: "nobsc-pho"};
const recipeTwo = {key: "XYZ", id: 821, owner_id: 1, title: "Coffee Cake", recipe_image: "nobsc-coffee-cake"};
const planName =  "Plan C";
const planData =  {
  1: [recipeTwo], 2: [], 3: [], 4: [], 5: [recipeOne], 6: [],  7: [],
  8: [],  9: [], 10: [], 11: [], 12: [], 13: [], 14: [],
 15: [], 16: [], 17: [], 18: [], 19: [], 20: [], 21: [],
 22: [], 23: [], 24: [], 25: [], 26: [], 27: [], 28: []
};

describe('clickDay action creator', () => {
  it('returns the correct action type', () => {
    expect(clickDay(4).type).toEqual(CLICK_DAY);
  });

  it('returns the correct day', () => {
    expect(clickDay(4).day).toEqual(4);
  });
});

describe('load action creator', () => {
  it('returns the correct action type', () => {
    expect(load(planName, planData).type).toEqual(LOAD);
  });

  it('returns the correct planName', () => {
    expect(load(planName, planData).planName).toEqual(planName);
  });

  it('returns the correct planData', () => {
    expect(load(planName, planData).planData).toEqual(planData);
  });
});