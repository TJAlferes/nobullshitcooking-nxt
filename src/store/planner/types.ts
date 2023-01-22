export const actionTypes = {
  CLICK_DAY:              'CLICK_DAY',
  ADD_RECIPE_TO_DAY:      'ADD_RECIPE_TO_DAY',
  REMOVE_RECIPE_FROM_DAY: 'REMOVE_RECIPE_FROM_DAY',
  REORDER_RECIPE_IN_DAY:  'REORDER_RECIPE_IN_DAY',
  //PUBLIC_SAVE_TO_URL: 'PUBLIC_SAVE_TO_URL',
  //PUBLIC_LOAD_FROM_URL: 'PUBLIC_LOAD_FROM_URL',
  CLEAR_WORK:     'CLEAR_WORK',
  SET_CREATING:   'SET_CREATING',
  SET_EDITING_ID: 'SET_EDITING_ID',
  SET_PLAN_NAME:  'SET_PLAN_NAME',
  SET_PLAN_DATA:  'SET_PLAN_DATA'
} as const;

/*

State

*/

export interface IState {
  isLoading:   boolean;
  creating:    boolean;
  editingId:   number | null;
  publicUrl:   string;
  expandedDay: number | null;
  planName:    string;
  planData:    IData;
}

export interface IData {
  [index: number|string]: any;
   1: IRecipe[];  2: IRecipe[];  3: IRecipe[];  4: IRecipe[];  5: IRecipe[];  6: IRecipe[];  7: IRecipe[];
   8: IRecipe[];  9: IRecipe[]; 10: IRecipe[]; 11: IRecipe[]; 12: IRecipe[]; 13: IRecipe[]; 14: IRecipe[];
  15: IRecipe[]; 16: IRecipe[]; 17: IRecipe[]; 18: IRecipe[]; 19: IRecipe[]; 20: IRecipe[]; 21: IRecipe[];
  22: IRecipe[]; 23: IRecipe[]; 24: IRecipe[]; 25: IRecipe[]; 26: IRecipe[]; 27: IRecipe[]; 28: IRecipe[];
}

export interface IRecipe {
  key:          string;
  id:           number;
  title:        string;
  recipe_image: string;
  owner_id:     number;
}

/*

Actions

*/

export type Actions =
  | IClickDay
  | IAddRecipeToDay
  | IRemoveRecipeFromDay
  | IReorderRecipeInDay
  | IClearWork
  | ISetCreating
  | ISetEditingId
  | ISetPlanName
  | ISetPlanData;

export interface IClickDay {
  type: typeof actionTypes.CLICK_DAY;
  day:  number;
}

export interface IAddRecipeToDay {
  type:   typeof actionTypes.ADD_RECIPE_TO_DAY;
  day:    number;
  recipe: IRecipe;
}

export interface IRemoveRecipeFromDay {
  type:  typeof actionTypes.REMOVE_RECIPE_FROM_DAY;
  day:   number;
  index: number;
}

export interface IReorderRecipeInDay {
  type:       typeof actionTypes.REORDER_RECIPE_IN_DAY;
  dragIndex:  number;
  hoverIndex: number;
}

interface IClearWork {
  type: typeof actionTypes.CLEAR_WORK;
}

interface ISetCreating {
  type: typeof actionTypes.SET_CREATING;
}

interface ISetEditingId {
  type: typeof actionTypes.SET_EDITING_ID;
  id:   number | null;
}

interface ISetPlanName {
  type: typeof actionTypes.SET_PLAN_NAME;
  name: string;
}

interface ISetPlanData {
  type: typeof actionTypes.SET_PLAN_DATA;
  data: IData;
}