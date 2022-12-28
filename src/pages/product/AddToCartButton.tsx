import { useDispatch } from 'react-redux';

import { cartAddItem } from '../../store/cart/actions';
import { ICartItem } from '../../store/cart/types';

export default function AddToCartButton({ item }: Props): JSX.Element {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(cartAddItem(item));

  return <button className="add-to-cart-button" onClick={handleClick}>Add</button>;
}

type Props = {
  item: ICartItem;
};