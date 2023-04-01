import axios                   from 'axios';
import { useEffect, useState } from 'react';

import { LoaderSpinner }  from '../../components';
import { useTypedDispatch as useDispatch, useTypedSelector as useSelector } from '../../store';
import { cartAddItem }    from '../../store/cart/actions';
import type { ICartItem } from '../../store/cart/types';
import { endpoint }       from '../../utils/api';

const url = "https://s3.amazonaws.com/nobsc-";

export default function Product({ product }: {product: IProduct}) {
  const message = useSelector(state => state.user.message);

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ] =  useState(false);

  const { id, product_type_id, supplier_id, fullname } = product;

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      if (message !== "") window.scrollTo(0, 0);
      setFeedback(message);
      setLoading(false);
    }

    return () => {
      isSubscribed = false;
    };
  }, [message]);

  return !product ? <LoaderSpinner /> : (
    <div className="one-col product">
      <div className="product-top">
        <div className="product-top-left">
          <div></div>
          <div><h1>{fullname}</h1></div>
        </div>
        <div className="product-top-right"><AddToCartButton item={product} /></div>
      </div>
    </div>
  );
}

function slugify(fullname: string) {
  return fullname.split(' ').map(word => word.charAt(0).toLowerCase() + word.slice(1)).join('-');
}

export async function getStaticPaths() {
  const response = await axios.get(`${endpoint}/product/fullnames`);
  const paths = response.data.map((product: {fullname: string}) => ({params: {fullname: slugify(product.fullname)}}));
  return {paths, fallback: false};
}

export async function getStaticProps({ params }: {params: {fullname: string}}) {
  const response = await axios.get(`${endpoint}/product/${params.fullname}`);
  return {props: {product: response.data}};
}

function AddToCartButton({ item }: {item: ICartItem}) {
  const dispatch = useDispatch();

  const click = () => dispatch(cartAddItem(item));

  return <button className="add-to-cart-button" onClick={click}>Add</button>;
}

export interface IProduct {
  id:              number;
  product_type_id: number;
  supplier_id:     number;
  fullname:        string;
};
