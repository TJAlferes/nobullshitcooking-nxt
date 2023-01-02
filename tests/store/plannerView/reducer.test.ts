import { plannerViewReducer } from '../../../src/store/plannerView/reducer';
import { actionTypes, IPlannerViewState } from '../../../src/store/plannerView/types';

const { PLANNER_VIEW_CLICK_DAY, PLANNER_VIEW_LOAD } = actionTypes;

const recipeOne = {key: "ABC", id: 503, owner_id: 1, title: "Pho",         recipe_image: "nobsc-pho"};
const recipeTwo = {key: "XYZ", id: 821, owner_id: 1, title: "Coffee Cake", recipe_image: "nobsc-coffee-cake"};
const empty = {
  1: [],  2: [],  3: [],  4: [],  5: [],  6: [],  7: [],
  8: [],  9: [], 10: [], 11: [], 12: [], 13: [], 14: [],
 15: [], 16: [], 17: [], 18: [], 19: [], 20: [], 21: [],
 22: [], 23: [], 24: [], 25: [], 26: [], 27: [], 28: []
};
const planData = {
  1: [recipeTwo], 2: [], 3: [], 4: [], 5: [recipeOne], 6: [],  7: [],
  8: [],  9: [], 10: [], 11: [], 12: [], 13: [], 14: [],
 15: [], 16: [], 17: [], 18: [], 19: [], 20: [], 21: [],
 22: [], 23: [], 24: [], 25: [], 26: [], 27: [], 28: []
};

const initialState: IPlannerViewState = {
  isLoading:   false,
  expanded:    false,
  expandedDay: null,
  planName:    "",
  recipeListsInsideDays: empty
};

describe('plannerView reducer', () => {
  it('handles actions of type PLANNER_VIEW_CLICK_DAY on a day', () => {
    const state = {...initialState};
    const reducer = plannerViewReducer(state, {type: PLANNER_VIEW_CLICK_DAY, day: 1})
    expect(reducer.expanded).toEqual(true);
    expect(reducer.expandedDay).toEqual(1);
  });

  it('handles actions of type PLANNER_VIEW_CLICK_DAY on the expanded day', () => {
    const state = {...initialState};
    state.expanded = true;
    state.expandedDay = 1;
    const reducer = plannerViewReducer(state, {type: PLANNER_VIEW_CLICK_DAY, day: 1});
    expect(reducer).toEqual(initialState);
  });

  it('handles actions of type PLANNER_VIEW_LOAD', () => {
    const state = {...initialState};
    const reducer = plannerViewReducer(state, {type: PLANNER_VIEW_LOAD, planName: "My Plan", planData});
    expect(reducer.planName).toEqual("My Plan");
    expect(reducer.recipeListsInsideDays).toEqual(planData);
  });
});