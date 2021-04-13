import { staffReducer } from '../../../src/store/staff/reducer';
import { actionTypes } from '../../../src/store/staff/types';

const { STAFF_MESSAGE, STAFF_MESSAGE_CLEAR } = actionTypes;
const message = 'Message.';
const initialState = {message: ''};

describe('staff reducer', () => {
  it('returns initial state', () => {
    expect(staffReducer(undefined, {
      type: STAFF_MESSAGE,
      message
    })).toEqual({message});
  });

  it('handles action of type STAFF_MESSAGE_CLEAR', () => {
    const beforeState = {message};

    expect(staffReducer(beforeState, {type: STAFF_MESSAGE_CLEAR}))
      .toEqual(initialState);
  });
});