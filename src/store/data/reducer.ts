import { actionTypes, IDataState, DataActions } from './types';

const {
  DATA_GET_INITIAL_DATA,
  DATA_GET_DATA,
  DATA_GET_INITIAL_USER_DATA,
  DATA_GET_USER_DATA
} = actionTypes;

const initialState: IDataState = {
  officialContent: [],
  contentTypes: [],
  cuisines: [],
  officialEquipment: [],
  equipmentTypes: [],
  officialIngredients: [],
  ingredientTypes: [],
  measurements: [],
  methods: [],
  officialRecipes: [],
  recipeTypes: [],
  products: [],
  productCategories: [],
  productTypes: [],
  
  myContent: [],
  myFavoriteRecipes: [],
  myFriendships: [],
  myPlans: [],
  myPrivateEquipment: [],
  myPrivateIngredients: [],
  myPrivateRecipes: [],
  myPublicRecipes: [],
  mySavedRecipes: []
};

export const dataReducer = (
  state = initialState,
  action: DataActions
): IDataState => {
  switch (action.type) {
    case DATA_GET_INITIAL_DATA:
      return {
        ...state,
        ...{
          officialContent: action.initialData.officialContent,
          contentTypes: action.initialData.contentTypes,
          cuisines: action.initialData.cuisines,
          officialEquipment: action.initialData.officialEquipment,
          equipmentTypes: action.initialData.equipmentTypes,
          officialIngredients: action.initialData.officialIngredients,
          ingredientTypes: action.initialData.ingredientTypes,
          measurements: action.initialData.measurements,
          methods: action.initialData.methods,
          officialRecipes: action.initialData.officialRecipes,
          recipeTypes: action.initialData.recipeTypes,
          products: action.initialData.products,
          productCategories: action.initialData.productCategories,
          productTypes: action.initialData.productTypes
        }
      };
    
    case DATA_GET_DATA:
      return {...state, ...{[action.data.key]: action.data.value}};
    
    case DATA_GET_INITIAL_USER_DATA:
      return {
        ...state,
        ...{
          myContent: action.initialUserData.myContent,
          myPublicRecipes: action.initialUserData.myPublicRecipes,
          myPrivateEquipment: action.initialUserData.myPrivateEquipment,
          myPrivateIngredients: action.initialUserData.myPrivateIngredients,
          myPrivateRecipes: action.initialUserData.myPrivateRecipes,
          myFavoriteRecipes: action.initialUserData.myFavoriteRecipes,
          mySavedRecipes: action.initialUserData.mySavedRecipes,
          myPlans: action.initialUserData.myPlans,
          myFriendships: action.initialUserData.myFriendships
        }
      };
    
    case DATA_GET_USER_DATA:
      return {...state, ...{[action.userData.key]: action.userData.value}};
    
    default: return state;
  }
};