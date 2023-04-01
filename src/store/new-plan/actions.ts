//import '../../utils/publicPlanner/convertPlannerToUrl';
import { actionTypes, PlanData, Recipe } from './types';

const {
  CLICK_DAY,
  ADD_RECIPE_TO_DAY,
  REMOVE_RECIPE_FROM_DAY,
  REORDER_RECIPE_IN_DAY,

  CLEAR_WORK,
  SET_CREATING,
  SET_EDITING_ID,
  SET_PLAN_NAME,
  SET_PLAN_DATA,

  //PUBLIC_LOAD_FROM_URL,
  //PUBLIC_SAVE_TO_URL,
} = actionTypes;

export const clickDay =            (day: number) =>                           ({type: CLICK_DAY, day});
export const addRecipeToDay =      (day: number, recipe: Recipe) =>           ({type: ADD_RECIPE_TO_DAY, day, recipe});
export const removeRecipeFromDay = (day: number, index: number) =>            ({type: REMOVE_RECIPE_FROM_DAY, day, index});
export const reorderRecipeInDay =  (dragIndex: number, hoverIndex: number) => ({type: REORDER_RECIPE_IN_DAY, dragIndex, hoverIndex});

export const clearWork =    () =>                ({type: CLEAR_WORK});
export const setCreating =  () =>                ({type: SET_CREATING});
export const setEditingId = (id: number) =>      ({type: SET_EDITING_ID, id});
export const setPlanName =  (name: string) =>    ({type: SET_PLAN_NAME, name});
export const setPlanData =  (data: PlanData) =>  ({type: SET_PLAN_DATA, data});

//export const publicLoadFromUrl = preLoadedPlan => ({type: PUBLIC_LOAD_FROM_URL, preLoadedPlan});  // Be careful this doesn't trigger an unterminating loop.
//export const publicSaveToUrl =   () =>            ({type: PUBLIC_SAVE_TO_URL});                   // Be careful this doesn't trigger an unterminating loop.
