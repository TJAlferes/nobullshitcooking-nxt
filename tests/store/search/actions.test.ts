import { searchSetIndex } from '../../../src/store/search/actions';
import { actionTypes } from '../../../src/store/search/types';

const { SEARCH_SET_INDEX } = actionTypes;

describe('searchSetIndex action creator', () => {
  it('returns the correct action type', () => {
    expect(searchSetIndex("Ingredients").type).toEqual(SEARCH_SET_INDEX);
  });
  
  it('returns the correct index', () => {
    expect(searchSetIndex("Ingredients").index).toEqual("Ingredients");
  });
});