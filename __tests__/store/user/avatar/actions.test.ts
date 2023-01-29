import { submitAvatar } from '../../../../src/store/user/avatar/actions';
import { actionTypes } from '../../../../src/store/user/avatar/types';

const { SUBMIT_AVATAR } = actionTypes;

const fullAvatar = new File([(new Blob)], "resizedFinal", {type: "image/jpeg"});
const tinyAvatar = new File([(new Blob)], "resizedTiny",  {type: "image/jpeg"});

describe('submitAvatar action creator', () => {
  it('returns the correct action type', () => {
    expect(submitAvatar(fullAvatar, tinyAvatar).type).toEqual(SUBMIT_AVATAR);
  });

  it('returns the correct fullAvatar', () => {
    expect(submitAvatar(fullAvatar, tinyAvatar).fullAvatar).toEqual(fullAvatar);
  });
  
  it('returns the correct tinyAvatar', () => {
    expect(submitAvatar(fullAvatar, tinyAvatar).tinyAvatar).toEqual(tinyAvatar);
  });
});