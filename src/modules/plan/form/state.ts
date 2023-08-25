import update from 'immutability-helper';

//import '../../utils/publicPlanner/convertPlannerToUrl';



const initialState: State = {
  isLoading:   false,
  creating:    false,
  editingId:   undefined,
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

const clickedDay = (state: State, action: ClickDay): State => {
  const { expandedDay } = state;
  const { day }         = action;

  if (day === expandedDay) return {...state, expandedDay: null};

  return {...state, expandedDay: day};
};

const addedRecipeToDay = (state: State, action: AddRecipeToDay): State => {
  const { day, recipe } = action;

  return update(state, {
    plan_data: {
      [day]: {
        $push: [recipe]
      }
    }
  });
};

const removedRecipeFromDay = (state: State, action: RemoveRecipeFromDay): State => {
  const { day, index } = action;

  return update(state, {
    plan_data: {
      [day]: {
        $splice: [[index, 1]]
      }
    }
  });
};

const reorderedRecipeInDay = (state: State, action: ReorderRecipeInDay): State => {
  const { expandedDay, plan_data } = state;
  const { dragIndex, hoverIndex }  = action;

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

/*const publicLoadedFromUrl = (state, action) => {
  const { preLoadedPlan } = action;
  return {...state, ...{planData: preLoadedPlan}};
};*/

/*const publicSavedToUrl = (state, action) => {
  const { planData } = state;
  const newPublicUrl = convertPlannerToUrl(planData);
  return {...state, ...{publicUrl: newPublicUrl}}
};*/

export const planFormReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case CLICK_DAY:              return clickedDay(state, action);
    case ADD_RECIPE_TO_DAY:      return addedRecipeToDay(state, action);
    case REMOVE_RECIPE_FROM_DAY: return removedRecipeFromDay(state, action);
    case REORDER_RECIPE_IN_DAY:  return reorderedRecipeInDay(state, action);

    case CLEAR_WORK:             return {...state, ...initialState};
    case SET_CREATING:           return {...state, creating: true};
    case SET_PLAN_NAME:          return {...state, plan_name: action.name};
    case SET_EDITING_ID:         return {...state, editingId: action.id};
    case SET_PLAN_DATA:          return {...state, ...{plan_data: action.data}};  // sufficient?

    //case PUBLIC_LOAD_FROM_URL: return publicLoadedFromUrl(state, action);
    //case PUBLIC_SAVE_TO_URL:   return publicSavedToUrl(state, action);

    default:                     return state;
  }
};



export const clickDay            = (day: number) =>                           ({type: CLICK_DAY, day});
export const addRecipeToDay      = (day: number, recipe: Recipe) =>           ({type: ADD_RECIPE_TO_DAY, day, recipe});
export const removeRecipeFromDay = (day: number, index: number) =>            ({type: REMOVE_RECIPE_FROM_DAY, day, index});
export const reorderRecipeInDay  = (dragIndex: number, hoverIndex: number) => ({type: REORDER_RECIPE_IN_DAY, dragIndex, hoverIndex});

export const clearWork    = () =>               ({type: CLEAR_WORK});
export const setCreating  = () =>               ({type: SET_CREATING});
export const setEditingId = (id: number) =>     ({type: SET_EDITING_ID, id});
export const setPlanName  = (name: string) =>   ({type: SET_PLAN_NAME, name});
export const setPlanData  = (data: PlanData) => ({type: SET_PLAN_DATA, data});

//export const publicLoadFromUrl = preLoadedPlan => ({type: PUBLIC_LOAD_FROM_URL, preLoadedPlan});  // Be careful this doesn't trigger an unterminating loop.
//export const publicSaveToUrl =   () =>            ({type: PUBLIC_SAVE_TO_URL});                   // Be careful this doesn't trigger an unterminating loop.



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

/*

State

*/

export type State = {
  isLoading:   boolean;
  creating:    boolean;
  editingId:   string | undefined;
  publicUrl:   string;
  expandedDay: number | null;
  plan_name:   string;
  plan_data:   PlanData;
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
  id:   string | undefined;
};

type SetPlanName = {
  type: typeof actionTypes.SET_PLAN_NAME;
  name: string;
};

type SetPlanData = {
  type: typeof actionTypes.SET_PLAN_DATA;
  data: PlanData;
};



// TO DO: move shared types to one location

export interface PlanData {
  [index: number|string]: any;
   1: Recipe[];  2: Recipe[];  3: Recipe[];  4: Recipe[];  5: Recipe[];  6: Recipe[];  7: Recipe[];
   8: Recipe[];  9: Recipe[]; 10: Recipe[]; 11: Recipe[]; 12: Recipe[]; 13: Recipe[]; 14: Recipe[];
  15: Recipe[]; 16: Recipe[]; 17: Recipe[]; 18: Recipe[]; 19: Recipe[]; 20: Recipe[]; 21: Recipe[];
  22: Recipe[]; 23: Recipe[]; 24: Recipe[]; 25: Recipe[]; 26: Recipe[]; 27: Recipe[]; 28: Recipe[];
}

export type Recipe = {
  key:          string;
  recipe_id:    string;
  title:        string;
  recipe_image: string;
  owner_id:     string;
};
