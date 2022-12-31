import { plannerReducer } from '../../../src/store/planner/reducer';
import { actionTypes, IPlannerState } from '../../../src/store/planner/types';

const {
  PLANNER_CLICK_DAY,
  PLANNER_ADD_RECIPE_TO_DAY,
  PLANNER_REMOVE_RECIPE_FROM_DAY,
  PLANNER_REORDER_RECIPE_IN_DAY,
  //PLANNER_PUBLIC_LOAD_FROM_URL,
  //PLANNER_PUBLIC_SAVE_TO_URL,
  PLANNER_CLEAR_WORK,
  PLANNER_SET_CREATING,
  PLANNER_SET_EDITING_ID,
  PLANNER_SET_PLAN_NAME,
  PLANNER_SET_PLAN_DATA
} = actionTypes;

const recipeOne = {key: "ABC", id: 503, owner_id: 1, title: "Pho",         recipe_image: "nobsc-pho"};
const recipeTwo = {key: "XYZ", id: 821, owner_id: 1, title: "Coffee Cake", recipe_image: "nobsc-coffee-cake"};
const empty = {
  1: [],  2: [],  3: [],  4: [],  5: [],  6: [],  7: [],
  8: [],  9: [], 10: [], 11: [], 12: [], 13: [], 14: [],
 15: [], 16: [], 17: [], 18: [], 19: [], 20: [], 21: [],
 22: [], 23: [], 24: [], 25: [], 26: [], 27: [], 28: []
};
const lists1 = {
  1: [], 2: [recipeOne], 3: [],  4: [],  5: [],  6: [],  7: [],
  8: [],  9: [], 10: [], 11: [], 12: [], 13: [], 14: [],
 15: [], 16: [], 17: [], 18: [], 19: [], 20: [], 21: [],
 22: [], 23: [], 24: [], 25: [], 26: [], 27: [], 28: []
};

const initialState: IPlannerState = {
  isLoading:   false,
  creating:    false,
  editingId:   null,
  publicUrl:   "",
  expanded:    false,
  expandedDay: null,
  planName:    "",
  recipeListsInsideDays: empty
};

describe('planner reducer', () => {
  it('returns initial state', () => {
    const state =   undefined;
    const reducer = plannerReducer(state, {type: PLANNER_CLEAR_WORK});
    expect(reducer).toEqual(initialState);
  });

  it('handles actions of type PLANNER_CLICK_DAY on a day', () => {
    const state =   {...initialState};
    const reducer = plannerReducer(state, {type: PLANNER_CLICK_DAY, day: 1});
    expect(reducer.expanded).toEqual(true);
    expect(reducer.expandedDay).toEqual(1);
  });

  it('handles actions of type PLANNER_CLICK_DAY on the expanded day', () => {
    const state = {...initialState};
    state.expanded = true;
    state.expandedDay = 1;
    const reducer = plannerReducer(state, {type: PLANNER_CLICK_DAY, day: 1});
    expect(reducer).toEqual(initialState);
  });

  it('handles actions of type PLANNER_ADD_RECIPE_TO_DAY', () => {
    const state = {...initialState};
    const reducer = plannerReducer(state, {type: PLANNER_ADD_RECIPE_TO_DAY, day: 2, recipe: recipeOne});
    expect(reducer.recipeListsInsideDays).toEqual(lists1);
  });

  it('handles actions of type PLANNER_REMOVE_RECIPE_FROM_DAY', () => {
    const state = {...initialState};
    state.recipeListsInsideDays = lists1;
    const reducer = plannerReducer(state, {type: PLANNER_REMOVE_RECIPE_FROM_DAY, day: 2, index: 0})
    expect(reducer).toEqual(initialState);
  });

  it('handles actions of type PLANNER_REORDER_RECIPE_IN_DAY', () => {
    const state =       {...initialState};
    state.expanded =    true;
    state.expandedDay = 2;
    state.recipeListsInsideDays[2] = [recipeOne, recipeTwo];
    const reducer = plannerReducer(state, {type: PLANNER_REORDER_RECIPE_IN_DAY, dragIndex: 0, hoverIndex: 1});
    expect(reducer.recipeListsInsideDays[2]).toEqual([recipeTwo, recipeOne]);
  });

  /*it('handles actions of type PLANNER_PUBLIC_LOAD_FROM_URL', () => {
    const actual = plannerReducer(, {type: PLANNER_PUBLIC_LOAD_FROM_URL});
    const expected = ;
    expect(actual).toEqual(expected);
  });

  it('handles actions of type PLANNER_PUBLIC_SAVE_TO_URL', () => {
    const actual = plannerReducer(, {type: PLANNER_PUBLIC_SAVE_TO_URL});
    const expected = ;
    expect(actual).toEqual(expected);
  });*/
  
  it('handles actions of type PLANNER_CLEAR_WORK', () => {
    const state =       {...initialState};
    state.creating =    true;
    state.expanded =    true;
    state.expandedDay = 2;
    state.recipeListsInsideDays = lists1;
    const reducer = plannerReducer(state, {type: PLANNER_CLEAR_WORK})
    expect(reducer).toEqual(initialState);
  });

  it('handles actions of type PLANNER_SET_CREATING', () => {
    const state =   {...initialState};
    const reducer = plannerReducer(state, {type: PLANNER_SET_CREATING});
    expect(reducer.creating).toEqual(true);
  });

  it('handles actions of type PLANNER_SET_EDITING_ID', () => {
    const state =   {...initialState};
    const reducer = plannerReducer(state, {type: PLANNER_SET_EDITING_ID, id: 1});
    expect(reducer.editingId).toEqual(1);
  });

  it('handles actions of type PLANNER_SET_PLAN_NAME', () => {
    const state =   {...initialState};
    const reducer = plannerReducer(state, {type: PLANNER_SET_PLAN_NAME, name: "Plan B"})
    expect(reducer.planName).toEqual("Plan B");
  });

  it('handles actions of type PLANNER_SET_PLAN_DATA', () => {
    const state =   {...initialState};
    const reducer = plannerReducer(state, {type: PLANNER_SET_PLAN_DATA, data: lists1})
    expect(reducer.recipeListsInsideDays).toEqual(lists1);
  });
});