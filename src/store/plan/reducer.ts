import { actionTypes, State, Actions, ClickDay } from './types';

const { CLICK_DAY, LOAD } = actionTypes;

const initialState: State = {
  isLoading:   false,
  expandedDay: null,
  planName:    "",
  planData: {
     1: [],  2: [],  3: [],  4: [],  5: [],  6: [],  7: [],
     8: [],  9: [], 10: [], 11: [], 12: [], 13: [], 14: [],
    15: [], 16: [], 17: [], 18: [], 19: [], 20: [], 21: [],
    22: [], 23: [], 24: [], 25: [], 26: [], 27: [], 28: []
  }
};

const clickDay = (state: State, action: ClickDay): State => {
  const { expandedDay } = state;
  const { day } = action;

  if (day === expandedDay) return {...state, expandedDay: null};
  return {...state, expandedDay: day};
};

export const plannerViewReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case CLICK_DAY: return clickDay(state, action);
    case LOAD:      return {...state, ...{planName: action.planName, planData: action.planData}};
    default:        return state;
  }
};
