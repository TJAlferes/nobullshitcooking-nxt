import {
  staffCreateNewContent,
  staffEditContent,
  staffDeleteContent
} from '../../../../src/store/staff/content/actions';
import { actionTypes } from '../../../../src/store/staff/content/types';

const {
  STAFF_CREATE_NEW_CONTENT,
  STAFF_EDIT_CONTENT,
  STAFF_DELETE_CONTENT
} = actionTypes;

const creatingContentInfo = {
  contentTypeId: 13,
  published: null,
  title: "Some Title",
  items: [{type: 'paragraph', children: [{text: 'COOK EAT WIN REPEAT'}]}],
  image: null,
  fullImage: null,
  thumbImage: null
};
const editingContentInfo = {
  id: 888,
  contentTypeId: 13,
  published: null,
  title: "Some Title",
  items: [{type: 'paragraph', children: [{text: 'COOK EAT WIN REPEAT'}]}],
  prevImage: "nobsc-content-default",
  image: null,
  fullImage: null,
  thumbImage: null
};

describe('staffCreateNewContent action creator', () => {
  it('returns the correct action type', () => {
    expect(staffCreateNewContent(creatingContentInfo).type)
      .toEqual(STAFF_CREATE_NEW_CONTENT);
  });

  it('returns the correct contentInfo', () => {
    expect(staffCreateNewContent(creatingContentInfo).contentInfo)
      .toEqual(creatingContentInfo);
  });
});

describe('staffEditContent action creator', () => {
  it('returns the correct action type', () => {
    expect(staffEditContent(editingContentInfo).type)
      .toEqual(STAFF_EDIT_CONTENT);
  });

  it('returns the correct contentInfo', () => {
    expect(staffEditContent(editingContentInfo).contentInfo)
      .toEqual(editingContentInfo);
  });
});

describe('staffDeleteContent action creator', () => {
  it('returns the correct action type', () => {
    expect(staffDeleteContent(7).type).toEqual(STAFF_DELETE_CONTENT);
  });

  it('returns the correct id', () => {
    expect(staffDeleteContent(7).id).toEqual(7);
  });
});