import { useDispatch } from 'react-redux';

import { cartRemoveItem } from '../../store/cart/actions';
import { ICartItem } from '../../store/cart/types';

export default function RemoveFromCartButton({ item }: Props): JSX.Element {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(cartRemoveItem(item));
  return (<button className="remove-from-cart-button" onClick={handleClick}>Remove</button>);
}

type Props = {
  item: ICartItem;
};