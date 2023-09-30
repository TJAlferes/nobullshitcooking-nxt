import { createContext, useContext, useReducer } from 'react';
import type { Dispatch, ReactNode, Reducer } from 'react';

import type { PlanDataView } from '../../plan/detail';
import type { EquipmentView, IngredientView, RecipeOverview } from '../../shared/data/state';

export const UserDataContext = createContext<UserData | null>(null);

export const UserDataDispatchContext = createContext<Dispatch<Action> | null>(null);

export function UserDataProvider({ children }: UserDataProviderProps) {
  const [ data, dispatch ] = useReducer(userDataReducer, initialUserData);

  return (
    <UserDataContext.Provider value={data}>
      <UserDataDispatchContext.Provider value={dispatch}>
        {children}
      </UserDataDispatchContext.Provider>
    </UserDataContext.Provider>
  );
}

type UserDataProviderProps = {
  children: ReactNode;
};

export function useUserData() {
  const data = useContext(UserDataContext);
  if (!data) {
    throw new Error("No data context");
  }
  return data;
}

export function useUserDataDispatch() {
  const dispatch = useContext(UserDataDispatchContext);
  if (!dispatch) {
    throw new Error("No data dispatch context");
  }
  return dispatch;
}

const initialUserData: UserData = {
  my_friendships:         [],
  my_public_plans:        [],
  my_public_recipes:      [],
  my_favorite_recipes:    [],
  my_private_equipment:   [],
  my_private_ingredients: [],
  my_private_plans:       [],
  my_private_recipes:     [],
  my_saved_recipes:       []
};

export const userDataReducer: Reducer<State, Action> = (userData, action) => {
  switch (action.type) {
    case 'set_initial_user_data': {
      return {
        ...userData,
        my_friendships:         action.my_friendships,
        my_public_plans:        action.my_public_plans,
        my_public_recipes:      action.my_public_recipes,
        my_favorite_recipes:    action.my_favorite_recipes,
        my_private_equipment:   action.my_private_equipment,
        my_private_ingredients: action.my_private_ingredients,
        my_private_plans:       action.my_private_plans,
        my_private_recipes:     action.my_private_recipes,
        my_saved_recipes:       action.my_saved_recipes
      };
    }
    case 'set_user_data': {
      return {
        ...userData,
        [action.key]: action.value
      };
    }
    default: {
      throw new Error("Unknown action");
    }
  }
}

export const setInitialUserData = (initialUserData: UserData) => ({
  type: 'set_initial_user_data',
  ...initialUserData
});

export const setUserData = (key: keyof UserData, value: Partial<UserData>) => ({
  type: 'set_user_data',
  key,
  value
});

type State = UserData;

export type UserData = {
  my_friendships:         FriendshipView[];
  my_public_plans:        PlanView[];
  my_public_recipes:      RecipeOverview[];
  my_favorite_recipes:    RecipeOverview[];
  my_private_equipment:   EquipmentView[];
  my_private_ingredients: IngredientView[];
  my_private_plans:       PlanView[];
  my_private_recipes:     RecipeOverview[];
  my_saved_recipes:       RecipeOverview[];
};

export type Action = SetInitialUserData | SetUserData;

export type SetInitialUserData = UserData & {         
  type: 'set_initial_user_data';
};

export type SetUserData = {
  type: 'set_user_data';
  key:   keyof UserData;
  value: Partial<UserData>;
};
