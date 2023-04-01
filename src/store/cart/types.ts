export const actionTypes = {
  ADD_ITEM:    'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  EMPTY:       'EMPTY'
} as const;

/*

State

*/

export type State = {
  items: CartItem[];
};

export type CartItem = {
  id:         number;
  itemTypeId: number;
  name:       string;
  quantity:   number;
};

/*

Actions

*/

export type CartActions = AddItem | RemoveItem | Empty;

type AddItem = {
  type: typeof actionTypes.ADD_ITEM;
  item: CartItem;
};

type RemoveItem = {
  type: typeof actionTypes.REMOVE_ITEM;
  item: CartItem;
};

type Empty = {
  type: typeof actionTypes.EMPTY;
};
