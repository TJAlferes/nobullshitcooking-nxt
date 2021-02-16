import { Node } from 'slate';

export const actionTypes = {
  USER_CREATE_NEW_CONTENT: 'USER_CREATE_NEW_CONTENT',
  USER_EDIT_CONTENT: 'USER_EDIT_CONTENT',
  USER_DELETE_CONTENT: 'USER_DELETE_CONTENT'
} as const;

export interface IUserCreateNewContent {
  type: typeof actionTypes.USER_CREATE_NEW_CONTENT;
  contentInfo: ICreatingContentInfo;
}

export interface IUserEditContent {
  type: typeof actionTypes.USER_EDIT_CONTENT;
  contentInfo: IEditingContentInfo;
}

export interface IUserDeleteContent {
  type: typeof actionTypes.USER_DELETE_CONTENT;
  id: number;
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