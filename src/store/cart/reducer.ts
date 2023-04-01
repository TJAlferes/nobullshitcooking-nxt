import { actionTypes, State, CartActions } from './types';

const { ADD_ITEM, REMOVE_ITEM, EMPTY } = actionTypes;

const initialState: State = {items: []};

export const cartReducer = (state = initialState, action: CartActions): State => {
  switch (action.type) {
    case ADD_ITEM:    return {...state, items: state.items.concat(action.item)};
    case REMOVE_ITEM: return {...state, items: state.items.filter(item => item.id !== action.item.id)};
    case EMPTY:       return {...state, ...initialState};
    default:          return state;
  }
};
