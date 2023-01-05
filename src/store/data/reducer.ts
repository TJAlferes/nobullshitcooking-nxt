import { actionTypes, IDataState, DataActions } from './types';

const { DATA_GET_INITIAL_DATA, DATA_GET_DATA, DATA_GET_INITIAL_USER_DATA, DATA_GET_USER_DATA } = actionTypes;

const initialState: IDataState = {
  cuisines: [],
  equipment: [],
  equipmentTypes: [],
  ingredients: [],
  ingredientTypes: [],
  measurements: [],
  methods: [],
  products: [],
  productCategories: [],
  productTypes: [],
  recipes: [],
  recipeTypes: [],
  
  myFavoriteRecipes: [],
  myFriendships: [],
  myPlans: [],
  myPrivateEquipment: [],
  myPrivateIngredients: [],
  myPrivateRecipes: [],
  myPublicRecipes: [],
  mySavedRecipes: []
};

export const dataReducer = (state = initialState, action: DataActions): IDataState => {
  switch (action.type) {
    case DATA_GET_INITIAL_DATA:
      return {
        ...state,
        ...{
          cuisines: action.initialData.cuisines,
          equipment: action.initialData.equipment,
          equipmentTypes: action.initialData.equipmentTypes,
          ingredients: action.initialData.ingredients,
          ingredientTypes: action.initialData.ingredientTypes,
          measurements: action.initialData.measurements,
          methods: action.initialData.methods,
          recipes: action.initialData.recipes,
          recipeTypes: action.initialData.recipeTypes,
          products: action.initialData.products,
          productCategories: action.initialData.productCategories,
          productTypes: action.initialData.productTypes
        }
      };
    case DATA_GET_DATA: return {...state, ...{[action.data.key]: action.data.value}};
    case DATA_GET_INITIAL_USER_DATA:
      return {
        ...state,
        ...{
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
    case DATA_GET_USER_DATA: return {...state, ...{[action.userData.key]: action.userData.value}};
    default: return state;
  }
};