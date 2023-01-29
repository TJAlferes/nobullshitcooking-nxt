import axios from 'axios';
import { call, put } from 'redux-saga/effects';

import { NOBSCAPI } from '../../../src/config/NOBSCAPI';
import {
  getInitialData,
  getData,
  getInitialUserData,
  getUserData
} from '../../../src/store/data/actions';
import {
  getInitialDataSaga,
  getCuisinesSaga,
  getEquipmentsSaga,
  getEquipmentTypesSaga,
  getIngredientsSaga,
  getIngredientTypesSaga,
  getMeasurementsSaga,
  getMethodsSaga,
  getProductsSaga,
  getProductCategoriesSaga,
  getProductTypesSaga,
  getRecipesSaga,
  getRecipeTypesSaga,

  getInitialUserDataSaga,
  getMyFavoriteRecipesSaga,
  getMyFriendshipsSaga,
  getMyPlansSaga,
  getMyPrivateEquipmentsSaga,
  getMyPrivateIngredientsSaga,
  getMyPrivateRecipesSaga,
  getMyPublicRecipesSaga,
  getMySavedRecipesSaga
} from '../../../src/store/data/sagas';

const endpoint = NOBSCAPI;

describe('getInitialDataSaga', () => {
  it('should dispatch initialData and succeeded if data found', () => {
    const iter = getInitialDataSaga();
    const res = {
      data: {
        officialContent: [],
        contentTypes: [{id: 1, parent_id: 0, name: "Page", path: "/page"}],
        cuisines: [{"id": 1, "name": "Russian", "nation": "Russia"}],
        measurements: [{"id": 1, "name": "teaspoon"}],
        methods: [{"id": 1, "name": "No-Cook"}],
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
      }
    };

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/data-init`));
    expect(iter.next(res).value)
      .toEqual(put(getInitialData(res.data)));
    expect(iter.next().value).toEqual(put(getInitialDataSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getInitialDataSaga();

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/data-init`));
    expect(iter.throw('error').value)
      .toEqual(put(getInitialDataFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getContentSaga', () => {
  it('should dispatch content and succeeded if data found', () => {
    const iter = getContentSaga();
    const res = {
      data: [
        {
          id: 1,
          title: "How To",
          author: "NOBSC",
          image: "nobsc-grilling",
          //snippet: "Blah..."
        }
      ]
    };

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/content`));
    expect(iter.next(res).value).toEqual(put(getContent(res.data)));
    expect(iter.next().value).toEqual(put(getContentSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getContentSaga();

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/content`));
    expect(iter.throw('error').value)
      .toEqual(put(getContentFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getContentTypesSaga', () => {
  it('should dispatch contentTypes and succeeded if data found', () => {
    const iter = getContentTypesSaga();
    const res = {
      data: [
        {id: 1, parent_id: 0, name: "Page", path: "/page"},
        {id: 2, parent_id: 0, name: "Post", path: "/post"}
      ]
    };

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/content-type`));
    expect(iter.next(res).value)
      .toEqual(put(getContentTypes(res.data)));
    expect(iter.next().value).toEqual(put(getContentTypesSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getContentTypesSaga();

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/content-type`));
    expect(iter.throw('error').value)
      .toEqual(put(getContentTypesFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getCuisinesSaga', () => {
  it('should dispatch cuisines and succeeded if data found', () => {
    const iter = getCuisinesSaga();
    const res = {data: [{id: 1, name: "Russian", nation: "Russia"}]};

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/cuisine`));
    expect(iter.next(res).value).toEqual(put(getCuisines(res.data)));
    expect(iter.next().value).toEqual(put(getCuisinesSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getCuisinesSaga();

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/cuisine`));
    expect(iter.throw('error').value)
      .toEqual(put(getCuisinesFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getEquipmentsSaga', () => {
  it('should dispatch equipments and succeeded if data found', () => {
    const iter = getEquipmentsSaga();
    const res = {
      data: [
        {
          id: 1,
          equipment_type_id: 4,
          owner_id: 1,
          name: "Chopstick",
          equipment_type_name: "Dining",
          description: "It works.",
          image: "nobsc-chopstick"
        }
      ]
    };

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/equipment/official/all`));
    expect(iter.next(res).value).toEqual(put(getEquipments(res.data)));
    expect(iter.next().value).toEqual(put(getEquipmentsSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getEquipmentsSaga();

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/equipment/official/all`));
    expect(iter.throw('error').value)
      .toEqual(put(getEquipmentsFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getEquipmentTypesSaga', () => {
  it('should dispatch equipment types and succeeded if data found', () => {
    const iter = getEquipmentTypesSaga();
    const res = {data: [{"id": 1, "name": "Cleaning"}]};

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/equipment-type`));
    expect(iter.next(res).value)
      .toEqual(put(getEquipmentTypes(res.data)));
    expect(iter.next().value)
      .toEqual(put(getEquipmentTypesSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getEquipmentTypesSaga();

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/equipment-type`));
    expect(iter.throw('error').value)
      .toEqual(put(getEquipmentTypesFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getIngredientsSaga', () => {
  it('should dispatch ingredients and succeeded if data found', () => {
    const iter = getIngredientsSaga();
    const res = {
      data: [
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
      ]
    };

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/ingredient/official/all`));
    expect(iter.next(res).value).toEqual(put(getIngredients(res.data)));
    expect(iter.next().value).toEqual(put(getIngredientsSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getIngredientsSaga();

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/ingredient/official/all`));
    expect(iter.throw('error').value)
      .toEqual(put(getIngredientsFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getIngredientTypesSaga', () => {
  it('should dispatch ingredient types and succeeded if data found', () => {
    const iter = getIngredientTypesSaga();
    const res = {data: [{"id": 1, "name": "Fish"}]};

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/ingredient-type`));
    expect(iter.next(res).value)
      .toEqual(put(getIngredientTypes(res.data)));
    expect(iter.next().value)
      .toEqual(put(getIngredientTypesSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getIngredientTypesSaga();

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/ingredient-type`));
    expect(iter.throw('error').value)
      .toEqual(put(getIngredientTypesFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getMeasurementsSaga', () => {
  it('should dispatch measurements and succeeded if data found', () => {
    const iter = getMeasurementsSaga();
    const res = {data: [{id: 1, name: "teaspoon"}]};

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/measurement`));
    expect(iter.next(res).value)
      .toEqual(put(getMeasurements(res.data)));
    expect(iter.next().value).toEqual(put(getMeasurementsSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getMeasurementsSaga();

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/measurement`));
    expect(iter.throw('error').value)
      .toEqual(put(getMeasurementsFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getMethodsSaga', () => {
  it('should dispatch methods and succeeded if data found', () => {
    const iter = getMethodsSaga();
    const res = {data: [{"id": 1, "name": "No-Cook"}]};

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/method`));
    expect(iter.next(res).value)
      .toEqual(put(getMethods(res.data)));
    expect(iter.next().value)
      .toEqual(put(getMethodsSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getMethodsSaga();

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/method`));
    expect(iter.throw('error').value)
      .toEqual(put(getMethodsFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getProductsSaga', () => {
  it('should dispatch products and succeeded if data found', () => {
    const iter = getProductsSaga();
    const res = {
      data: [
        {
          id: 1,
          product_category_id: 1,
          product_type_id: 1,
          brand: null,
          variety: null,
          name: "Some Item",
          fullname: "Some Item",
          description: "High quality.",
          specs: {},
          image: "nobsc-tasty"
        }
      ]
    };

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/product`));
    expect(iter.next(res).value).toEqual(put(getProducts(res.data)));
    expect(iter.next().value).toEqual(put(getProductsSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getProductsSaga();

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/product`));
    expect(iter.throw('error').value).toEqual(put(getProductsFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getProductCategoriesSaga', () => {
  it('should dispatch product categories and succeeded if data found', () => {
    const iter = getProductCategoriesSaga();
    const res = {data: [{"id": 1, "name": "Fish"}]};

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/product-category`));
    expect(iter.next(res).value)
      .toEqual(put(getProductCategories(res.data)));
    expect(iter.next().value)
      .toEqual(put(getProductCategoriesSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getProductCategoriesSaga();

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/product-category`));
    expect(iter.throw('error').value)
      .toEqual(put(getProductCategoriesFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getProductTypesSaga', () => {
  it('should dispatch product types and succeeded if data found', () => {
    const iter = getProductTypesSaga();
    const res = {data: [{"id": 1, "name": "Fish"}]};

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/product-type`));
    expect(iter.next(res).value)
      .toEqual(put(getProductTypes(res.data)));
    expect(iter.next().value)
      .toEqual(put(getProductTypesSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getProductTypesSaga();

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/product-type`));
    expect(iter.throw('error').value)
      .toEqual(put(getProductTypesFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getRecipesSaga', () => {
  it('should dispatch recipes and succeeded if data found', () => {
    const iter = getRecipesSaga();
    const res = {
      data: [
        {
          id: 1,
          owner_id: 1,
          recipe_type_id: 1,
          cuisine_id: 1,
          title: "Tasty",
          recipe_image: "nobsc-tasty"
        }
      ]
    };

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/recipe/official/all`));
    expect(iter.next(res).value).toEqual(put(getRecipes(res.data)));
    expect(iter.next().value).toEqual(put(getRecipesSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getRecipesSaga();

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/recipe/official/all`));
    expect(iter.throw('error').value)
      .toEqual(put(getRecipesFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getRecipeTypesSaga', () => {
  it('should dispatch recipe types and succeeded if data found', () => {
    const iter = getRecipeTypesSaga();
    const res = {data: [{"id": 1, "name": "Drink"}]};

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/recipe-type`));
    expect(iter.next(res).value).toEqual(put(getRecipeTypes(res.data)));
    expect(iter.next().value).toEqual(put(getRecipeTypesSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getRecipeTypesSaga();

    expect(iter.next().value)
      .toEqual(call([axios, axios.get], `${endpoint}/recipe-type`));
    expect(iter.throw('error').value)
      .toEqual(put(getRecipeTypesFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});



describe('getInitialUserDataSaga', () => {
  it('should dispatch initialUserData and succeeded if data found', () => {
    const iter = getInitialUserDataSaga();
    const res = {
      data: {
        myContent: [],
        myFavoriteRecipes: [],
        myFriendships: [],
        myPlans: [],
        myPrivateEquipment: [
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
        myPrivateIngredients: [
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
        myPrivateRecipes: [
          {
            id: 8,
            owner_id: 8,
            recipe_type_id: 4,
            cuisine_id: 4,
            title: "My Tasty",
            recipe_image: "my-tasty"
          }
        ],
        myPublicRecipes: [],
        mySavedRecipes: [
          {
            id: 1,
            owner_id: 1,
            recipe_type_id: 1,
            cuisine_id: 1,
            title: "Tasty",
            recipe_image: "nobsc-tasty"
          }
        ],
      }
    };

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/data-init`,
      {},
      {withCredentials: true}
    ));
    expect(iter.next(res).value)
      .toEqual(put(getInitialUserData(res.data)));
    expect(iter.next().value)
      .toEqual(put(getInitialUserDataSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getInitialUserDataSaga();

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/data-init`,
      {},
      {withCredentials: true}
    ));
    expect(iter.throw('error').value)
      .toEqual(put(getInitialUserDataFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getMyContentSaga', () => {
  it('should dispatch content and succeeded if data found', () => {
    const iter = getMyContentSaga();
    const res = {
      data: [
        {
          id: 1,
          title: "A Great Grilling Setup",
          author: "Person",
          image: "a-great-grilling-setup",
          //snippet: "Blah..."
        }
      ]
    };

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/content/all`,
      {},
      {withCredentials: true}
    ));
    expect(iter.next(res).value).toEqual(put(getMyContent(res.data)));
    expect(iter.next().value).toEqual(put(getMyContentSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getMyContentSaga();

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/content/all`,
      {},
      {withCredentials: true}
    ));
    expect(iter.throw('error').value)
      .toEqual(put(getMyContentFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getMyFavoriteRecipesSaga', () => {
  it('should dispatch recipes and succeeded if data found', () => {
    const iter = getMyFavoriteRecipesSaga();
    const res = {
      data: [
        {
          id: 1,
          owner_id: 1,
          recipe_type_id: 1,
          cuisine_id: 1,
          title: "Tasty",
          recipe_image: "nobsc-tasty"
        }
      ]
    };

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/favorite-recipe`,
      {},
      {withCredentials: true}
    ));
    expect(iter.next(res).value)
      .toEqual(put(getMyFavoriteRecipes(res.data)));
    expect(iter.next().value)
      .toEqual(put(getMyFavoriteRecipesSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getMyFavoriteRecipesSaga();

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/favorite-recipe`,
      {},
      {withCredentials: true}
    ));
    expect(iter.throw('error').value)
      .toEqual(put(getMyFavoriteRecipesFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getMyFriendshipsSaga', () => {
  it('should dispatch friendships and succeeded if data found', () => {
    const iter = getMyFriendshipsSaga();
    const res = {
      data: [
        {
          user_id: 1749,
          username: "SnowboarderMike",
          avatar: "SnowboarderMike",
          status: "accepted"
        }
      ]
    };

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/friendship`,
      {},
      {withCredentials: true}
    ));
    expect(iter.next(res).value)
      .toEqual(put(getMyFriendships(res.data)));
    expect(iter.next().value).toEqual(put(getMyFriendshipsSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getMyFriendshipsSaga();

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/friendship`,
      {},
      {withCredentials: true}
    ));
    expect(iter.throw('error').value)
      .toEqual(put(getMyFriendshipsFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getMyPlansSaga', () => {
  it('should dispatch plans and succeeded if data found', () => {
    const iter = getMyPlansSaga();
    const res = {
      data: [
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
      ]
    };

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/plan/all`,
      {},
      {withCredentials: true}
    ));
    expect(iter.next(res).value).toEqual(put(getMyPlans(res.data)));
    expect(iter.next().value).toEqual(put(getMyPlansSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getMyPlansSaga();

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/plan/all`,
      {},
      {withCredentials: true}
    ));
    expect(iter.throw('error').value).toEqual(put(getMyPlansFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getMyPrivateEquipmentsSaga', () => {
  it('should dispatch equipments and succeeded if data found', () => {
    const iter = getMyPrivateEquipmentsSaga();
    const res = {
      data: [
        {
          id: 1,
          equipment_type_id: 3,
          owner_id: 3908,
          name: "My Teapot",
          equipment_type_name: "Dining",
          description: "From grandmother.",
          image: "my-teapot"
        }
      ]
    };

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/equipment/all`,
      {},
      {withCredentials: true}
    ));
    expect(iter.next(res).value)
      .toEqual(put(getMyPrivateEquipments(res.data)));
    expect(iter.next().value)
      .toEqual(put(getMyPrivateEquipmentsSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getMyPrivateEquipmentsSaga();

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/equipment/all`,
      {},
      {withCredentials: true}
    ));
    expect(iter.throw('error').value)
      .toEqual(put(getMyPrivateEquipmentsFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getMyPrivateIngredientsSaga', () => {
  it('should dispatch ingredients and succeeded if data found', () => {
    const iter = getMyPrivateIngredientsSaga();
    const res = {
      data: [
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
      ]
    };

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/ingredient/all`,
      {},
      {withCredentials: true}
    ));
    expect(iter.next(res).value)
      .toEqual(put(getMyPrivateIngredients(res.data)));
    expect(iter.next().value)
      .toEqual(put(getMyPrivateIngredientsSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getMyPrivateIngredientsSaga();

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/ingredient/all`,
      {},
      {withCredentials: true}
    ));
    expect(iter.throw('error').value)
      .toEqual(put(getMyPrivateIngredientsFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getMyPrivateRecipesSaga', () => {
  it('should dispatch recipes and succeeded if data found', () => {
    const iter = getMyPrivateRecipesSaga();
    const res = {
      data: [
        {
          id: 841,
          owner_id: 3908,
          recipe_type_id: 1,
          cuisine_id: 1,
          title: "Tasty",
          recipe_image: "nobsc-tasty"
        }
      ]
    };

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/recipe/private/all`,
      {},
      {withCredentials: true}
    ));
    expect(iter.next(res).value)
      .toEqual(put(getMyPrivateRecipes(res.data)));
    expect(iter.next().value)
      .toEqual(put(getMyPrivateRecipesSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getMyPrivateRecipesSaga();

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/recipe/private/all`,
      {},
      {withCredentials: true}
    ));
    expect(iter.throw('error').value)
      .toEqual(put(getMyPrivateRecipesFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getMyPublicRecipesSaga', () => {
  it('should dispatch recipes and succeeded if data found', () => {
    const iter = getMyPublicRecipesSaga();
    const res = {
      data: [
        {
          id: 841,
          owner_id: 3908,
          recipe_type_id: 1,
          cuisine_id: 1,
          title: "Tasty",
          recipe_image: "nobsc-tasty"
        }
      ]
    };

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/recipe/public/all`,
      {},
      {withCredentials: true}
    ));
    expect(iter.next(res).value)
      .toEqual(put(getMyPublicRecipes(res.data)));
    expect(iter.next().value)
      .toEqual(put(getMyPublicRecipesSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getMyPublicRecipesSaga();

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/recipe/public/all`,
      {},
      {withCredentials: true}
    ));
    expect(iter.throw('error').value)
      .toEqual(put(getMyPublicRecipesFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});

describe('getMySavedRecipesSaga', () => {
  it('should dispatch recipes and succeeded if data found', () => {
    const iter = getMySavedRecipesSaga();
    const res = {
      data: [
        {
          id: 1,
          owner_id: 1,
          recipe_type_id: 1,
          cuisine_id: 1,
          title: "Tasty",
          recipe_image: "nobsc-tasty"
        }
      ]
    };

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/saved-recipe`,
      {},
      {withCredentials: true}
    ));
    expect(iter.next(res).value)
      .toEqual(put(getMySavedRecipes(res.data)));
    expect(iter.next().value)
      .toEqual(put(getMySavedRecipesSucceeded()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });

  it('should dispatch failed if data not found', () => {
    const iter = getMySavedRecipesSaga();

    expect(iter.next().value).toEqual(call(
      [axios, axios.post],
      `${endpoint}/user/saved-recipe`,
      {},
      {withCredentials: true}
    ));
    expect(iter.throw('error').value)
      .toEqual(put(getMySavedRecipesFailed()));
    expect(iter.next()).toEqual({done: true, value: undefined});
  });
});