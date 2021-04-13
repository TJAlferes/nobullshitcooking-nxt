import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { LoaderSpinner } from '../../components';
import { NOBSCAPI as endpoint } from '../../config/NOBSCAPI';
import { useTypedSelector as useSelector } from '../../store';
import { ProductView } from './ProductView';

export default function Product(): JSX.Element {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();

  const products = useSelector(state => state.data.products);
  const message = useSelector(state => state.user.message);
  const oneColumnATheme = useSelector(state => state.theme.oneColumnATheme);
  const userIsAuthenticated =
    useSelector(state => state.auth.userIsAuthenticated);

  const [ feedback, setFeedback ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ product, setProduct ] = useState<IProduct>();

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

  useEffect(() => {
    if (!id) {
      history.push('/home');
      return;
    }

    const getProduct = async () => {
      const res = await axios.get(`${endpoint}/product/${id}`);
      if (res.data) setProduct(res.data);
    };

    getProduct();
  }, []);

  return !product
    ? <LoaderSpinner />
    : (
      <ProductView
        products={products}
        feedback={feedback}
        loading={loading}
        product={product}
        oneColumnATheme={oneColumnATheme}
        userIsAuthenticated={userIsAuthenticated}
      />
    );
}

export interface IProduct {
  id: number;
  product_type_id: number;
  supplier_id: number;
  fullname: string;
};