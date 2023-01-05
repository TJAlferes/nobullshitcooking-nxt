import Link from 'next/link';

import { IWorkProduct } from '../../store/data/types';
import AddToCartButton from './AddToCartButton';
import { IProduct } from './index.page';

export function ProductView({ products, feedback, loading, product, theme, userIsAuthenticated }: Props): JSX.Element {
  const { id, product_type_id, supplier_id, fullname } = product;

  return (
    <div className={`product one-col-a ${theme}`}>
      <div className="product-top">
        <div className="product-top-left">
          <div></div>
          <div><h1>{product.fullname}</h1></div>
        </div>

        <div className="product-top-right">{/*<AddToCartButton item={product} />*/}</div>
      </div>
    </div>
  );
}

type Props = {
  products:            IWorkProduct[];
  feedback:            string;
  loading:             boolean;
  product:             IProduct;
  theme:               string;
  userIsAuthenticated: boolean;
};