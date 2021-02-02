import { Node } from 'slate';

export const actionTypes = {
  EDITOR_CLEAR_WORK: 'EDITOR_CLEAR_WORK',
  EDITOR_SET_CREATING: 'EDITOR_SET_CREATING',
  EDITOR_SET_EDITING_ID: 'EDITOR_SET_EDITING_ID',
  EDITOR_SET_VALUE: 'EDITOR_SET_VALUE'
} as const;

/*

State

*/

export interface IEditorState {
  creating: boolean;
  editingId: number | null;
  isLoading: boolean;
  value: Node[];  // Note: this Node is from slate, not the one from the DOM
}

/*

Actions

*/

export type EditorActions =
IEditorClearWork |
IEditorSetCreating |
IEditorSetEditingId |
IEditorSetValue;

export interface IEditorClearWork {
  type: typeof actionTypes.EDITOR_CLEAR_WORK;
}

export interface IEditorSetCreating {
  type: typeof actionTypes.EDITOR_SET_CREATING;
}

export interface IEditorSetEditingId {
  type: typeof actionTypes.EDITOR_SET_EDITING_ID;
  id: number | null;
}

export interface IEditorSetValue {
  type: typeof actionTypes.EDITOR_SET_VALUE;
  value: Node[];
}