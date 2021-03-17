import {
  userCreateNewContent,
  userEditContent,
  userDeleteContent
} from '../../../../src/store/user/content/actions';
import { actionTypes } from '../../../../src/store/user/content/types';

const {
  USER_CREATE_NEW_CONTENT,
  USER_EDIT_CONTENT,
  USER_DELETE_CONTENT
} = actionTypes;

const creatingContentInfo = {
  contentTypeId: 13,
  published: null,
  title: "Some Title",
  items: [
    {type: 'paragraph', children: [{text: 'COOK EAT WIN REPEAT'}]}
  ],
  image: null,
  fullImage: null,
  thumbImage: null
};
const editingContentInfo = {
  id: 888,
  contentTypeId: 13,
  published: null,
  title: "Some Title",
  items: [
    {type: 'paragraph', children: [{text: 'COOK EAT WIN REPEAT'}]}
  ],
  prevImage: "nobsc-content-default",
  image: null,
  fullImage: null,
  thumbImage: null
};

describe('userCreateNewContent action creator', () => {
  it('returns the correct action type', () => {
    expect(userCreateNewContent(creatingContentInfo).type)
      .toEqual(USER_CREATE_NEW_CONTENT);
  });

  it('returns the correct contentInfo', () => {
    expect(userCreateNewContent(creatingContentInfo).contentInfo)
      .toEqual(creatingContentInfo);
  });
});

describe('userEditContent action creator', () => {
  it('returns the correct action type', () => {
    expect(userEditContent(editingContentInfo).type).toEqual(USER_EDIT_CONTENT);
  });

  it('returns the correct contentInfo', () => {
    expect(userEditContent(editingContentInfo).contentInfo)
      .toEqual(editingContentInfo);
  });
});

describe('userDeleteContent action creator', () => {
  it('returns the correct action type', () => {
    expect(userDeleteContent(7).type).toEqual(USER_DELETE_CONTENT);
  });

  it('returns the correct id', () => {
    expect(userDeleteContent(7).id).toEqual(7);
  });
});