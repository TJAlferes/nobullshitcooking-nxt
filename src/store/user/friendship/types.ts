export const actionTypes = {
  REQUEST_FRIENDSHIP: 'REQUEST_FRIENDSHIP',
  ACCEPT_FRIENDSHIP:  'ACCEPT_FRIENDSHIP',
  REJECT_FRIENDSHIP:  'REJECT_FRIENDSHIP',
  DELETE_FRIENDSHIP:  'DELETE_FRIENDSHIP',
  BLOCK_USER:         'BLOCK_USER',
  UNBLOCK_USER:       'UNBLOCK_USER'
} as const;

export interface IRequestFriendship {
  type:   typeof actionTypes.REQUEST_FRIENDSHIP;
  friend: string;
}

export interface IAcceptFriendship {
  type:   typeof actionTypes.ACCEPT_FRIENDSHIP;
  friend: string;
  status: string;
}

export interface IRejectFriendship {
  type:   typeof actionTypes.REJECT_FRIENDSHIP;
  friend: string;
}

export interface IDeleteFriendship {
  type:   typeof actionTypes.DELETE_FRIENDSHIP;
  friend: string;
  status: string;
}

export interface IBlockUser {
  type:   typeof actionTypes.BLOCK_USER;
  friend: string;
  status: string;
}

export interface IUnblockUser {
  type:   typeof actionTypes.UNBLOCK_USER;
  friend: string;
}