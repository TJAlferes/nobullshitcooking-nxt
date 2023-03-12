import { useTypedDispatch as useDispatch } from '../../store';
import { cartAddItem }                     from '../../store/cart/actions';
import type { ICartItem }                  from '../../store/cart/types';

export default function AddToCartButton({ item }: Props) {
  const dispatch = useDispatch();

  const click = () => dispatch(cartAddItem(item));

  return <button className="add-to-cart-button" onClick={click}>Add</button>;
}

type Props = {
  item: ICartItem;
};
