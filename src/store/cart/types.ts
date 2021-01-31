export const actionTypes = {
  CART_ADD_ITEM:'CART_ADD_ITEM',
  CART_REMOVE_ITEM:'CART_REMOVE_ITEM',
  CART_EMPTY_CART:'CART_EMPTY'
} as const;

/*

State

*/

export interface ICartState {
  items: ICartItem[];
}

export interface ICartItem {
  id: number;
  itemTypeId: number;
  name: string;
  quantity: number;
}

/*

Actions

*/

export type CartActions = ICartAddItem | ICartRemoveItem | ICartEmpty;

interface ICartAddItem {
  type: typeof actionTypes.CART_ADD_ITEM;
  item: ICartItem;
}

interface ICartRemoveItem {
  type: typeof actionTypes.CART_REMOVE_ITEM;
  item: ICartItem;
}

interface ICartEmpty {
  type: typeof actionTypes.CART_EMPTY_CART;
}