import { userReducer } from '../../../src/store/user/reducer';
import { actionTypes } from '../../../src/store/user/types';

const { USER_MESSAGE, USER_MESSAGE_CLEAR } = actionTypes;
const message = 'Message.';
const initialState = {message: ''};

describe('user reducer', () => {
  it('returns initial state', () => {
    expect(userReducer(undefined, {
      type: USER_MESSAGE,
      message
    })).toEqual({message});
  });

  it('handles action of type USER_MESSAGE_CLEAR', () => {
    const beforeState = {message};

    expect(userReducer(beforeState, {type: USER_MESSAGE_CLEAR}))
      .toEqual(initialState);
  });
});