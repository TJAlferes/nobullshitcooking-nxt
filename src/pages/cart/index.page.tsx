import { useTypedDispatch as useDispatch, useTypedSelector as useSelector } from '../../store';
import { cartRemoveItem } from '../../store/cart/actions';
import type { ICartItem } from '../../store/cart/types';

const endpoint = '';

export default function Cart() {
  const items = useSelector(state => state.cart.items);
  
  return (
    <div className="one-col cart">
      {!items ? 'Your cart is empty.' : items.map(item => (
        <div className="cart-item">
          <span><img src={`${endpoint}/${item.name}`} /></span>
          <span>{item.name}</span>
          <span><RemoveFromCartButton item={item}/></span>
        </div>
      ))}
    </div>
  );
}

function RemoveFromCartButton({ item }: {item: ICartItem}) {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(cartRemoveItem(item));
  
  return (<button className="remove-from-cart-button" onClick={handleClick}>Remove</button>);
}
