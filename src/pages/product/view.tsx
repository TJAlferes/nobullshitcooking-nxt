import Link from 'next/link';

import type { IWorkProduct } from '../../store/data/types';
import AddToCartButton from './AddToCartButton';
import type { IProduct } from './index.page';

export function ProductView({ products, feedback, loading, product, userIsAuthenticated }: Props) {
  const { id, product_type_id, supplier_id, fullname } = product;

  return (
    <div className="product one-col-a">
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
  userIsAuthenticated: boolean;
};
