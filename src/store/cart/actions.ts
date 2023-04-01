import { actionTypes, CartItem } from './types';

const { ADD_ITEM, REMOVE_ITEM, EMPTY } = actionTypes;

export const cartAddItem = (item: CartItem) => ({type: ADD_ITEM, item});

export const cartRemoveItem = (item: CartItem) => ({type: REMOVE_ITEM, item});

export const cartEmpty = () => ({type: EMPTY});
