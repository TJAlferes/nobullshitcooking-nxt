import type {
  EquipmentView,
  IngredientView,
  RecipeOverview,
  PlanView
} from '../../../shared/data/state';
import type { PlanDataView } from '../../plan/detail/state';

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

export function userDataReducer(userData: UserData, action) {
  switch (action.type) {
    case 'set_initial_user_data': {
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
    }
    case 'set_user_data': {
      return {
        ...userData,
        [action.key]: action.value
      };
    }
    default: {
      throw new Error("Unknown action: ", action.type);
    }
  }
}

export const setInitialUserData = (initialUserData: UserData) => ({
  type: 'set_initial_user_data',
  ...initialUserData
});

export const setUserData = (
  key:   keyof UserData,
  value: Partial<UserData>
) => ({
  type: 'set_user_data',
  key,
  value
});

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

// TO DO: move shared types to one location

export type FriendshipView = {
  user_id:  number;
  username: string;
  avatar:   string;
  status:   string;
};  // FriendView ???

export type PlanView = {
  plan_id:   string;
  owner_id:  string;
  plan_name: string;
  plan_data: PlanDataView;
};
