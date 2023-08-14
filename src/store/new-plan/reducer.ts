import update from 'immutability-helper';

import {
  actionTypes,
  State,
  Actions,
  ClickDay,
  AddRecipeToDay,
  RemoveRecipeFromDay,
  ReorderRecipeInDay
} from './types';

const {
  CLICK_DAY,
  ADD_RECIPE_TO_DAY,
  REMOVE_RECIPE_FROM_DAY,
  REORDER_RECIPE_IN_DAY,

  CLEAR_WORK,
  SET_CREATING,
  SET_PLAN_NAME,
  SET_EDITING_ID,
  SET_PLAN_DATA,

  //PUBLIC_LOAD_FROM_URL,
  //PUBLIC_SAVE_TO_URL,
} = actionTypes;

const initialState: State = {
  isLoading:   false,
  creating:    false,
  editingId:   null,
  publicUrl:   "",
  expandedDay: null,
  plan_name:   "",
  plan_data: {
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

const addRecipeToDay = (state: State, action: AddRecipeToDay): State => {
  const { day, recipe } = action;

  return update(state, {
    plan_data: {
      [day]: {
        $push: [recipe]
      }
    }
  });
};

const removeRecipeFromDay = (state: State, action: RemoveRecipeFromDay): State => {
  const { day, index } = action;

  return update(state, {
    plan_data: {
      [day]: {
        $splice: [[index, 1]]
      }
    }
  });
};

const reorderRecipeInDay = (state: State, action: ReorderRecipeInDay): State => {
  const { expandedDay, plan_data } = state;
  const { dragIndex, hoverIndex } = action;
  if (!expandedDay ) return state;

  const draggedRecipe = plan_data[expandedDay][dragIndex];

  return update(state, {
    plan_data: {
      [expandedDay]: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, draggedRecipe]]
      }
    }
  });
};

/*const publicLoadFromUrl = (state, action) => {
  const { preLoadedPlan } = action;
  return {...state, ...{planData: preLoadedPlan}};
};*/

/*const publicSaveToUrl = (state, action) => {
  const { planData } = state;
  const newPublicUrl = convertPlannerToUrl(planData);
  return {...state, ...{publicUrl: newPublicUrl}}
};*/

export const newPlanReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case CLICK_DAY:              return clickDay(state, action);
    case ADD_RECIPE_TO_DAY:      return addRecipeToDay(state, action);
    case REMOVE_RECIPE_FROM_DAY: return removeRecipeFromDay(state, action);
    case REORDER_RECIPE_IN_DAY:  return reorderRecipeInDay(state, action);

    case CLEAR_WORK:             return {...state, ...initialState};
    case SET_CREATING:           return {...state, creating: true};
    case SET_PLAN_NAME:          return {...state, plan_name: action.name};
    case SET_EDITING_ID:         return {...state, editingId: action.id};
    case SET_PLAN_DATA:          return {...state, ...{plan_data: action.data}};  // sufficient?

    //case PUBLIC_LOAD_FROM_URL: return publicLoadFromUrl(state, action);
    //case PUBLIC_SAVE_TO_URL:   return publicSaveToUrl(state, action);

    default:                     return state;
  }
};
