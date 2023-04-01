export const actionTypes = {
  CLICK_DAY:              'CLICK_DAY',
  ADD_RECIPE_TO_DAY:      'ADD_RECIPE_TO_DAY',
  REMOVE_RECIPE_FROM_DAY: 'REMOVE_RECIPE_FROM_DAY',
  REORDER_RECIPE_IN_DAY:  'REORDER_RECIPE_IN_DAY',

  CLEAR_WORK:             'CLEAR_WORK',
  SET_CREATING:           'SET_CREATING',
  SET_EDITING_ID:         'SET_EDITING_ID',
  SET_PLAN_NAME:          'SET_PLAN_NAME',
  SET_PLAN_DATA:          'SET_PLAN_DATA',

  //PUBLIC_SAVE_TO_URL:     'PUBLIC_SAVE_TO_URL',
  //PUBLIC_LOAD_FROM_URL:   'PUBLIC_LOAD_FROM_URL',
} as const;

/*

State

*/

export type State = {
  isLoading:   boolean;
  creating:    boolean;
  editingId:   number | null;
  publicUrl:   string;
  expandedDay: number | null;
  planName:    string;
  planData:    PlanData;
};

export interface PlanData {
  [index: number|string]: any;
   1: Recipe[];  2: Recipe[];  3: Recipe[];  4: Recipe[];  5: Recipe[];  6: Recipe[];  7: Recipe[];
   8: Recipe[];  9: Recipe[]; 10: Recipe[]; 11: Recipe[]; 12: Recipe[]; 13: Recipe[]; 14: Recipe[];
  15: Recipe[]; 16: Recipe[]; 17: Recipe[]; 18: Recipe[]; 19: Recipe[]; 20: Recipe[]; 21: Recipe[];
  22: Recipe[]; 23: Recipe[]; 24: Recipe[]; 25: Recipe[]; 26: Recipe[]; 27: Recipe[]; 28: Recipe[];
}

export type Recipe = {
  key:          string;
  id:           number;
  title:        string;
  recipe_image: string;
  owner_id:     number;
};

/*

Actions

*/

export type Actions =
  | ClickDay
  | AddRecipeToDay
  | RemoveRecipeFromDay
  | ReorderRecipeInDay
  | ClearWork
  | SetCreating
  | SetEditingId
  | SetPlanName
  | SetPlanData;

export type ClickDay = {
  type: typeof actionTypes.CLICK_DAY;
  day:  number;
};

export type AddRecipeToDay = {
  type:   typeof actionTypes.ADD_RECIPE_TO_DAY;
  day:    number;
  recipe: Recipe;
};

export type RemoveRecipeFromDay = {
  type:  typeof actionTypes.REMOVE_RECIPE_FROM_DAY;
  day:   number;
  index: number;
};

export type ReorderRecipeInDay = {
  type:       typeof actionTypes.REORDER_RECIPE_IN_DAY;
  dragIndex:  number;
  hoverIndex: number;
};

type ClearWork = {
  type: typeof actionTypes.CLEAR_WORK;
};

type SetCreating = {
  type: typeof actionTypes.SET_CREATING;
};

type SetEditingId = {
  type: typeof actionTypes.SET_EDITING_ID;
  id:   number | null;
};

type SetPlanName = {
  type: typeof actionTypes.SET_PLAN_NAME;
  name: string;
};

type SetPlanData = {
  type: typeof actionTypes.SET_PLAN_DATA;
  data: PlanData;
};
