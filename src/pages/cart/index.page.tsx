import { useTypedSelector as useSelector } from '../../store';
import RemoveFromCartButton from './RemoveFromCartButton';

const endpoint = '';

export default function Cart() {
  const items = useSelector(state => state.cart.items);
  
  return (
    <div className="cart one-col-a">
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
