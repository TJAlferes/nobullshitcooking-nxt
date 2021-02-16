import {
  actionTypes,
  ICreatingContentInfo,
  IEditingContentInfo
} from './types';

const {
  STAFF_CREATE_NEW_CONTENT,
  STAFF_EDIT_CONTENT,
  STAFF_DELETE_CONTENT
} = actionTypes;

export const staffCreateNewContent = (contentInfo: ICreatingContentInfo) => ({
  type: STAFF_CREATE_NEW_CONTENT,
  contentInfo
});

export const staffEditContent = (contentInfo: IEditingContentInfo) => ({
  type: STAFF_EDIT_CONTENT,
  contentInfo
});

export const staffDeleteContent = (id: number) => ({
  type: STAFF_DELETE_CONTENT,
  id
});