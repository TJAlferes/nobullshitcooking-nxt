import { userMessage, userMessageClear } from '../../../src/store/user/actions';
import { actionTypes } from '../../../src/store/user/types';

const { USER_MESSAGE, USER_MESSAGE_CLEAR } = actionTypes;

describe('userMessage action creator', () => {
  it('returns the correct action type', () => {
    expect(userMessage("message").type).toEqual(USER_MESSAGE);
  });

  it('returns the correct message', () => {
    expect(userMessage("message").message).toEqual("message");
  });
});

describe('userMessageClear action creator', () => {
  it('returns the correct action type', () => {
    expect(userMessageClear().type).toEqual(USER_MESSAGE_CLEAR);
  });
});