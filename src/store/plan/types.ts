import { PlanData } from '../new-plan/types';

export const actionTypes = {
  CLICK_DAY: 'CLICK_DAY',
  LOAD:      'LOAD'
} as const;

/*

State

*/

export type State = {
  isLoading:   boolean;
  expandedDay: number | null;
  plan_name:   string;
  plan_data:   PlanData;
};

// TO DO: move shared types to one location

// url
export type Recipe = {
  key:          string;
  id:           number;
  owner_id:     number;
  title:        string;
  recipe_image: string;
};

/*

Actions

*/

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
