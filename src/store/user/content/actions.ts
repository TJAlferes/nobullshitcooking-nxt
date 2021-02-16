import {
  actionTypes,
  ICreatingContentInfo,
  IEditingContentInfo
} from './types';

const {
  USER_CREATE_NEW_CONTENT,
  USER_EDIT_CONTENT,
  USER_DELETE_CONTENT
} = actionTypes;

export const userCreateNewContent = (contentInfo: ICreatingContentInfo) => ({
  type: USER_CREATE_NEW_CONTENT,
  contentInfo
});

export const userEditContent = (contentInfo: IEditingContentInfo) => ({
  type: USER_EDIT_CONTENT,
  contentInfo
});

export const userDeleteContent = (id: number) => ({
  type: USER_DELETE_CONTENT,
  id
});