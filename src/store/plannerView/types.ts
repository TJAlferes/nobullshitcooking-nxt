export const actionTypes = {
  CLICK_DAY: 'CLICK_DAY',
  LOAD:      'LOAD'
} as const;

/*

State

*/

export interface IState {
  isLoading:   boolean;
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

// url
export interface IRecipe {
  key:          string;
  id:           number;
  owner_id:     number;
  title:        string;
  recipe_image: string;
}

/*

Actions

*/

export type Actions = IClickDay | ILoad;

export interface IClickDay {
  type: typeof actionTypes.CLICK_DAY;
  day:  number;
}

interface ILoad {
  type:     typeof actionTypes.LOAD;
  planName: string;
  planData: IData;
}