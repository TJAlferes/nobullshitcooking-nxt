import { Node } from 'slate';

export const actionTypes = {
  STAFF_CREATE_NEW_CONTENT: 'STAFF_CREATE_NEW_CONTENT',
  STAFF_EDIT_CONTENT: 'STAFF_EDIT_CONTENT',
  STAFF_DELETE_CONTENT: 'STAFF_DELETE_CONTENT'
} as const;

export interface IStaffCreateNewContent {
  type: typeof actionTypes.STAFF_CREATE_NEW_CONTENT;
  contentInfo: ICreatingContentInfo;
}

export interface IStaffEditContent {
  type: typeof actionTypes.STAFF_EDIT_CONTENT;
  contentInfo: IEditingContentInfo;
}

export interface IStaffDeleteContent {
  type: typeof actionTypes.STAFF_DELETE_CONTENT;
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