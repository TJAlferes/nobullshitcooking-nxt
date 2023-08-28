import { PlanData } from '../new-plan/types';



const initialState: State = {
  isLoading:   false,
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
  const { day } = action;

  if (day === expandedDay) return {...state, expandedDay: null};
  return {...state, expandedDay: day};
};

export const planDetailReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case CLICK_DAY: return clickedDay(state, action);
    case LOAD:      return {...state, ...{plan_name: action.plan_name, plan_data: action.plan_data}};
    default:        return state;
  }
};



export const clickDay = (day: number) => ({type: CLICK_DAY, day});

export const load = (planName: string, planData: PlanData) => ({type: LOAD, planName, planData});

export const actionTypes = {
  CLICK_DAY: 'CLICK_DAY',
  LOAD:      'LOAD'
} as const;

const { CLICK_DAY, LOAD } = actionTypes;

export type State = {
  isLoading:   boolean;
  expandedDay: number | null;
  plan_name:   string;
  plan_data:   PlanData;
};

export type Actions = ClickDay | Load;

export type ClickDay = {
  type: typeof actionTypes.CLICK_DAY;
  day:  number;
};

type Load = {
  type:      typeof actionTypes.LOAD;
  plan_name: string;
  plan_data: PlanData;
};



// TO DO: move shared types to one location

export type PlanDataView = PlanRecipeView[][];

export type PlanRecipeView = {
  image_url: string;
  title:     string;
  recipe_id: string;
};

// url
export type Recipe = {
  key:          string;
  recipe_id:    string;
  owner_id:     string;
  title:        string;
  recipe_image: string;
};
