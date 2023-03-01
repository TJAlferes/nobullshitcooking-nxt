//import '../../utils/publicPlanner/convertPlannerToUrl';

import { actionTypes, IData, IRecipe } from './types';

const {
  CLICK_DAY,
  ADD_RECIPE_TO_DAY,
  REMOVE_RECIPE_FROM_DAY,
  REORDER_RECIPE_IN_DAY,
  //PUBLIC_LOAD_FROM_URL,
  //PUBLIC_SAVE_TO_URL,
  CLEAR_WORK,
  SET_CREATING,
  SET_EDITING_ID,
  SET_PLAN_NAME,
  SET_PLAN_DATA,
} = actionTypes;

export const clickDay = (day: number) => ({type: CLICK_DAY, day});

export const addRecipeToDay =      (day: number, recipe: IRecipe) => ({type: ADD_RECIPE_TO_DAY, day, recipe});
export const removeRecipeFromDay = (day: number, index: number) =>   ({type: REMOVE_RECIPE_FROM_DAY, day, index});

export const reorderRecipeInDay = (dragIndex: number, hoverIndex: number) => ({type: REORDER_RECIPE_IN_DAY, dragIndex, hoverIndex});

//export const publicLoadFromUrl = preLoadedPlan => ({type: PUBLIC_LOAD_FROM_URL, preLoadedPlan});  // Be careful this doesn't trigger an unterminating loop.
//export const publicSaveToUrl =   () =>            ({type: PUBLIC_SAVE_TO_URL});                   // Be careful this doesn't trigger an unterminating loop.

export const clearWork = () => ({type: CLEAR_WORK});

export const setCreating =  () =>             ({type: SET_CREATING});
export const setEditingId = (id: number) =>   ({type: SET_EDITING_ID, id});
export const setPlanName =  (name: string) => ({type: SET_PLAN_NAME, name});
export const setPlanData =  (data: IData) =>  ({type: SET_PLAN_DATA, data});
