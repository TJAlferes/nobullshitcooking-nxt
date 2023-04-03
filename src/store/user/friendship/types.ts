export const actionTypes = {
  REQUEST_FRIENDSHIP: 'REQUEST_FRIENDSHIP',
  ACCEPT_FRIENDSHIP:  'ACCEPT_FRIENDSHIP',
  REJECT_FRIENDSHIP:  'REJECT_FRIENDSHIP',
  DELETE_FRIENDSHIP:  'DELETE_FRIENDSHIP',
  BLOCK_USER:         'BLOCK_USER',
  UNBLOCK_USER:       'UNBLOCK_USER'
} as const;

export type RequestFriendship = {
  type:   typeof actionTypes.REQUEST_FRIENDSHIP;
  friend: string;
};

export type AcceptFriendship = {
  type:   typeof actionTypes.ACCEPT_FRIENDSHIP;
  friend: string;
};

export type RejectFriendship = {
  type:   typeof actionTypes.REJECT_FRIENDSHIP;
  friend: string;
};

export type DeleteFriendship = {
  type:   typeof actionTypes.DELETE_FRIENDSHIP;
  friend: string;
};

export type BlockUser = {
  type:   typeof actionTypes.BLOCK_USER;
  friend: string;
};

export type UnblockUser = {
  type:   typeof actionTypes.UNBLOCK_USER;
  friend: string;
};
