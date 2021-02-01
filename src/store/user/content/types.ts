import { Node } from 'slate';

export const actionTypes = {
  USER_CREATE_NEW_CONTENT: 'USER_CREATE_NEW_CONTENT',
  USER_CREATE_NEW_CONTENT_SUCCEEDED: 'USER_CREATE_NEW_CONTENT_SUCCEEDED',
  USER_CREATE_NEW_CONTENT_FAILED: 'USER_CREATE_NEW_CONTENT_FAILED',
  USER_EDIT_CONTENT: 'USER_EDIT_CONTENT',
  USER_EDIT_CONTENT_SUCCEEDED: 'USER_EDIT_CONTENT_SUCCEEDED',
  USER_EDIT_CONTENT_FAILED: 'USER_EDIT_CONTENT_FAILED',
  USER_DELETE_CONTENT: 'USER_DELETE_CONTENT',
  USER_DELETE_CONTENT_SUCCEEDED: 'USER_DELETE_CONTENT_SUCCEEDED',
  USER_DELETE_CONTENT_FAILED: 'USER_DELETE_CONTENT_FAILED'
} as const;

export interface IUserCreateNewContent {
  type: typeof actionTypes.USER_CREATE_NEW_CONTENT;
  contentInfo: ICreatingContentInfo;
}

export interface IUserCreateNewContentSucceeded {
  type: typeof actionTypes.USER_CREATE_NEW_CONTENT_SUCCEEDED;
  message: string;
}

export interface IUserCreateNewContentFailed {
  type: typeof actionTypes.USER_CREATE_NEW_CONTENT_FAILED;
  message: string;
}

export interface IUserEditContent {
  type: typeof actionTypes.USER_EDIT_CONTENT;
  contentInfo: IEditingContentInfo;
}

export interface IUserEditContentSucceeded {
  type: typeof actionTypes.USER_EDIT_CONTENT_SUCCEEDED;
  message: string;
}

export interface IUserEditContentFailed {
  type: typeof actionTypes.USER_EDIT_CONTENT_FAILED;
  message: string;
}

export interface IUserDeleteContent {
  type: typeof actionTypes.USER_DELETE_CONTENT;
  id: number;
}

export interface IUserDeleteContentSucceeded {
  type: typeof actionTypes.USER_DELETE_CONTENT_SUCCEEDED;
  message: string;
}

export interface IUserDeleteContentFailed {
  type: typeof actionTypes.USER_DELETE_CONTENT_FAILED;
  message: string;
}

// For now, one image per page/post
export interface ICreatingContentInfo {
  contentTypeId: number;
  published: string | null;
  title: string;
  items: Node[];
  image: string | ArrayBuffer | null;
  fullImage: File | null;
  thumbImage: File | null;
}

export interface IEditingContentInfo extends ICreatingContentInfo {
  id: number;
  prevImage: string;
}