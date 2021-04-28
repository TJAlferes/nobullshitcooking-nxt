import Link from 'next/link';

import { IWorkProduct } from '../../store/data/types';
import AddToCartButton from './AddToCartButton';
import { IProduct } from './index.page';

export function ProductView({
  products,
  feedback,
  loading,
  product,
  oneColumnATheme,
  userIsAuthenticated
}: Props): JSX.Element {
  const { id, product_type_id, supplier_id, fullname } = product;

  return (
    <div className={`product one-column-a ${oneColumnATheme}`}>
      <div className="product__top">
        <div className="product__top-left">
          <div></div>

          <div><h1>{product.fullname}</h1></div>
        </div>

        <div className="product__top-right">
          {/*<AddToCartButton item={product} />*/}
        </div>
      </div>
    </div>
  );
}

type Props = {
  products: IWorkProduct[];
  feedback: string;
  loading: boolean;
  product: IProduct;
  oneColumnATheme: string;
  userIsAuthenticated: boolean;
};