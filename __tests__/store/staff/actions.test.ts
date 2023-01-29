import {
  staffMessage,
  staffMessageClear
} from '../../../src/store/staff/actions';
import { actionTypes } from '../../../src/store/staff/types';

const { STAFF_MESSAGE, STAFF_MESSAGE_CLEAR } = actionTypes;

describe('staffMessage action creator', () => {
  it('returns the correct action type', () => {
    expect(staffMessage("message").type).toEqual(STAFF_MESSAGE);
  });

  it('returns the correct message', () => {
    expect(staffMessage("message").message).toEqual("message");
  });
});

describe('staffMessageClear action creator', () => {
  it('returns the correct action type', () => {
    expect(staffMessageClear().type).toEqual(STAFF_MESSAGE_CLEAR);
  });
});