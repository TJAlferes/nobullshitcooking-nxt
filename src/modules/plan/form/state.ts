import update from 'immutability-helper';



const initialState: State = {
  isLoading:   false,
  expandedDay: null,
  plan_name:   "",
  plan_data:   [[], [], [], [], [], [], []]
};

export function planFormReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case CLICK_DAY:              return clickedDay(state, action);
    case ADD_RECIPE_TO_DAY:      return addedRecipeToDay(state, action);
    case REMOVE_RECIPE_FROM_DAY: return removedRecipeFromDay(state, action);
    case REORDER_RECIPE_IN_DAY:  return reorderedRecipeInDay(state, action);
    case CLEAR_WORK:             return {...state, ...initialState};
    case SET_PLAN_NAME:          return {...state, plan_name: action.name};
    case SET_PLAN_DATA:          return {...state, plan_data: action.data};
    default: return state;
  }
}

function clickedDay(state: State, action: ClickDay): State {
  if (action.day === state.expandedDay) {
    return {...state, expandedDay: null};
  }
  return {...state, expandedDay: action.day};
}

function addedRecipeToDay(state: State, action: AddRecipeToDay): State {
  const plan_data = [...state.plan_data];
  plan_data[action.day - 1]?.push(action.recipe);
  return {...state, plan_data};
}

function removedRecipeFromDay(state: State, action: RemoveRecipeFromDay): State {
  const plan_data = [...state.plan_data];
  plan_data[action.day - 1]?.splice(action.index, 1);
  return {...state, plan_data};
}

function reorderedRecipeInDay(state: State, action: ReorderRecipeInDay): State {
  const { expandedDay, plan_data } = state;
  const { dragIndex, hoverIndex }  = action;
  if (!expandedDay ) {
    return state;
  }
  const draggedRecipe = plan_data[expandedDay - 1]![dragIndex]!;
  return update(state, {
    plan_data: {
      [expandedDay - 1]: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, draggedRecipe]]
      }
    }
  });
}



export const clickDay = (day: number) => ({type: CLICK_DAY, day});

export const addRecipeToDay = (day: number, recipe: Recipe) => ({
  type: ADD_RECIPE_TO_DAY,
  day,
  recipe
});

export const removeRecipeFromDay = (day: number, index: number) => ({
  type: REMOVE_RECIPE_FROM_DAY,
  day,
  index
});

export const reorderRecipeInDay = (dragIndex: number, hoverIndex: number) => ({
  type: REORDER_RECIPE_IN_DAY,
  dragIndex,
  hoverIndex
});

export const clearWork = () => ({type: CLEAR_WORK});

export const setPlanName = (name: string) => ({type: SET_PLAN_NAME, name});

export const setPlanData = (data: PlanData) => ({type: SET_PLAN_DATA, data});



export const actionTypes = {
  CLICK_DAY:              'CLICK_DAY',
  ADD_RECIPE_TO_DAY:      'ADD_RECIPE_TO_DAY',
  REMOVE_RECIPE_FROM_DAY: 'REMOVE_RECIPE_FROM_DAY',
  REORDER_RECIPE_IN_DAY:  'REORDER_RECIPE_IN_DAY',
  CLEAR_WORK:             'CLEAR_WORK',
  SET_PLAN_NAME:          'SET_PLAN_NAME',
  SET_PLAN_DATA:          'SET_PLAN_DATA'
} as const;

const {
  CLICK_DAY,
  ADD_RECIPE_TO_DAY,
  REMOVE_RECIPE_FROM_DAY,
  REORDER_RECIPE_IN_DAY,
  CLEAR_WORK,
  SET_PLAN_NAME,
  SET_PLAN_DATA
} = actionTypes;

export type State = {
  isLoading:   boolean;
  expandedDay: number | null;
  plan_name:   string;
  plan_data:   PlanData;
};

export type Actions =
  | ClickDay
  | AddRecipeToDay
  | RemoveRecipeFromDay
  | ReorderRecipeInDay
  | ClearWork
  | SetPlanName
  | SetPlanData;

export type ClickDay = {
  type: typeof actionTypes.CLICK_DAY;
  day:  number;
};

export type AddRecipeToDay = {
  type:   typeof actionTypes.ADD_RECIPE_TO_DAY;
  day:    number;
  recipe: PlanRecipe;
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

type SetPlanName = {
  type: typeof actionTypes.SET_PLAN_NAME;
  name: string;
};

type SetPlanData = {
  type: typeof actionTypes.SET_PLAN_DATA;
  data: PlanData;
};

// TO DO: move shared types to one location

export type PlanData = PlanRecipe[][];

export type PlanRecipe = {
  image_url: string;
  title:     string;
  recipe_id: string;
};

export type Recipe = {
  key:          string;
  recipe_id:    string;
  title:        string;
  recipe_image: string;
  owner_id:     string;
};
