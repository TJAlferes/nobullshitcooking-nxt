import { userSubmitAvatar } from '../../../../src/store/user/avatar/actions';
import { actionTypes } from '../../../../src/store/user/avatar/types';

const { USER_SUBMIT_AVATAR } = actionTypes;

const fullAvatar = new File([(new Blob)], "resizedFinal", {type: "image/jpeg"});
const tinyAvatar = new File([(new Blob)], "resizedTiny", {type: "image/jpeg"});

describe('userSubmitAvatar action creator', () => {
  it('returns the correct action type', () => {
    expect(userSubmitAvatar(fullAvatar, tinyAvatar).type)
      .toEqual(USER_SUBMIT_AVATAR);
  });

  it('returns the correct fullAvatar', () => {
    expect(userSubmitAvatar(fullAvatar, tinyAvatar).fullAvatar)
      .toEqual(fullAvatar);
  });
  
  it('returns the correct tinyAvatar', () => {
    expect(userSubmitAvatar(fullAvatar, tinyAvatar).tinyAvatar)
      .toEqual(tinyAvatar);
  });
});