import {
  clickDay,
  addRecipeToDay,
  removeRecipeFromDay,
  reorderRecipeInDay,
  //publicLoadFromUrl,
  //publicSaveToUrl,
  clearWork,
  setCreating,
  setEditingId,
  setPlanName,
  setPlanData
} from '../../../src/store/planner/actions';
import { actionTypes } from '../../../src/store/planner/types';

const {
  CLICK_DAY,
  ADD_RECIPE_TO_DAY,
  REMOVE_RECIPE_FROM_DAY,
  REORDER_RECIPE_IN_DAY,
  //PUBLIC_LOAD_FROM_URL,
  //PUBLIC_SAVE_TO_URL,
  CLEAR_WORK,
  SET_CREATING,
  SET_EDITING_ID,
  SET_PLAN_NAME,
  SET_PLAN_DATA
} = actionTypes;

const recipeOne = {key: "ABC", id: 503, owner_id: 1, title: "Pho", recipe_image: "nobsc-pho"};

describe('clickDay action creator', () => {
  it('returns the correct action type', () => {
    expect(clickDay(4).type).toEqual(CLICK_DAY);
  });

  it('returns the correct day', () => {
    expect(clickDay(4).day).toEqual(4);
  });
});

describe('addRecipeToDay action creator', () => {
  it('returns the correct action type', () => {
    expect(addRecipeToDay(5, recipeOne).type).toEqual(ADD_RECIPE_TO_DAY);
  });

  it('returns the correct day', () => {
    expect(addRecipeToDay(5, recipeOne).day).toEqual(5);
  });

  it('returns the correct recipe', () => {
    expect(addRecipeToDay(5, recipeOne).recipe).toEqual(recipeOne);
  });
});

describe('removeRecipeFromDay action creator', () => {
  it('returns the correct action type', () => {
    expect(removeRecipeFromDay(5, 0).type).toEqual(REMOVE_RECIPE_FROM_DAY);
  });

  it('returns the correct day', () => {
    expect(removeRecipeFromDay(5, 0).day).toEqual(5);
  });

  it('returns the correct index', () => {
    expect(removeRecipeFromDay(5, 0).index).toEqual(0);
  });
});

describe('reorderRecipeInDay action creator', () => {
  it('returns the correct action type', () => {
    expect(reorderRecipeInDay(0, 2).type).toEqual(REORDER_RECIPE_IN_DAY);
  });

  it('returns the correct dragIndex', () => {
    expect(reorderRecipeInDay(0, 2).dragIndex).toEqual(0);
  });

  it('returns the correct hoverIndex', () => {
    expect(reorderRecipeInDay(0, 2).hoverIndex).toEqual(2);
  });
});

describe('clearWork action creator', () => {
  it('returns the correct action type', () => {
    expect(clearWork().type).toEqual(CLEAR_WORK);
  });
});

describe('setCreating action creator', () => {
  it('returns the correct action type', () => {
    expect(setCreating().type).toEqual(SET_CREATING);
  });
});

describe('setEditingId action creator', () => {
  it('returns the correct action type', () => {
    expect(setEditingId(7544).type).toEqual(SET_EDITING_ID);
  });

  it('returns the correct id', () => {
    expect(setEditingId(7544).id).toEqual(7544);
  });
});

describe('setPlanName action creator', () => {
  it('returns the correct action type', () => {
    expect(setPlanName("A Great Plan").type).toEqual(SET_PLAN_NAME);
  });

  it('returns the correct name', () => {
    expect(setPlanName("A Great Plan").name).toEqual("A Great Plan");
  });
});

describe('setPlanData action creator', () => {
  const dataToSet = {
    1: [],  2: [recipeOne], 3: [],  4: [],  5: [],  6: [],  7: [],
    8: [],  9: [], 10: [], 11: [], 12: [], 13: [], 14: [],
   15: [], 16: [], 17: [], 18: [], 19: [], 20: [], 21: [],
   22: [], 23: [], 24: [], 25: [], 26: [], 27: [], 28: []
  };

  it('returns the correct action type', () => {
    expect(setPlanData(dataToSet).type).toEqual(SET_PLAN_DATA);
  });

  it('returns the correct data', () => {
    expect(setPlanData(dataToSet).data).toEqual(dataToSet);
  });
});