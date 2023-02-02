import {END} from 'redux-saga';

import { Home }    from '../components';
import { SagaStore, wrapper } from '../store';
import { init }    from '../store/data/actions';

export default function IndexPage() {
  return <Home />;
}

export const getStaticProps = wrapper.getStaticProps(
  store => async (context) => {
    store.dispatch(init());

    store.dispatch(END);
    await (store as SagaStore).sagaTask?.toPromise();

    return {props: {}};
  }
);