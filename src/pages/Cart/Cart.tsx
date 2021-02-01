import React from 'react';

import { useTypedSelector as useSelector } from '../../store';
import RemoveFromCartButton from './RemoveFromCartButton/RemoveFromCartButton';
import './cart.css';

const endpoint = '';

export default function Cart({ oneColumnATheme }: Props) {
  const cartItems = useSelector(state => state.cart.items);
  
  return (
    <div className={`cart one-column-a ${oneColumnATheme}`}>
      {!cartItems ? 'Your cart is empty.' : cartItems.map(i => (
        <div className="cart-item">
          <span><img src={`${endpoint}/${i.name}`} /></span>
          <span>{i.name}</span>
          <span><RemoveFromCartButton item={i}/></span>
        </div>
      ))}
    </div>
  );
}

type Props = {
  oneColumnATheme: string;
};