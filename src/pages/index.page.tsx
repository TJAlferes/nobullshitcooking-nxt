//import type { GetStaticProps } from 'next';
//import { useDispatch } from 'react-redux';

import { Home } from '../components';
import { wrapper } from '../store';
import { init } from '../store/data/actions';

export default function IndexPage() {
  return <Home />;
}

export const getStaticProps = wrapper.getStaticProps(
  store => async (context) => {
    store.dispatch(init());
    return {props: {}};
  }
);
