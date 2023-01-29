import { init, getInitialData, getInitialUserData } from '../../../src/store/data/actions';
import { actionTypes } from '../../../src/store/data/types';

const { INIT, GET_INITIAL_DATA, GET_INITIAL_USER_DATA } = actionTypes;

describe('init action creator', () => {
  it('returns the correct action type', () => {
    expect(init().type).toEqual(INIT);
  });
});

describe ('getInitialData action creator', () => {
  const initialData = {
    cuisines: [{"id": 1, "name": "Russian", "nation": "Russia"}],
    officialEquipment: [
      {
        id: 1,
        equipment_type_id: 4,
        owner_id: 1,
        name: "Chopstick",
        equipment_type_name: "Dining",
        description: "It works.",
        image: "nobsc-chopstick"
      }
    ],
    equipmentTypes: [{"id": 1, "name": "Cleaning"}],
    officialIngredients: [
      {
        id: 1,
        ingredient_type_id: 1,
        owner_id: 1,
        ingredient_type_name: "Fish",
        brand: null,
        variety: "Chilean",
        name: "Salmon",
        description: "Tasty.",
        image: "nobsc-salmon"
      }
    ],
    ingredientTypes: [{"id": 1, "name": "Fish"}],
    measurements: [{"id": 1, "name": "teaspoon"}],
    methods: [{"id": 1, "name": "No-Cook"}],
    products: [],
    productCategories: [],
    productTypes: [],
    officialRecipes: [
      {
        id: 1,
        owner_id: 1,
        recipe_type_id: 1,
        cuisine_id: 1,
        title: "Tasty",
        recipe_image: "nobsc-tasty"
      }
    ],
    recipeTypes: [{"id": 1, "name": "Drink"}]
  };

  it('returns the correct action type', () => {
    expect(getInitialData(initialData).type).toEqual(GET_INITIAL_DATA);
  });

  it('returns the correct initialData', () => {
    expect(getInitialData(initialData).initialData).toEqual(initialData);
  });
});

describe('getInitialDataFailed action creator', () => {
  it('returns the correct action type', () => {
    expect(getInitialDataFailed().type)
      .toEqual(GET_INITIAL_FAILED);
  });
});

describe('getCuisines action creator', () => {
  const cuisines = [
    {"id": 1, "name": "Russian", "nation": "Russia"},
    {"id": 2, "name": "German", "nation": "Germany"}
  ];

  it('returns the correct action type', () => {
    expect(getCuisines(cuisines).type).toEqual(GET_CUISINES);
  });

  it('returns the correct cuisines', () => {
    expect(getCuisines(cuisines).cuisines).toEqual(cuisines);
  });
});

describe('getCuisinesFailed action creator', () => {
  it('returns the correct action type', () => {
    expect(getCuisinesFailed().type).toEqual(GET_CUISINES_FAILED);
  });
});

describe('getEquipments action creator', () => {
  const equipment = [
    {
      id: 1,
      equipment_type_id: 4,
      owner_id: 1,
      name: "Chopstick",
      equipment_type_name: "Dining",
      description: "It works.",
      image: "nobsc-chopstick"
    }
  ];

  it('returns the correct action type', () => {
    expect(getEquipments(equipment).type).toEqual(GET_EQUIPMENTS);
  });

  it('returns the correct equipment', () => {
    expect(getEquipments(equipment).equipment).toEqual(equipment);
  });
});

describe('getEquipmentsFailed action creator', () => {
  it('returns the correct action type', () => {
    expect(getEquipmentsFailed().type).toEqual(GET_EQUIPMENTS_FAILED);
  });
});

describe('getEquipmentTypes action creator', () => {
  const equipmentTypes = [
    {"id": 1, "name": "Cleaning"},
    {"id": 2, "name": "Preparing"}
  ];

  it('returns the correct action type', () => {
    expect(getEquipmentTypes(equipmentTypes).type)
      .toEqual(GET_EQUIPMENT_TYPES);
  });

  it('returns the correct equipmentTypes', () => {
    expect(getEquipmentTypes(equipmentTypes).equipmentTypes)
      .toEqual(equipmentTypes);
  });
});

describe('getEquipmentTypesFailed action creator', () => {
  it('returns the correct action type', () => {
    expect(getEquipmentTypesFailed().type)
      .toEqual(GET_EQUIPMENT_TYPES_FAILED);
  });
});

describe('getIngredients action creator', () => {
  const ingredients = [
    {
      id: 1,
      ingredient_type_id: 1,
      owner_id: 1,
      ingredient_type_name: "Fish",
      brand: null,
      variety: "Chilean",
      name: "Salmon",
      description: "Tasty.",
      image: "nobsc-salmon"
    }
  ];

  it('returns the correct action type', () => {
    expect(getIngredients(ingredients).type).toEqual(GET_INGREDIENTS);
  });

  it('returns the correct ingredients', () => {
    expect(getIngredients(ingredients).ingredients).toEqual(ingredients);
  });
});

describe('getIngredientsFailed action creator', () => {
  it('returns the correct action type', () => {
    expect(getIngredientsFailed().type)
      .toEqual(GET_INGREDIENTS_FAILED);
  });
});

describe('getIngredientTypes action creator', () => {
  const ingredientTypes = [
    {"id": 1, "name": "Fish"},
    {"id": 2, "name": "Shellfish"}
  ];

  it('returns the correct action type', () => {
    expect(getIngredientTypes(ingredientTypes).type)
      .toEqual(GET_INGREDIENT_TYPES);
  });

  it('returns the correct ingredientTypes', () => {
    expect(getIngredientTypes(ingredientTypes).ingredientTypes)
      .toEqual(ingredientTypes);
  });
});

describe('getIngredientTypesFailed action creator', () => {
  it('returns the correct action type', () => {
    expect(getIngredientTypesFailed().type)
      .toEqual(GET_INGREDIENT_TYPES_FAILED);
  });
});

describe('getMeasurements action creator', () => {
  const measurements = [
    {"id": 1, "name": "teaspoon"},
    {"id": 2, "name": "Tablespoon"}
  ];

  it('returns the correct action type', () => {
    expect(getMeasurements(measurements).type)
      .toEqual(GET_MEASUREMENTS);
  });

  it('returns the correct measurements', () => {
    expect(getMeasurements(measurements).measurements)
      .toEqual(measurements);
  });
});

describe('getMeasurementsFailed action creator', () => {
  it('returns the correct action type', () => {
    expect(getMeasurementsFailed().type)
      .toEqual(GET_MEASUREMENTS_FAILED);
  });
});

describe('getMethods action creator', () => {
  const methods = [
    {"id": 1, "name": "No-Cook"},
    {"id": 2, "name": "Chill"}
  ];

  it('returns the correct action type', () => {
    expect(getMethods(methods).type).toEqual(GET_METHODS);
  });

  it('returns the correct methods', () => {
    expect(getMethods(methods).methods).toEqual(methods);
  });
});

describe('getMethodsFailed action creator', () => {
  it('returns the correct action type', () => {
    expect(getMethodsFailed().type).toEqual(GET_METHODS_FAILED);
  });
});

describe('getProducts action creator', () => {
  const products = [
    {
      id: 1,
      product_category_id: 1,
      product_type_id: 1,
      brand: null,
      variety: "Chilean",
      name: "Salmon",
      fullname: "Chilean Salmon",
      description: "Tasty.",
      specs: {},
      image: "nobsc-salmon"
    }
  ];

  it('returns the correct action type', () => {
    expect(getProducts(products).type).toEqual(GET_PRODUCTS);
  });

  it('returns the correct products', () => {
    expect(getProducts(products).products).toEqual(products);
  });
});

describe('getProductsFailed action creator', () => {
  it('returns the correct action type', () => {
    expect(getProductsFailed().type).toEqual(GET_PRODUCTS_FAILED);
  });
});

describe('getProductCategories action creator', () => {
  const productCategories = [
    {"id": 1, "name": "Men"},
    {"id": 2, "name": "Women"}
  ];

  it('returns the correct action type', () => {
    expect(getProductCategories(productCategories).type)
      .toEqual(GET_PRODUCT_CATEGORIES);
  });

  it('returns the correct productCategories', () => {
    expect(getProductCategories(productCategories).productCategories)
      .toEqual(productCategories);
  });
});

describe('getProductCategoriesFailed action creator', () => {
  it('returns the correct action type', () => {
    expect(getProductCategoriesFailed().type)
      .toEqual(GET_PRODUCT_CATEGORIES_FAILED);
  });
});

describe('getProductTypes action creator', () => {
  const productTypes = [
    {"id": 1, "name": "Long Sleeve"},
    {"id": 2, "name": "Short Sleeve"}
  ];

  it('returns the correct action type', () => {
    expect(getProductTypes(productTypes).type)
      .toEqual(GET_PRODUCT_TYPES);
  });

  it('returns the correct productTypes', () => {
    expect(getProductTypes(productTypes).productTypes)
      .toEqual(productTypes);
  });
});

describe('getProductTypesFailed action creator', () => {
  it('returns the correct action type', () => {
    expect(getProductTypesFailed().type)
      .toEqual(GET_PRODUCT_TYPES_FAILED);
  });
});

describe('getRecipes action creator', () => {
  const recipes = [
    {
      id: 1,
      owner_id: 1,
      recipe_type_id: 1,
      cuisine_id: 1,
      title: "Tasty",
      recipe_image: "nobsc-tasty"
    }
  ];

  it('returns the correct action type', () => {
    expect(getRecipes(recipes).type).toEqual(GET_RECIPES);
  });

  it('returns the correct recipes', () => {
    expect(getRecipes(recipes).recipes).toEqual(recipes);
  });
});

describe('getRecipesFailed action creator', () => {
  it('returns the correct action type', () => {
    expect(getRecipesFailed().type).toEqual(GET_RECIPES_FAILED);
  });
});

describe('getRecipeTypes action creator', () => {
  const recipeTypes = [
    {"id": 1, "name": "Drink"},
    {"id": 2, "name": "Appetizer"}
  ];

  it('returns the correct action type', () => {
    expect(getRecipeTypes(recipeTypes).type).toEqual(GET_RECIPE_TYPES);
  });

  it('returns the correct recipeTypes', () => {
    expect(getRecipeTypes(recipeTypes).recipeTypes).toEqual(recipeTypes);
  });
});

describe('getRecipeTypesFailed action creator', () => {
  it('returns the correct action type', () => {
    expect(getRecipeTypesFailed().type)
      .toEqual(GET_RECIPE_TYPES_FAILED);
  });
});



//describe('getInitialUserData action creator', () => {});

describe('getMyFavoriteRecipes action creator', () => {
  const myFavoriteRecipes = [
    {
      id: 1,
      owner_id: 1,
      recipe_type_id: 1,
      cuisine_id: 1,
      title: "Tasty",
      recipe_image: "nobsc-tasty"
    }
  ];

  it('returns the correct action type', () => {
    expect(getMyFavoriteRecipes(myFavoriteRecipes).type)
      .toEqual(GET_MY_FAVORITE_RECIPES);
  });

  it('returns the correct myFavoriteRecipes', () => {
    expect(getMyFavoriteRecipes(myFavoriteRecipes).myFavoriteRecipes)
      .toEqual(myFavoriteRecipes);
  });
});

describe('getMyFavoriteRecipesFailed action creator', () => {
  it('returns the correct action type', () => {
    expect(getMyFavoriteRecipesFailed().type)
      .toEqual(GET_MY_FAVORITE_RECIPES_FAILED);
  });
});

describe('getMyFriendships action creator', () => {
  const myFriendships = [
    {
      user_id: 1749,
      username: "SnowboarderMike",
      avatar: "SnowboarderMike",
      status: "accepted"
    }
  ];

  it('returns the correct action type', () => {
    expect(getMyFriendships(myFriendships).type)
      .toEqual(GET_MY_FRIENDSHIPS);
  });

  it('returns the correct ', () => {
    expect(getMyFriendships(myFriendships).myFriendships)
      .toEqual(myFriendships);
  });
});

describe('getMyFriendshipsFailed action creator', () => {
  it('returns the correct action type', () => {
    expect(getMyFriendshipsFailed().type)
      .toEqual(GET_MY_FRIENDSHIPS_FAILED);
  });
});

describe('getMyPlans action creator', () => {
  const myPlans = [
    {
      id: 98234,
      name: "Plan A",
      data: {
        1: [],  2: [],  3: [],  4: [],  5: [],  6: [],  7: [],
        8: [],  9: [], 10: [], 11: [], 12: [], 13: [], 14: [],
       15: [], 16: [], 17: [], 18: [], 19: [], 20: [], 21: [],
       22: [], 23: [], 24: [], 25: [], 26: [], 27: [], 28: []
      }
    }
  ];

  it('returns the correct action type', () => {
    expect(getMyPlans(myPlans).type).toEqual(GET_MY_PLANS);
  });

  it('returns the correct ', () => {
    expect(getMyPlans(myPlans).myPlans).toEqual(myPlans);
  });
});

describe('getMyPlansFailed action creator', () => {
  it('returns the correct action type', () => {
    expect(getMyPlansFailed().type).toEqual(GET_MY_PLANS_FAILED);
  });
});

describe('getMyPrivateEquipments action creator', () => {
  const myPrivateEquipment = [
    {
      id: 1,
      equipment_type_id: 3,
      owner_id: 3908,
      name: "My Teapot",
      equipment_type_name: "Dining",
      description: "From grandmother.",
      image: "my-teapot"
    }
  ];

  it('returns the correct action type', () => {
    expect(getMyPrivateEquipments(myPrivateEquipment).type)
      .toEqual(GET_MY_PRIVATE_EQUIPMENTS);
  });

  it('returns the correct myPrivateEquipment', () => {
    expect(
      getMyPrivateEquipments(myPrivateEquipment).myPrivateEquipment
    ).toEqual(myPrivateEquipment);
  });
});

describe('getMyPrivateEquipmentsFailed action creator', () => {
  it('returns the correct action type', () => {
    expect(getMyPrivateEquipmentsFailed().type)
      .toEqual(GET_MY_PRIVATE_EQUIPMENTS_FAILED);
  });
});

describe('getMyPrivateIngredients action creator', () => {
  const myPrivateIngredients = [
    {
      id: 8927,
      ingredient_type_id: 18,
      owner_id: 1,
      ingredient_type_name: "Product",
      brand: "Uncle Bob",
      variety: "DOUBLE HOT",
      name: "HOT Sauce",
      description: "From Uncle Bob.",
      image: "hot-sauce"
    }
  ];

  it('returns the correct action type', () => {
    expect(getMyPrivateIngredients(myPrivateIngredients).type)
      .toEqual(GET_MY_PRIVATE_INGREDIENTS);
  });

  it('returns the correct myPrivateIngredients', () => {
    expect(
      getMyPrivateIngredients(myPrivateIngredients).myPrivateIngredients
    ).toEqual(myPrivateIngredients);
  });
});

describe('getMyPrivateIngredientsFailed action creator', () => {
  it('returns the correct action type', () => {
    expect(getMyPrivateIngredientsFailed().type)
      .toEqual(GET_MY_PRIVATE_INGREDIENTS_FAILED);
  });
});

describe('getMyPrivateRecipes action creator', () => {
  const myPrivateRecipes = [
    {
      id: 841,
      owner_id: 3908,
      recipe_type_id: 1,
      cuisine_id: 1,
      title: "Tasty",
      recipe_image: "nobsc-tasty"
    }
  ];

  it('returns the correct action type', () => {
    expect(getMyPrivateRecipes(myPrivateRecipes).type)
      .toEqual(GET_MY_PRIVATE_RECIPES);
  });

  it('returns the correct myPrivateRecipes', () => {
    expect(getMyPrivateRecipes(myPrivateRecipes).myPrivateRecipes)
      .toEqual(myPrivateRecipes);
  });
});

describe('getMyPrivateRecipesFailed action creator', () => {
  it('returns the correct action type', () => {
    expect(getMyPrivateRecipesFailed().type)
      .toEqual(GET_MY_PRIVATE_RECIPES_FAILED);
  });
});

describe('getMyPublicRecipes action creator', () => {
  const myPublicRecipes = [
    {
      id: 841,
      owner_id: 3908,
      recipe_type_id: 1,
      cuisine_id: 1,
      title: "Tasty",
      recipe_image: "nobsc-tasty"
    }
  ];

  it('returns the correct action type', () => {
    expect(getMyPublicRecipes(myPublicRecipes).type)
      .toEqual(GET_MY_PUBLIC_RECIPES);
  });

  it('returns the correct myPublicRecipes', () => {
    expect(getMyPublicRecipes(myPublicRecipes).myPublicRecipes)
      .toEqual(myPublicRecipes);
  });
});

describe('getMyPublicRecipesFailed action creator', () => {
  it('returns the correct action type', () => {
    expect(getMyPublicRecipesFailed().type)
      .toEqual(GET_MY_PUBLIC_RECIPES_FAILED);
  });
});

describe('getMySavedRecipes action creator', () => {
  const mySavedRecipes = [
    {
      id: 1,
      owner_id: 1,
      recipe_type_id: 1,
      cuisine_id: 1,
      title: "Tasty",
      recipe_image: "nobsc-tasty"
    }
  ];

  it('returns the correct action type', () => {
    expect(getMySavedRecipes(mySavedRecipes).type)
      .toEqual(GET_MY_SAVED_RECIPES);
  });

  it('returns the correct mySavedRecipes', () => {
    expect(getMySavedRecipes(mySavedRecipes).mySavedRecipes)
      .toEqual(mySavedRecipes);
  });
});

describe('getMySavedRecipesFailed action creator', () => {
  it('returns the correct action type', () => {
    expect(getMySavedRecipesFailed().type)
      .toEqual(GET_MY_SAVED_RECIPES_FAILED);
  });
});