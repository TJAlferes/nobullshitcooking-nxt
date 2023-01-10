import { setIndex } from '../../../src/store/search/actions';
import { actionTypes } from '../../../src/store/search/types';

const { SET_INDEX } = actionTypes;

describe('setIndex action creator', () => {
  it('returns the correct action type', () => {
    expect(setIndex("ingredients").type).toEqual(SET_INDEX);
  });
  
  it('returns the correct index', () => {
    expect(setIndex("ingredients").index).toEqual("ingredients");
  });
});